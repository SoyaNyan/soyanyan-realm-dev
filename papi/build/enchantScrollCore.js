/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollCore.ts
 * Version: v1.1.0
 * Last Update: 2022-06-09
 *
 * TypeScript Version: v4.7.2
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
/**
[ polyfill ]
*/
// String.prototype.includes
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
		if (typeof start !== 'number') start = 0
		if (start + search.length > this.length) return false
		return this.indexOf(search, start) !== -1
	}
}
// Array.prototype.includes
if (!Array.prototype.includes) {
	Array.prototype.includes = function (searchElement, fromIndex) {
		function sameValueZero(x, y) {
			return x === y
		}
		var arr = Object(this)
		if (typeof fromIndex !== 'number') fromIndex = 0
		if (arr.length === 0) return false
		var start = Math.max(fromIndex >= 0 ? fromIndex : arr.length - Math.abs(fromIndex), 0)
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
var PLAYER_NAME = '%player_name%'
var VALID_ENCHANTS = {
	unbreaking: {
		suffixes: [
			'_PICKAXE',
			'_AXE',
			'_SHOVEL',
			'_HOE',
			'_HELMET',
			'_CHESTPLATE',
			'_LEGGINGS',
			'_BOOTS',
			'_SWORD',
		],
		items: [
			'BOW',
			'FISHING_ROD',
			'TRIDENT',
			'CROSSBOW',
			'SHEARS',
			'SHIELD',
			'ELYTRA',
			'FLINT_AND_STEEL',
			'CARROT_ON_A_STICK',
		],
		krName: '내구',
	},
	efficiency: {
		suffixes: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		items: ['SHEARS'],
		krName: '효율',
	},
	fortune: {
		suffixes: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		items: [],
		krName: '행운',
	},
	respiration: {
		suffixes: ['_HELMET'],
		items: [],
		krName: '호흡',
	},
	thorns: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
		krName: '가시',
	},
	protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
		krName: '보호',
	},
	projectile_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
		krName: '발사체로부터 보호',
	},
	fire_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
		krName: '화염으로부터 보호',
	},
	blast_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
		krName: '폭발로부터 보호',
	},
	swift_sneak: {
		suffixes: ['_LEGGINGS'],
		items: [],
		krName: '신속한 잠행',
	},
	feather_falling: {
		suffixes: ['_BOOTS'],
		items: [],
		krName: '가벼운 착지',
	},
	soul_speed: {
		suffixes: ['_BOOTS'],
		items: [],
		krName: '영혼 가속',
	},
	depth_strider: {
		suffixes: ['_BOOTS'],
		items: [],
		krName: '물갈퀴',
	},
	frost_walker: {
		suffixes: ['_BOOTS'],
		items: [],
		krName: '차가운 걸음',
	},
	fire_aspect: {
		suffixes: ['_SWORD'],
		items: [],
		krName: '발화',
	},
	looting: {
		suffixes: ['_SWORD'],
		items: [],
		krName: '약탈',
	},
	knockback: {
		suffixes: ['_SWORD'],
		items: [],
		krName: '밀치기',
	},
	sweeping: {
		suffixes: ['_SWORD'],
		items: [],
		krName: '휩쓸기',
	},
	sharpness: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
		krName: '날카로움',
	},
	smite: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
		krName: '강타',
	},
	bane_of_arthropods: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
		krName: '살충',
	},
	cleaving: {
		suffixes: ['_AXE'],
		items: [],
		krName: '쪼개기',
	},
	power: {
		suffixes: [],
		items: ['BOW'],
		krName: '힘',
	},
	punch: {
		suffixes: [],
		items: ['BOW'],
		krName: '밀어내기',
	},
	lure: {
		suffixes: [],
		items: ['FISHING_ROD'],
		krName: '미끼',
	},
	luck_of_the_sea: {
		suffixes: [],
		items: ['FISHING_ROD'],
		krName: '바다의 행운',
	},
	impaling: {
		suffixes: [],
		items: ['TRIDENT'],
		krName: '찌르기',
	},
	loyalty: {
		suffixes: [],
		items: ['TRIDENT'],
		krName: '충성',
	},
	riptide: {
		suffixes: [],
		items: ['TRIDENT'],
		krName: '급류',
	},
	quick_charge: {
		suffixes: [],
		items: ['CROSSBOW'],
		krName: '빠른 장전',
	},
	piercing: {
		suffixes: [],
		items: ['CROSSBOW'],
		krName: '관통',
	},
}
var ITEMS_LOCALE_KR = {
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
var ENCHANT_BLAKLIST = [
	'mending',
	'silk_touch',
	'aqua_affinity',
	'flame',
	'infinity',
	'channeling',
	'multishot',
]
var ENCHANT_LIMIT = {
	// [enchantments]: [min, max]
	// if plus scroll, max = max - 1
	mending: [1, 1],
	silk_touch: [1, 1],
	unbreaking: [3, 10],
	efficiency: [5, 10],
	fortune: [3, 10],
	aqua_affinity: [1, 1],
	respiration: [3, 10],
	thorns: [3, 10],
	protection: [4, 10],
	projectile_protection: [4, 10],
	fire_protection: [4, 10],
	blast_protection: [4, 10],
	swift_sneak: [3, 10],
	feather_falling: [4, 10],
	soul_speed: [3, 10],
	depth_strider: [3, 10],
	frost_walker: [2, 10],
	fire_aspect: [2, 10],
	looting: [3, 10],
	knockback: [2, 10],
	sweeping: [3, 10],
	sharpness: [5, 10],
	smite: [5, 10],
	bane_of_arthropods: [5, 10],
	cleaving: [3, 10],
	power: [5, 10],
	punch: [2, 10],
	flame: [1, 1],
	infinity: [1, 1],
	lure: [3, 10],
	luck_of_the_sea: [3, 10],
	impaling: [5, 10],
	channeling: [1, 10],
	loyalty: [3, 10],
	riptide: [3, 10],
	quick_charge: [3, 10],
	piercing: [4, 10],
	multishot: [1, 1],
}
var ENCHANT_SCROLLS = {
	unbreaking: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l아이템 #FFFFB5&l내구 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollUnbreaking',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l아이템 #FFFFB5&l내구 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollUnbreakingPlus',
		},
	},
	efficiency: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l효율 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollEfficiency',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l효율 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollEfficiencyPlus',
		},
	},
	fortune: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l행운 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFortune',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l행운 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFortunePlus',
		},
	},
	respiration: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	thorns: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l가시 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollThorns',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l가시 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollThornsPlus',
		},
	},
	protection: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollProtection',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollProtectionPlus',
		},
	},
	projectile_protection: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l발사체보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollProjectileProtection',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l발사체보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollProjectileProtectionPlus',
		},
	},
	fire_protection: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l화염보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFireProtection',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l화염보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFireProtectionPlus',
		},
	},
	blast_protection: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l폭발보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollBlastProtection',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l폭발보호 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollBlastProtectionPlus',
		},
	},
	swift_sneak: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	feather_falling: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l가벼운착지 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFeatherFalling',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l가벼운착지 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFeatherFallingPlus',
		},
	},
	soul_speed: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	depth_strider: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	frost_walker: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	fire_aspect: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	looting: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l약탈 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLooting',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l약탈 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLootingPlus',
		},
	},
	knockback: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	sweeping: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l휩쓸기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSweeping',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l휩쓸기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSweepingPlus',
		},
	},
	sharpness: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l날카로움 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSharpness',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l날카로움 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSharpnessPlus',
		},
	},
	smite: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l강타 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSmite',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l강타 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSmitePlus',
		},
	},
	bane_of_arthropods: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l살충 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollBaneOfArthropods',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l살충 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollBaneOfArthropodsPlus',
		},
	},
	cleaving: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	power: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l힘 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPower',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l힘 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPowerPlus',
		},
	},
	punch: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	lure: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l미끼 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLure',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l미끼 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLurePlus',
		},
	},
	luck_of_the_sea: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l바다의행운 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLuckOfTheSea',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l바다의행운 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLuckOfTheSeaPlus',
		},
	},
	impaling: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l찌르기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollImpaling',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l찌르기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollImpalingPlus',
		},
	},
	loyalty: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l충성 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLoyalty',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l충성 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollLoyaltyPlus',
		},
	},
	riptide: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l집전 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRiptide',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l집전 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRiptidePlus',
		},
	},
	piercing: {
		normal: {
			name: '',
			eiCode: '',
		},
		plus: {
			name: '',
			eiCode: '',
		},
	},
	random: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l아이템 #FFFFB5&l인챈트 #ECEAE4&l혼돈의 주문서',
			eiCode: 'enchantScrollRandom',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l아이템 #FFFFB5&l인챈트 #ECEAE4&l혼돈의 주문서',
			eiCode: 'enchantScrollRandomPlus',
		},
	},
}
var REPAIR_COST_LIMIT = {
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
		SWORD: 50,
		PICKAXE: 50,
		AXE: 50,
		SHOVEL: 40,
		HOE: 35,
		HELMET: 45,
		CHESTPLATE: 40,
		LEGGINGS: 40,
		BOOTS: 45,
	},
	// other items
	other: {
		BOW: 55,
		FISHING_ROD: 40,
		TRIDENT: 55,
		CROSSBOW: 55,
		SHEARS: 30,
		SHIELD: 30,
		ELYTRA: 30,
		FLINT_AND_STEEL: 30,
		CARROT_ON_A_STICK: 30,
	},
}
var ENCHANT_PANALTY = {
	unbreaking: 2,
	efficiency: 1,
	fortune: 3,
	respiration: 2,
	thorns: 2,
	protection: 1,
	projectile_protection: 1,
	fire_protection: 1,
	blast_protection: 1,
	swift_sneak: 2,
	feather_falling: 1,
	soul_speed: 2,
	depth_strider: 2,
	frost_walker: 2,
	fire_aspect: 2,
	looting: 3,
	knockback: 2,
	sweeping: 2,
	sharpness: 1,
	smite: 1,
	bane_of_arthropods: 1,
	cleaving: 2,
	power: 1,
	punch: 2,
	lure: 2,
	luck_of_the_sea: 3,
	impaling: 1,
	loyalty: 2,
	riptide: 2,
	piercing: 1,
	random: 3,
}
var ENCHANT_CHANCE = {
	chance: {
		normal: {
			success: [1, 0.8, 0.7, 0.6, 0.55, 0.5, 0.3, 0.1, 0.01, 0.001],
			fail: [0, 0, 0, 0.05, 0.05, 0.1, 0.1, 0.1, 0.2, 0.3],
		},
		plus: {
			success: [1, 1, 0.5, 0.45, 0.4, 0.35, 0.3, 0.1, 0.01, 0.001],
			fail: [0, 0, 0, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25, 0.3],
		},
	},
	rarityWeight: {
		mending: 1,
		silk_touch: 1,
		unbreaking: 0.8,
		efficiency: 1,
		fortune: 0.5,
		aqua_affinity: 1,
		respiration: 0.8,
		thorns: 0.8,
		protection: 0.8,
		projectile_protection: 0.9,
		fire_protection: 0.9,
		blast_protection: 0.9,
		swift_sneak: 0.8,
		feather_falling: 0.8,
		soul_speed: 0.8,
		depth_strider: 0.8,
		frost_walker: 0.7,
		fire_aspect: 0.7,
		looting: 0.5,
		knockback: 0.7,
		sweeping: 0.8,
		sharpness: 0.9,
		smite: 0.9,
		bane_of_arthropods: 1,
		cleaving: 0.8,
		power: 0.9,
		punch: 0.7,
		flame: 1,
		infinity: 1,
		lure: 0.5,
		luck_of_the_sea: 0.5,
		impaling: 0.9,
		channeling: 1,
		loyalty: 0.8,
		riptide: 0.8,
		quick_charge: 0.8,
		piercing: 0.8,
		multishot: 1,
	},
}
var RANDOM_ENCHANT_CHANCE = {
	normal: 0.5,
	plus: 0.6,
}
// event settins
var EVENT_DAYS = [0, 6]
var EVENT_CHANCE_MULTIPLIER = 2
// item settings
var ITEM_SETTINGS = {
	protectScroll: {
		name: '&7[#55CBCD ★★★ &7] #ECD5E3&l아이템 #FFFFB5&l프로텍트 #ECEAE4&l스크롤',
		placeholder: 'checkitem_amount_lorecontains:ES-PS001',
		code: 'ES-PS001',
		eiCode: 'enchantProtectScroll',
		mat: 'FLOWER_BANNER_PATTERN',
	},
	enchantEssenceHigh: {
		name: '&7[#55CBCD ★★★ &7] #ECEAE4&l강력한 #FF968A&l인챈트 #FFC8A2&l에센스',
		placeholder: 'checkitem_amount_lorecontains:ES-ES001',
		code: 'ES-ES001',
		eiCode: 'enchantEssenceHigh',
		mat: 'DIAMOND',
	},
	enchantEssenceMedium: {
		name: '&7[#55CBCD ★★ &7] #ECEAE4&l쓸만한 #FF968A&l인챈트 #FFC8A2&l에센스',
		placeholder: 'checkitem_amount_lorecontains:ES-ES002',
		code: 'ES-ES002',
		eiCode: 'enchantEssenceMedium',
		mat: 'DIAMOND',
	},
	enchantEssenceLow: {
		name: '&7[#55CBCD ★ &7] #ECEAE4&l미약한 #FF968A&l인챈트 #FFC8A2&l에센스',
		placeholder: 'checkitem_amount_lorecontains:ES-ES003',
		code: 'ES-ES003',
		eiCode: 'enchantEssenceLow',
		mat: 'DIAMOND',
	},
}
// title & subtitle settings
var TITLE_SETTINGS = {
	success: {
		title: [
			{ text: '강', color: '#50fb00', bold: true },
			{ text: '화', color: '#7afc00', bold: true },
			{ text: '성', color: '#a4fc00', bold: true },
			{ text: '공', color: '#cefd00', bold: true },
			{ text: '!', color: '#f8fd00', bold: true },
		],
		subtitle: {
			'text': '알 수 없는 힘이 아이템에 성공적으로 전해졌습니다.',
			'color': 'gray',
			'bold': true,
		},
	},
	fail: {
		title: [
			{ text: '강', color: '#fb004b', bold: true },
			{ text: '화', color: '#fb1e3f', bold: true },
			{ text: '실', color: '#fc3d32', bold: true },
			{ text: '패', color: '#fc5b26', bold: true },
			{ text: '.', color: '#fc7919', bold: true },
			{ text: '.', color: '#fd980d', bold: true },
			{ text: '.', color: '#fdb600', bold: true },
		],
		subtitle: { 'text': '강화 단계는 유지됩니다.', 'color': 'gray', 'bold': true },
	},
	downgrade: {
		title: [
			{ text: '강', color: '#fb004b', bold: true },
			{ text: '화', color: '#fb1e3f', bold: true },
			{ text: '실', color: '#fc3d32', bold: true },
			{ text: '패', color: '#fc5b26', bold: true },
			{ text: '.', color: '#fc7919', bold: true },
			{ text: '.', color: '#fd980d', bold: true },
			{ text: '.', color: '#fdb600', bold: true },
		],
		subtitle: { 'text': '강화 단계가 하락했습니다.', 'color': 'gray', 'bold': true },
	},
	destroy: {
		title: [
			{ text: '강', color: '#fb004b', bold: true },
			{ text: '화', color: '#fb1e3f', bold: true },
			{ text: '실', color: '#fc3d32', bold: true },
			{ text: '패', color: '#fc5b26', bold: true },
			{ text: '.', color: '#fc7919', bold: true },
			{ text: '.', color: '#fd980d', bold: true },
			{ text: '.', color: '#fdb600', bold: true },
		],
		subtitle: { 'text': '아이템이 파괴 되었습니다.', 'color': 'gray', 'bold': true },
	},
}
/**
[ data utilities ]
*/
// check if data(key) exists in global store
function exists(path) {
	// returns true if a key exists; else false. (Placeholder API)
	return Data.exists(path)
}
// get data from global store
function get(path) {
	var result
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
function set(path, payload) {
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
function update(path, payload) {
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
function remove(path) {
	// check data exists
	if (!exists(path)) return false
	// removes a key from the data. (Placeholder API)
	Data.remove(path)
	save()
	return true
}
// remove all data from global store
function clear() {
	// removes all data. (Placeholder API)
	Data.clear()
	save()
	return true
}
// saves current state
function save() {
	// saves the current data state to the data file. (Placeholder API)
	Placeholder.saveData()
}
/**
[ general utilities ]
*/
// stringify data for placeholder return
function stringify(data) {
	return ''.concat(data)
}
// encode boolean as '1' or '0'
function encodeBoolean(data) {
	return data ? '1' : '0'
}
// EssentialsX:: convert colored string (#55CBCD -> &#55CBCD)
function essentialsColorString(targetStr) {
	// translate color codes
	var converted = translateHexCodes(targetStr, false)
	// return converted string
	return converted
}
// Console:: convert colored string (#55CBCD -> §x§5§5§C§B§C§D, &7 -> §7)
function consoleColorString(targetStr) {
	// translate color codes
	var converted = translateHexCodes(targetStr.replace(/&/g, '§'), true)
	// return converted string
	return converted
}
// translate mincraft color codes include hex (above mc v1.16)
function translateHexCodes(targetStr, isConsole) {
	// set hex color code regex
	var regex = /#[a-f0-9]{6}/gi
	// check hex color codes
	var matches = targetStr.match(regex)
	// check nothing matches
	if (matches === null) return targetStr
	// init string
	var converted = targetStr
	// replace color codes
	for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
		var match = matches_1[_i]
		// match string(color)
		var color = match
		// for console commands
		if (isConsole) {
			// split characters
			var hexCodeArray = color.split('')
			// replace each character
			for (var i = 0; i < hexCodeArray.length; i++) {
				hexCodeArray[i] = '\u00A7'.concat(hexCodeArray[i])
			}
			// converted hex code
			var hexCode = '\u00A7x'.concat(hexCodeArray.join(''))
			// apply converted color code
			converted = converted.replace(color, hexCode)
		}
		// for EssentialsX commands
		if (!isConsole) {
			converted = converted.replace(color, '&'.concat(color))
		}
	}
	return converted
}
// stringify lore NBT object
function convertLore(lore) {
	// stringify line by line
	var lines = []
	for (var _i = 0, lore_1 = lore; _i < lore_1.length; _i++) {
		var line = lore_1[_i]
		lines.push("'".concat(line, "'"))
	}
	// join every lines
	var joined = lines.join(',')
	// return result
	return '['.concat(joined, ']')
}
// stringify enchant object
function convertEnchantData(enchantData) {
	/*
      {
          id: "minecraft:" + enchantId,
          lvl: enchantLevel,
      }
  */
	// convert each enchants
	var enchants = []
	for (var enchant in enchantData) {
		enchants.push({
			id: 'minecraft:'.concat(enchant),
			lvl: enchantData[enchant],
		})
	}
	// return result
	return JSON.stringify(enchants)
}
/**
[ Placeholder API utilities ]
*/
// parse external placeholders
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
/**
  [ Spigot API utilities ]
*/
// get server bukkit version
function getVersion() {
	// get version string
	var version = BukkitServer.getVersion()
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
	// unknown(unsupported) version
	return -1
}
// check server bukkit version is above 1.16
function checkPlus16() {
	// get version
	var version = getVersion()
	// check version is above 1.16
	var checkVersion = version >= 16
	// return result
	return checkVersion
}
// execute command on server console
function execConsoleCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}
// execute command as player
function execCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}
// send message to player
function sendMessage(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}
// send message(log) to console
function logConsole(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
}
// get item display name in player's off-hand
function getDisplayName() {
	// check slot
	if (checkSlot(40)) return ''
	// return display name
	return BukkitPlayer.getInventory()
		.getItemInOffHand()
		.getItemMeta()
		.serialize()
		.get('display-name')
}
// get item lore in player's off-hand
function getLore() {
	// check slot
	if (checkSlot(40)) return []
	// return lore
	return BukkitPlayer.getInventory().getItemInOffHand().getItemMeta().serialize().get('lore')
}
/**
[ command utilities ]
*/
// show title to player
function showTitle(title, playerName) {
	// set command
	var command = 'title '.concat(playerName, ' title ').concat(JSON.stringify(title))
	// execute command
	return execConsoleCommand(command)
}
// show subtitle to player
function showSubtitle(subtitle, playerName) {
	// set command
	var command = 'title '.concat(playerName, ' subtitle ').concat(JSON.stringify(subtitle))
	// execute command
	return execConsoleCommand(command)
}
// show title and subtitle to player
function playTitle(title, subtitle, playerName) {
	// set title
	showTitle(title, playerName)
	// set subtitle and show both to player
	return showSubtitle(subtitle, playerName)
}
// play sound effect to player (sound => entity.villager.yes (without minecraft:))
function playSound(sound, playerName) {
	// set command
	var command = 'execute at '
		.concat(playerName, ' run playsound minecraft:')
		.concat(sound, ' voice ')
		.concat(playerName)
	// execute command
	return execConsoleCommand(command)
}
// broadcast message to all players
function broadcastMessage(message) {
	// set command
	var command = 'broadcast '.concat(essentialsColorString(message))
	// exec command
	return execConsoleCommand(command)
}
// replace target item (in player's off-hand)
function replaceItem(playerName, nbtData, displayData, enchantData) {
	// get integer nbt data
	var Damage = nbtData.Damage,
		RepairCost = nbtData.RepairCost
	// get display data
	var Name = displayData.Name,
		Lore = displayData.Lore
	// get enchants after scroll applied
	var enchants =
		typeof enchantData !== 'undefined'
			? ',Enchantments:'.concat(convertEnchantData(enchantData))
			: ''
	// get target item (in player's off hand)
	var targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()
	// set command
	var command = 'minecraft:item replace entity '
		.concat(playerName, ' weapon.offhand with ')
		.concat(targetItem, '{Damage:')
		.concat(Damage, ',RepairCost:')
		.concat(RepairCost, ",display:{Name:'")
		.concat(Name, "',Lore:")
		.concat(convertLore(Lore), '}')
		.concat(enchants, '}')
	// exec command
	return execConsoleCommand(command)
}
// destory item (when fails enchant)
function destroyItem(playerName) {
	// get target item (in player's off hand)
	var targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()
	// get kr name of item
	var krName = getKrName(40)
	// set command
	var command = 'minecraft:item replace entity '
		.concat(playerName, ' weapon.offhand with ')
		.concat(
			targetItem,
			'{Damage:99999,display:{Name:\'[{"text":"\uD30C\uAD34\uB41C","italic":false,"bold":true,"color":"red"},{"text":" '
		)
		.concat(
			krName,
			'","italic":false,"bold":true,"color":"aqua"},{"text":"\uC758 \uD754\uC801","color":"gray"}]\',Lore:[\'[{"text":"\uAC15\uD654\uC5D0 \uC2E4\uD328\uD574 \uD30C\uAD34\uB41C \uC544\uC774\uD15C\uC758 \uD754\uC801\uC774\uB2E4.","italic":false,"color":"gray"}]\',\'[{"text":"\uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC744 \uAC83 \uAC19\uB2E4.","italic":false,"color":"gray"}]\',\'[{"text":""}]\',\'[{"text":"\uC544\uC774\uD15C \uC18C\uC720\uC790:","italic":false,"color":"gray"},{"text":" '
		)
		.concat(playerName, '","italic":false,"color":"red"}]\']}}')
	// exec command
	return execConsoleCommand(command)
}
/**
[ checkitem utilities ]
*/
// check any item exists (in specific slot)
function checkSlot(slot) {
	// set placeholder
	var placeholder = 'checkitem_inslot:'.concat(slot)
	// return result
	return parsePlaceholder(placeholder) === 'yes'
}
// get item KR name (in specific slot)
function getKrName(slot) {
	// get settings
	var item = ITEMS_LOCALE_KR.item,
		material = ITEMS_LOCALE_KR.material,
		suffix = ITEMS_LOCALE_KR.suffix
	// set placeholder
	var placeholder = 'checkitem_getinfo:'.concat(slot, '_mat:material')
	// get item name(mat)
	var targetItem = parsePlaceholder(placeholder)
	// check item with no material info
	if (targetItem in item) return item[targetItem]
	// check material and suffix
	var _a = targetItem.split('_'),
		mat = _a[0],
		suff = _a[1]
	// return material and suffix
	return ''.concat(material[mat], ' ').concat(suffix[suff])
}
// check item is enchanted or not (in specific slot)
function isEnchanted(slot) {
	// check enchanted
	var enchanted = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_enchanted'))
	// return result
	return enchanted === 'true'
}
// get enchant data of target item (in specific slot)
function getEnchantData(slot) {
	// get raw enchant data
	var rawData = parsePlaceholder(
		'checkitem_getinfo:'.concat(slot, '_enchantments:enchantment')
	).split('|')
	// parse enchant data from raw data string
	var enchantData = {}
	rawData.forEach(function (enchantStr) {
		// split enchantments & level
		var _a = enchantStr.split(':'),
			enchant = _a[0],
			level = _a[1]
		// store data
		enchantData[enchant] = parseInt(level)
	})
	// return enchant data
	return enchantData
}
// get integer nbt data of target item (in specific slot)
function getIntegerNBTData(slot) {
	// get raw repair nbt data
	var rawData = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_nbtints:nbt'))
	// default nbt data
	var nbtData = {
		Damage: 0,
		RepairCost: 0,
	}
	// split every single lines of nbt data
	var nbtDataArr = rawData.replace(/INTEGER:/g, '').split('|')
	nbtDataArr.forEach(function (nbtTag) {
		// split label and value
		var _a = nbtTag.split(':'),
			label = _a[0],
			value = _a[1]
		// store data
		nbtData[label] = parseInt(value)
	})
	// return nbt data object
	return nbtData
}
// get damage of target item (in specific slot)
function getDamage(slot) {
	// get integer nbt data
	var Damage = getIntegerNBTData(slot).Damage
	// return repair cost
	return Damage
}
// get repair cost of target item (in specific slot)
function getRepairCost(slot) {
	// get integer nbt data
	var RepairCost = getIntegerNBTData(slot).RepairCost
	// return repair cost
	return RepairCost
}
// get settings of items
function getItemInfo(itemCode) {
	// return info object
	return ITEM_SETTINGS[itemCode]
}
// get amount of specific item in player's inventory
function getInventoryItemAmount(itemCode) {
	// get placeholder
	var placeholder = getItemInfo(itemCode).placeholder
	// get item amount
	var amount = parsePlaceholder(placeholder)
	// return amount as number
	return parseInt(amount)
}
/**
[ enchant scroll utilities ]
*/
// get enchant KR name
function getKrEnchantName(enchant) {
	// get settings
	var krName = VALID_ENCHANTS[enchant].krName
	return krName
}
// check if in event day
function isEventDay() {
	// check day of today
	var today = new Date()
	var day = today.getDay()
	// if today is event day
	return EVENT_DAYS.includes(day)
}
// get event chance multiplier if today is event day
function getEventMultiplier() {
	// check today is event day
	if (isEventDay()) return EVENT_CHANCE_MULTIPLIER
	return 1
}
// check specific enchant's level limit
function checkEnchantLevelLimit(enchantData, enchant, isPlus) {
	// get specific enchant's data
	var level = enchantData[enchant]
	// get limit of the enchant
	var _a = ENCHANT_LIMIT[enchant],
		min = _a[0],
		max = _a[1]
	// check plus offset
	var offset = isPlus ? -1 : 0
	// check valid range of enchant level
	var cond = level >= min && level < max + offset
	// return result
	return cond
}
// get repair cost limit of target item
function getItemCostLimit(targetItem) {
	// get repair cost limit settings
	var base = REPAIR_COST_LIMIT.base,
		material = REPAIR_COST_LIMIT.material,
		other = REPAIR_COST_LIMIT.other
	// check other limit first
	if (targetItem in other) return other[targetItem]
	// check base & material limit
	var _a = targetItem.split('_'),
		mat = _a[0],
		item = _a[1]
	// calc limit
	var limit = base[item] + material[mat]
	// return repair cost limit
	return limit
}
// get repair cost after enchant scroll applied
function getNextRepairCost(repairCost, enchant, isPlus) {
	// get panalty setting
	var panalty = ENCHANT_PANALTY[enchant]
	// check enchant failed
	if (enchant === 'fail') return repairCost + 1
	// calc repair cost
	var nextRepairCost = isPlus ? repairCost + panalty * 2 : repairCost + panalty
	// normal return
	return nextRepairCost
}
// check which essence exists in slot
function getEssenceInfo(slot) {
	// get enchant essence settings
	var enchantEssence = {
		enchantEssenceLow: ITEM_SETTINGS['enchantEssenceLow'],
		enchantEssenceMedium: ITEM_SETTINGS['enchantEssenceMedium'],
		enchantEssenceHigh: ITEM_SETTINGS['enchantEssenceHigh'],
	}
	// check kinds of essence
	for (var essence in enchantEssence) {
		// get code
		var code = enchantEssence[essence].code
		// set placeholder
		var placeholder = 'checkitem_amount_inslot:'.concat(slot, ',lorecontains:').concat(code)
		// checkitem result
		var checkEssence = parseInt(parsePlaceholder(placeholder)) > 0
		// return current essence's info if match
		if (checkEssence)
			return __assign(__assign({}, enchantEssence[essence]), {
				amount: parseInt(parsePlaceholder(placeholder)),
			})
	}
	// no match
	return false
}
// check random enchant scroll chance
function randomEnchantChance(isPlus) {
	// get chance setting
	var chance = isPlus ? RANDOM_ENCHANT_CHANCE.plus : RANDOM_ENCHANT_CHANCE.normal
	// calc success chance
	var successChance = 100 * chance
	// random number
	var rand = Math.floor(Math.random() * 100)
	// success
	return rand < successChance
}
// get boosted chance
function getBoostedChance() {
	// enchant essence setting
	var enchantEssence = {
		enchantEssenceLow: 0.001,
		enchantEssenceMedium: 0.005,
		enchantEssenceHigh: 0.01,
	}
	// enchant essence placeholder
	var niddle = 'ES-ES'
	// init slot
	var slot = -1
	// check player's quick slots (1 ~ 8)
	for (var i = 1; i <= 8; i++) {
		// set placeholder
		var placeholder = 'checkitem_amount_inslot:'.concat(i, ',lorecontains:').concat(niddle)
		// check essence item exists
		var essenceExists = parsePlaceholder(placeholder) === 'yes'
		// save slot if essence item found
		if (essenceExists) {
			slot = i
			break
		}
	}
	// check if no essence
	if (slot === -1) return 0
	// get essence info
	var essence = getEssenceInfo(slot)
	// if invalid essence info
	if (!essence) return 0
	// calc boosted chance
	var _a = essence,
		eiCode = _a.eiCode,
		amount = _a.amount
	var boost = enchantEssence[eiCode] * amount
	// return boosted chance
	return boost
}
// calc enchant scroll success chance
function getSuccessChance(enchant, level, isPlus) {
	// get enchant settings
	var chance = ENCHANT_CHANCE.chance,
		rarityWeight = ENCHANT_CHANCE.rarityWeight
	// get success, fail chance
	var success = (isPlus ? chance.plus : chance.normal).success
	// set next enchant level
	var nextLevel = isPlus ? level + 1 : level
	// get boosted chance by enchant essences
	var boosted = getBoostedChance()
	// calc success chance
	var successChance =
		1000 * (success[nextLevel] * getEventMultiplier() + boosted) * rarityWeight[enchant]
	// return success chance
	return successChance
}
// calc enchant scroll fail(side effect) chance
function getFailChance(enchant, level, isPlus) {
	// get enchant settings
	var chance = ENCHANT_CHANCE.chance
	// get success, fail chance
	var fail = (isPlus ? chance.plus : chance.normal).fail
	// set next enchant level
	var nextLevel = isPlus ? level + 1 : level
	// calc fail chance
	var failChance = 100 * fail[nextLevel]
	// return fail chance
	return failChance
}
// get enchant scroll result
function getEnchantResult(enchantData, enchant, isPlus) {
	// get enchant level
	var level = enchantData[enchant]
	// calc success chance
	var successChance = getSuccessChance(enchant, level, isPlus)
	// random number
	var rand = Math.floor(Math.random() * 1000)
	// success
	if (rand < successChance) {
		// get enchant data after scroll applied
		var successEnchantData = getNextEnchantData(true, enchantData, enchant, isPlus)
		// return result (upgraded)
		return {
			success: true,
			sideEffect: false,
			enchantData: successEnchantData,
		}
	}
	// random number
	var sideRand = Math.floor(Math.random() * 100)
	// calc side effect chance
	var sideEffectChance = getFailChance(enchant, level, isPlus)
	// side effect
	if (sideRand < sideEffectChance) {
		// return result (destroyed)
		if (isPlus)
			return {
				success: false,
				sideEffect: true,
				enchantData: enchantData,
			}
		// get enchant data after scroll applied
		var failEnchantData = getNextEnchantData(false, enchantData, enchant, isPlus)
		// return result (downgraded)
		return {
			success: false,
			sideEffect: true,
			enchantData: failEnchantData,
		}
	}
	// fail (no chance)
	return {
		success: false,
		sideEffect: false,
		enchantData: enchantData,
	}
}
// get random enchant scroll result
function getRandomEnchantResult(enchantData) {
	// init enchant data
	var nextEnchantData = enchantData
	// result object
	var result = {
		upgraded: [],
		downgraded: [],
	}
	// check every available enchants
	for (var enchant in enchantData) {
		// check invalid enchants
		if (ENCHANT_BLAKLIST.includes(enchant)) continue
		// random number
		var rand = Math.floor(Math.random() * 1000)
		// get enchant level
		var level = enchantData[enchant]
		// calc success chance
		var successChance = getSuccessChance(enchant, level, false)
		// success
		if (rand < successChance) {
			// upgrade enchant
			nextEnchantData[enchant] + 1
			// save result
			result.upgraded.push(enchant)
		}
		// random number
		var sideRand = Math.floor(Math.random() * 100)
		// calc side effect chance
		var sideEffectChance = getFailChance(enchant, level, false)
		// side effect
		if (sideRand < sideEffectChance) {
			// downgrade enchant
			nextEnchantData[enchant] - 1
			// save result
			result.downgraded.push(enchant)
		}
	}
	// return result
	return {
		enchantData: nextEnchantData,
		result: result,
	}
}
// get enchant data after scroll applied
function getNextEnchantData(result, enchantData, enchant, isPlus) {
	var _a, _b
	// success
	if (result)
		return __assign(
			__assign({}, enchantData),
			((_a = {}), (_a[enchant] = isPlus ? enchantData[enchant] + 2 : enchantData[enchant] + 1), _a)
		)
	// fail
	return __assign(
		__assign({}, enchantData),
		((_b = {}), (_b[enchant] = enchantData[enchant] - 1), _b)
	)
}
// broadcast success message
function broadcastSuccess(playerName, enchant, nextLevel) {
	// get kr name of target item
	var krName = getKrName(40)
	// get kr name of enchant
	var krEnchant = getKrEnchantName(enchant)
	// set message
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(krName, '&f\uC758 &#FFFFB5&l')
		.concat(krEnchant, ' \uC778\uCC48\uD2B8 &6&l+')
		.concat(nextLevel, ' &f\uAC15\uD654\uC5D0 &a&l\uC131\uACF5&f\uD588\uC2B5\uB2C8\uB2E4.')
	// broadcast message
	return broadcastMessage(message)
}
// broadcast fail message
function broadcastFail(playerName, enchant, nextLevel) {
	// get kr name of target item
	var krName = getKrName(40)
	// get kr name of enchant
	var krEnchant = getKrEnchantName(enchant)
	// set message
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(krName, '&f\uC758 &#FFFFB5&l')
		.concat(krEnchant, ' \uC778\uCC48\uD2B8 &6&l+')
		.concat(nextLevel, ' &f\uAC15\uD654\uC5D0 &c&l\uC2E4\uD328&f\uD588\uC2B5\uB2C8\uB2E4.')
	// broadcast message
	return broadcastMessage(message)
}
// broadcast success message
function broadcastRandomSuccess(playerName) {
	// get kr name of target item
	var krName = getKrName(40)
	// set message
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(
			krName,
			'&f\uC758 &#FFFFB5&l\uC778\uCC48\uD2B8 &6&l\uB79C\uB364 &f\uAC15\uD654\uC5D0 &a&l\uC131\uACF5&f\uD588\uC2B5\uB2C8\uB2E4.'
		)
	// broadcast message
	return broadcastMessage(message)
}
// broadcast fail message
function broadcastRandomFail(playerName) {
	// get kr name of target item
	var krName = getKrName(40)
	// set message
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(
			krName,
			'&f\uC758 &#FFFFB5&l\uC778\uCC48\uD2B8 &6&l\uB79C\uB364 &f\uAC15\uD654\uC5D0 &c&l\uC2E4\uD328&f\uD588\uC2B5\uB2C8\uB2E4.'
		)
	// broadcast message
	return broadcastMessage(message)
}
// apply normal enchant scroll
function applyNormalEnchant(enchantData, enchant, displayData, nbtData, isPlus) {
	// get result after scroll applied
	var _a = getEnchantResult(enchantData, enchant, isPlus),
		success = _a.success,
		sideEffect = _a.sideEffect,
		nextEnchantData = _a.enchantData
	// success
	if (success) {
		// play sound effect
		playSound('block.anvil.use', PLAYER_NAME)
		// get title setting
		var title_1 = TITLE_SETTINGS.success.title
		// show title & subtitle
		playTitle(title_1, [], PLAYER_NAME)
		// broadcast success message
		broadcastSuccess(PLAYER_NAME, enchant, nextEnchantData[enchant])
		// replace target item
		replaceItem(PLAYER_NAME, nbtData, displayData, nextEnchantData)
		// return result
		return 'success'
	}
	// side effect
	if (sideEffect) {
		// play sound effect
		playSound('entity.item.break', PLAYER_NAME)
		// get title setting
		var _b = isPlus ? TITLE_SETTINGS.destroy : TITLE_SETTINGS.downgrade,
			title_2 = _b.title,
			subtitle_1 = _b.subtitle
		// show title & subtitle
		playTitle(title_2, subtitle_1, PLAYER_NAME)
		// broadcast success message
		broadcastFail(PLAYER_NAME, enchant, nextEnchantData[enchant])
		// replace target item
		replaceItem(PLAYER_NAME, nbtData, displayData, nextEnchantData)
		// return result
		return 'sideeffect'
	}
	// fail
	// play sound effect
	playSound('entity.villager.no', PLAYER_NAME)
	// get title setting
	var _c = TITLE_SETTINGS.fail,
		title = _c.title,
		subtitle = _c.subtitle
	// show title & subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	// broadcast success message
	broadcastFail(PLAYER_NAME, enchant, nextEnchantData[enchant])
	// replace target item
	replaceItem(PLAYER_NAME, nbtData, displayData, nextEnchantData)
	// return result
	return 'fail'
}
// apply random enchant scroll
function applyRandomEnchant(enchantData, displayData, nbtData, isPlus) {
	// check random result
	if (!randomEnchantChance(isPlus)) {
		// play sound effect
		playSound('entity.item.break', PLAYER_NAME)
		// get title setting
		var _a = TITLE_SETTINGS.destroy,
			title_3 = _a.title,
			subtitle_2 = _a.subtitle
		// show title & subtitle
		playTitle(title_3, subtitle_2, PLAYER_NAME)
		// broadcast fail message
		broadcastRandomFail(PLAYER_NAME)
		// replace target item
		destroyItem(PLAYER_NAME)
		// return result
		return 'fail'
	}
	// get result after scroll applied
	var _b = getRandomEnchantResult(enchantData),
		nextEnchantData = _b.enchantData,
		_c = _b.result,
		upgraded = _c.upgraded,
		downgraded = _c.downgraded
	// play sound effect
	playSound('block.anvil.use', PLAYER_NAME)
	// get title setting
	var _d = TITLE_SETTINGS.success,
		title = _d.title,
		subtitle = _d.subtitle
	// show title & subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	// broadcast success message
	broadcastRandomSuccess(PLAYER_NAME)
	// replace target item
	replaceItem(PLAYER_NAME, nbtData, displayData, nextEnchantData)
	// return result
	return 'success'
}
/**
[ action handler ]
*/
// get item names (color coded)
function itemNames(args) {
	// get args
	var returnType = args[1],
		itemCode = args[2]
	// get item name
	var name = getItemInfo(itemCode).name
	// normal return
	return name
}
// check target enchant or item is valid
function checkEnchant(args) {
	// get args
	var returnType = args[1],
		enchant = args[2]
	// get target enchantment's info
	var _a = VALID_ENCHANTS[enchant],
		suffixes = _a.suffixes,
		items = _a.items
	// get target item (in player's off hand)
	var targetItem = parsePlaceholder('player_item_in_offhand')
	// check suffix matches
	var checkSuffix = suffixes.some(function (suffix) {
		return targetItem.includes(suffix)
	})
	// check item material matches
	var checkItem = items.some(function (item) {
		return targetItem.includes(item)
	})
	// normal return
	return checkSuffix || checkItem
}
// check target enchant of item is upgradable
function checkUpgradable(args) {
	// get args
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	// parse args
	var checkPlus = isPlus === '1'
	// get enchant data from target item
	var enchantData = getEnchantData(40)
	// check enchant level exceeds limit
	var cond = checkEnchantLevelLimit(enchantData, enchant, checkPlus)
	// normal return
	return cond
}
// check every enchants meets valid enchant settings (for random enchant scroll)
function checkValidItem(args) {
	// get args
	var returnType = args[1],
		isPlus = args[2]
	// parse args
	var checkPlus = isPlus === '1'
	// check item is enchanted
	if (!isEnchanted(40)) return false
	// get enchant data from target item
	var enchantData = getEnchantData(40)
	// count upgradable enchants
	var count = 0
	for (var enchant in enchantData) {
		// check unupgradable enchants
		if (ENCHANT_BLAKLIST.includes(enchant)) continue
		// check enchant level exceeds limit
		if (!checkEnchantLevelLimit(enchantData, enchant, checkPlus)) return false
		// enchant upgradable
		count++
	}
	// normal return
	return count > 0
}
// check limit of target item's repair cost
function checkRepairCostLimit(args) {
	// get args
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	// parse args
	var checkPlus = isPlus === '1'
	// get target item (in player's off hand)
	var targetItem = parsePlaceholder('player_item_in_offhand')
	// get repair cost limit
	var limit = getItemCostLimit(targetItem)
	// get current repair cost
	var cost = getRepairCost(40)
	// get next repair cost (after panalty applied)
	var nextCost = getNextRepairCost(cost, enchant, checkPlus)
	// check next repair cost exceeds limit
	var checkLimit = limit >= nextCost
	// normal return
	return checkLimit
}
// get repair cost limit of target item
function repairCostLimit(args) {
	// get args
	var returnType = args[1]
	// get target item (in player's off hand)
	var targetItem = parsePlaceholder('player_item_in_offhand')
	// get repair cost limit
	var limit = getItemCostLimit(targetItem)
	// normal return
	return limit
}
// check if in event
function checkEvent(args) {
	// get args
	var returnType = args[1]
	// check return type (condition: if today is event day)
	var cond = isEventDay()
	if (returnType === '1') return encodeBoolean(cond)
	// normal return
	return cond
}
// get event chance multiplier
function eventMultiplier(agrs) {
	// get args
	var returnType = args[1]
	// normal return
	return getEventMultiplier()
}
// check player has protect scroll
function checkProtectScroll(args) {
	// get args
	var returnType = args[1]
	// get amount of protect scroll
	var amount = getInventoryItemAmount('protectScroll')
	// check return type (condition: amount of protect scroll > 0)
	var cond = amount > 0
	if (returnType === '1') encodeBoolean(cond)
	// normal return
	return cond
}
// get repair cost of target item
function repairCost(args) {
	// get args
	var returnType = args[1]
	// get current repair cost
	var cost = getRepairCost(40)
	// normal return
	return cost
}
// get repair cost of target item after scroll applied
function nextRepairCost(args) {
	// get args
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	// parse args
	var checkPlus = isPlus === '1'
	// get current repair cost
	var cost = getRepairCost(40)
	// get next repair cost
	var nextCost = getNextRepairCost(cost, enchant, checkPlus)
	// normal return
	return nextCost
}
// apply enchant scroll to target item
function applyEnchant(args) {
	// get args
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	// parse args
	var checkPlus = isPlus === '1'
	// get enchant data
	var enchantData = getEnchantData(40)
	// get item damage info
	var damage = getDamage(40)
	// get item repair cost
	var repairCost = getRepairCost(40)
	// get item repair cost after scroll applied
	var nextRepairCost = getNextRepairCost(repairCost, enchant, checkPlus)
	// get item display name
	var displayName = getDisplayName()
	// get item lore
	var lore = getLore()
	// get nbt data after scroll applied
	var nbtData = {
		Damage: damage,
		RepairCost: nextRepairCost,
	}
	// get display data
	var displayData = {
		Name: displayName,
		Lore: lore,
	}
	// check event
	if (isEventDay()) {
		// get event multiplier
		var multiplier = getEventMultiplier()
		// set message
		var message_1 =
			'&7[&6\uAC15\uD654&7] &c&l\uD56B\uD0C0\uC784 &e&l\uC774\uBCA4\uD2B8&f\uB85C &9&l\uAC15\uD654 \uD655\uB960&f\uC774 &6&l'.concat(
				multiplier,
				'&7\uBC30 &f\uC99D\uAC00\uD588\uC2B5\uB2C8\uB2E4.'
			)
		// send message
		sendMessage(consoleColorString(message_1))
	}
	// get scroll name
	var name = (checkPlus ? ENCHANT_SCROLLS[enchant].plus : ENCHANT_SCROLLS[enchant].normal).name
	// set message about item use
	var message = '&7[&6\uAC15\uD654&7] '
		.concat(name, '\uB97C \uC0AC\uC6A9\uD588\uC2B5\uB2C8\uB2E4. &7(\uD328\uB110\uD2F0: ')
		.concat(repairCost, ' -> ')
		.concat(nextRepairCost, ')')
	// send message
	sendMessage(consoleColorString(message))
	// check random enchant scroll
	if (enchant === 'random') return applyRandomEnchant(enchantData, displayData, nbtData, checkPlus)
	// check normal enchant scroll
	return applyNormalEnchant(enchantData, enchant, displayData, nbtData, checkPlus)
}
// placeholder controller
function enchantScrollCore() {
	// action result
	var result = false
	// get args
	var action = args[0]
	// command(placeholder) settings
	var VALID_COMMANDS = {
		itemNames: {
			argLen: [2],
			callback: itemNames,
		},
		checkEnchant: {
			argLen: [3],
			callback: checkEnchant,
		},
		checkUpgradable: {
			argLen: [4],
			callback: checkUpgradable,
		},
		checkValidItem: {
			argLen: [2],
			callback: checkValidItem,
		},
		checkCostLimit: {
			argLen: [4],
			callback: checkRepairCostLimit,
		},
		repairCostLimit: {
			argLen: [2],
			callback: repairCostLimit,
		},
		checkEvent: {
			argLen: [2],
			callback: checkEvent,
		},
		eventMultiplier: {
			argLen: [2],
			callback: eventMultiplier,
		},
		checkProtectScroll: {
			argLen: [2],
			callback: checkProtectScroll,
		},
		repairCost: {
			argLen: [2],
			callback: repairCost,
		},
		nextRepairCost: {
			argLen: [4],
			callback: nextRepairCost,
		},
		applyEnchant: {
			argLen: [4],
			callback: applyEnchant,
		},
	}
	// check action
	if (!(action in VALID_COMMANDS)) return 'false'
	// check args
	var _a = VALID_COMMANDS[action],
		argLen = _a.argLen,
		callback = _a.callback
	var isValidArgs = argLen.some(function (len) {
		return args.length === len
	})
	if (!isValidArgs) return 'false'
	// execute callback
	result = callback(args)
	// return action result
	return stringify(result)
}
enchantScrollCore()
