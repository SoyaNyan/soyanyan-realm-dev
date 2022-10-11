/**
 * Author: SOYANYAN (소야냥)
 * Name: itemEvaluationCore.ts
 * Version: v1.1.0
 * Last Update: 2022-10-11
 *
 * TypeScript Version: v4.8.4
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
	interface String {
		includes(search: string, start?: number): boolean
	}
	interface Array<T> {
		includes(searchElement: T, fromIndex?: number): boolean
	}
}

/**
 * types: command handler
 */
type ReturnDataType = number | string | boolean

type CommandObjectType = {
	argLen: Array<number>
	callback: (args: string[]) => ReturnDataType
}

/**
 * types: settings
 */

/**
 * types: utility types
 */
type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

type MakeRequired<Type, Key extends keyof Type> = Omit<Type, Key> & Required<Pick<Type, Key>>

/**
 * types: item data
 */
type ItemEnchantDataType = {
	[index: string]: number
}

type ItemIntNBTDataType = {
	[index: string]: number | boolean | undefined
	Damage: number
	RepairCost: number
	customLore?: number | boolean | undefined
}

type DisplayDataType = {
	Name: string
	Lore: Array<string>
}

/**
 * types: command utilities
 */
type TitleType = {
	text: string
	color?: string
	italic?: boolean
	bold?: boolean
}

/**
[ polyfill ] 
*/
// String.prototype.includes
if (!String.prototype.includes) {
	String.prototype.includes = function (search: string, start?: number): boolean {
		if (typeof start !== 'number') start = 0

		if (start + search.length > this.length) return false

		return this.indexOf(search, start) !== -1
	}
}

// Array.prototype.includes
if (!Array.prototype.includes) {
	Array.prototype.includes = function <T>(searchElement: T, fromIndex?: number) {
		function sameValueZero(x: T, y: T): boolean {
			return x === y
		}

		const arr = Object(this)

		if (typeof fromIndex !== 'number') fromIndex = 0

		if (arr.length === 0) return false

		let start = Math.max(fromIndex >= 0 ? fromIndex : arr.length - Math.abs(fromIndex), 0)
		while (start < arr.length) {
			if (sameValueZero(arr[start], searchElement)) return true
			start++
		}

		return false
	}
}

/**
  [ constants ] 
*/
// player name
const PLAYER_NAME = '%player_name%'

// broadcast prcie
const BROADCAST_PRICE = 5000000

// plus price offset
const PLUS_PRICE_OFFSET = 0.1

// item kr names
const ITEMS_LOCALE_KR: {
	item: { [index: string]: string }
	material: { [index: string]: string }
	suffix: { [index: string]: string }
} = {
	item: {
		BOW: '활',
		FISHING_ROD: '낚싯대',
		TRIDENT: '삼지창',
		CROSSBOW: '쇠뇌',
		SHEARS: '가위',
		SHIELD: '방패',
		ELYTRA: '겉날개',
		FLINT_AND_STEEL: '부싯돌과 부시',
		CARROT_ON_A_STICK: '당근 낚싯대',
	},
	material: {
		NETHERITE: '네더라이트',
		DIAMOND: '다이아몬드',
		GOLDEN: '금',
		CHAINMAIL: '사슬',
		IRON: '철',
		STONE: '돌',
		WOODEN: '나무',
		TURTLE: '거북',
	},
	suffix: {
		SWORD: '검',
		PICKAXE: '곡괭이',
		AXE: '도끼',
		SHOVEL: '삽',
		HOE: '괭이',
		HELMET: '투구(모자)',
		CHESTPLATE: '흉갑(조끼)',
		LEGGINGS: '레깅스(바지)',
		BOOTS: '부츠(장화)',
	},
}

