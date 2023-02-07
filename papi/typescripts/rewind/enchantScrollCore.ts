/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollCore.ts
 * Version: v1.6.2
 * Last Update: 2023-02-07
 *
 * TypeScript Version: v4.9.5
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
type ValidEnchantType = {
	suffixes: Array<string>
	items: Array<string>
	krName: string
}

type EnchantChanceType = {
	chance: {
		normal: {
			success: Array<number>
			fail: Array<number>
		}
		plus: {
			success: Array<number>
			fail: Array<number>
		}
	}
	rarityWeight: { [index: string]: number }
}

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

type ItemInfoType = {
	name: string
	placeholder: string
	code: string
	eiCode: string
	mat: string
	amount?: number
}

type StrictItemInfoType = MakeRequired<ItemInfoType, 'amount'>

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

// valid enchant settings
const VALID_ENCHANTS: { [index: string]: ValidEnchantType } = {
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
	mending: {
		suffixes: [],
		items: [],
		krName: '수선',
	},
	silk_touch: {
		suffixes: [],
		items: [],
		krName: '섬세한 손길',
	},
	aqua_affinity: {
		suffixes: [],
		items: [],
		krName: '친수성',
	},
	flame: {
		suffixes: [],
		items: [],
		krName: '화염',
	},
	infinity: {
		suffixes: [],
		items: [],
		krName: '무한',
	},
	channeling: {
		suffixes: [],
		items: [],
		krName: '집전',
	},
	multishot: {
		suffixes: [],
		items: [],
		krName: '다중 발사',
	},
	binding_curse: {
		suffixes: [],
		items: [],
		krName: '귀속 저주',
	},
	vanishing_curse: {
		suffixes: [],
		items: [],
		krName: '소실 저주',
	},
}

