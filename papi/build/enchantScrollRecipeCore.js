/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollRecipeCore.js
 * Version: v1.1.0
 * Last Update: 2022-09-26
 *
 * TypeScript Version: v4.8.4
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

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
var SCROLL_RECIPES = {
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
var PLUS_SCROLL_CHANCE = {
	normal: [0.8, 0.2],
	plus: [0.2, 0.8],
}
var TITLE_SETTINGS = {
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
function giveItemEI(itemCode, quantity, playerName) {
	var command = 'ei give '.concat(playerName, ' ').concat(itemCode, ' ').concat(quantity)
	return execConsoleCommand(command)
}
function shuffleScroll(scrollArray) {
	var copiedArr = scrollArray.slice()
	for (var i = copiedArr.length - 1; i > 0; i--) {
		var randomPos = Math.floor(Math.random() * (i + 1))
		var tmp = copiedArr[i]
		copiedArr[i] = copiedArr[randomPos]
		copiedArr[randomPos] = tmp
	}
	return copiedArr
}
function getRandomScroll(recipeType) {
	var scrolls = SCROLL_RECIPES[recipeType].contents
	var shuffledScrolls = shuffleScroll(scrolls)
	var randomPos = Math.floor(Math.random() * shuffledScrolls.length)
	return shuffledScrolls[randomPos]
}
function getScrollPlusChance(isPlus) {
	var _a = isPlus ? PLUS_SCROLL_CHANCE.plus : PLUS_SCROLL_CHANCE.normal,
		normal = _a[0],
		plus = _a[1]
	var plusChance = 100 * plus
	var rand = Math.floor(Math.random() * 100)
	return rand < plusChance
}
function makeScroll() {
	var returnType = args[1],
		recipeType = args[2],
		isPlus = args[3]
	var checkPlus = isPlus === '1'
	var scroll = getRandomScroll(recipeType)
	var recipeName = checkPlus
		? SCROLL_RECIPES[recipeType].name.plus
		: SCROLL_RECIPES[recipeType].name.normal
	var upgraded = getScrollPlusChance(checkPlus)
	var _a = upgraded ? ENCHANT_SCROLLS[scroll].plus : ENCHANT_SCROLLS[scroll].normal,
		name = _a.name,
		eiCode = _a.eiCode
	giveItemEI(eiCode, 1, PLAYER_NAME)
	var sound = upgraded ? 'ui.toast.challenge_complete' : 'entity.illusioner.cast_spell'
	playSound(sound, PLAYER_NAME)
	var message = '&7[&6\uB808\uC2DC\uD53C&7] '
		.concat(recipeName, '&f\uC5D0\uC11C ')
		.concat(name, '&f\uB97C \uD68D\uB4DD\uD588\uC2B5\uB2C8\uB2E4!')
	sendMessage(consoleColorString(message))
	var _b = upgraded ? TITLE_SETTINGS.makePlusScroll : TITLE_SETTINGS.makeScroll,
		title = _b.title,
		subtitle = _b.subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	if (upgraded) {
		var message_1 = '&b&l'
			.concat(PLAYER_NAME, '&f\uB2D8\uC774 ')
			.concat(recipeName, '&f\uC5D0\uC11C ')
			.concat(name, '&f\uB97C \uD68D\uB4DD\uD588\uC2B5\uB2C8\uB2E4!')
		broadcastMessage(consoleColorString(message_1))
	}
	return 1
}
function enchantScrollRecipeCore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
		makeScroll: {
			argLen: [4],
			callback: makeScroll,
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
enchantScrollRecipeCore()
