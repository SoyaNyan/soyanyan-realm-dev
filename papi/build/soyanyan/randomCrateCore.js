/**
 * Author: SOYANYAN (소야냥)
 * Name: randomCrateCore.js
 * Version: v1.1.0
 * Last Update: 2023-11-18
 *
 * TypeScript Version: v5.2.2
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i]
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
				}
				return t
			}
		return __assign.apply(this, arguments)
	}
var __spreadArray =
	(this && this.__spreadArray) ||
	function (to, from, pack) {
		if (pack || arguments.length === 2)
			for (var i = 0, l = from.length, ar; i < l; i++) {
				if (ar || !(i in from)) {
					if (!ar) ar = Array.prototype.slice.call(from, 0, i)
					ar[i] = from[i]
				}
			}
		return to.concat(ar || Array.prototype.slice.call(from))
	}
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (callback, thisArg) {
		if (!callback || typeof callback !== 'function') throw TypeError()
		var size = this.length
		var that = thisArg || this
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
var PLAYER_NAME = '%player_name%'
var PRIZE_SETTINGS = {
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
var CRATE_SETTINGS = {
	randomBox01: {
		name: '#FCB9A9&l두#FDCCB5&l근#FCB9A9&l두#FDCCB5&l근 #FFFFB5&l랜덤 #ECEAE4&l박스',
		contents: [
			__assign(__assign({}, PRIZE_SETTINGS.costReducerHigh), {
				prob: 1,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.costReducerMedium), {
				prob: 2,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.enchantProtectScroll), {
				prob: 5,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.randomScrollRecipePlus), {
				prob: 5,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.randomScrollRecipe), { prob: 10, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.costReducerLow), { prob: 20, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.toolScrollRecipe), { prob: 40, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.weaponScrollRecipe), { prob: 40, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.armorScrollRecipe), { prob: 40, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.netherite_ingot), { prob: 37, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.magicInk), { prob: 50, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.holyPaper), { prob: 50, quantity: 1 }),
		],
	},
	randomBox02: {
		name: '#D4F0F1&l행#BDDEDF&l운#D4F0F1&l가#BDDEDF&l득 #FFFFB5&l랜덤 #ECEAE4&l박스',
		contents: [
			__assign(__assign({}, PRIZE_SETTINGS.enchantEssenceHigh), {
				prob: 1,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.enchantEssenceMedium), {
				prob: 2,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.enchantEssenceLow), {
				prob: 5,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.enchantProtectScroll), {
				prob: 10,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.randomScrollRecipePlus), {
				prob: 10,
				quantity: 1,
				broadcast: true,
			}),
			__assign(__assign({}, PRIZE_SETTINGS.randomScrollRecipe), { prob: 32, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.toolScrollRecipePlus), { prob: 80, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.armorScrollRecipePlus), { prob: 80, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.weaponScrollRecipePlus), { prob: 80, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.netherite_ingot), { prob: 100, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.magicInk), { prob: 100, quantity: 1 }),
			__assign(__assign({}, PRIZE_SETTINGS.holyPaper), { prob: 100, quantity: 1 }),
		],
	},
}
var CRATE_TITLE_SETTINGS = {
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
var PRIZE_TITLE_SETTINGS = {
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
var MESSAGE_TITLE_SETTINGS = {
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
function exists(path) {
	return Data.exists(path)
}
function get(path) {
	var result
	if (path.length > 0) {
		if (!exists(path)) return false
		result = Data.get(path)
	} else {
		result = Data.getData()
	}
	return result
}
function set(path, payload) {
	if (exists(path)) {
		return update(path, payload)
	}
	Data.set(path, payload)
	save()
	return true
}
function update(path, payload) {
	if (!exists(path)) {
		return set(path, payload)
	}
	Data.set(path, payload)
	save()
	return true
}
function remove(path) {
	if (!exists(path)) return false
	Data.remove(path)
	save()
	return true
}
function clear() {
	Data.clear()
	save()
	return true
}
function save() {
	Placeholder.saveData()
}
function stringify(data) {
	return ''.concat(data)
}
function encodeBoolean(data) {
	return data ? '1' : '0'
}
function essentialsColorString(targetStr) {
	var converted = translateHexCodes(targetStr, false)
	return converted
}
function consoleColorString(targetStr) {
	var converted = translateHexCodes(targetStr.replace(/&/g, '§'), true)
	return converted
}
function translateHexCodes(targetStr, isConsole) {
	var regex = /#[a-f0-9]{6}/gi
	var matches = targetStr.match(regex)
	if (matches === null) return targetStr
	var converted = targetStr
	for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
		var match = matches_1[_i]
		var color = match
		if (isConsole) {
			var hexCodeArray = color.split('')
			for (var i = 0; i < hexCodeArray.length; i++) {
				hexCodeArray[i] = '\u00A7'.concat(hexCodeArray[i])
			}
			var hexCode = '\u00A7x'.concat(hexCodeArray.join(''))
			converted = converted.replace(color, hexCode)
		}
		if (!isConsole) {
			converted = converted.replace(color, '&'.concat(color))
		}
	}
	return converted
}
function removeColorCodes(text) {
	var regex = /#[a-f0-9]{6}|&[0-9A-FK-OR]/gi
	return text.replace(regex, '')
}
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
function getVersion() {
	var version = BukkitServer.getVersion()
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
	return -1
}
function checkPlus16() {
	var version = getVersion()
	var checkVersion = version >= 16
	return checkVersion
}
function execConsoleCommand(command) {
	if (typeof command === 'undefined' || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}
function execCommand(command) {
	if (typeof command === 'undefined' || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}
function sendMessage(message) {
	if (typeof message === 'undefined' || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}
function logConsole(message) {
	if (typeof message === 'undefined' || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
}
function setTitleTimes(fadeIn, stay, fadeOut, playerName) {
	var command = 'minecraft:title '
		.concat(playerName, ' times ')
		.concat(fadeIn, ' ')
		.concat(stay, ' ')
		.concat(fadeOut)
	return execConsoleCommand(command)
}
function showTitle(title, playerName) {
	var command = 'minecraft:title '.concat(playerName, ' title ').concat(JSON.stringify(title))
	return execConsoleCommand(command)
}
function showSubtitle(subtitle, playerName) {
	var command = 'minecraft:title '.concat(playerName, ' subtitle ').concat(JSON.stringify(subtitle))
	return execConsoleCommand(command)
}
function playTitle(title, subtitle, playerName) {
	showTitle(title, playerName)
	return showSubtitle(subtitle, playerName)
}
function playSound(sound, playerName) {
	var command = 'minecraft:execute at '
		.concat(playerName, ' run playsound minecraft:')
		.concat(sound, ' voice ')
		.concat(playerName)
	return execConsoleCommand(command)
}
function broadcastMessage(message) {
	var command = 'broadcast '.concat(essentialsColorString(message))
	return execConsoleCommand(command)
}
function giveItem(item, quantity, isEI, playerName) {
	var command = isEI
		? 'ei give '.concat(playerName, ' ').concat(item, ' ').concat(quantity)
		: 'minecraft:give '.concat(playerName, ' minecraft:').concat(item, ' ').concat(quantity)
	return execConsoleCommand(command)
}
function pickRandomItem(crate) {
	var contents = CRATE_SETTINGS[crate].contents
	var distribution = contents
		.map(function (v) {
			return v.prob
		})
		.map(
			(function (sum) {
				return function (value) {
					return (sum += value)
				}
			})(0)
		)
	var random = Math.floor(Math.random() * distribution[distribution.length - 1] + 1)
	return contents[
		distribution.findIndex(function (value) {
			return random <= value
		})
	]
}
function givePrize(args) {
	var returnType = args[1],
		crate = args[2]
	var crateName = CRATE_SETTINGS[crate].name
	var itemMessage = '&7[#ECEAE4\uB79C\uB364\uBC15\uC2A4&7] '.concat(
		crateName,
		'(\uC744)\uB97C \uC0AC\uC6A9\uD588\uC2B5\uB2C8\uB2E4.'
	)
	sendMessage(consoleColorString(itemMessage))
	var _a = pickRandomItem(crate),
		itemName = _a.name,
		itemCode = _a.itemCode,
		quantity = _a.quantity,
		isEI = _a.isEI,
		broadcast = _a.broadcast
	var title = CRATE_TITLE_SETTINGS[crate].title
	var subtitle = PRIZE_TITLE_SETTINGS[itemCode].subtitle
	var prizeSubtitle = __spreadArray([], subtitle, true)
	prizeSubtitle[prizeSubtitle.length - 1].text = stringify(quantity)
	setTitleTimes(0, 60, 0, PLAYER_NAME)
	playTitle(title, subtitle, PLAYER_NAME)
	itemCode === 'none'
		? playSound('entity.villager.no', PLAYER_NAME)
		: broadcast
		? playSound('ui.toast.challenge_complete', PLAYER_NAME)
		: playSound('entity.villager.celebrate', PLAYER_NAME)
	if (itemCode !== 'none') {
		giveItem(itemCode, quantity, isEI, PLAYER_NAME)
	}
	if (broadcast) {
		var message = '&b&l'
			.concat(PLAYER_NAME, ' &f\uB2D8\uC774 ')
			.concat(crateName, '&7\uC5D0\uC11C ')
			.concat(itemName, ' &7x &6')
			.concat(quantity, ' &f\uB97C \uD68D\uB4DD\uD588\uC2B5\uB2C8\uB2E4!')
		broadcastMessage(consoleColorString(message))
	}
	logConsole(
		removeColorCodes(
			'[\uB79C\uB364\uBC15\uC2A4\uB85C\uADF8]'
				.concat(PLAYER_NAME, '|')
				.concat(crate, '|')
				.concat(crateName, '|')
				.concat(itemCode, '|')
				.concat(itemName, '|')
				.concat(quantity, '|')
		)
	)
	return 1
}
function randomCrateCore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
		givePrize: {
			argLen: [3],
			callback: givePrize,
		},
	}
	if (!(action in VALID_COMMANDS)) return 'false'
	var _a = VALID_COMMANDS[action],
		argLen = _a.argLen,
		callback = _a.callback
	var isValidArgs = argLen.some(function (len) {
		return args.length === len
	})
	if (!isValidArgs) return 'false'
	result = callback(args)
	return stringify(result)
}
randomCrateCore()