// banned enchant list
const ENCHANT_BLAKLIST: Array<string> = [
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

// enchant level limit settings
// [enchantments]: [min, max]
// if plus scroll, max = max - 1
const ENCHANT_LIMIT: { [index: string]: Array<number> } = {
	mending: [1, 1],
	silk_touch: [1, 1],
	unbreaking: [3, 20],
	efficiency: [5, 20],
	fortune: [3, 12],
	aqua_affinity: [1, 1],
	respiration: [3, 10],
	thorns: [3, 15],
	protection: [4, 15],
	projectile_protection: [4, 15],
	fire_protection: [4, 15],
	blast_protection: [4, 15],
	swift_sneak: [3, 10],
	feather_falling: [4, 10],
	soul_speed: [3, 10],
	depth_strider: [3, 10],
	frost_walker: [2, 7],
	fire_aspect: [2, 5],
	looting: [3, 12],
	knockback: [2, 10],
	sweeping: [3, 10],
	sharpness: [5, 20],
	smite: [5, 20],
	bane_of_arthropods: [5, 20],
	cleaving: [3, 10],
	power: [5, 20],
	punch: [2, 10],
	flame: [1, 1],
	infinity: [1, 1],
	lure: [3, 12],
	luck_of_the_sea: [3, 12],
	impaling: [5, 20],
	channeling: [1, 1],
	loyalty: [3, 10],
	riptide: [3, 10],
	quick_charge: [3, 10],
	piercing: [4, 20],
	multishot: [1, 1],
}

// normal enchant chance settings
const ENCHANT_CHANCE: EnchantChanceType = {
	chance: {
		normal: {
			success: [
				1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.05, 0.01, 0.005,
				0.001, 0.0005, 0.0001,
			],
			fail: [
				0, 0, 0, 0.05, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1,
				1,
			],
		},
		plus: {
			success: [
				1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.05, 0.01, 0.005,
				0.001, 0.0005, 0.0001,
			],
			fail: [
				0, 0, 0, 0.05, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1,
				1,
			],
		},
	},
	rarityWeight: {
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
	},
}

// random enchant chance settings
const RANDOM_ENCHANT_CHANCE: { normal: number; plus: number } = {
	normal: 0.5,
	plus: 0.6,
}

// event settings
const EVENT_DAYS: Array<number> = []
const EVENT_CHANCE_MULTIPLIER: number = 1

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

// enchant panalty settings (class 1 to 5)
const ENCHANT_PANALTY: { [index: string]: number } = {
	unbreaking: 2,
	efficiency: 3,
	fortune: 4,
	respiration: 2,
	thorns: 2,
	protection: 3,
	projectile_protection: 3,
	fire_protection: 3,
	blast_protection: 3,
	swift_sneak: 3,
	feather_falling: 3,
	soul_speed: 2,
	depth_strider: 2,
	frost_walker: 2,
	fire_aspect: 1,
	looting: 4,
	knockback: 1,
	sweeping: 2,
	sharpness: 3,
	smite: 3,
	bane_of_arthropods: 2,
	cleaving: 3,
	power: 3,
	punch: 1,
	lure: 2,
	luck_of_the_sea: 3,
	impaling: 3,
	loyalty: 2,
	riptide: 2,
	piercing: 3,
	random: 5,
}

// EI::enchant scroll item settings
const ENCHANT_SCROLLS: {
	[index: string]: {
		normal: { name: string; eiCode: string }
		plus: { name: string; eiCode: string }
	}
} = {
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

// EI::special item settings
const SPECIAL_ITEMS: { [index: string]: ItemInfoType } = {
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

// title & subtitle settings
const TITLE_SETTINGS: {
	[index: string]: { title: TitleType | Array<TitleType>; subtitle: TitleType | Array<TitleType> }
} = {
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

// remove color codes from text
function removeColorCodes(text: string): string {
	// color code pattern
	const regex = /#[a-f0-9]{6}|&[0-9A-FK-OR]/gi

	// return result
	return text.replace(regex, '')
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
	/* 
		lore data format
		[
			[
				{"text":"hello","italic":false,"color":"gray"}
			],
			[
				{"text":"hello2","italic":false,"color":"gray"}
			],
			[
				{"text":"hello3","italic":false,"color":"gray"}
			]
		]
	*/

	// create enchant lore string
	const enchantLore: Array<string> = []
	for (const enchant in enchantData) {
		const levelStr = ENCHANT_BLAKLIST.includes(enchant) ? '' : ENCHANT_LEVEL[enchantData[enchant]]
		enchantLore.push(
			JSON.stringify([
				{
					text: `${VALID_ENCHANTS[enchant].krName} ${levelStr}`,
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

// create uuid v4
function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
		let r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

// convert uuid to nbtUUID format
function toNbtUuid(uuid: string): string {
	return `[I;${uuid
		?.replace(/-/g, '')
		?.match(/.{8}/g)
		?.map((str: string) => parseInt(str, 16))
		.map((num: number) => (num & 0x80000000 ? num - 0xffffffff - 1 : num))
		.join(',')}]`
}

// get nbt uuid string
function nbtUuid(): string {
	return toNbtUuid(uuidv4())
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

// destory item (when fails enchant)
function destroyItem(playerName: string) {
	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()

	// get kr name of item
	const krName = getKrName(40)

	// set command
	const command = `minecraft:item replace entity ${playerName} weapon.offhand with ${targetItem}{Damage:99999,RepairCost:5,display:{Name:'[{"text":"파괴된","italic":false,"bold":true,"color":"red"},{"text":" ${krName}","italic":false,"bold":true,"color":"aqua"},{"text":"의 흔적","color":"gray"}]',Lore:['[{"text":"강화에 실패해 파괴된 아이템의 흔적이다.","italic":false,"color":"gray"}]','[{"text":"복구할 수 없을 것 같다.","italic":false,"color":"gray"}]','[{"text":""}]','[{"text":"아이템 소유자:","italic":false,"color":"gray"},{"text":" ${playerName}","italic":false,"color":"red"}]']}}`

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

// get settings of items
function getItemInfo(itemCode: string): ItemInfoType {
	// return info object
	return SPECIAL_ITEMS[itemCode]
}

// get amount of specific item in player's inventory
function getInventoryItemAmount(item: string): number {
	// get placeholder
	const { placeholder } = getItemInfo(item)

	// get item amount
	const amount = parsePlaceholder(placeholder)

	// return amount as number
	return parseInt(amount)
}

// remove specific item
function removeItem(itemCode: string, amount?: number): boolean {
	// set placeholder
	const placeholder =
		typeof amount === 'undefined'
			? `checkitem_remove_lorecontains:${itemCode}`
			: `checkitem_remove_lorecontains:${itemCode},amt:${amount}`

	// remove item
	return parsePlaceholder(placeholder) === 'yes'
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
  [ enchant scroll utilities ]
*/
// get enchant KR name
function getKrEnchantName(enchant: string): string {
	// get settings
	const { krName } = VALID_ENCHANTS[enchant]

	return krName
}

// check if in event day
function isEventDay(): boolean {
	// check day of today
	const today = new Date()
	const day = today.getDay()

	// if today is event day
	return EVENT_DAYS.includes(day)
}

// get event chance multiplier if today is event day
function getEventMultiplier(level: number): number {
	// if over +10, no event multiplier
	if (level >= 11) return 1

	// check today is event day
	if (isEventDay()) return EVENT_CHANCE_MULTIPLIER
	return 1
}

// check specific enchant's level limit
function checkEnchantLevelLimit(
	enchantData: ItemEnchantDataType,
	enchant: string,
	isPlus: boolean
): boolean {
	// get specific enchant's data
	const level = enchantData[enchant]

	// get limit of the enchant
	const [min, max] = ENCHANT_LIMIT[enchant]

	// check plus offset
	const offset = isPlus ? -1 : 0

	// check valid range of enchant level
	const cond = level >= min && level < max + offset

	// return result
	return cond
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

// get repair cost after enchant scroll applied
function getNextRepairCost(repairCost: number, enchant: string, isPlus: boolean): number {
	// get panalty setting
	const panalty = ENCHANT_PANALTY[enchant]

	// check enchant failed
	if (enchant === 'fail') return repairCost + 1

	// calc repair cost
	const nextRepairCost = isPlus ? repairCost + panalty * 2 : repairCost + panalty

	// normal return
	return nextRepairCost
}

// check which essence exists in slot
function getEssenceInfo(slot: number): ItemInfoType | boolean {
	// get enchant essence settings
	const enchantEssence: { [index: string]: ItemInfoType } = {
		enchantEssenceLow: SPECIAL_ITEMS['enchantEssenceLow'],
		enchantEssenceMedium: SPECIAL_ITEMS['enchantEssenceMedium'],
		enchantEssenceHigh: SPECIAL_ITEMS['enchantEssenceHigh'],
	}

	// check kinds of essence
	for (const essence in enchantEssence) {
		// get code
		const { code } = enchantEssence[essence]

		// set placeholder
		const placeholder = `checkitem_amount_inslot:${slot},lorecontains:${code}`

		// checkitem result
		const checkEssence = parseInt(parsePlaceholder(placeholder)) > 0

		// return current essence's info if match
		if (checkEssence)
			return {
				...enchantEssence[essence],
				amount: parseInt(parsePlaceholder(placeholder)),
			}
	}

	// no match
	return false
}

// check random enchant scroll chance
function randomEnchantChance(isPlus: boolean): boolean {
	// get chance setting
	const chance = isPlus ? RANDOM_ENCHANT_CHANCE.plus : RANDOM_ENCHANT_CHANCE.normal

	// calc success chance
	const successChance = 100 * chance

	// random number
	const rand = Math.floor(Math.random() * 100)

	// success
	return rand < successChance
}

// get boosted chance
function getBoostedChance(): number {
	// enchant essence setting
	const enchantEssence: { [index: string]: number } = {
		enchantEssenceLow: 0.001,
		enchantEssenceMedium: 0.005,
		enchantEssenceHigh: 0.01,
	}

	// enchant essence placeholder
	const niddle = 'ES-ES'

	// init slot
	let slot: number = -1

	// check player's quick slots (1 ~ 8)
	for (let i = 1; i <= 8; i++) {
		// set placeholder
		const placeholder = `checkitem_inslot:${i},lorecontains:${niddle}`

		// check essence item exists
		const essenceExists = parsePlaceholder(placeholder) === 'yes'

		// save slot if essence item found
		if (essenceExists) {
			slot = i
			break
		}
	}

	// check if no essence
	if (slot === -1) return 0

	// get essence info
	const essence = getEssenceInfo(slot)

	// if invalid essence info
	if (!essence) return 0

	// calc boosted chance
	const { eiCode, amount } = essence as StrictItemInfoType
	const boost = enchantEssence[eiCode] * amount

	// remove used essence
	if (!removeSlotItem(slot)) return 0

	// return boosted chance
	return boost
}

// calc enchant scroll success chance
function getSuccessChance(enchant: string, level: number, isPlus: boolean): number {
	// get enchant settings
	const { chance, rarityWeight } = ENCHANT_CHANCE

	// get success, fail chance
	const { success } = isPlus ? chance.plus : chance.normal

	// set next enchant level
	const nextLevel = isPlus ? level + 1 : level

	// get boosted chance by enchant essences
	const boosted = enchant !== 'random' ? getBoostedChance() : 0

	// calc success chance
	const successChance =
		10000 * (success[nextLevel] * getEventMultiplier(level) + boosted) * rarityWeight[enchant]

	// return success chance
	return successChance
}

// calc enchant scroll fail(side effect) chance
function getFailChance(enchant: string, level: number, isPlus: boolean): number {
	// get enchant settings
	const { chance } = ENCHANT_CHANCE

	// get success, fail chance
	const { fail } = isPlus ? chance.plus : chance.normal

	// set next enchant level
	const nextLevel = isPlus ? level + 1 : level

	// calc fail chance
	const failChance = 100 * fail[nextLevel]

	// return fail chance
	return failChance
}

// get enchant scroll result
function getEnchantResult(
	enchantData: ItemEnchantDataType,
	enchant: string,
	isPlus: boolean
): { success: boolean; sideEffect: boolean; enchantData: ItemEnchantDataType } {
	// get enchant level
	const level = enchantData[enchant]

	// calc success chance
	const successChance = getSuccessChance(enchant, level, isPlus)

	// random number
	const rand = Math.floor(Math.random() * 10000)

	// success
	if (rand < successChance) {
		// get enchant data after scroll applied
		const successEnchantData = getNextEnchantData(true, enchantData, enchant, isPlus)

		// return result (upgraded)
		return {
			success: true,
			sideEffect: false,
			enchantData: successEnchantData,
		}
	}

	// random number
	const sideRand = Math.floor(Math.random() * 100)

	// calc side effect chance
	const sideEffectChance = getFailChance(enchant, level, isPlus)

	// side effect
	if (sideRand < sideEffectChance) {
		// return result (destroyed)
		if (isPlus)
			return {
				success: false,
				sideEffect: true,
				enchantData,
			}

		// get enchant data after scroll applied
		const failEnchantData = getNextEnchantData(false, enchantData, enchant, isPlus)

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
		enchantData,
	}
}

// get random enchant scroll result
function getRandomEnchantResult(enchantData: ItemEnchantDataType): {
	enchantData: ItemEnchantDataType
	result: {
		[index: string]: Array<string>
		upgraded: Array<string>
		downgraded: Array<string>
	}
} {
	// init enchant data
	const nextEnchantData = enchantData

	// result object
	const result: {
		[index: string]: Array<string>
		upgraded: Array<string>
		downgraded: Array<string>
	} = {
		upgraded: [],
		downgraded: [],
	}

	// check every available enchants
	for (const enchant in enchantData) {
		// check invalid enchants
		if (ENCHANT_BLAKLIST.includes(enchant)) continue

		// random number
		const rand = Math.floor(Math.random() * 10000)

		// get enchant level
		const level = enchantData[enchant]

		// calc success chance
		const successChance = getSuccessChance(enchant, level, false)

		// success
		if (rand < successChance) {
			// upgrade enchant
			nextEnchantData[enchant] = nextEnchantData[enchant] + 1

			// save result
			result.upgraded.push(enchant)
		}

		// random number
		const sideRand = Math.floor(Math.random() * 100)

		// calc side effect chance
		const sideEffectChance = getFailChance(enchant, level, false)

		// side effect
		if (sideRand < sideEffectChance) {
			// downgrade enchant
			nextEnchantData[enchant] = nextEnchantData[enchant] - 1

			// save result
			result.downgraded.push(enchant)
		}
	}

	// return result
	return {
		enchantData: nextEnchantData,
		result,
	}
}

// get enchant data after scroll applied
function getNextEnchantData(
	result: boolean,
	enchantData: ItemEnchantDataType,
	enchant: string,
	isPlus: boolean
): ItemEnchantDataType {
	// success
	if (result)
		return {
			...enchantData,
			[enchant]: isPlus ? enchantData[enchant] + 2 : enchantData[enchant] + 1,
		}

	// fail
	return {
		...enchantData,
		[enchant]: enchantData[enchant] - 1,
	}
}

// send success message
function sendSuccessMessage(enchant: string, nextLevel: number): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// get kr name of enchant
	const krEnchant = getKrEnchantName(enchant)

	// set message
	const message = `&7[&6강화&7] &7&l${krName}&f의 #FFFFB5&l${krEnchant} 인챈트 &6&l+${nextLevel} &f강화에 &a&l성공&f했습니다.`

	// log to console
	logConsole(
		removeColorCodes(
			`[강화로그]${PLAYER_NAME}|${krName}|${enchant}|${krEnchant}|${nextLevel}|success|false|`
		)
	)

	// send message
	return sendMessage(consoleColorString(message))
}

// send fail message
function sendFailMessage(
	enchant: string,
	nextLevel: number,
	sideEffect: boolean,
	isProtected: boolean
): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// get kr name of enchant
	const krEnchant = getKrEnchantName(enchant)

	// set message
	const message = `&7[&6강화&7] &7&l${krName}&f의 #FFFFB5&l${krEnchant} 인챈트 &6&l+${nextLevel} &f강화에 &c&l실패&f했습니다.`

	// log to console
	logConsole(
		removeColorCodes(
			`[강화로그]${PLAYER_NAME}|${krName}|${enchant}|${krEnchant}|${nextLevel}|${
				isProtected ? 'protected' : 'fail'
			}|${sideEffect}|`
		)
	)

	// send message
	return sendMessage(consoleColorString(message))
}

// send success message
function sendRandomSuccessMessage(playerName: string): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// set message
	const message = `&7[&6강화&7] &7&l${krName}&f의 #FFFFB5&l인챈트 &6&l랜덤 &f강화에 &a&l성공&f했습니다.`

	// send message
	return sendMessage(consoleColorString(message))
}

// send fail message
function sendRandomFailMessage(playerName: string): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// set message
	const message = `&7[&6강화&7] &7&l${krName}&f의 #FFFFB5&l인챈트 &6&l랜덤 &f강화에 &c&l실패&f했습니다.`

	// send message
	return sendMessage(consoleColorString(message))
}

// broadcast success message
function broadcastSuccess(enchant: string, nextLevel: number): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// get kr name of enchant
	const krEnchant = getKrEnchantName(enchant)

	// set message
	const message = `&b&l${PLAYER_NAME}&f님이 &7&l${krName}&f의 #FFFFB5&l${krEnchant} 인챈트 &6&l+${nextLevel} &f강화에 &a&l성공&f했습니다.`

	// log to console
	logConsole(
		removeColorCodes(
			`[강화로그]${PLAYER_NAME}|${krName}|${enchant}|${krEnchant}|${nextLevel}|success|false|`
		)
	)

	// broadcast message
	return broadcastMessage(message)
}

// broadcast fail message
function broadcastFail(
	enchant: string,
	nextLevel: number,
	sideEffect: boolean,
	isProtected: boolean
): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// get kr name of enchant
	const krEnchant = getKrEnchantName(enchant)

	// set message
	const message = `&b&l${PLAYER_NAME}&f님이 &7&l${krName}&f의 #FFFFB5&l${krEnchant} 인챈트 &6&l+${nextLevel} &f강화에 &c&l실패&f했습니다.`

	// log to console
	logConsole(
		removeColorCodes(
			`[강화로그]${PLAYER_NAME}|${krName}|${enchant}|${krEnchant}|${nextLevel}|${
				isProtected ? 'protected' : 'fail'
			}|${sideEffect}|`
		)
	)

	// broadcast message
	return broadcastMessage(message)
}

// broadcast success message
function broadcastRandomSuccess(): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// set message
	const message = `&b&l${PLAYER_NAME}&f님이 &7&l${krName}&f의 #FFFFB5&l인챈트 &6&l랜덤 &f강화에 &a&l성공&f했습니다.`

	// log to console
	logConsole(removeColorCodes(`[강화로그]${PLAYER_NAME}|${krName}|random|랜덤|0|success|false|`))

	// broadcast message
	return broadcastMessage(message)
}

// broadcast fail message
function broadcastRandomFail(sideEffect: boolean): boolean {
	// get kr name of target item
	const krName = getKrName(40)

	// set message
	const message = `&b&l${PLAYER_NAME}&f님이 &7&l${krName}&f의 #FFFFB5&l인챈트 &6&l랜덤 &f강화에 &c&l실패&f했습니다.`

	// log to console
	logConsole(
		removeColorCodes(`[강화로그]${PLAYER_NAME}|${krName}|random|랜덤|0|fail|${sideEffect}|`)
	)

	// broadcast message
	return broadcastMessage(message)
}

// send message about enchant scroll use
function sendScrollMessage(scrollName: string, repairCost: number, nextRepairCost: number): void {
	// set message about item use
	const message = `&7[&6강화&7] ${scrollName}&f를 사용했습니다. &7(패널티: ${repairCost} -> ${nextRepairCost})`

	// send message
	sendMessage(consoleColorString(message))
}

// apply normal enchant scroll
function applyNormalEnchant(
	enchantData: ItemEnchantDataType,
	enchant: string,
	displayData: DisplayDataType,
	nbtData: ItemIntNBTDataType,
	isPlus: boolean
): string {
	// get integer nbt data
	const { Damage, RepairCost } = nbtData

	// get scroll name
	const { name } = isPlus ? ENCHANT_SCROLLS[enchant].plus : ENCHANT_SCROLLS[enchant].normal

	// get result after scroll applied
	const {
		success,
		sideEffect,
		enchantData: nextEnchantData,
	} = getEnchantResult(enchantData, enchant, isPlus)

	// check protect scroll
	let isProtected: boolean = false
	if (isPlus) {
		// get item name
		const { name, code } = getItemInfo('protectScroll')

		// remove protect scroll
		if (removeItem(code, 1)) {
			// set as protected
			isProtected = true

			// set message
			const message = `&7[&6강화&7] ${name}&f의 &a&l신비로운 힘이 &f아이템에 전해졌습니다.`

			// send protect scroll applied message
			sendMessage(consoleColorString(message))
		}
	}

	// success
	if (success) {
		// play sound effect
		if (nextEnchantData[enchant] >= 12) {
			playSound('ui.toast.challenge_complete', PLAYER_NAME)
		} else {
			playSound('block.anvil.use', PLAYER_NAME)
		}

		// get title setting
		const {
			success: { title, subtitle },
		} = TITLE_SETTINGS

		// get item repair cost after scroll applied
		const nextRepairCost = getNextRepairCost(RepairCost, enchant, isPlus)

		// send scroll message
		sendScrollMessage(name, RepairCost, nextRepairCost)

		// show title & subtitle
		playTitle(title, subtitle, PLAYER_NAME)

		// broadcast success message (+12 ~)
		if (nextEnchantData[enchant] >= 12) {
			broadcastSuccess(enchant, nextEnchantData[enchant])
		} else {
			// or send message to player
			sendSuccessMessage(enchant, nextEnchantData[enchant])
		}

		// replace target item
		replaceItem(PLAYER_NAME, { Damage, RepairCost: nextRepairCost }, displayData, nextEnchantData)

		// return result
		return 'success'
	}

	// get item repair cost after scroll applied
	const nextRepairCost = getNextRepairCost(RepairCost, 'fail', false)

	// set nbt data for failed result
	const failNBTData: ItemIntNBTDataType = { Damage, RepairCost: nextRepairCost }

	// get next enchant level
	const nextLevel = isPlus ? nextEnchantData[enchant] + 2 : nextEnchantData[enchant] + 1

	// side effect
	if (sideEffect && !isProtected) {
		// play sound effect
		playSound('entity.item.break', PLAYER_NAME)

		// get title setting
		const { title, subtitle } = isPlus ? TITLE_SETTINGS.destroy : TITLE_SETTINGS.downgrade

		// show title & subtitle
		playTitle(title, subtitle, PLAYER_NAME)

		// send scroll message
		isPlus
			? sendScrollMessage(name, RepairCost, 5)
			: sendScrollMessage(name, RepairCost, nextRepairCost)

		// broadcast fail message (+12 ~)
		if (nextLevel + 1 >= 12) {
			broadcastFail(enchant, isPlus ? nextLevel : nextLevel + 1, sideEffect, isProtected)
		} else {
			// or send message to player
			sendFailMessage(enchant, isPlus ? nextLevel : nextLevel + 1, sideEffect, isProtected)
		}

		// replace target item
		isPlus
			? destroyItem(PLAYER_NAME)
			: replaceItem(PLAYER_NAME, failNBTData, displayData, nextEnchantData)

		// return result
		return 'sideeffect'
	}

	// fail
	// play sound effect
	playSound('entity.villager.no', PLAYER_NAME)

	// get title setting
	const {
		fail: { title, subtitle },
	} = TITLE_SETTINGS

	// send scroll message
	sendScrollMessage(name, RepairCost, nextRepairCost)

	// show title & subtitle
	playTitle(title, subtitle, PLAYER_NAME)

	// broadcast fail message  (+12 ~)
	if (nextLevel >= 12) {
		broadcastFail(enchant, nextLevel, sideEffect, isProtected)
	} else {
		// or send message to player
		sendFailMessage(enchant, nextLevel, sideEffect, isProtected)
	}

	// replace target item
	replaceItem(PLAYER_NAME, failNBTData, displayData, nextEnchantData)

	// return result
	return 'fail'
}

// apply random enchant scroll
function applyRandomEnchant(
	enchantData: ItemEnchantDataType,
	displayData: DisplayDataType,
	nbtData: ItemIntNBTDataType,
	isPlus: boolean
): string {
	// get integer nbt data
	const { Damage, RepairCost } = nbtData

	// get scroll name
	const { name } = ENCHANT_SCROLLS['random'].normal

	// check random result
	if (!randomEnchantChance(isPlus)) {
		// play sound effect
		playSound('entity.villager.no', PLAYER_NAME)

		// get title setting
		const { title, subtitle } = TITLE_SETTINGS.failRandom

		// show title & subtitle
		playTitle(title, subtitle, PLAYER_NAME)

		// get item repair cost after scroll applied
		const nextRepairCost = getNextRepairCost(RepairCost, 'random', isPlus)

		// set nbt data for failed result
		const failNBTData: ItemIntNBTDataType = { Damage, RepairCost: nextRepairCost }

		// send scroll message
		sendScrollMessage(name, RepairCost, nextRepairCost)

		// broadcast fail message
		broadcastRandomFail(isPlus)

		// replace target item
		isPlus
			? destroyItem(PLAYER_NAME)
			: replaceItem(PLAYER_NAME, failNBTData, displayData, enchantData)

		// return result
		return 'fail'
	}

	// get result after scroll applied
	const { enchantData: nextEnchantData } = getRandomEnchantResult(enchantData)
	// get item repair cost after scroll applied
	const nextRepairCost = getNextRepairCost(RepairCost, 'random', isPlus)

	// send scroll message
	sendScrollMessage(name, RepairCost, nextRepairCost)

	// play sound effect
	playSound('block.anvil.use', PLAYER_NAME)
	// get title setting
	const {
		successRandom: { title, subtitle },
	} = TITLE_SETTINGS

	// show title & subtitle
	playTitle(title, subtitle, PLAYER_NAME)

	// broadcast success message
	broadcastRandomSuccess()

	// replace target item
	replaceItem(PLAYER_NAME, { Damage, RepairCost: nextRepairCost }, displayData, nextEnchantData)

	// return result
	return 'success'
}

/**
  [ action handler ] 
*/
// check target enchant or item is valid
function checkEnchant(args: string[]): ReturnDataType {
	// get args
	const [, returnType, enchant] = args

	// get target enchantment's info
	const { suffixes, items } = VALID_ENCHANTS[enchant]

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// check suffix matches
	const checkSuffix = suffixes.some((suffix) => targetItem.includes(suffix))

	// check item material matches
	const checkItem = items.some((item) => targetItem.includes(item))

	// normal return
	return checkSuffix || checkItem
}

// check target enchant of item is upgradable
function checkUpgradable(args: string[]): ReturnDataType {
	// get args
	const [, returnType, enchant, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get enchant data from target item
	const enchantData = getEnchantData(40)

	// check enchant level exceeds limit
	const cond = checkEnchantLevelLimit(enchantData, enchant, checkPlus)

	// normal return
	return cond
}

// check every enchants meets valid enchant settings (for random enchant scroll)
function checkValidItem(args: string[]): ReturnDataType {
	// get args
	const [, returnType, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// check item is enchanted
	if (!isEnchanted(40)) return false

	// get enchant data from target item
	const enchantData = getEnchantData(40)

	// count upgradable enchants
	let count = 0
	for (const enchant in enchantData) {
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
function checkRepairCostLimit(args: string[]): ReturnDataType {
	// get args
	const [, returnType, enchant, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// get repair cost limit
	const limit = getItemCostLimit(targetItem)

	// get current repair cost
	const cost = getRepairCost(40)

	// get next repair cost (after panalty applied)
	const nextCost = getNextRepairCost(cost, enchant, checkPlus)

	// check next repair cost exceeds limit
	const checkLimit = limit >= nextCost

	// normal return
	return checkLimit
}

// get repair cost limit of target item
function repairCostLimit(args: string[]): ReturnDataType {
	// get args
	const [, returnType] = args

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// get repair cost limit
	const limit = getItemCostLimit(targetItem)

	// return current repair cost
	if (returnType === '1') return getRepairCost(40)

	// normal return
	return limit
}

// apply enchant scroll to target item
function applyEnchant(args: string[]): ReturnDataType {
	// get args
	const [, returnType, enchant, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get enchant data
	const enchantData = getEnchantData(40)

	// get item damage info
	const damage = getDamage(40)

	// get item repair cost
	const repairCost = getRepairCost(40)

	// get item display name
	const displayName = getDisplayName()

	// get item lore
	const lore = getLore()

	// get nbt data after scroll applied
	const nbtData: ItemIntNBTDataType = {
		Damage: damage,
		RepairCost: repairCost,
	}

	// get display data
	const displayData: DisplayDataType = {
		Name: displayName,
		Lore: lore,
	}

	// check event
	if (isEventDay()) {
		// get event multiplier
		const multiplier = getEventMultiplier(0)

		// set message
		const message = `&7[&6강화&7] &c&l핫타임 &e&l이벤트&f로 &9&l강화확률&f이 &6&l${multiplier}&7배 &f증가했습니다. &7(+11부터는 적용되지 않음)`

		// send message
		sendMessage(consoleColorString(message))
	}

	// check random enchant scroll
	if (enchant === 'random') {
		applyRandomEnchant(enchantData, displayData, nbtData, checkPlus)

		// return number 1 or 0 for EI config
		return 1
	}

	// check normal enchant scroll
	applyNormalEnchant(enchantData, enchant, displayData, nbtData, checkPlus)

	// return number 1 or 0 for EI config
	return 1
}

// check target item has any enchants
function hasEnchant(args: string[]): ReturnDataType {
	// get args
	const [, returnType] = args

	// check if enchanted
	const enchanted = isEnchanted(40)

	// normal return
	return enchanted
}

// check target item has repair cost or larger than 0
function hasRepairCost(args: string[]): ReturnDataType {
	// get args
	const [, returnType] = args

	// get current repair cost
	const repairCost = getRepairCost(40)

	// normal return
	return repairCost > 0
}

// apply cost reducer to target item
function applyReducer(args: string[]): ReturnDataType {
	// get args
	const [, returnType, reducer] = args

	// cost reducer setting
	const costReducer: { [index: string]: { itemCode: string; cost: number } } = {
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

	// get reducer setting
	const { itemCode, cost } = costReducer[reducer]

	// get damage
	const damage = getDamage(40)

	// get current repair cost
	const repairCost = getRepairCost(40)

	// calc next repair cost
	const nextRepairCost = repairCost - cost

	// set nbt data
	const nbtData: ItemIntNBTDataType = {
		Damage: damage,
		RepairCost: nextRepairCost < 0 ? 0 : nextRepairCost,
	}

	// get display data
	const displayData: DisplayDataType = {
		Name: getDisplayName(),
		Lore: getLore(),
	}

	// get enchant data
	const enchantData = getEnchantData(40)

	// replace item (update repair cost)
	replaceItem(PLAYER_NAME, nbtData, displayData, enchantData)

	// get reducer name
	const { name } = SPECIAL_ITEMS[itemCode]

	// set message
	const message = `&7[&6강화&7] ${name}&f를 사용해 &c&l패널티&f를 &6&l정화&f했습니다. &7(${repairCost} -> ${nbtData.RepairCost})`

	// send message
	sendMessage(consoleColorString(message))

	// play sound effect
	playSound('entity.player.levelup', PLAYER_NAME)

	// return reduced repair cost
	return nbtData.RepairCost
}

// fix custom lore (hidden enchants)
function fixLore(): ReturnDataType {
	// get args
	const [, returnType] = args

	// get damage
	const damage = getDamage(40)

	// get current repair cost
	const repairCost = getRepairCost(40)

	// set nbt data
	const nbtData: ItemIntNBTDataType = {
		Damage: damage,
		RepairCost: repairCost,
	}

	// get display data
	const displayData: DisplayDataType = {
		Name: getDisplayName(),
		Lore: getLore(),
	}

	// get enchant data
	const enchantData = getEnchantData(40)

	// replace item (update repair cost)
	replaceItem(PLAYER_NAME, nbtData, displayData, enchantData)

	// set message
	const message = `&7[&6강화&7] &7&l아이템 정보&f를 &6&l수정&f했습니다. `

	// send message
	sendMessage(consoleColorString(message))

	// play sound effect
	playSound('block.anvil.use', PLAYER_NAME)

	// return result
	return 1
}

// placeholder controller
function enchantScrollCore(): string {
	// action result
	let result: any = false

	// get args
	const [action] = args

	// command(placeholder) settings
	const VALID_COMMANDS: { [index: string]: CommandObjectType } = {
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

enchantScrollCore()

export {}