// item enchant rarity weight
const RARITY_WEIGHT: { [index: string]: number } = {
	mending: 1,
	silk_touch: 1,
	unbreaking: 0.7,
	efficiency: 0.5,
	fortune: 0.3,
	aqua_affinity: 1,
	respiration: 0.8,
	thorns: 0.8,
	protection: 0.5,
	projectile_protection: 0.7,
	fire_protection: 0.7,
	blast_protection: 0.7,
	swift_sneak: 0.6,
	feather_falling: 0.5,
	soul_speed: 0.6,
	depth_strider: 0.6,
	frost_walker: 0.7,
	fire_aspect: 0.7,
	looting: 0.3,
	knockback: 0.7,
	sweeping: 0.6,
	sharpness: 0.5,
	smite: 0.5,
	bane_of_arthropods: 0.6,
	cleaving: 0.6,
	power: 0.5,
	punch: 0.7,
	flame: 1,
	infinity: 1,
	lure: 0.3,
	luck_of_the_sea: 0.3,
	impaling: 0.6,
	channeling: 1,
	loyalty: 0.7,
	riptide: 0.6,
	quick_charge: 0.6,
	piercing: 0.5,
	multishot: 1,
}

// item enchant level weight
const LEVEL_WEIGHT = [
	1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.05, 0.01, 0.005, 0.001,
	0.0005, 0.0001,
]

// item enchant count weight (0 ~ 10)
const COUNT_WEIGHT = [0, 1, 1.1, 1.25, 1.5, 2, 2.5, 3, 3, 3, 3]

// valid enchant settings
const VALID_ENCHANTS: { [index: string]: string } = {
	unbreaking: '내구성',
	efficiency: '효율',
	fortune: '행운',
	respiration: '호흡',
	thorns: '가시',
	protection: '보호',
	projectile_protection: '발사체로부터 보호',
	fire_protection: '화염으로부터 보호',
	blast_protection: '폭발로부터 보호',
	swift_sneak: '신속한 잠행',
	feather_falling: '가벼운 착지',
	soul_speed: '영혼 가속',
	depth_strider: '물갈퀴',
	frost_walker: '차가운 걸음',
	fire_aspect: '발화',
	looting: '약탈',
	knockback: '밀치기',
	sweeping: '휩쓸기',
	sharpness: '날카로움',
	smite: '강타',
	bane_of_arthropods: '살충',
	cleaving: '쪼개기',
	power: '힘',
	punch: '밀어내기',
	lure: '미끼',
	luck_of_the_sea: '바다의 행운',
	impaling: '찌르기',
	loyalty: '충성',
	riptide: '급류',
	quick_charge: '빠른 장전',
	piercing: '관통',
	mending: '수선',
	silk_touch: '섬세한 손길',
	aqua_affinity: '친수성',
	flame: '화염',
	infinity: '무한',
	channeling: '집전',
	multishot: '다중 발사',
	binding_curse: '귀속 저주',
	vanishing_curse: '소실 저주',
}

// banned enchant list
const INVALID_ENCHANTS: Array<string> = [
	'mending',
	'silk_touch',
	'aqua_affinity',
	'flame',
	'infinity',
	'channeling',
	'multishot',
	'binding_curse',
	'vanishing_curse',
]

// enchant level labels
const ENCHANT_LEVEL: Array<string> = [
	'',
	'I',
	'II',
	'III',
	'IV',
	'V',
	'VI',
	'VII',
	'VIII',
	'IX',
	'X',
	'XI',
	'XII',
	'XIII',
	'XIV',
	'XV',
	'XVI',
	'XVII',
	'XVIII',
	'XIX',
	'XX',
]

// enchant min level
const ENCHANT_MIN_LEVEL: { [index: string]: number } = {
	mending: 1,
	silk_touch: 1,
	unbreaking: 3,
	efficiency: 5,
	fortune: 3,
	aqua_affinity: 1,
	respiration: 3,
	thorns: 3,
	protection: 4,
	projectile_protection: 4,
	fire_protection: 4,
	blast_protection: 4,
	swift_sneak: 3,
	feather_falling: 4,
	soul_speed: 3,
	depth_strider: 3,
	frost_walker: 2,
	fire_aspect: 2,
	looting: 3,
	knockback: 2,
	sweeping: 3,
	sharpness: 5,
	smite: 5,
	bane_of_arthropods: 5,
	cleaving: 3,
	power: 5,
	punch: 2,
	flame: 1,
	infinity: 1,
	lure: 3,
	luck_of_the_sea: 3,
	impaling: 5,
	channeling: 1,
	loyalty: 3,
	riptide: 3,
	quick_charge: 3,
	piercing: 4,
	multishot: 1,
}

