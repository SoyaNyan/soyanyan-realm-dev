/**
 * Author: SOYANYAN (소야냥)
 * Name: randomCrateCore.ts
 * Version: v1.0.0
 * Last Update: 2022-12-10
 *
 * TypeScript Version: v4.9.3
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

/**
  [ global objects ] 
*/
const Data: any = new Object()
const PlaceholderAPI: any = new Object()
const Placeholder: any = new Object()
const BukkitServer: any = new Object()
const BukkitPlayer: any = new Object()
const args: string[] = []

/**
  [ type definition ] 
*/
// for polyfills
declare global {
	interface Array<T> {
		findIndex(predicate: (value: T, index: number, obj: Array<T>) => unknown, thisArg?: any): number
	}
}

/**
 * types: utility types
 */
type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

type MakeRequired<Type, Key extends keyof Type> = Omit<Type, Key> & Required<Pick<Type, Key>>

/**
 * types: command handler
 */
type ReturnDataType = number | string | boolean

type CommandObjectType = {
	argLen: Array<number>
	callback: (args: string[]) => ReturnDataType
}

/**
 * types: crate settings
 */
type CrateSettingType = {
	[index: string]: CrateType
}

type CrateType = {
	name: string
	itemCode: string
	contents: CrateContentType[]
}

type CrateContentType = {
	name: string
	prob: number
	itemCode: string
	quantity: number
	isEI: boolean
	broadcast: boolean
}

/**
 * types: command utilities
 */
type TitleSettingType = {
	[index: string]: TitleType
}

type TitleType = {
	title: TitleDataType | Array<TitleDataType>
	subtitle: TitleDataType | Array<TitleDataType>
}

type TitleDataType = {
	text: string
	color?: string
	italic?: boolean
	bold?: boolean
	obfuscated?: boolean
}

/**
[ polyfill ] 
*/
// Array.prototype.findIndex
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (callback, thisArg) {
		if (!callback || typeof callback !== 'function') throw TypeError()
		const size = this.length
		const that = thisArg || this
		for (var i = 0; i < size; i++) {
			try {
				if (!!callback.apply(that, [this[i], i, this])) {
					return i
				}
			} catch (e) {
				return -1
			}
		}
		return -1
	}
}

/**
  [ constants ] 
*/
// player name
const PLAYER_NAME = '%player_name%'

// crate settings
const CRATE_SETTINGS: CrateSettingType = {
	testCrate: {
		name: '&7[#FFC8A2 ★ &7] #F6EAC2&l평범한 #FFFFB5&l랜덤 #ECEAE4&l박스',
		itemCode: 'commonRandomChest',
		contents: [
			{
				name: '&c꽝',
				prob: 20,
				itemCode: 'none',
				quantity: 0,
				isEI: false,
				broadcast: false,
			},
			{
				name: '§8석탄',
				prob: 20,
				itemCode: 'coal',
				quantity: 10,
				isEI: false,
				broadcast: false,
			},
			{
				name: '&e구리 주괴',
				prob: 20,
				itemCode: 'copper_ingot',
				quantity: 10,
				isEI: false,
				broadcast: false,
			},
			{
				name: '&7철 주괴',
				prob: 20,
				itemCode: 'iron_ingot',
				quantity: 10,
				isEI: false,
				broadcast: false,
			},
			{
				name: '&6금 주괴',
				prob: 20,
				itemCode: 'gold_ingot',
				quantity: 10,
				isEI: false,
				broadcast: false,
			},
			{
				name: '&a에메랄드',
				prob: 20,
				itemCode: 'emerald',
				quantity: 10,
				isEI: false,
				broadcast: false,
			},
			{
				name: '§b다이아몬드',
				prob: 20,
				itemCode: 'diamond',
				quantity: 5,
				isEI: false,
				broadcast: false,
			},
			{
				name: '§5네더라이트 주괴',
				prob: 20,
				itemCode: 'netherite_ingot',
				quantity: 2,
				isEI: false,
				broadcast: false,
			},
		],
	},
}

