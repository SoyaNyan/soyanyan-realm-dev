/**
 * Author: SOYANYAN (소야냥)
 * Name: randomCrateCore.js
 * Version: v1.0.0
 * Last Update: 2022-12-10
 *
 * TypeScript Version: v4.9.3
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

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
		prob: 20,
		itemCode: 'none',
		quantity: 0,
		isEI: false,
		broadcast: false,
	},
	coal_10: {
		name: '§8석탄',
		prob: 20,
		itemCode: 'coal',
		quantity: 10,
		isEI: false,
		broadcast: false,
	},
	copper_ingot_10: {
		name: '&e구리 주괴',
		prob: 20,
		itemCode: 'copper_ingot',
		quantity: 10,
		isEI: false,
		broadcast: false,
	},
	iron_ingot_10: {
		name: '&7철 주괴',
		prob: 20,
		itemCode: 'iron_ingot',
		quantity: 10,
		isEI: false,
		broadcast: false,
	},
	gold_ingot_10: {
		name: '&6금 주괴',
		prob: 20,
		itemCode: 'gold_ingot',
		quantity: 10,
		isEI: false,
		broadcast: false,
	},
	emerald_10: {
		name: '&a에메랄드',
		prob: 20,
		itemCode: 'emerald',
		quantity: 10,
		isEI: false,
		broadcast: false,
	},
	diamond_5: {
		name: '§b다이아몬드',
		prob: 20,
		itemCode: 'diamond',
		quantity: 5,
		isEI: false,
		broadcast: false,
	},
	netherite_ingot_2: {
		name: '§5네더라이트 주괴',
		prob: 20,
		itemCode: 'netherite_ingot',
		quantity: 2,
		isEI: false,
		broadcast: false,
	},
}
var CRATE_SETTINGS = {
	testCrate: {
		name: '&7[#FFC8A2 ★ &7] #F6EAC2&l평범한 #FFFFB5&l랜덤 #ECEAE4&l박스',
		itemCode: 'commonRandomChest',
		contents: [
			PRIZE_SETTINGS.none,
			PRIZE_SETTINGS.coal_10,
			PRIZE_SETTINGS.copper_ingot_10,
			PRIZE_SETTINGS.iron_ingot_10,
			PRIZE_SETTINGS.gold_ingot_10,
			PRIZE_SETTINGS.emerald_10,
			PRIZE_SETTINGS.diamond_5,
			PRIZE_SETTINGS.netherite_ingot_2,
		],
	},
}
var CRATE_TITLE_SETTINGS = {
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
var PRIZE_TITLE_SETTINGS = {
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
function openCrate(args) {
	var returnType = args[1],
		crate = args[2]
	var name = CRATE_SETTINGS[crate].name
	var itemMessage = '&7[&9\uB79C\uB364\uBC15\uC2A4&7] '.concat(
		name,
		'(\uC744)\uB97C \uC0AC\uC6A9\uD588\uC2B5\uB2C8\uB2E4.'
	)
	sendMessage(consoleColorString(itemMessage))
	playSound('entity.firework_rocket.launch', PLAYER_NAME)
	var title = MESSAGE_TITLE_SETTINGS.open.title
	var subtitle = CRATE_TITLE_SETTINGS[crate].subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	return 1
}
function rollCrate(args) {
	var returnType = args[1]
	var _a = MESSAGE_TITLE_SETTINGS.rolling,
		title = _a.title,
		subtitle = _a.subtitle
	playTitle(title, subtitle, PLAYER_NAME)
	playSound('entity.experience_orb.pickup', PLAYER_NAME)
	return 1
}
function givePrize(args) {
	var returnType = args[1],
		crate = args[2]
	var crateName = CRATE_SETTINGS[crate].name
	var _a = pickRandomItem(crate),
		itemName = _a.name,
		itemCode = _a.itemCode,
		quantity = _a.quantity,
		isEI = _a.isEI,
		broadcast = _a.broadcast
	var _b = PRIZE_TITLE_SETTINGS[itemCode],
		title = _b.title,
		subtitle = _b.subtitle
	setTitleTimes(0, 60, 0, PLAYER_NAME)
	playTitle(title, subtitle, PLAYER_NAME)
	itemCode === 'none'
		? playSound('entity.villager.no', PLAYER_NAME)
		: playSound('entity.villager.yes', PLAYER_NAME)
	giveItem(itemCode, quantity, isEI, PLAYER_NAME)
	broadcast
		? broadcastMessage(
				'&7[&9\uB79C\uB364\uBC15\uC2A4&7] &b&l'
					.concat(PLAYER_NAME, ' &f\uB2D8\uC774 ')
					.concat(crateName, '&7\uC5D0\uC11C ')
					.concat(itemName, ' &7x &6')
					.concat(quantity, ' &f\uB97C \uD68D\uB4DD\uD588\uC2B5\uB2C8\uB2E4!')
		  )
		: false
	return 1
}
function randomCrateCore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
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