// total enchant level setting
const TOTAL_ENCHANT_LEVEL: { [index: string]: number } = {
	min: 5,
	boost: 15,
}

// item repair cost limit(enchant panalty) settings
const REPAIR_COST_LIMIT: {
	material: { [index: string]: number }
	base: { [index: string]: number }
	other: { [index: string]: number }
} = {
	// material of the item
	material: {
		NETHERITE: 10,
		DIAMOND: 5,
		GOLDEN: 15,
		CHAINMAIL: 0,
		IRON: -5,
		STONE: -10,
		WOODEN: -15,
		TURTLE: 5,
	},
	// basic tools, weapons, armors
	base: {
		SWORD: 80,
		PICKAXE: 75,
		AXE: 75,
		SHOVEL: 65,
		HOE: 60,
		HELMET: 70,
		CHESTPLATE: 65,
		LEGGINGS: 65,
		BOOTS: 70,
	},
	// other items
	other: {
		BOW: 75,
		FISHING_ROD: 70,
		TRIDENT: 75,
		CROSSBOW: 75,
		SHEARS: 50,
		SHIELD: 50,
		ELYTRA: 50,
		FLINT_AND_STEEL: 45,
		CARROT_ON_A_STICK: 45,
	},
}

// exp item setting
const EXP_ITEMS: {
	[index: string]: any
} = {
	100: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC001',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '100exp',
		exp: 100,
	},
	500: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC002',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '500exp',
		exp: 500,
	},
	1000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC003',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '1,000exp',
		exp: 1000,
	},
	5000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC004',
		mat: 'AMETHYST_SHARD',
		keyword: '5,000exp',
		exp: 5000,
	},
	10000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC005',
		mat: 'AMETHYST_SHARD',
		keyword: '10,000exp',
		exp: 10000,
	},
	100000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC006',
		mat: 'NETHER_STAR',
		keyword: '100,000exp',
		exp: 100000,
	},
	1000000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC007',
		mat: 'END_CRYSTAL',
		keyword: '1,000,000exp',
		exp: 1000000,
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

// round under 100
function fixDigits(value: number): number {
	return Math.round(value / 100) * 100
}

// format currency with commas
function formatWithCommas(value: number | string): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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

	// replace color codesf
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

// stringify lore NBT object
function convertLore(lore: Array<string>): string {
	// stringify line by line
	const lines: Array<string> = []
	for (const line of lore) {
		lines.push(`'${line}'`)
	}

	// join every lines
	const joined = lines.join(',')

	// return result
	return `[${joined}]`
}

// stringify enchant object
function convertEnchantData(enchantData: ItemEnchantDataType): string {
	/*
		{
			id: "minecraft:" + enchantId,
			lvl: enchantLevel,
		}
	*/

	// convert each enchants
	const enchants: { id: string; lvl: number }[] = []
	for (const enchant in enchantData) {
		enchants.push({
			id: `minecraft:${enchant}`,
			lvl: enchantData[enchant],
		})
	}

	// return result
	return JSON.stringify(enchants)
}

// create enchantment lore
function createEnchantmentLore(enchantData: ItemEnchantDataType): string[] {
	// create enchant lore string
	const enchantLore: Array<string> = []
	for (const enchant in enchantData) {
		const levelStr = INVALID_ENCHANTS.includes(enchant) ? '' : ENCHANT_LEVEL[enchantData[enchant]]
		enchantLore.push(
			JSON.stringify([
				{
					text: `${VALID_ENCHANTS[enchant]} ${levelStr}`,
					color: enchant.includes('curse') ? 'red' : 'gray',
					italic: false,
				},
			])
		)
	}

	// add a blank line
	if (enchantLore.length > 0) {
		enchantLore.push(
			JSON.stringify([
				{
					text: '',
				},
			])
		)
	}

	// return result
	return enchantLore
}