// title & subtitle settings
const CRATE_TITLE_SETTINGS: TitleSettingType = {
	testCrate: {
		title: [],
		subtitle: [
			{ text: '평범한', color: '#F6EAC2', bold: true },
			{ text: '' },
			{ text: '랜덤', color: '#F6EAC2', bold: true },
			{ text: ' ' },
			{ text: '박스', color: '#ECEAE4', bold: true },
		],
	},
}

const PRIZE_TITLE_SETTINGS: TitleSettingType = {
	none: {
		title: [{ text: '꽝...', color: 'red', bold: true }],
		subtitle: [],
	},
	coal: {
		title: [
			{ text: '석탄', color: 'dark_gray', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '10', color: 'white', bold: true },
		],
		subtitle: [],
	},
	copper_ingot: {
		title: [
			{ text: '구리 주괴', color: 'yellow', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '10', color: 'white', bold: true },
		],
		subtitle: [],
	},
	iron_ingot: {
		title: [
			{ text: '철 주괴', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '10', color: 'white', bold: true },
		],
		subtitle: [],
	},
	gold_ingot: {
		title: [
			{ text: '금 주괴', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '10', color: 'white', bold: true },
		],
		subtitle: [],
	},
	emerald: {
		title: [
			{ text: '에메랄드', color: 'green', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '10', color: 'white', bold: true },
		],
		subtitle: [],
	},
	diamond: {
		title: [
			{ text: '다이아몬드', color: 'aqua', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '5', color: 'white', bold: true },
		],
		subtitle: [],
	},
	netherite_ingot: {
		title: [
			{ text: '네더라이트 주괴', color: 'dark_purple', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '2', color: 'white', bold: true },
		],
		subtitle: [],
	},
	costReducerLow: {
		title: [
			{ text: '희미한', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	costReducerMedium: {
		title: [
			{ text: '선명한', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	costReducerHigh: {
		title: [
			{ text: '반짝이는', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	enchantEssenceLow: {
		title: [
			{ text: '미약한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	enchantEssenceMedium: {
		title: [
			{ text: '쓸만한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	enchantEssenceHigh: {
		title: [
			{ text: '강력한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	enchantProtectScroll: {
		title: [
			{ text: '아이템', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '프로텍트', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '스크롤', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	armorScrollRecipe: {
		title: [
			{ text: '방어구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	armorScrollRecipePlus: {
		title: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '방어구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	randomScrollRecipe: {
		title: [
			{ text: '혼돈의 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	randomScrollRecipePlus: {
		title: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '혼돈의 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	toolScrollRecipe: {
		title: [
			{ text: '도구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	toolScrollRecipePlus: {
		title: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '도구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	weaponScrollRecipe: {
		title: [
			{ text: '무기 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	weaponScrollRecipePlus: {
		title: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '무기 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
		subtitle: [],
	},
	hardPaper: {
		title: [
			{ text: '매끄러운', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: '종이', color: 'white', bold: true },
		],
		subtitle: [],
	},
	softPaper: {
		title: [
			{ text: '매끄러운', color: '#CCE2CB', bold: true },
			{ text: ' ' },
			{ text: '종이', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	magicPaper: {
		title: [
			{ text: '신비로운', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '종이', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	magicInk: {
		title: [
			{ text: '마법의', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: '잉크', color: 'gray', bold: true },
		],
		subtitle: [],
	},
}

const MESSAGE_TITLE_SETTINGS: TitleSettingType = {
	open: {
		title: [
			{ text: '랜', color: '#fbd300', bold: true },
			{ text: '덤', color: '#f0d706', bold: true },
			{ text: '박', color: '#e6db0b', bold: true },
			{ text: '스', color: '#dbde11', bold: true },
			{ text: '를', color: '#d0e217', bold: true },
			{ text: ' ' },
			{ text: '사', color: '#c6e61c', bold: true },
			{ text: '용', color: '#bbea22', bold: true },
			{ text: '했', color: '#b1ee27', bold: true },
			{ text: '습', color: '#a6f22d', bold: true },
			{ text: '니', color: '#9bf533', bold: true },
			{ text: '다', color: '#91f938', bold: true },
			{ text: '!', color: '#86fd3e', bold: true },
		],
		subtitle: [],
	},
	rolling: {
		title: [
			{ text: '아', color: '#fb0097', bold: true },
			{ text: '이', color: '#fb159c', bold: true },
			{ text: '템', color: '#fb2ba0', bold: true },
			{ text: ' ' },
			{ text: '고', color: '#fc40a5', bold: true },
			{ text: '르', color: '#fc56aa', bold: true },
			{ text: '는', color: '#fc6bae', bold: true },
			{ text: ' ' },
			{ text: '중', color: '#fc81b3', bold: true },
			{ text: '.', color: '#fd96b8', bold: true },
			{ text: '.', color: '#fdacbc', bold: true },
			{ text: '.', color: '#fdc1c1', bold: true },
		],
		subtitle: [
			{ text: '$', color: '#eceae4', bold: true },
			{ text: ' ' },
			{ text: '2', color: '#7ca7fb', obfuscated: true, bold: true },
			{ text: ' ' },
			{ text: '3', color: '#96a2ee', obfuscated: true, bold: true },
			{ text: ' ' },
			{ text: '4', color: '#b09ce2', obfuscated: true, bold: true },
			{ text: ' ' },
			{ text: '5', color: '#c997d5', obfuscated: true, bold: true },
			{ text: ' ' },
			{ text: '6', color: '#e391c9', obfuscated: true, bold: true },
			{ text: ' ' },
			{ text: '7', color: '#fd8cbc', obfuscated: true, bold: true },
			{ text: ' ' },
		],
	},
}

/**
  [ data utilities ] 
*/
// check if data(key) exists in global store
function exists(path: string): boolean {
	// returns true if a key exists; else false. (Placeholder API)
	return Data.exists(path)
}

// get data from global store
function get(path: string): ReturnDataType {
	let result: ReturnDataType

	// check data exists
	if (path.length > 0) {
		// check data exists
		if (!exists(path)) return false

		// returns the value stored under key. (Placeholder API)
		// type of data value => number | string | boolean
		result = Data.get(path)
	} else {
		// returns a Map<String, Object> of the entire placeholder script's data. (Placeholder API)
		result = Data.getData()
	}

	return result
}

// set data in global store
function set(path: string, payload: ReturnDataType): boolean {
	// check data exists
	if (exists(path)) {
		return update(path, payload)
	}

	// stores a value under key. (Placeholder API)
	Data.set(path, payload)
	save()

	return true
}

// update data in global store
function update(path: string, payload: ReturnDataType): boolean {
	// check data exists
	if (!exists(path)) {
		return set(path, payload)
	}

	// stores a value under key. (Placeholder API)
	Data.set(path, payload)
	save()

	return true
}

// remove data from global store
function remove(path: string): boolean {
	// check data exists
	if (!exists(path)) return false

	// removes a key from the data. (Placeholder API)
	Data.remove(path)
	save()

	return true
}

// remove all data from global store
function clear(): boolean {
	// removes all data. (Placeholder API)
	Data.clear()
	save()

	return true
}

// saves current state
function save(): void {
	// saves the current data state to the data file. (Placeholder API)
	Placeholder.saveData()
}

/**
  [ general utilities ] 
*/
// stringify data for placeholder return
function stringify(data: ReturnDataType): string {
	return `${data}`
}

// encode boolean as '1' or '0'
function encodeBoolean(data: boolean): string {
	return data ? '1' : '0'
}

// EssentialsX:: convert colored string (#55CBCD -> &#55CBCD)
function essentialsColorString(targetStr: string): string {
	// translate color codes
	const converted = translateHexCodes(targetStr, false)

	// return converted string
	return converted
}

// Console:: convert colored string (#55CBCD -> §x§5§5§C§B§C§D, &7 -> §7)
function consoleColorString(targetStr: string): string {
	// translate color codes
	const converted = translateHexCodes(targetStr.replace(/&/g, '§'), true)

	// return converted string
	return converted
}

// translate mincraft color codes include hex (above mc v1.16)
function translateHexCodes(targetStr: string, isConsole: boolean): string {
	// set hex color code regex
	const regex = /#[a-f0-9]{6}/gi

	// check hex color codes
	const matches = targetStr.match(regex)

	// check nothing matches
	if (matches === null) return targetStr

	// init string
	let converted = targetStr

	// replace color codes
	for (const match of matches) {
		// match string(color)
		const color = match

		// for console commands
		if (isConsole) {
			// split characters
			const hexCodeArray = color.split('')

			// replace each character
			for (let i = 0; i < hexCodeArray.length; i++) {
				hexCodeArray[i] = `§${hexCodeArray[i]}`
			}

			// converted hex code
			const hexCode = `§x${hexCodeArray.join('')}`

			// apply converted color code
			converted = converted.replace(color, hexCode)
		}

		// for EssentialsX commands
		if (!isConsole) {
			converted = converted.replace(color, `&${color}`)
		}
	}

	return converted
}

/**
  [ Placeholder API utilities ]
*/
// parse external placeholders
function parsePlaceholder(placeholder: string): string {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, `%${placeholder}%`)
}

/**
	[ Spigot API utilities ]
*/
// get server bukkit version
function getVersion(): number {
	// get version string
	const version = BukkitServer.getVersion()

	// check each version
	if (version.includes('1.8')) return 8
	if (version.includes('1.9')) return 9
	if (version.includes('1.10')) return 10
	if (version.includes('1.11')) return 11
	if (version.includes('1.12')) return 12
	if (version.includes('1.13')) return 13
	if (version.includes('1.14')) return 14
	if (version.includes('1.15')) return 15
	if (version.includes('1.16')) return 16
	if (version.includes('1.16.1')) return 16.1
	if (version.includes('1.17')) return 17
	if (version.includes('1.18')) return 18
	if (version.includes('1.19')) return 19
	if (version.includes('1.19.1')) return 19.1
	if (version.includes('1.19.2')) return 19.2
	if (version.includes('1.19.3')) return 19.3
	if (version.includes('1.20')) return 20

	// unknown(unsupported) version
	return -1
}

// check server bukkit version is above 1.16
function checkPlus16(): boolean {
	// get version
	const version = getVersion()

	// check version is above 1.16
	const checkVersion = version >= 16

	// return result
	return checkVersion
}

// execute command on server console
function execConsoleCommand(command: string): boolean {
	if (typeof command === 'undefined' || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}

// execute command as player
function execCommand(command: string): boolean {
	if (typeof command === 'undefined' || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}

// send message to player
function sendMessage(message: string | Array<string>): boolean {
	if (typeof message === 'undefined' || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}

// send message(log) to console
function logConsole(message: string | Array<string>): boolean {
	if (typeof message === 'undefined' || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
}

/**
  [ command utilities ] 
*/
// set title times
function setTitleTimes(fadeIn: number, stay: number, fadeOut: number, playerName: string) {
	// set command
	const command = `minecraft:title ${playerName} times ${fadeIn} ${stay} ${fadeOut}`

	// execute command
	return execConsoleCommand(command)
}

// show title to player
function showTitle(title: TitleDataType | Array<TitleDataType>, playerName: string): boolean {
	// set command
	const command = `minecraft:title ${playerName} title ${JSON.stringify(title)}`

	// execute command
	return execConsoleCommand(command)
}

// show subtitle to player
function showSubtitle(subtitle: TitleDataType | Array<TitleDataType>, playerName: string): boolean {
	// set command
	const command = `minecraft:title ${playerName} subtitle ${JSON.stringify(subtitle)}`

	// execute command
	return execConsoleCommand(command)
}

// show title and subtitle to player
function playTitle(
	title: TitleDataType | Array<TitleDataType>,
	subtitle: TitleDataType | Array<TitleDataType>,
	playerName: string
): boolean {
	// set title
	showTitle(title, playerName)

	// set subtitle and show both to player
	return showSubtitle(subtitle, playerName)
}

// play sound effect to player (sound => entity.villager.yes (without minecraft:))
function playSound(sound: string, playerName: string): boolean {
	// set command
	const command = `minecraft:execute at ${playerName} run playsound minecraft:${sound} voice ${playerName}`

	// execute command
	return execConsoleCommand(command)
}

// broadcast message to all players
function broadcastMessage(message: string): boolean {
	// set command
	const command = `broadcast ${essentialsColorString(message)}`

	// exec command
	return execConsoleCommand(command)
}

// give item to player
function giveItem(item: string, quantity: number, isEI: boolean, playerName: string): boolean {
	// set command
	const command = isEI
		? `ei give ${playerName} ${item} ${quantity}`
		: `minecraft:give ${playerName} minecraft:${item} ${quantity}`

	// exec command
	return execConsoleCommand(command)
}

/**
  [ random crate utilities ]
*/
// pick random item from specific crate setting
function pickRandomItem(crate: string): CrateContentType {
	// get crate contents
	const { contents } = CRATE_SETTINGS[crate]

	// get cumulative distribution of probs
	const distribution = contents
		.map((v) => v.prob)
		.map(
			(
				(sum) => (value: number) =>
					(sum += value)
			)(0)
		)

	// get random number
	const random = Math.floor(Math.random() * distribution[distribution.length - 1] + 1)

	// pick item
	return contents[distribution.findIndex((value) => random <= value)]
}

/**
  [ action handler ] 
*/
// open specific crate
function openCrate(args: string[]): ReturnDataType {
	// get args
	const [, returnType, crate] = args

	// get crate settings
	const { name } = CRATE_SETTINGS[crate]

	// send use message
	const itemMessage = `&7[&9랜덤박스&7] ${name}(을)를 사용했습니다.`
	sendMessage(consoleColorString(itemMessage))

	// play sound effect
	playSound('entity.firework_rocket.launch', PLAYER_NAME)

	// get title settings
	const { title } = MESSAGE_TITLE_SETTINGS.open
	const { subtitle } = CRATE_TITLE_SETTINGS[crate]

	// show title
	playTitle(title, subtitle, PLAYER_NAME)

	// return
	return 1
}

// roll specific crate
function rollCrate(args: string[]): ReturnDataType {
	// get args
	const [, returnType] = args

	// get title settings
	const { title, subtitle } = MESSAGE_TITLE_SETTINGS.rolling

	// show title
	playTitle(title, subtitle, PLAYER_NAME)

	// play sound effect
	playSound('entity.experience_orb.pickup', PLAYER_NAME)

	// return
	return 1
}

// give crate prize
function givePrize(args: string[]): ReturnDataType {
	// get args
	const [, returnType, crate] = args

	// get crate settings
	const { name: crateName } = CRATE_SETTINGS[crate]

	// pick random item
	const { name: itemName, itemCode, quantity, isEI, broadcast } = pickRandomItem(crate)

	// get prize title settings
	const { title, subtitle } = PRIZE_TITLE_SETTINGS[itemCode]

	// set title times
	setTitleTimes(0, 60, 0, PLAYER_NAME)

	// show title
	playTitle(title, subtitle, PLAYER_NAME)

	// play sound effect
	itemCode === 'none'
		? playSound('entity.villager.no', PLAYER_NAME)
		: playSound('entity.villager.yes', PLAYER_NAME)

	// give item to player
	giveItem(itemCode, quantity, isEI, PLAYER_NAME)

	// broadcast message
	broadcast
		? broadcastMessage(
				`&7[&9랜덤박스&7] &b&l${PLAYER_NAME} &f님이 ${crateName}&7에서 ${itemName} &7x &6${quantity} &f를 획득했습니다!`
		  )
		: false

	// return
	return 1
}

// placeholder controller
function randomCrateCore(): string {
	// action result
	let result: any = false

	// get args
	const [action] = args

	// command(placeholder) settings
	const VALID_COMMANDS: { [index: string]: CommandObjectType } = {
		openCrate: {
			argLen: [3],
			callback: openCrate,
		},
		rollCrate: {
			argLen: [2],
			callback: rollCrate,
		},
		givePrize: {
			argLen: [3],
			callback: givePrize,
		},
	}

	// check action
	if (!(action in VALID_COMMANDS)) return 'false'

	// check args
	const { argLen, callback } = VALID_COMMANDS[action]
	const isValidArgs = argLen.some((len) => args.length === len)
	if (!isValidArgs) return 'false'

	// execute callback
	result = callback(args)

	// return action result
	return stringify(result)
}

randomCrateCore()

export {}
