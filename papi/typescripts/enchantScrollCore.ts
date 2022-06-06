/**
 * Author: SOYANYAN (소야냥)
 * Name: enchantScrollCore.ts
 * Version: v1.0.0
 * Last Update: 2022-06-06
 *
 * TypeScript Version: v4.7.2
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
type DataType = number | string | boolean

type CommandObjectType = {
	argLen: Array<number>
	callback: (args: string[]) => DataType
}

type ValidEnchantType = {
	suffixes: Array<string>
	items: Array<string>
}

type ItemEnchantDataType = {
	[index: string]: number
}

type ItemIntNBTDataType = {
	[index: string]: number
	Damage: number
	RepairCost: number
}

/**
[ polyfill ] 
*/
// String.prototype.includes
if (!String.prototype.includes) {
	String.prototype.includes = function (search: string, start?: number): boolean {
		if (typeof start !== 'number') start = 0

		if (start + search.length > this.length) {
			return false
		} else {
			return this.indexOf(search, start) !== -1
		}
	}
}

// Array.prototype.includes
if (!Array.prototype.includes) {
	Array.prototype.includes = function <T>(searchElement: T, fromIndex?: number) {
		function sameValueZero(x: T, y: T): boolean {
			return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
		}

		if (typeof fromIndex !== 'number') fromIndex = 0

		const obj = Object(this)
		const len = obj.length

		if (len === 0) return false

		let k = Math.max(fromIndex >= 0 ? fromIndex : len - Math.abs(fromIndex), 0)
		while (k < len) {
			if (sameValueZero(obj[k], searchElement)) return true
			k++
		}

		return false
	}
}

/**
  [ constants ] 
*/
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
	},
	efficiency: {
		suffixes: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		items: ['SHEARS'],
	},
	fortune: {
		suffixes: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		items: [],
	},
	respiration: {
		suffixes: ['_HELMET'],
		items: [],
	},
	thorns: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
	},
	protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
	},
	projectile_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
	},
	fire_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
	},
	blast_protection: {
		suffixes: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		items: [],
	},
	swift_sneak: {
		suffixes: ['_LEGGINGS'],
		items: [],
	},
	feather_falling: {
		suffixes: ['_BOOTS'],
		items: [],
	},
	soul_speed: {
		suffixes: ['_BOOTS'],
		items: [],
	},
	depth_strider: {
		suffixes: ['_BOOTS'],
		items: [],
	},
	frost_walker: {
		suffixes: ['_BOOTS'],
		items: [],
	},
	fire_aspect: {
		suffixes: ['_SWORD'],
		items: [],
	},
	looting: {
		suffixes: ['_SWORD'],
		items: [],
	},
	knockback: {
		suffixes: ['_SWORD'],
		items: [],
	},
	sweeping: {
		suffixes: ['_SWORD'],
		items: [],
	},
	sharpness: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
	},
	smite: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
	},
	bane_of_arthropods: {
		suffixes: ['_SWORD', '_AXE'],
		items: [],
	},
	cleaving: {
		suffixes: ['_AXE'],
		items: [],
	},
	power: {
		suffixes: [],
		items: ['BOW'],
	},
	punch: {
		suffixes: [],
		items: ['BOW'],
	},
	lure: {
		suffixes: [],
		items: ['FISHING_ROD'],
	},
	luck_of_the_sea: {
		suffixes: [],
		items: ['FISHING_ROD'],
	},
	impaling: {
		suffixes: [],
		items: ['TRIDENT'],
	},
	loyalty: {
		suffixes: [],
		items: ['TRIDENT'],
	},
	riptide: {
		suffixes: [],
		items: ['TRIDENT'],
	},
	quick_charge: {
		suffixes: [],
		items: ['CROSSBOW'],
	},
	piercing: {
		suffixes: [],
		items: ['CROSSBOW'],
	},
}

const ENCHANT_BLAKLIST: Array<string> = [
	'mending',
	'silk_touch',
	'aqua_affinity',
	'flame',
	'infinity',
	'channeling',
	'multishot',
]

const ENCHANT_LIMIT: { [index: string]: Array<number> } = {
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

const ENCHANT_PANALTY: { [index: string]: number } = {
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

/**
  [ data utilities ] 
*/
// check if data(key) exists in global store
function exists(path: string): boolean {
	// returns true if a key exists; else false. (Placeholder API)
	return Data.exists(path)
}

// get data from global store
function get(path: string): DataType {
	let result: DataType

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
function set(path: string, payload: DataType): boolean {
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
function update(path: string, payload: DataType): boolean {
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
function stringify(data: DataType): string {
	return `${data}`
}

// encode boolean as '1' or '0'
function encodeBoolean(data: boolean): string {
	return data ? '1' : '0'
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

/**
  [ checkitem utilities ]
*/
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
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_enchantments:enchantment`).split('|')

	// parse enchant data from raw data string
	const enchantData: ItemEnchantDataType = {}
	rawData.forEach((enchantStr) => {
		// split enchantments & level
		const [enchant, level] = enchantStr.split(':')

		// store data
		enchantData[enchant] = parseInt(level)
	})

	// return enchant data
	return enchantData
}

// get integer nbt data of target item (in specific slot)
function getIntegerNBTData(slot: number): ItemIntNBTDataType {
	// get raw repair nbt data
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_nbtints:nbt`)

	// default nbt data
	const nbtData: ItemIntNBTDataType = {
		Damage: 0,
		RepairCost: 0,
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

/**
  [ enchant scroll utilities ]
*/
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

/**
  [ action handler ] 
*/
// check target enchant or item is valid
function checkEnchant(args: string[]): DataType {
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
function checkUpgradable(args: string[]): DataType {
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

// check limit of target item's repair cost
function checkRepairCostLimit(args: string[]): DataType {
	// get args
	const [, returnType, enchant, isPlus] = args

	// parse args
	const checkPlus = isPlus === '1'

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// get repair cost limit
	const limit = getItemCostLimit(targetItem)

	// get current repair cost
	const repairCost = getRepairCost(40)

	// get next repair cost (after panalty applied)
	const nextRepairCost = getNextRepairCost(repairCost, enchant, checkPlus)

	// check next repair cost exceeds limit
	const checkLimit = limit >= nextRepairCost

	// normal return
	return checkLimit
}

// check every enchants meets valid enchant settings (for random enchant scroll)
function checkValidItem(args: string[]): DataType {
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

// get repair cost limit of target item
function repairCostLimit(args: string[]): DataType {
	// get args
	const [, returnType] = args

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand')

	// get repair cost limit
	const limit = getItemCostLimit(targetItem)

	// normal return
	return limit
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
		checkCostLimit: {
			argLen: [4],
			callback: checkRepairCostLimit,
		},
		checkValidItem: {
			argLen: [2],
			callback: checkValidItem,
		},
		repairCostLimit: {
			argLen: [2],
			callback: repairCostLimit,
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