// merge custom & enchant lores
function mergeLores(
	lore: Array<string>,
	enchantData: ItemEnchantDataType
): { lore: Array<string>; loreStarts: number } {
	// fix lore.slice is not a function
	let customLore: Array<string> = []
	customLore = customLore.concat(lore)

	// enchant lore
	const enchantLore = createEnchantmentLore(enchantData)

	// check item has custom lore
	const loreStarts = checkCustomLore(40)
	if (loreStarts === false) {
		if (lore?.length === 0) {
			// no custom lore
			return {
				lore: enchantLore,
				loreStarts: -1,
			}
		} else {
			// has custom lore
			return {
				lore: enchantLore.concat(customLore),
				loreStarts: enchantLore.length,
			}
		}
	}

	// custom lore
	if (typeof loreStarts === 'number') {
		customLore = customLore.slice(loreStarts)
	}

	// return merged lore
	return {
		lore: enchantLore.concat(customLore),
		loreStarts: enchantLore.length,
	}
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

// get item display name in player's off-hand
function getDisplayName(): string {
	// check slot
	if (!checkSlot(40)) return ''

	// return display name
	return BukkitPlayer.getInventory()
		.getItemInOffHand()
		.getItemMeta()
		.serialize()
		.get('display-name')
}

// get item lore in player's off-hand
function getLore(): Array<string> {
	// check slot
	if (!checkSlot(40)) return []

	// return lore
	return BukkitPlayer.getInventory().getItemInOffHand().getItemMeta().serialize().get('lore')
}

/**
  [ command utilities ] 
*/
// show title to player
function showTitle(title: TitleType | Array<TitleType>, playerName: string): boolean {
	// set command
	const command = `minecraft:title ${playerName} title ${JSON.stringify(title)}`

	// execute command
	return execConsoleCommand(command)
}

// show subtitle to player
function showSubtitle(subtitle: TitleType | Array<TitleType>, playerName: string): boolean {
	// set command
	const command = `minecraft:title ${playerName} subtitle ${JSON.stringify(subtitle)}`

	// execute command
	return execConsoleCommand(command)
}

// show title and subtitle to player
function playTitle(
	title: TitleType | Array<TitleType>,
	subtitle: TitleType | Array<TitleType>,
	playerName: string
): boolean {
	// set title
	showTitle(title, playerName)

	// set subtitle and show both to player
	return showSubtitle(subtitle, playerName)
}

// play sound effect to player (sound => entity.villager.yes (without minecraft:))
function playSound(sound: string, playerName: string, broadcast: boolean): boolean {
	// set target
	const target = broadcast ? '@a' : `${playerName}`

	// set command
	const command = `minecraft:execute at ${playerName} run playsound minecraft:${sound} voice ${target}`

	// execute command
	return execConsoleCommand(command)
}

// message to all players
function broadcastMessage(message: string): boolean {
	// set command
	const command = `broadcast ${essentialsColorString(message)}`

	// exec command
	return execConsoleCommand(command)
}

// replace target item (in player's off-hand)
function replaceItem(
	playerName: string,
	nbtData: ItemIntNBTDataType,
	displayData: DisplayDataType,
	enchantData?: ItemEnchantDataType
): boolean {
	// get integer nbt data
	const { Damage, RepairCost } = nbtData

	// get display data
	const { Name, Lore } = displayData

	// create new lore & custom nbt
	let newLore: Array<string> = []
	let customLoreNBT = ''
	if (typeof enchantData !== 'undefined') {
		// create merged lore
		const { lore: mergedLore, loreStarts } = mergeLores(Lore, enchantData)

		// merged lore
		newLore = mergedLore

		// custom lore nbt data
		customLoreNBT = `,customLore:${loreStarts}`
	} else {
		// only custom lore
		newLore = newLore.concat(Lore)
	}

	// get enchants after scroll applied
	const enchants =
		typeof enchantData !== 'undefined' ? `,Enchantments:${convertEnchantData(enchantData)}` : ''

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()

	// set command
	const command = `minecraft:item replace entity ${playerName} weapon.offhand with ${targetItem}{Damage:${Damage},RepairCost:${RepairCost},display:{Name:'${Name}',Lore:${convertLore(
		newLore
	)}}${enchants}${customLoreNBT},HideFlags:1}`

	// exec command
	return execConsoleCommand(command)
}

/**
  [ checkitem utilities ]
*/
// check any item exists (in specific slot)
function checkSlot(slot: number): boolean {
	// set placeholder
	const placeholder = `checkitem_inslot:${slot}`

	// return result
	return parsePlaceholder(placeholder) === 'yes'
}

// get item KR name (in specific slot)
function getKrName(slot: number): string {
	// get settings
	const { item, material, suffix } = ITEMS_LOCALE_KR

	// set placeholder
	const placeholder = `checkitem_getinfo:${slot}_mat:`

	// get item name(mat)
	const targetItem = parsePlaceholder(placeholder)

	// check item with no material info
	if (targetItem in item) return item[targetItem]

	// check material and suffix
	const [mat, suff] = targetItem.split('_')

	// return material and suffix
	return `${material[mat]} ${suffix[suff]}`
}

// check item is enchanted or not (in specific slot)
function isEnchanted(slot: number): boolean {
	// check enchanted
	const enchanted = parsePlaceholder(`checkitem_getinfo:${slot}_enchanted`)

	// return result
	return enchanted === 'true'
}

// get enchant data of target item (in specific slot)
function getEnchantData(slot: number): ItemEnchantDataType {
	// get raw enchant data
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_enchantments:`).split('|')

	// parse enchant data from raw data string
	const enchantData: ItemEnchantDataType = {}
	rawData.forEach((enchantStr) => {
		// split enchantments & level
		const [enchant, level] = enchantStr.replace('minecraft:', '').split(':')

		// store data
		enchantData[enchant] = parseInt(level)
	})

	// return enchant data
	return enchantData
}

// get integer nbt data of target item (in specific slot)
function getIntegerNBTData(slot: number): ItemIntNBTDataType {
	// get raw repair nbt data
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_nbtints:`)

	// default nbt data
	const nbtData: ItemIntNBTDataType = {
		Damage: 0,
		RepairCost: 0,
		customLore: false,
	}

	// split every single lines of nbt data
	const nbtDataArr = rawData.replace(/INTEGER:/g, '').split('|')
	nbtDataArr.forEach((nbtTag) => {
		// split label and value
		const [label, value] = nbtTag.split(':')

		// store data
		nbtData[label] = parseInt(value)
	})

	// return nbt data object
	return nbtData
}

