/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollRecipeCore.ts
 * Version: v1.2.0
 * Last Update: 2023-11-18
 *
 * TypeScript Version: v5.2.2
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

// available stored data types
type ReturnDataType = number | string | boolean

// for main command controller
type CommandObjectType = {
	argLen: Array<number>
	callback: (args: string[]) => ReturnDataType
}

// for title & subtitle command
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

// enchant scrolls
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
	quick_charge: {
		normal: {
			name: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l빠른장전 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollQuickCharge',
		},
		plus: {
			name: '&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l빠른장전 #ECEAE4&l강화 주문서',
			eiCode: 'enchantScrollQuickChargePlus',
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

// enchant scroll recipe types
const SCROLL_RECIPES: {
	[index: string]: { name: { normal: string; plus: string }; contents: Array<string> }
} = {
	toolScrolls: {
		name: {
			normal: '&7[#FFC8A2 ★ &7] #ECEAE4&l도구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
			plus: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l도구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		},
		contents: ['unbreaking', 'efficiency', 'fortune', 'luck_of_the_sea', 'lure'],
	},
	weaponScrolls: {
		name: {
			normal: '&7[#FFC8A2 ★ &7] #ECEAE4&l무기 주문서 #FF968A&l제작 #FFC8A2&l레시피',
			plus: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l무기 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		},
		contents: [
			'fire_aspect',
			'looting',
			'knockback',
			'sweeping',
			'sharpness',
			'smite',
			'bane_of_arthropods',
			'power',
			'punch',
			'impaling',
			'loyalty',
			'riptide',
			'piercing',
			'quick_charge',
		],
	},
	armorScrolls: {
		name: {
			normal: '&7[#FFC8A2 ★ &7] #ECEAE4&l방어구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
			plus: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l방어구 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		},
		contents: [
			'respiration',
			'thorns',
			'protection',
			'projectile_protection',
			'fire_protection',
			'blast_protection',
			'swift_sneak',
			'feather_falling',
			'soul_speed',
			'depth_strider',
			'frost_walker',
		],
	},
	specialScrolls: {
		name: {
			normal: '&7[#FFC8A2 ★ &7] #ECEAE4&l혼돈의 주문서 #FF968A&l제작 #FFC8A2&l레시피',
			plus: '&7[#FFC8A2 ★★ &7] #ECD5E3&l놀라운 #ECEAE4&l혼돈의 주문서 #FF968A&l제작 #FFC8A2&l레시피',
		},
		contents: ['random'],
	},
}

// plus scroll chance setting
const PLUS_SCROLL_CHANCE: { [index: string]: Array<number> } = {
	normal: [0.8, 0.2],
	plus: [0.2, 0.8],
}

// title & subtitle settings
const TITLE_SETTINGS: {
	[index: string]: { title: TitleType | Array<TitleType>; subtitle: TitleType | Array<TitleType> }
} = {
	makeScroll: {
		title: [
			{ text: '제', color: '#50fb00', bold: true },
			{ text: '작', color: '#7afc00', bold: true },
			{ text: '성', color: '#a4fc00', bold: true },
			{ text: '공', color: '#cefd00', bold: true },
			{ text: '!', color: '#f8fd00', bold: true },
		],
		subtitle: { 'text': '강화 주문서 제작에 성공했습니다', 'color': 'gray', 'bold': true },
	},
	makePlusScroll: {
		title: [
			{ text: '제', color: '#50fb00', bold: true },
			{ text: '작', color: '#72fb00', bold: true },
			{ text: '대', color: '#93fc00', bold: true },
			{ text: '성', color: '#b5fc00', bold: true },
			{ text: '공', color: '#d6fd00', bold: true },
			{ text: '!', color: '#f8fd00', bold: true },
		],
		subtitle: { 'text': '강화 주문서 제작에 성공했습니다', 'color': 'gray', 'bold': true },
	},
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
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}

// execute command as player
function execCommand(command: string): boolean {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}

// send message to player
function sendMessage(message: string | Array<string>): boolean {
	if (message === undefined || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}

// send message(log) to console
function logConsole(message: string | Array<string>): boolean {
	if (message === undefined || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
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

// give player ei item
function giveItemEI(itemCode: string, quantity: number, playerName: string): boolean {
	// set command
	const command = `ei give ${playerName} ${itemCode} ${quantity}`

	// execute command
	return execConsoleCommand(command)
}

/**
  [ enchant scroll recipe utilities ]
*/
// shuffle scroll arrays
function shuffleScroll(scrollArray: Array<string>): Array<string> {
	// get copy of scroll array
	const copiedArr = scrollArray.slice()

	// shuffle
	for (let i = copiedArr.length - 1; i > 0; i--) {
		// create random index
		const randomPos = Math.floor(Math.random() * (i + 1))

		// save tmp val
		const tmp = copiedArr[i]
		copiedArr[i] = copiedArr[randomPos]
		copiedArr[randomPos] = tmp
	}

	// return shuffled array
	return copiedArr
}

// get random scroll
function getRandomScroll(recipeType: string): string {
	// get scrolls
	const scrolls = SCROLL_RECIPES[recipeType].contents

	// shuffle scrolls
	const shuffledScrolls = shuffleScroll(scrolls)

	// create random index
	const randomPos = Math.floor(Math.random() * shuffledScrolls.length)

	// return scroll
	return shuffledScrolls[randomPos]
}

// get plus scroll chance
function getScrollPlusChance(isPlus: boolean): boolean {
	// get chance setting
	const [normal, plus] = isPlus ? PLUS_SCROLL_CHANCE.plus : PLUS_SCROLL_CHANCE.normal

	// calc chance
	const plusChance = 100 * plus

	// random number
	const rand = Math.floor(Math.random() * 100)

	// return result
	return rand < plusChance
}

/**
  [ action handler ] 
*/
// make enchant scroll with specific recipe
function makeScroll(args: string[]): ReturnDataType {
	// get args
	const [, returnType, recipeType, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get random scroll
	const scroll = getRandomScroll(recipeType)

	// get recipe name
	const recipeName = checkPlus
		? SCROLL_RECIPES[recipeType].name.plus
		: SCROLL_RECIPES[recipeType].name.normal

	// get plus scroll chance
	const upgraded = getScrollPlusChance(checkPlus)

	// get ei code of scroll item
	const { name, eiCode } = upgraded ? ENCHANT_SCROLLS[scroll].plus : ENCHANT_SCROLLS[scroll].normal

	// give scroll to player
	giveItemEI(eiCode, 1, PLAYER_NAME)

	// set sound effect
	const sound = upgraded ? 'ui.toast.challenge_complete' : 'entity.illusioner.cast_spell'

	// play sound effect
	playSound(sound, PLAYER_NAME)

	// set message
	const message = `&7[&6레시피&7] ${recipeName}&f에서 ${name}&f를 획득했습니다!`

	// send message
	sendMessage(consoleColorString(message))

	// get title setting
	const { title, subtitle } = upgraded ? TITLE_SETTINGS.makePlusScroll : TITLE_SETTINGS.makeScroll

	// show title & subtitle
	playTitle(title, subtitle, PLAYER_NAME)

	// if plus scroll broad cast
	if (upgraded) {
		// set message
		const message = `&b&l${PLAYER_NAME}&f님이 ${recipeName}&f에서 ${name}&f를 획득했습니다!`

		// broadcast message
		broadcastMessage(consoleColorString(message))
	}

	// log to console
	logConsole(
		removeColorCodes(`[레시피로그]${PLAYER_NAME}|${recipeType}|${recipeName}|${eiCode}|${name}|`)
	)

	return 1
}

// placeholder controller
function enchantScrollRecipeCore(): string {
	// action result
	let result: any = false

	// get args
	const [action] = args

	// command(placeholder) settings
	const VALID_COMMANDS: { [index: string]: CommandObjectType } = {
		makeScroll: {
			argLen: [4],
			callback: makeScroll,
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

enchantScrollRecipeCore()

export {}
