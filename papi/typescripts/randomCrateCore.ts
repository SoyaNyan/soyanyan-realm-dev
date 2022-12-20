/**
 * Author: SOYANYAN (소야냥)
 * Name: randomCrateCore.ts
 * Version: v1.0.2
 * Last Update: 2022-12-19
 *
 * TypeScript Version: v4.9.4
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
	contents: CrateContentType[]
}

type CratePrizeSettingType = {
	[index: string]: CrateContentType
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

// crate prize type
const PRIZE_SETTINGS: CratePrizeSettingType = {
	none: {
		name: '&c꽝',
		prob: 0,
		itemCode: 'none',
		quantity: 0,
		isEI: false,
		broadcast: false,
	},
	coal: {
		name: '§8석탄',
		prob: 0,
		itemCode: 'coal',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	copper: {
		name: '&e구리 주괴',
		prob: 0,
		itemCode: 'copper_ingot',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	iron_ingot: {
		name: '&7철 주괴',
		prob: 0,
		itemCode: 'iron_ingot',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	gold_ingot: {
		name: '&6금 주괴',
		prob: 0,
		itemCode: 'gold_ingot',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	emerald: {
		name: '&a에메랄드',
		prob: 0,
		itemCode: 'emerald',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	diamond: {
		name: '§b다이아몬드',
		prob: 0,
		itemCode: 'diamond',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	netherite_ingot: {
		name: '§5네더라이트 주괴',
		prob: 0,
		itemCode: 'netherite_ingot',
		quantity: 1,
		isEI: false,
		broadcast: false,
	},
	costReducerLow: {
		name: '&7[#55CBCD ★ &7] #55CBCD&l희미한 #FFFFB5&l정화의 #ECEAE4&l가루',
		prob: 0,
		itemCode: 'costReducerLow',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	costReducerMedium: {
		name: '&7[#55CBCD ★★ &7] #55CBCD&l선명한 #FFFFB5&l정화의 #ECEAE4&l가루',
		prob: 0,
		itemCode: 'costReducerMedium',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	costReducerHigh: {
		name: '&7[#55CBCD ★★★ &7] #55CBCD&l반짝이는 #FFFFB5&l정화의 #ECEAE4&l가루',
		prob: 0,
		itemCode: 'costReducerHigh',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	enchantEssenceLow: {
		name: '&7[#55CBCD ★ &7] #ECEAE4&l미약한 #FF968A&l인챈트 #FFC8A2&l에센스',
		prob: 0,
		itemCode: 'enchantEssenceLow',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	enchantEssenceMedium: {
		name: '&7[#55CBCD ★★ &7] #ECEAE4&l쓸만한 #FF968A&l인챈트 #FFC8A2&l에센스',
		prob: 0,
		itemCode: 'enchantEssenceMedium',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	enchantEssenceHigh: {
		name: '&7[#55CBCD ★★★ &7] #ECEAE4&l강력한 #FF968A&l인챈트 #FFC8A2&l에센스',
		prob: 0,
		itemCode: 'enchantEssenceHigh',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	enchantProtectScroll: {
		name: '&7[#55CBCD ★★★ &7] #ECD5E3&l아이템 #FFFFB5&l프로텍트 #ECEAE4&l스크롤',
		prob: 0,
		itemCode: 'enchantProtectScroll',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	armorScrollRecipe: {
		name: '&7[#FFC8A2 ★ &7] #ECEAE4&l방어구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'armorScrollRecipe',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	armorScrollRecipePlus: {
		name: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l방어구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'armorScrollRecipePlus',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	randomScrollRecipe: {
		name: '&7[#FFC8A2 ★ &7] #ECEAE4&l혼돈의 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'randomScrollRecipe',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	randomScrollRecipePlus: {
		name: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l혼돈의 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'randomScrollRecipePlus',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	toolScrollRecipe: {
		name: '&7[#FFC8A2 ★ &7] #ECEAE4&l도구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'toolScrollRecipe',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	toolScrollRecipePlus: {
		name: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l도구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'toolScrollRecipePlus',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	weaponScrollRecipe: {
		name: '&7[#FFC8A2 ★ &7] #ECEAE4&l무기 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'weaponScrollRecipe',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	weaponScrollRecipePlus: {
		name: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l무기 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		prob: 0,
		itemCode: 'weaponScrollRecipePlus',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	hardPaper: {
		name: '&6&l가공된 &f&l종이',
		prob: 0,
		itemCode: 'hardPaper',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	softPaper: {
		name: '#CCE2CB&l매끄러운 #ECEAE4&l종이',
		prob: 0,
		itemCode: 'softPaper',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	magicPaper: {
		name: '#55CBCD&l신비로운 #ECEAE4&l종이',
		prob: 0,
		itemCode: 'magicPaper',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	holyPaper: {
		name: '#F3B0C3&l성스러운 #ECEAE4&l종이',
		prob: 0,
		itemCode: 'holyPaper',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	magicInk: {
		name: '&6&l마법의 &7&l잉크',
		prob: 0,
		itemCode: 'magicInk',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	itemEvaluator: {
		name: '&7[#FFC8A2 ★★ &7] #FFFFB5&l아이템 #ECEAE4&l감정서',
		prob: 0,
		itemCode: 'itemEvaluator',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
	itemEvaluatorPlus: {
		name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l화려한 #FFFFB5&l아이템 #ECEAE4&l감정서',
		prob: 0,
		itemCode: 'itemEvaluatorPlus',
		quantity: 1,
		isEI: true,
		broadcast: false,
	},
}

// crate settings
const CRATE_SETTINGS: CrateSettingType = {
	randomBox01: {
		name: '#FCB9A9&l두#FDCCB5&l근#FCB9A9&l두#FDCCB5&l근 #FFFFB5&l랜덤 #ECEAE4&l박스',
		contents: [
			{
				...PRIZE_SETTINGS.costReducerHigh,
				prob: 1,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.costReducerMedium,
				prob: 2,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.enchantProtectScroll,
				prob: 5,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.randomScrollRecipePlus,
				prob: 5,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.randomScrollRecipe,
				prob: 7,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.costReducerLow,
				prob: 15,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.toolScrollRecipe,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.weaponScrollRecipe,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.armorScrollRecipe,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.netherite_ingot,
				prob: 25,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.magicInk,
				prob: 25,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.holyPaper,
				prob: 25,
				quantity: 1,
			},
		],
	},
	randomBox02: {
		name: '#D4F0F1&l행#BDDEDF&l운#D4F0F1&l가#BDDEDF&l득 #FFFFB5&l랜덤 #ECEAE4&l박스',
		contents: [
			{
				...PRIZE_SETTINGS.enchantEssenceHigh,
				prob: 1,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.enchantEssenceMedium,
				prob: 2,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.enchantEssenceLow,
				prob: 5,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.randomScrollRecipePlus,
				prob: 5,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.enchantProtectScroll,
				prob: 7,
				quantity: 1,
				broadcast: true,
			},
			{
				...PRIZE_SETTINGS.randomScrollRecipe,
				prob: 15,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.toolScrollRecipePlus,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.weaponScrollRecipePlus,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.armorScrollRecipePlus,
				prob: 20,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.netherite_ingot,
				prob: 25,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.magicInk,
				prob: 25,
				quantity: 1,
			},
			{
				...PRIZE_SETTINGS.holyPaper,
				prob: 25,
				quantity: 1,
			},
		],
	},
}

// title & subtitle settings
const CRATE_TITLE_SETTINGS: TitleSettingType = {
	randomBox01: {
		title: [
			{ text: '두', color: '#FCB9A9', bold: true },
			{ text: '근', color: '#FDCCB5', bold: true },
			{ text: '두', color: '#FCB9A9', bold: true },
			{ text: '근', color: '#FDCCB5', bold: true },
			{ text: ' ' },
			{ text: '랜덤', color: '#F6EAC2', bold: true },
			{ text: ' ' },
			{ text: '박스', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
	randomBox02: {
		title: [
			{ text: '행', color: '#D4F0F1', bold: true },
			{ text: '운', color: '#BDDEDF', bold: true },
			{ text: '가', color: '#D4F0F1', bold: true },
			{ text: '득', color: '#BDDEDF', bold: true },
			{ text: ' ' },
			{ text: '랜덤', color: '#F6EAC2', bold: true },
			{ text: ' ' },
			{ text: '박스', color: '#ECEAE4', bold: true },
		],
		subtitle: [],
	},
}

const PRIZE_TITLE_SETTINGS: TitleSettingType = {
	none: {
		title: [],
		subtitle: [{ text: '꽝...', color: 'red', bold: true }],
	},
	coal: {
		title: [],
		subtitle: [
			{ text: '석탄', color: 'dark_gray', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	copper_ingot: {
		title: [],
		subtitle: [
			{ text: '구리 주괴', color: 'yellow', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	iron_ingot: {
		title: [],
		subtitle: [
			{ text: '철 주괴', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	gold_ingot: {
		title: [],
		subtitle: [
			{ text: '금 주괴', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	emerald: {
		title: [],
		subtitle: [
			{ text: '에메랄드', color: 'green', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	diamond: {
		title: [],
		subtitle: [
			{ text: '다이아몬드', color: 'aqua', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	netherite_ingot: {
		title: [],
		subtitle: [
			{ text: '네더라이트 주괴', color: 'dark_purple', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	costReducerLow: {
		title: [],
		subtitle: [
			{ text: '희미한', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	costReducerMedium: {
		title: [],
		subtitle: [
			{ text: '선명한', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	costReducerHigh: {
		title: [],
		subtitle: [
			{ text: '반짝이는', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '정화의', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '가루', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	enchantEssenceLow: {
		title: [],
		subtitle: [
			{ text: '미약한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	enchantEssenceMedium: {
		title: [],
		subtitle: [
			{ text: '쓸만한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	enchantEssenceHigh: {
		title: [],
		subtitle: [
			{ text: '강력한', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '인챈트', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '에센스', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	enchantProtectScroll: {
		title: [],
		subtitle: [
			{ text: '아이템', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '프로텍트', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '스크롤', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	armorScrollRecipe: {
		title: [],
		subtitle: [
			{ text: '방어구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	armorScrollRecipePlus: {
		title: [],
		subtitle: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '방어구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	randomScrollRecipe: {
		title: [],
		subtitle: [
			{ text: '혼돈의 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	randomScrollRecipePlus: {
		title: [],
		subtitle: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '혼돈의 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	toolScrollRecipe: {
		title: [],
		subtitle: [
			{ text: '도구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
		],
	},
	toolScrollRecipePlus: {
		title: [],
		subtitle: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '도구 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	weaponScrollRecipe: {
		title: [],
		subtitle: [
			{ text: '무기 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	weaponScrollRecipePlus: {
		title: [],
		subtitle: [
			{ text: '놀라운', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '무기 주문서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: '제작', color: '#FF968A', bold: true },
			{ text: ' ' },
			{ text: '레시피', color: '#FFC8A2', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	hardPaper: {
		title: [],
		subtitle: [
			{ text: '매끄러운', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: '종이', color: 'white', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	softPaper: {
		title: [],
		subtitle: [
			{ text: '매끄러운', color: '#CCE2CB', bold: true },
			{ text: ' ' },
			{ text: '종이', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	magicPaper: {
		title: [],
		subtitle: [
			{ text: '신비로운', color: '#55CBCD', bold: true },
			{ text: ' ' },
			{ text: '종이', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	holyPaper: {
		title: [],
		subtitle: [
			{ text: '성스러운', color: '#F3B0C3', bold: true },
			{ text: ' ' },
			{ text: '종이', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	magicInk: {
		title: [],
		subtitle: [
			{ text: '마법의', color: 'gold', bold: true },
			{ text: ' ' },
			{ text: '잉크', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	itemEvaluator: {
		title: [],
		subtitle: [
			{ text: '아이템', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '감정서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
	},
	itemEvaluatorPlus: {
		title: [],
		subtitle: [
			{ text: '화려한', color: '#ECD5E3', bold: true },
			{ text: ' ' },
			{ text: '아이템', color: '#FFFFB5', bold: true },
			{ text: ' ' },
			{ text: '감정서', color: '#ECEAE4', bold: true },
			{ text: ' ' },
			{ text: 'x', color: 'gray', bold: true },
			{ text: ' ' },
			{ text: '1', color: 'white', bold: true },
		],
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
		subtitle: [{ text: '' }],
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
// give crate prize
function givePrize(args: string[]): ReturnDataType {
	// get args
	const [, returnType, crate] = args

	// get crate settings
	const { name: crateName } = CRATE_SETTINGS[crate]

	// send use message
	const itemMessage = `&7[#ECEAE4랜덤박스&7] ${crateName}(을)를 사용했습니다.`
	sendMessage(consoleColorString(itemMessage))

	// pick random item
	const { name: itemName, itemCode, quantity, isEI, broadcast } = pickRandomItem(crate)

	// get prize title settings
	const { title } = CRATE_TITLE_SETTINGS[crate]
	const { subtitle } = PRIZE_TITLE_SETTINGS[itemCode]

	// adjust item quantity in subtitle text
	const prizeSubtitle = [...(subtitle as TitleDataType[])]
	prizeSubtitle[prizeSubtitle.length - 1].text = stringify(quantity)

	// set title times
	setTitleTimes(0, 60, 0, PLAYER_NAME)

	// show title
	playTitle(title, subtitle, PLAYER_NAME)

	// play sound effect
	itemCode === 'none'
		? playSound('entity.villager.no', PLAYER_NAME)
		: broadcast
		? playSound('ui.toast.challenge_complete', PLAYER_NAME)
		: playSound('entity.villager.celebrate', PLAYER_NAME)

	// give item to player
	if (itemCode !== 'none') {
		giveItem(itemCode, quantity, isEI, PLAYER_NAME)
	}

	// broadcast message
	if (broadcast) {
		const message = `&b&l${PLAYER_NAME} &f님이 ${crateName}&7에서 ${itemName} &7x &6${quantity} &f를 획득했습니다!`
		broadcastMessage(consoleColorString(message))
	}

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