// get damage of target item (in specific slot)
function getDamage(slot: number): number {
	// get integer nbt data
	const { Damage } = getIntegerNBTData(slot)

	// return repair cost
	return Damage
}

// get repair cost of target item (in specific slot)
function getRepairCost(slot: number): number {
	// get integer nbt data
	const { RepairCost } = getIntegerNBTData(slot)

	// return repair cost
	return RepairCost
}

// check if item has custom lore
function checkCustomLore(slot: number): number | boolean {
	// get integer nbt data
	const { customLore } = getIntegerNBTData(slot)

	// return result
	return typeof customLore !== 'undefined' ? customLore : false
}

// remove items in specific slot
function removeSlotItem(slot: number, amount?: number): boolean {
	// set placeholder
	const placeholder =
		typeof amount === 'undefined'
			? `checkitem_remove_inslot:${slot}`
			: `checkitem_remove_inslot:${slot},amt:${amount}`

	// remove item
	return parsePlaceholder(placeholder) === 'yes'
}

/**
  [ item evaluation utilities ]
*/
// get enchant level score
function getLevelWeight(level: number): number {
	// init weight
	let levelWeight = 0

	// get enchant level weight
	for (let i = 0; i <= level - 1; i++) {
		// acc to level weight (level 10000 - weight * 10000)
		levelWeight += 10000 - LEVEL_WEIGHT[i] * 10000
	}

	// return score (level 10000 - weight * 10000)
	return levelWeight
}

// get rarity score of enchant
function getRarityScore(enchant: string): number {
	// get rarity weight
	const rarityWeight = RARITY_WEIGHT[enchant]

	// return score (1 + (1 - rarityWeight))
	return 1 + (1 - rarityWeight)
}

