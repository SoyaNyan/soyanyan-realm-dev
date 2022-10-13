/**
 * Author: SOYANYAN (소야냥)
 * Name: itemEvaluationCore.js
 * Version: v1.1.1
 * Last Update: 2022-10-13
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
var BROADCAST_PRICE = 5000000
var PLUS_PRICE_OFFSET = 0.1
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
var RARITY_WEIGHT = {
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
var LEVEL_WEIGHT = [
	1, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.15, 0.1, 0.05, 0.01, 0.005, 0.001,
	0.0005, 0.0001,
]
var COUNT_WEIGHT = [0, 1, 1.1, 1.25, 1.5, 2, 2.5, 3, 3, 3, 3]
var VALID_ENCHANTS = {
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
var INVALID_ENCHANTS = [
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
var ENCHANT_MIN_LEVEL = {
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
var TOTAL_ENCHANT_LEVEL = {
	min: 5,
	boost: 15,
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
var EXP_ITEMS = {
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
function fixDigits(value) {
	return Math.round(value / 100) * 100
}
function formatWithCommas(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
		var levelStr = INVALID_ENCHANTS.includes(enchant) ? '' : ENCHANT_LEVEL[enchantData[enchant]]
		enchantLore.push(
			JSON.stringify([
				{
					text: ''.concat(VALID_ENCHANTS[enchant], ' ').concat(levelStr),
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
		if ((lore === null || lore === void 0 ? void 0 : lore.length) === 0) {
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
	if (version.includes('1.19.2')) return 19.2
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
function playSoundAll(sound) {
	var command = 'minecraft:playsound minecraft:'.concat(sound, ' voice @a 0 0 0 1 1 1')
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
function checkSlot(slot) {
	var placeholder = 'checkitem_inslot:'.concat(slot)
	return parsePlaceholder(placeholder) === 'yes'
}
function getKrName(slot) {
	var item = ITEMS_LOCALE_KR.item,
		material = ITEMS_LOCALE_KR.material,
		suffix = ITEMS_LOCALE_KR.suffix
	var placeholder = 'checkitem_getinfo:'.concat(slot, '_mat:')
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
	var rawData = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_enchantments:')).split('|')
	var enchantData = {}
	rawData.forEach(function (enchantStr) {
		var _a = enchantStr.replace('minecraft:', '').split(':'),
			enchant = _a[0],
			level = _a[1]
		enchantData[enchant] = parseInt(level)
	})
	return enchantData
}
function getIntegerNBTData(slot) {
	var rawData = parsePlaceholder('checkitem_getinfo:'.concat(slot, '_nbtints:'))
	var nbtData = {
		Damage: 0,
		RepairCost: 0,
		customLore: false,
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
function checkCustomLore(slot) {
	var customLore = getIntegerNBTData(slot).customLore
	return typeof customLore !== 'undefined' ? customLore : false
}
function removeSlotItem(slot, amount) {
	var placeholder =
		typeof amount === 'undefined'
			? 'checkitem_remove_inslot:'.concat(slot)
			: 'checkitem_remove_inslot:'.concat(slot, ',amt:').concat(amount)
	return parsePlaceholder(placeholder) === 'yes'
}
function getLevelWeight(level) {
	var levelWeight = 0
	for (var i = 0; i <= level - 1; i++) {
		levelWeight += 10000 - LEVEL_WEIGHT[i] * 10000
	}
	return levelWeight
}
function getRarityScore(enchant) {
	var rarityWeight = RARITY_WEIGHT[enchant]
	return 1 + (1 - rarityWeight)
}
function getTotalEnhancedLevel(enchantData) {
	var totalLevel = 0
	for (var enchant in enchantData) {
		var level = enchantData[enchant]
		if (!enchant.includes('curse')) {
			var minLevel = ENCHANT_MIN_LEVEL[enchant]
			totalLevel += level - minLevel
		}
	}
	return totalLevel
}
function getTotalEnchantLevel(enchantData) {
	var totalLevel = 0
	for (var enchant in enchantData) {
		var level = enchantData[enchant]
		if (!enchant.includes('curse')) {
			totalLevel += level
		}
	}
	return totalLevel
}
function getEnchantScore(enchantData) {
	var enchantScore = 0
	var enchantsCount = Object.keys(enchantData).length
	var enchantCountWeight = COUNT_WEIGHT[enchantsCount]
	for (var enchant in enchantData) {
		var level = enchantData[enchant]
		var rarityScore = getRarityScore(enchant)
		var levelScore = Math.floor(getLevelWeight(level) * rarityScore)
		enchantScore += levelScore
	}
	var totalLevel = getTotalEnhancedLevel(enchantData)
	if (totalLevel <= TOTAL_ENCHANT_LEVEL.boost) {
		return Math.floor(enchantScore * enchantCountWeight * (totalLevel / 2))
	}
	return Math.floor(enchantScore * enchantCountWeight * totalLevel)
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
function getRepairCostScore(itemCost, costLimit) {
	var remainingCost = costLimit - itemCost
	if (remainingCost > costLimit / 2) {
		return 1
	}
	return 0.8
}
function evaluateItemPrice(isPlus) {
	var repairCost = getRepairCost(40)
	var targetItem = parsePlaceholder('player_item_in_offhand')
	var repairCostLimit = getItemCostLimit(targetItem)
	var repairCostScore = getRepairCostScore(repairCost, repairCostLimit)
	var enchantData = getEnchantData(40)
	var enchantScore = getEnchantScore(enchantData)
	var offset = isPlus ? 1 + PLUS_PRICE_OFFSET : 1
	var price = enchantScore * repairCostScore * offset
	return price
}
function getExpItemAmount(balance) {
	var itemAmounts = {
		'1000000': 0,
		'100000': 0,
		'10000': 0,
		'5000': 0,
		'1000': 0,
		'500': 0,
		'100': 0,
	}
	var itemKeys = Object.keys(itemAmounts).sort(function (a, b) {
		return parseInt(b) - parseInt(a)
	})
	var rest = balance
	for (var _i = 0, itemKeys_1 = itemKeys; _i < itemKeys_1.length; _i++) {
		var v = itemKeys_1[_i]
		itemAmounts[v] += Math.floor(rest / parseInt(v))
		rest = rest % parseInt(v)
	}
	return itemAmounts
}
function giveExp(items) {
	var expItems = {
		'100': 'exp_filled_bottle_100',
		'500': 'exp_filled_bottle_500',
		'1000': 'exp_filled_bottle_1000',
		'5000': 'exp_filled_crystal_5000',
		'10000': 'exp_filled_crystal_10000',
		'100000': 'exp_filled_starlight_100000',
		'1000000': 'exp_filled_starlight_1000000',
	}
	for (var item in items) {
		var itemId = expItems[item]
		var amount = items[item]
		if (amount > 0) {
			var max = 100
			for (var i = Math.floor(amount / max); i >= 0; i--) {
				var cnt = i > 0 ? max : amount % max
				var command = 'ei give '.concat(PLAYER_NAME, ' ').concat(itemId, ' ').concat(cnt)
				execConsoleCommand(command)
			}
		}
	}
	return true
}
function checkValidItem(args) {
	var returnType = args[1]
	var item = ITEMS_LOCALE_KR.item,
		material = ITEMS_LOCALE_KR.material,
		suffix = ITEMS_LOCALE_KR.suffix
	var placeholder = 'checkitem_getinfo:40_mat:'
	var targetItem = parsePlaceholder(placeholder)
	if (targetItem in item) return true
	var _a = targetItem.split('_'),
		mat = _a[0],
		suff = _a[1]
	if (mat in material && suff in suffix) return true
	return false
}
function checkEnchantLevel(args) {
	var returnType = args[1]
	var enchantData = getEnchantData(40)
	var totalLevel = getTotalEnhancedLevel(enchantData)
	return TOTAL_ENCHANT_LEVEL.min <= totalLevel
}
function evaluatePrice(args) {
	var returnType = args[1],
		isPlus = args[2]
	var checkPlus = isPlus === '1'
	var price = evaluateItemPrice(checkPlus)
	if (returnType === '1') return formatWithCommas(fixDigits(price))
	if (returnType === '2') {
		var message =
			'&7[&6\uAC10\uC815&7] &f\uAC10\uC815 \uACB0\uACFC &a&l&n\uC544\uC774\uD15C\uC758 \uAC00\uCE58&f\uB294 &6&l'.concat(
				formatWithCommas(fixDigits(price)),
				'&cexp &f\uC785\uB2C8\uB2E4.'
			)
		sendMessage(consoleColorString(message))
		return 1
	}
	return price
}
function sellItem(args) {
	var returnType = args[1],
		isPlus = args[2]
	var checkPlus = isPlus === '1'
	var krName = getKrName(40)
	var price = evaluateItemPrice(checkPlus)
	var items = getExpItemAmount(price)
	giveExp(items)
	if (!removeSlotItem(40, 1)) {
		return 0
	}
	if (price >= BROADCAST_PRICE) {
		playSoundAll('ui.toast.challenge_complete')
		var message = '&b&l'
			.concat(PLAYER_NAME, '&f\uB2D8\uC774 &a&l&n')
			.concat(krName, '&f\uC744(\uB97C) &6&l')
			.concat(
				formatWithCommas(fixDigits(price)),
				'&cexp &f\uC5D0 &e&l\uD310\uB9E4&f\uD588\uC2B5\uB2C8\uB2E4.'
			)
		broadcastMessage(message)
	} else {
		playSound('entity.villager.celebrate', PLAYER_NAME)
		var message = '&7[&6\uAC10\uC815&7] &a&l&n'
			.concat(krName, '&f\uC744(\uB97C) &6&l')
			.concat(
				formatWithCommas(fixDigits(price)),
				'&cexp &f\uC5D0 &e&l\uD310\uB9E4&f\uD588\uC2B5\uB2C8\uB2E4.'
			)
		sendMessage(consoleColorString(message))
	}
	return 1
}
function itemEvaluationCore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
		checkValidItem: {
			argLen: [2],
			callback: checkValidItem,
		},
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
itemEvaluationCore()
