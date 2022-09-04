/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollCore.js
 * Version: v1.4.0
 * Last Update: 2022-09-04
 *
 * TypeScript Version: v4.7.4
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
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
		if (typeof start !== 'number') start = 0
		if (start + search.length > this.length) return false
		return this.indexOf(search, start) !== -1
	}
}
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
var PLAYER_NAME = '%player_name%'
var ENCHANT_NAME = {
	aqua_affinity: '친수성',
	bane_of_arthropods: '살충',
	blast_protection: '폭발로부터 보호',
	channeling: '집전',
	cleaving: '쪼개기',
	binding_curse: '귀속 저주',
	vanishing_curse: '소실 저주',
	depth_strider: '물갈퀴',
	efficiency: '효율',
	feather_falling: '가벼운 착지',
	fire_aspect: '발화',
	fire_protection: '화염으로부터 보호',
	flame: '화염',
	fortune: '행운',
	frost_walker: '차가운 걸음',
	impaling: '찌르기',
	infinity: '무한',
	knockback: '밀치기',
	looting: '약탈',
	loyalty: '충성',
	luck_of_the_sea: '바다의 행운',
	lure: '미끼',
	mending: '수선',
	multishot: '다중 발사',
	piercing: '관통',
	power: '힘',
	projectile_protection: '발사체로부터 보호',
	protection: '보호',
	punch: '밀어내기',
	quick_charge: '빠른 장전',
	respiration: '호흡',
	riptide: '급류',
	sharpness: '날카로움',
	silk_touch: '섬세한 손길',
	smite: '강타',
	soul_speed: '영혼 가속',
	sweeping_edge: '휩쓸기',
	swift_sneak: '신속한 잠행',
	thorns: '가시',
	unbreaking: '내구성',
}
var ENCHANT_LEVEL = [
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
		krName: '내구성',
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
	'binding_curse',
	'vanishing_curse',
]
var ENCHANT_LIMIT = {
	mending: [1, 1],
	silk_touch: [1, 1],
	unbreaking: [3, 15],
	efficiency: [5, 15],
	fortune: [3, 15],
	aqua_affinity: [1, 1],
	respiration: [3, 15],
	thorns: [3, 15],
	protection: [4, 15],
	projectile_protection: [4, 15],
	fire_protection: [4, 15],
	blast_protection: [4, 15],
	swift_sneak: [3, 15],
	feather_falling: [4, 15],
	soul_speed: [3, 15],
	depth_strider: [3, 15],
	frost_walker: [2, 15],
	fire_aspect: [2, 15],
	looting: [3, 15],
	knockback: [2, 15],
	sweeping: [3, 15],
	sharpness: [5, 15],
	smite: [5, 15],
	bane_of_arthropods: [5, 15],
	cleaving: [3, 15],
	power: [5, 15],
	punch: [2, 15],
	flame: [1, 1],
	infinity: [1, 1],
	lure: [3, 15],
	luck_of_the_sea: [3, 15],
	impaling: [5, 15],
	channeling: [1, 1],
	loyalty: [3, 15],
	riptide: [3, 15],
	quick_charge: [3, 15],
	piercing: [4, 15],
	multishot: [1, 1],
}
var ENCHANT_SCROLLS = {
	unbreaking: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l아이템 #FFFFB5&l내구성 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollUnbreaking',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l아이템 #FFFFB5&l내구성 #ECEAE4&l강화 주문서',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l호흡 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRespiration',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l호흡 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRespirationPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l신속한잠행 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSwiftSneak',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l신속한잠행 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSwiftSneakPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l영혼가속 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSoulSpeed',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l영혼가속 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollSoulSpeedPlus',
		},
	},
	depth_strider: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l물갈퀴 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollDepthStrider',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l물갈퀴 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollDepthStriderPlus',
		},
	},
	frost_walker: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l차가운걸음 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFrostWalker',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l차가운걸음 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFrostWalkerPlus',
		},
	},
	fire_aspect: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l발화 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFireAspect',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l발화 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollFireAspectPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l밀치기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollKnockback',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l밀치기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollKnockbackPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l쪼개기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollCleaving',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l쪼개기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollCleavingPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l밀어내기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPunch',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l밀어내기 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPunchPlus',
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
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l급류 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRiptide',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l급류 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollRiptidePlus',
		},
	},
	piercing: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l관통 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPiercing',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l관통 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollPiercingPlus',
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
			success: [
				1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.1, 0.05, 0.05, 0.01,
				0.001, 0.0001,
			],
			fail: [
				0, 0, 0, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
				0.65, 0.7,
			],
		},
		plus: {
			success: [
				1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.1, 0.05, 0.05, 0.01,
				0.001, 0.0001,
			],
			fail: [
				0, 0, 0, 0.05, 0.05, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
				0.65, 0.7,
			],
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
var EVENT_DAYS = [0, 6]
var EVENT_CHANCE_MULTIPLIER = 2
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
	costReducerHigh: {
		name: '&7[#55CBCD ★★★ &7] #55CBCD&l반짝이는 #FFFFB5&l정화의 #ECEAE4&l가루',
		placeholder: 'checkitem_amount_lorecontains:ES-CR001',
		code: 'ES-CR001',
		eiCode: 'costReducerHigh',
		mat: 'SUGAR',
	},
	costReducerMedium: {
		name: '&7[#55CBCD ★★ &7] #55CBCD&l선명한 #FFFFB5&l정화의 #ECEAE4&l가루',
		placeholder: 'checkitem_amount_lorecontains:ES-CR002',
		code: 'ES-CR002',
		eiCode: 'costReducerMedium',
		mat: 'SUGAR',
	},
	costReducerLow: {
		name: '&7[#55CBCD ★ &7] #55CBCD&l희미한 #FFFFB5&l정화의 #ECEAE4&l가루',
		placeholder: 'checkitem_amount_lorecontains:ES-CR003',
		code: 'ES-CR003',
		eiCode: 'costReducerLow',
		mat: 'SUGAR',
	},
}
var TITLE_SETTINGS = {
	success: {
		title: [
			{ text: '강', color: '#50fb00', bold: true },
			{ text: '화', color: '#7afc00', bold: true },
			{ text: '성', color: '#a4fc00', bold: true },
			{ text: '공', color: '#cefd00', bold: true },
			{ text: '!', color: '#f8fd00', bold: true },
		],
		subtitle: { 'text': '강화 단계가 상승했습니다.', 'color': 'gray', 'bold': true },
	},
	successRandom: {
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
	failRandom: {
		title: [
			{ text: '강', color: '#fb004b', bold: true },
			{ text: '화', color: '#fb1e3f', bold: true },
			{ text: '실', color: '#fc3d32', bold: true },
			{ text: '패', color: '#fc5b26', bold: true },
			{ text: '.', color: '#fc7919', bold: true },
			{ text: '.', color: '#fd980d', bold: true },
			{ text: '.', color: '#fdb600', bold: true },
		],
		subtitle: {
			'text': '알 수 없는 힘이 아이템에 전해졌지만 아무런 변화도 없었습니다.',
			'color': 'gray',
			'bold': true,
		},
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
function convertLore(lore) {
	var lines = []
	for (var _i = 0, lore_1 = lore; _i < lore_1.length; _i++) {
		var line = lore_1[_i]
		lines.push("'".concat(line, "'"))
	}
	var joined = lines.join(',')
	return '['.concat(joined, ']')
}
function convertEnchantData(enchantData) {
	var enchants = []
	for (var enchant in enchantData) {
		enchants.push({
			id: 'minecraft:'.concat(enchant),
			lvl: enchantData[enchant],
		})
	}
	return JSON.stringify(enchants)
}
function createEnchantmentLore(enchantData) {
	var enchantLore = []
	for (var enchant in enchantData) {
		var levelStr = ENCHANT_BLAKLIST.includes(enchant) ? '' : ENCHANT_LEVEL[enchantData[enchant]]
		enchantLore.push(
			JSON.stringify([
				{
					text: ''.concat(ENCHANT_NAME[enchant], ' ').concat(levelStr),
					color: enchant.includes('curse') ? 'red' : 'gray',
					italic: false,
				},
			])
		)
	}
	if (enchantLore.length > 0) {
		enchantLore.push(
			JSON.stringify([
				{
					text: '',
				},
			])
		)
	}
	return enchantLore
}
function mergeLores(lore, enchantData) {
	var customLore = []
	customLore = customLore.concat(lore)
	var enchantLore = createEnchantmentLore(enchantData)
	var loreStarts = checkCustomLore(40)
	if (loreStarts === false) {
		if (lore.length === 0) {
			return {
				lore: enchantLore,
				loreStarts: -1,
			}
		} else {
			return {
				lore: enchantLore.concat(customLore),
				loreStarts: enchantLore.length,
			}
		}
	}
	if (typeof loreStarts === 'number') {
		customLore = customLore.slice(loreStarts)
	}
	return {
		lore: enchantLore.concat(customLore),
		loreStarts: enchantLore.length,
	}
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
	return -1
}
function checkPlus16() {
	var version = getVersion()
	var checkVersion = version >= 16
	return checkVersion
}
function execConsoleCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}
function execCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}
function sendMessage(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}
function logConsole(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
}
function getDisplayName() {
	if (!checkSlot(40)) return ''
	return BukkitPlayer.getInventory()
		.getItemInOffHand()
		.getItemMeta()
		.serialize()
		.get('display-name')
}
function getLore() {
	if (!checkSlot(40)) return []
	return BukkitPlayer.getInventory().getItemInOffHand().getItemMeta().serialize().get('lore')
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
function replaceItem(playerName, nbtData, displayData, enchantData) {
	var Damage = nbtData.Damage,
		RepairCost = nbtData.RepairCost
	var Name = displayData.Name,
		Lore = displayData.Lore
	var newLore = []
	var customLoreNBT = ''
	if (typeof enchantData !== 'undefined') {
		var _a = mergeLores(Lore, enchantData),
			mergedLore = _a.lore,
			loreStarts = _a.loreStarts
		newLore = mergedLore
		customLoreNBT = ',customLore:'.concat(loreStarts)
	} else {
		newLore = newLore.concat(Lore)
	}
	var enchants =
		typeof enchantData !== 'undefined'
			? ',Enchantments:'.concat(convertEnchantData(enchantData))
			: ''
	var targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()
	var command = 'minecraft:item replace entity '
		.concat(playerName, ' weapon.offhand with ')
		.concat(targetItem, '{Damage:')
		.concat(Damage, ',RepairCost:')
		.concat(RepairCost, ",display:{Name:'")
		.concat(Name, "',Lore:")
		.concat(convertLore(newLore), '}')
		.concat(enchants)
		.concat(customLoreNBT, ',HideFlags:1}')
	return execConsoleCommand(command)
}
function destroyItem(playerName) {
	var targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()
	var krName = getKrName(40)
	var command = 'minecraft:item replace entity '
		.concat(playerName, ' weapon.offhand with ')
		.concat(
			targetItem,
			'{Damage:99999,RepairCost:5,display:{Name:\'[{"text":"\uD30C\uAD34\uB41C","italic":false,"bold":true,"color":"red"},{"text":" '
		)
		.concat(
			krName,
			'","italic":false,"bold":true,"color":"aqua"},{"text":"\uC758 \uD754\uC801","color":"gray"}]\',Lore:[\'[{"text":"\uAC15\uD654\uC5D0 \uC2E4\uD328\uD574 \uD30C\uAD34\uB41C \uC544\uC774\uD15C\uC758 \uD754\uC801\uC774\uB2E4.","italic":false,"color":"gray"}]\',\'[{"text":"\uBCF5\uAD6C\uD560 \uC218 \uC5C6\uC744 \uAC83 \uAC19\uB2E4.","italic":false,"color":"gray"}]\',\'[{"text":""}]\',\'[{"text":"\uC544\uC774\uD15C \uC18C\uC720\uC790:","italic":false,"color":"gray"},{"text":" '
		)
		.concat(playerName, '","italic":false,"color":"red"}]\']}}')
	return execConsoleCommand(command)
}
function checkSlot(slot) {
	var placeholder = 'checkitem_inslot:'.concat(slot)
	return parsePlaceholder(placeholder) === 'yes'
}
function getKrName(slot) {
	var item = ITEMS_LOCALE_KR.item,
		material = ITEMS_LOCALE_KR.material,
		suffix = ITEMS_LOCALE_KR.suffix
	var placeholder = 'checkitem_getinfo:'.concat(slot, '_mat:material')
	var targetItem = parsePlaceholder(placeholder)
	if (targetItem in item) return item[targetItem]
	var _a = targetItem.split('_'),
		mat = _a[0],
		suff = _a[1]
	return ''.concat(material[mat], ' ').concat(suffix[suff])
}
function isEnchanted(slot) {
	var enchanted = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_enchanted'))
	return enchanted === 'true'
}
function getEnchantData(slot) {
	var rawData = parsePlaceholder(
		'checkitem_getinfo:'.concat(slot, '_enchantments:enchantment')
	).split('|')
	var enchantData = {}
	rawData.forEach(function (enchantStr) {
		var _a = enchantStr.replace('minecraft:', '').split(':'),
			enchant = _a[0],
			level = _a[1]
		enchantData[enchant] = parseInt(level)
	})
	return enchantData
}
function checkCustomLore(slot) {
	var rawData = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_nbtints:nbt'))
	var nbtData = {}
	var nbtDataArr = rawData.replace(/INTEGER:/g, '').split('|')
	nbtDataArr.forEach(function (nbtTag) {
		var _a = nbtTag.split(':'),
			label = _a[0],
			value = _a[1]
		nbtData[label] = parseInt(value)
	})
	return typeof nbtData['customLore'] !== undefined ? nbtData['customLore'] : false
}
function getIntegerNBTData(slot) {
	var rawData = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_nbtints:nbt'))
	var nbtData = {
		Damage: 0,
		RepairCost: 0,
	}
	var nbtDataArr = rawData.replace(/INTEGER:/g, '').split('|')
	nbtDataArr.forEach(function (nbtTag) {
		var _a = nbtTag.split(':'),
			label = _a[0],
			value = _a[1]
		nbtData[label] = parseInt(value)
	})
	return nbtData
}
function getDamage(slot) {
	var Damage = getIntegerNBTData(slot).Damage
	return Damage
}
function getRepairCost(slot) {
	var RepairCost = getIntegerNBTData(slot).RepairCost
	return RepairCost
}
function getItemInfo(itemCode) {
	return ITEM_SETTINGS[itemCode]
}
function getInventoryItemAmount(item) {
	var placeholder = getItemInfo(item).placeholder
	var amount = parsePlaceholder(placeholder)
	return parseInt(amount)
}
function removeItem(itemCode, amount) {
	var placeholder =
		typeof amount === 'undefined'
			? 'checkitem_remove_lorecontains:'.concat(itemCode)
			: 'checkitem_remove_lorecontains:'.concat(itemCode, ',amt:').concat(amount)
	return parsePlaceholder(placeholder) === 'yes'
}
function removeSlotItem(slot, amount) {
	var placeholder =
		typeof amount === 'undefined'
			? 'checkitem_remove_inslot:'.concat(slot)
			: 'checkitem_remove_inslot:'.concat(slot, ',amt:').concat(amount)
	return parsePlaceholder(placeholder) === 'yes'
}
function getKrEnchantName(enchant) {
	var krName = VALID_ENCHANTS[enchant].krName
	return krName
}
function isEventDay() {
	var today = new Date()
	var day = today.getDay()
	return EVENT_DAYS.includes(day)
}
function getEventMultiplier() {
	if (isEventDay()) return EVENT_CHANCE_MULTIPLIER
	return 1
}
function checkEnchantLevelLimit(enchantData, enchant, isPlus) {
	var level = enchantData[enchant]
	var _a = ENCHANT_LIMIT[enchant],
		min = _a[0],
		max = _a[1]
	var offset = isPlus ? -1 : 0
	var cond = level >= min && level < max + offset
	return cond
}
function getItemCostLimit(targetItem) {
	var base = REPAIR_COST_LIMIT.base,
		material = REPAIR_COST_LIMIT.material,
		other = REPAIR_COST_LIMIT.other
	if (targetItem in other) return other[targetItem]
	var _a = targetItem.split('_'),
		mat = _a[0],
		item = _a[1]
	var limit = base[item] + material[mat]
	return limit
}
function getNextRepairCost(repairCost, enchant, isPlus) {
	var panalty = ENCHANT_PANALTY[enchant]
	if (enchant === 'fail') return repairCost + 1
	var nextRepairCost = isPlus ? repairCost + panalty * 2 : repairCost + panalty
	return nextRepairCost
}
function getEssenceInfo(slot) {
	var enchantEssence = {
		enchantEssenceLow: ITEM_SETTINGS['enchantEssenceLow'],
		enchantEssenceMedium: ITEM_SETTINGS['enchantEssenceMedium'],
		enchantEssenceHigh: ITEM_SETTINGS['enchantEssenceHigh'],
	}
	for (var essence in enchantEssence) {
		var code = enchantEssence[essence].code
		var placeholder = 'checkitem_amount_inslot:'.concat(slot, ',lorecontains:').concat(code)
		var checkEssence = parseInt(parsePlaceholder(placeholder)) > 0
		if (checkEssence)
			return __assign(__assign({}, enchantEssence[essence]), {
				amount: parseInt(parsePlaceholder(placeholder)),
			})
	}
	return false
}
function randomEnchantChance(isPlus) {
	var chance = isPlus ? RANDOM_ENCHANT_CHANCE.plus : RANDOM_ENCHANT_CHANCE.normal
	var successChance = 100 * chance
	var rand = Math.floor(Math.random() * 100)
	return rand < successChance
}
function getBoostedChance() {
	var enchantEssence = {
		enchantEssenceLow: 0.001,
		enchantEssenceMedium: 0.005,
		enchantEssenceHigh: 0.01,
	}
	var niddle = 'ES-ES'
	var slot = -1
	for (var i = 1; i <= 8; i++) {
		var placeholder = 'checkitem_inslot:'.concat(i, ',lorecontains:').concat(niddle)
		var essenceExists = parsePlaceholder(placeholder) === 'yes'
		if (essenceExists) {
			slot = i
			break
		}
	}
	if (slot === -1) return 0
	var essence = getEssenceInfo(slot)
	if (!essence) return 0
	var _a = essence,
		eiCode = _a.eiCode,
		amount = _a.amount
	var boost = enchantEssence[eiCode] * amount
	if (!removeSlotItem(slot)) return 0
	return boost
}
function getSuccessChance(enchant, level, isPlus) {
	var chance = ENCHANT_CHANCE.chance,
		rarityWeight = ENCHANT_CHANCE.rarityWeight
	var success = (isPlus ? chance.plus : chance.normal).success
	var nextLevel = isPlus ? level + 1 : level
	var boosted = enchant !== 'random' ? getBoostedChance() : 0
	var successChance =
		1000 * (success[nextLevel] * getEventMultiplier() + boosted) * rarityWeight[enchant]
	return successChance
}
function getFailChance(enchant, level, isPlus) {
	var chance = ENCHANT_CHANCE.chance
	var fail = (isPlus ? chance.plus : chance.normal).fail
	var nextLevel = isPlus ? level + 1 : level
	var failChance = 100 * fail[nextLevel]
	return failChance
}
function getEnchantResult(enchantData, enchant, isPlus) {
	var level = enchantData[enchant]
	var successChance = getSuccessChance(enchant, level, isPlus)
	var rand = Math.floor(Math.random() * 1000)
	if (rand < successChance) {
		var successEnchantData = getNextEnchantData(true, enchantData, enchant, isPlus)
		return {
			success: true,
			sideEffect: false,
			enchantData: successEnchantData,
		}
	}
	var sideRand = Math.floor(Math.random() * 100)
	var sideEffectChance = getFailChance(enchant, level, isPlus)
	if (sideRand < sideEffectChance) {
		if (isPlus)
			return {
				success: false,
				sideEffect: true,
				enchantData: enchantData,
			}
		var failEnchantData = getNextEnchantData(false, enchantData, enchant, isPlus)
		return {
			success: false,
			sideEffect: true,
			enchantData: failEnchantData,
		}
	}
	return {
		success: false,
		sideEffect: false,
		enchantData: enchantData,
	}
}
function getRandomEnchantResult(enchantData) {
	var nextEnchantData = enchantData
	var result = {
		upgraded: [],
		downgraded: [],
	}
	for (var enchant in enchantData) {
		if (ENCHANT_BLAKLIST.includes(enchant)) continue
		var rand = Math.floor(Math.random() * 1000)
		var level = enchantData[enchant]
		var successChance = getSuccessChance(enchant, level, false)
		if (rand < successChance) {
			nextEnchantData[enchant] = nextEnchantData[enchant] + 1
			result.upgraded.push(enchant)
		}
		var sideRand = Math.floor(Math.random() * 100)
		var sideEffectChance = getFailChance(enchant, level, false)
		if (sideRand < sideEffectChance) {
			nextEnchantData[enchant] = nextEnchantData[enchant] - 1
			result.downgraded.push(enchant)
		}
	}
	return {
		enchantData: nextEnchantData,
		result: result,
	}
}
function getNextEnchantData(result, enchantData, enchant, isPlus) {
	var _a, _b
	if (result)
		return __assign(
			__assign({}, enchantData),
			((_a = {}), (_a[enchant] = isPlus ? enchantData[enchant] + 2 : enchantData[enchant] + 1), _a)
		)
	return __assign(
		__assign({}, enchantData),
		((_b = {}), (_b[enchant] = enchantData[enchant] - 1), _b)
	)
}
function broadcastSuccess(playerName, enchant, nextLevel) {
	var krName = getKrName(40)
	var krEnchant = getKrEnchantName(enchant)
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(krName, '&f\uC758 #FFFFB5&l')
		.concat(krEnchant, ' \uC778\uCC48\uD2B8 &6&l+')
		.concat(nextLevel, ' &f\uAC15\uD654\uC5D0 &a&l\uC131\uACF5&f\uD588\uC2B5\uB2C8\uB2E4.')
	return broadcastMessage(message)
}
function broadcastFail(playerName, enchant, nextLevel) {
	var krName = getKrName(40)
	var krEnchant = getKrEnchantName(enchant)
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(krName, '&f\uC758 #FFFFB5&l')
		.concat(krEnchant, ' \uC778\uCC48\uD2B8 &6&l+')
		.concat(nextLevel, ' &f\uAC15\uD654\uC5D0 &c&l\uC2E4\uD328&f\uD588\uC2B5\uB2C8\uB2E4.')
	return broadcastMessage(message)
}
function broadcastRandomSuccess(playerName) {
	var krName = getKrName(40)
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(
			krName,
			'&f\uC758 #FFFFB5&l\uC778\uCC48\uD2B8 &6&l\uB79C\uB364 &f\uAC15\uD654\uC5D0 &a&l\uC131\uACF5&f\uD588\uC2B5\uB2C8\uB2E4.'
		)
	return broadcastMessage(message)
}
function broadcastRandomFail(playerName) {
	var krName = getKrName(40)
	var message = '&b&l'
		.concat(playerName, '&f\uB2D8\uC774 &7&l')
		.concat(
			krName,
			'&f\uC758 #FFFFB5&l\uC778\uCC48\uD2B8 &6&l\uB79C\uB364 &f\uAC15\uD654\uC5D0 &c&l\uC2E4\uD328&f\uD588\uC2B5\uB2C8\uB2E4.'
		)
	return broadcastMessage(message)
}
function sendScrollMessage(scrollName, repairCost, nextRepairCost) {
	var message = '&7[&6\uAC15\uD654&7] '
		.concat(scrollName, '&f\uB97C \uC0AC\uC6A9\uD588\uC2B5\uB2C8\uB2E4. &7(\uD328\uB110\uD2F0: ')
		.concat(repairCost, ' -> ')
		.concat(nextRepairCost, ')')
	sendMessage(consoleColorString(message))
}
function applyNormalEnchant(enchantData, enchant, displayData, nbtData, isPlus) {
	var Damage = nbtData.Damage,
		RepairCost = nbtData.RepairCost
	var name = (isPlus ? ENCHANT_SCROLLS[enchant].plus : ENCHANT_SCROLLS[enchant].normal).name
	var _a = getEnchantResult(enchantData, enchant, isPlus),
		success = _a.success,
		sideEffect = _a.sideEffect,
		nextEnchantData = _a.enchantData
	var isProtected = false
	if (isPlus) {
		var _b = getItemInfo('protectScroll'),
			name_1 = _b.name,
			code = _b.code
		if (removeItem(code, 1)) {
			isProtected = true
			var message = '&7[&6\uAC15\uD654&7] '.concat(
				name_1,
				'&f\uC758 &a&l\uC2E0\uBE44\uB85C\uC6B4 \uD798\uC774 &f\uC544\uC774\uD15C\uC5D0 \uC804\uD574\uC84C\uC2B5\uB2C8\uB2E4.'
			)
			sendMessage(consoleColorString(message))
		}
	}
	if (success) {
		playSound('block.anvil.use', PLAYER_NAME)
		var _c = TITLE_SETTINGS.success,
			title_1 = _c.title,
			subtitle_1 = _c.subtitle
		var nextRepairCost_1 = getNextRepairCost(RepairCost, enchant, isPlus)
		sendScrollMessage(name, RepairCost, nextRepairCost_1)
		playTitle(title_1, subtitle_1, PLAYER_NAME)
		broadcastSuccess(PLAYER_NAME, enchant, nextEnchantData[enchant])
		replaceItem(
			PLAYER_NAME,
			{ Damage: Damage, RepairCost: nextRepairCost_1 },
			displayData,
			nextEnchantData
		)
		return 'success'
	}
	var nextRepairCost = getNextRepairCost(RepairCost, 'fail', false)
	var failNBTData = { Damage: Damage, RepairCost: nextRepairCost }
	var nextLevel = isPlus ? nextEnchantData[enchant] + 2 : nextEnchantData[enchant] + 1
	if (sideEffect && !isProtected) {
		playSound('entity.item.break', PLAYER_NAME)
		var _d = isPlus ? TITLE_SETTINGS.destroy : TITLE_SETTINGS.downgrade,
			title_2 = _d.title,
			subtitle_2 = _d.subtitle
		playTitle(title_2, subtitle_2, PLAYER_NAME)
		isPlus
			? sendScrollMessage(name, RepairCost, 5)
			: sendScrollMessage(name, RepairCost, nextRepairCost)
		broadcastFail(PLAYER_NAME, enchant, nextLevel)
		isPlus
			? destroyItem(PLAYER_NAME)
			: replaceItem(PLAYER_NAME, failNBTData, displayData, nextEnchantData)
		return 'sideeffect'
	}
	playSound('entity.villager.no', PLAYER_NAME)
	var _e = TITLE_SETTINGS.fail,
		title = _e.title,
		subtitle = _e.subtitle
	sendScrollMessage(name, RepairCost, nextRepairCost)
	playTitle(title, subtitle, PLAYER_NAME)
	broadcastFail(PLAYER_NAME, enchant, nextLevel)
	replaceItem(PLAYER_NAME, failNBTData, displayData, nextEnchantData)
	return 'fail'
}
function applyRandomEnchant(enchantData, displayData, nbtData, isPlus) {
	var Damage = nbtData.Damage,
		RepairCost = nbtData.RepairCost
	var name = ENCHANT_SCROLLS['random'].normal.name
	if (!randomEnchantChance(isPlus)) {
		playSound('entity.item.break', PLAYER_NAME)
		var _a = isPlus ? TITLE_SETTINGS.destroy : TITLE_SETTINGS.failRandom,
			title_3 = _a.title,
			subtitle_3 = _a.subtitle
		playTitle(title_3, subtitle_3, PLAYER_NAME)
		var nextRepairCost_2 = getNextRepairCost(RepairCost, 'random', isPlus)
		var failNBTData = { Damage: Damage, RepairCost: nextRepairCost_2 }
		isPlus
			? sendScrollMessage(name, RepairCost, 5)
			: sendScrollMessage(name, RepairCost, nextRepairCost_2)
		broadcastRandomFail(PLAYER_NAME)
		isPlus
			? destroyItem(PLAYER_NAME)
			: replaceItem(PLAYER_NAME, failNBTData, displayData, enchantData)
		return 'fail'
	}
	var _b = getRandomEnchantResult(enchantData),
		nextEnchantData = _b.enchantData,
		_c = _b.result,
		upgraded = _c.upgraded,
		downgraded = _c.downgraded
	var nextRepairCost = getNextRepairCost(RepairCost, 'random', isPlus)
	sendScrollMessage(name, RepairCost, nextRepairCost)
	playSound('block.anvil.use', PLAYER_NAME)
	var _d = TITLE_SETTINGS.successRandom,
		title = _d.title,
		subtitle = _d.subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	broadcastRandomSuccess(PLAYER_NAME)
	replaceItem(
		PLAYER_NAME,
		{ Damage: Damage, RepairCost: nextRepairCost },
		displayData,
		nextEnchantData
	)
	return 'success'
}
function checkEnchant(args) {
	var returnType = args[1],
		enchant = args[2]
	var _a = VALID_ENCHANTS[enchant],
		suffixes = _a.suffixes,
		items = _a.items
	var targetItem = parsePlaceholder('player_item_in_offhand')
	var checkSuffix = suffixes.some(function (suffix) {
		return targetItem.includes(suffix)
	})
	var checkItem = items.some(function (item) {
		return targetItem.includes(item)
	})
	return checkSuffix || checkItem
}
function checkUpgradable(args) {
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	var checkPlus = isPlus === '1'
	var enchantData = getEnchantData(40)
	var cond = checkEnchantLevelLimit(enchantData, enchant, checkPlus)
	return cond
}
function checkValidItem(args) {
	var returnType = args[1],
		isPlus = args[2]
	var checkPlus = isPlus === '1'
	if (!isEnchanted(40)) return false
	var enchantData = getEnchantData(40)
	var count = 0
	for (var enchant in enchantData) {
		if (ENCHANT_BLAKLIST.includes(enchant)) continue
		if (!checkEnchantLevelLimit(enchantData, enchant, checkPlus)) return false
		count++
	}
	return count > 0
}
function checkRepairCostLimit(args) {
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	var checkPlus = isPlus === '1'
	var targetItem = parsePlaceholder('player_item_in_offhand')
	var limit = getItemCostLimit(targetItem)
	var cost = getRepairCost(40)
	var nextCost = getNextRepairCost(cost, enchant, checkPlus)
	var checkLimit = limit >= nextCost
	return checkLimit
}
function repairCostLimit(args) {
	var returnType = args[1]
	var targetItem = parsePlaceholder('player_item_in_offhand')
	var limit = getItemCostLimit(targetItem)
	return limit
}
function applyEnchant(args) {
	var returnType = args[1],
		enchant = args[2],
		isPlus = args[3]
	var checkPlus = isPlus === '1'
	var enchantData = getEnchantData(40)
	var damage = getDamage(40)
	var repairCost = getRepairCost(40)
	var displayName = getDisplayName()
	var lore = getLore()
	var nbtData = {
		Damage: damage,
		RepairCost: repairCost,
	}
	var displayData = {
		Name: displayName,
		Lore: lore,
	}
	if (isEventDay()) {
		var multiplier = getEventMultiplier()
		var message =
			'&7[&6\uAC15\uD654&7] &c&l\uD56B\uD0C0\uC784 &e&l\uC774\uBCA4\uD2B8&f\uB85C &9&l\uAC15\uD654\uD655\uB960&f\uC774 &6&l'.concat(
				multiplier,
				'&7\uBC30 &f\uC99D\uAC00\uD588\uC2B5\uB2C8\uB2E4.'
			)
		sendMessage(consoleColorString(message))
	}
	if (enchant === 'random') return applyRandomEnchant(enchantData, displayData, nbtData, checkPlus)
	return applyNormalEnchant(enchantData, enchant, displayData, nbtData, checkPlus)
}
function hasEnchant(args) {
	var returnType = args[1]
	var enchanted = isEnchanted(40)
	return enchanted
}
function hasRepairCost(args) {
	var returnType = args[1]
	var repairCost = getRepairCost(40)
	return repairCost > 0
}
function applyReducer(args) {
	var returnType = args[1],
		reducer = args[2]
	var costReducer = {
		low: {
			itemCode: 'costReducerLow',
			cost: 1,
		},
		medium: {
			itemCode: 'costReducerMedium',
			cost: 5,
		},
		high: {
			itemCode: 'costReducerHigh',
			cost: 10,
		},
	}
	var _a = costReducer[reducer],
		itemCode = _a.itemCode,
		cost = _a.cost
	var damage = getDamage(40)
	var repairCost = getRepairCost(40)
	var nextRepairCost = repairCost - cost
	var nbtData = {
		Damage: damage,
		RepairCost: nextRepairCost < 0 ? 0 : nextRepairCost,
	}
	var displayData = {
		Name: getDisplayName(),
		Lore: getLore(),
	}
	var enchantData = getEnchantData(40)
	replaceItem(PLAYER_NAME, nbtData, displayData, enchantData)
	var name = ITEM_SETTINGS[itemCode].name
	var message = '&7[&6\uAC15\uD654&7] '
		.concat(
			name,
			'&f\uB97C \uC0AC\uC6A9\uD574 &c&l\uD328\uB110\uD2F0&f\uB97C &6&l\uC815\uD654&f\uD588\uC2B5\uB2C8\uB2E4. &7('
		)
		.concat(repairCost, ' -> ')
		.concat(nbtData.RepairCost, ')')
	sendMessage(consoleColorString(message))
	playSound('entity.player.levelup', PLAYER_NAME)
	return nbtData.RepairCost
}
function fixLore() {
	var returnType = args[1]
	var damage = getDamage(40)
	var repairCost = getRepairCost(40)
	var nbtData = {
		Damage: damage,
		RepairCost: repairCost,
	}
	var displayData = {
		Name: getDisplayName(),
		Lore: getLore(),
	}
	var enchantData = getEnchantData(40)
	replaceItem(PLAYER_NAME, nbtData, displayData, enchantData)
	var message =
		'&7[&6\uAC15\uD654&7] &7&l\uC544\uC774\uD15C \uC815\uBCF4&f\uB97C &6&l\uC218\uC815&f\uD588\uC2B5\uB2C8\uB2E4. '
	sendMessage(consoleColorString(message))
	playSound('block.anvil.use', PLAYER_NAME)
	return true
}
function enchantScrollCore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
		checkEnchant: {
			argLen: [3],
			callback: checkEnchant,
		},
		checkUpgradable: {
			argLen: [4],
			callback: checkUpgradable,
		},
		checkValidItem: {
			argLen: [3],
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
		applyEnchant: {
			argLen: [4],
			callback: applyEnchant,
		},
		hasEnchant: {
			argLen: [2],
			callback: hasEnchant,
		},
		hasRepairCost: {
			argLen: [2],
			callback: hasRepairCost,
		},
		applyReducer: {
			argLen: [3],
			callback: applyReducer,
		},
		fixLore: {
			argLen: [2],
			callback: fixLore,
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
enchantScrollCore()