// get total enhanced enchant level
function getTotalEnhancedLevel(enchantData: ItemEnchantDataType): number {
	// init level
	let totalLevel = 0

	// loop enchant data
	for (const enchant in enchantData) {
		// get enchant level
		const level = enchantData[enchant]

		// acc to total level
		if (!enchant.includes('curse')) {
			// get min level of enchant
			const minLevel = ENCHANT_MIN_LEVEL[enchant]

			totalLevel += level - minLevel
		}
	}

	// return total level
	return totalLevel
}

// get total enchant level
function getTotalEnchantLevel(enchantData: ItemEnchantDataType): number {
	// init level
	let totalLevel = 0

	// loop enchant data
	for (const enchant in enchantData) {
		// get enchant level
		const level = enchantData[enchant]

		// acc to total level
		if (!enchant.includes('curse')) {
			totalLevel += level
		}
	}

	// return total level
	return totalLevel
}

// get enchant score
function getEnchantScore(enchantData: ItemEnchantDataType): number {
	// score init
	let enchantScore = 0

	// get number of enchants applied to item
	const enchantsCount = Object.keys(enchantData).length

	// get enchant count weight
	const enchantCountWeight = COUNT_WEIGHT[enchantsCount]

	// loop enchant data
	for (const enchant in enchantData) {
		// get enchant level
		const level = enchantData[enchant]

		// get enchant rarity score
		const rarityScore = getRarityScore(enchant)

		// get level score
		const levelScore = Math.floor(getLevelWeight(level) * rarityScore)

		// acc to score
		enchantScore += levelScore
	}

	// get total enchant level
	const totalLevel = getTotalEnhancedLevel(enchantData)

	// check total level
	if (totalLevel <= TOTAL_ENCHANT_LEVEL.boost) {
		// return score
		return Math.floor(enchantScore * enchantCountWeight * (totalLevel / 2))
	}

	// return score
	return Math.floor(enchantScore * enchantCountWeight * totalLevel)
}

// get repair cost limit of target item
function getItemCostLimit(targetItem: string): number {
	// get repair cost limit settings
	const { base, material, other } = REPAIR_COST_LIMIT

	// check other limit first
	if (targetItem in other) return other[targetItem]

	// check base & material limit
	const [mat, item] = targetItem.split('_')

	// calc limit
	const limit = base[item] + material[mat]

	// return repair cost limit
	return limit
}

// get item repair cost score
function getRepairCostScore(itemCost: number, costLimit: number): number {
	// remaining cost
	const remainingCost = costLimit - itemCost

	// check remaining cost
	if (remainingCost > costLimit / 2) {
		// return score
		return 1
	}

	// return score
	return 0.8
}

// evaluate price of the item
function evaluateItemPrice(isPlus: boolean): number {
	// get current repair cost
	const repairCost = getRepairCost(40)

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// get repair cost limit
	const repairCostLimit = getItemCostLimit(targetItem)

	// calc repair cost score
	const repairCostScore = getRepairCostScore(repairCost, repairCostLimit)

	// get enchant data
	const enchantData = getEnchantData(40)

	// calc enchant score
	const enchantScore = getEnchantScore(enchantData)

	const offset = isPlus ? 1 + PLUS_PRICE_OFFSET : 1

	// evaluated price
	const price = enchantScore * repairCostScore * offset

	// return price
	return price
}

// give calculated exp item to player
function getExpItemAmount(balance: number): { [index: string]: number } {
	// exp item values
	const itemAmounts: {
		[index: string]: number
	} = {
		'1000000': 0,
		'100000': 0,
		'10000': 0,
		'5000': 0,
		'1000': 0,
		'500': 0,
		'100': 0,
	}
	const itemKeys = Object.keys(itemAmounts).sort(
		(a: string, b: string) => parseInt(b) - parseInt(a)
	)

	// check amount of each items
	let rest = balance
	for (const v of itemKeys) {
		itemAmounts[v] += Math.floor(rest / parseInt(v))
		rest = rest % parseInt(v)
	}

	// return amount of specific item
	return itemAmounts
}

// give exp items to player
function giveExp(items: { [index: string]: number }): boolean {
	// exp items
	const expItems: {
		[index: string]: string
	} = {
		'100': 'exp_filled_bottle_100',
		'500': 'exp_filled_bottle_500',
		'1000': 'exp_filled_bottle_1000',
		'5000': 'exp_filled_crystal_5000',
		'10000': 'exp_filled_crystal_10000',
		'100000': 'exp_filled_starlight_100000',
		'1000000': 'exp_filled_starlight_1000000',
	}

	// give each item to player
	for (const item in items) {
		// item id
		const itemId = expItems[item]

		// item amount
		const amount = items[item]

		// check amount is 0
		if (amount > 0) {
			// set max amount per command
			const max = 100

			// check amount
			for (let i = Math.floor(amount / max); i >= 0; i--) {
				// set amount for this command
				const cnt = i > 0 ? max : amount % max

				// create command
				const command = `ei give ${PLAYER_NAME} ${itemId} ${cnt}`

				// execute command
				execConsoleCommand(command)
			}
		}
	}

	// return success ack
	return true
}

/**
  [ action handler ] 
*/
// check total enchant level of item
function checkEnchantLevel(args: string[]): ReturnDataType {
	// get args
	const [, returnType] = args

	// get enchant data
	const enchantData = getEnchantData(40)

	// get total enchant level
	const totalLevel = getTotalEnhancedLevel(enchantData)

	// return data
	return TOTAL_ENCHANT_LEVEL.min <= totalLevel
}

// evaludate item enchant price
function evaluatePrice(args: string[]): ReturnDataType {
	// get args
	const [, returnType, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// evaluate item price
	const price = evaluateItemPrice(checkPlus)

	// check return type
	if (returnType === '1') return formatWithCommas(fixDigits(price))
	if (returnType === '2') {
		// set message
		const message = `&7[&6감정&7] &f감정 결과 &a&l&n아이템의 가치&f는 &b&l${formatWithCommas(
			fixDigits(price)
		)}&7exp &f입니다.`

		// send message
		sendMessage(consoleColorString(message))

		// return for ei
		return 1
	}

	// return evaluated price
	return price
}

// sell item at the evaluated price
function sellItem(args: string[]): ReturnDataType {
	// get args
	const [, returnType, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get item's name
	const krName = getKrName(40)

	// evaluate item price
	const price = evaluateItemPrice(checkPlus)

	// caclutate amount of items
	const items = getExpItemAmount(price)

	// give exp to player
	giveExp(items)

	// remove sold item
	if (!removeSlotItem(40, 1)) {
		return 0
	}

	// check if the price of item is mroe than BROADCAST_PRICE
	if (price >= BROADCAST_PRICE) {
		// play sound effect
		playSound('ui.toast.challenge_complete', PLAYER_NAME, true)

		// set message
		const message = `&b&l${PLAYER_NAME}&f님이 &a&l&n${krName}&f을(를) &b&l${formatWithCommas(
			fixDigits(price)
		)}&7exp&f에 &c&l판매&f했습니다.`

		// broadcast message
		broadcastMessage(message)
	} else {
		// play sound effect
		playSound('entity.villager.celebrate', PLAYER_NAME, false)

		// set message
		const message = `&7[&6감정&7] &a&l&n${krName}&f을(를) &b&l${formatWithCommas(
			fixDigits(price)
		)}&7exp&f에 &c&l판매&f했습니다.`

		// send message
		sendMessage(consoleColorString(message))
	}

	// return for ei
	return 1
}

// placeholder controller
function itemEvaluationCore(): string {
	// action result
	let result: any = false

	// get args
	const [action] = args

	// command(placeholder) settings
	const VALID_COMMANDS: { [index: string]: CommandObjectType } = {
		checkEnchantLevel: {
			argLen: [2],
			callback: checkEnchantLevel,
		},
		evaluatePrice: {
			argLen: [3],
			callback: evaluatePrice,
		},
		sellItem: {
			argLen: [3],
			callback: sellItem,
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

itemEvaluationCore()

export {}
