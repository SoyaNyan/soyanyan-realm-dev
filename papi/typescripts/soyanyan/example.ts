const Data: any = new Object()
const PlaceholderAPI: any = new Object()
const Placeholder: any = new Object()
const BukkitServer: any = new Object()
const BukkitPlayer: any = new Object()
const args: string[] = []

type ValidEnchantType = {
	suffixes: Array<string>
	items: Array<string>
	krName: string
}

type EnchantDataType = {
	[index: string]: number
}

type IntNBTDataType = {
	[index: string]: number | boolean | undefined
	Damage: number
	RepairCost: number
	customLore?: number | boolean | undefined
}

type DisplayDataType = {
	Name: string
	Lore: Array<string>
}

type ItemDataType = {
	nbt: IntNBTDataType
	display: DisplayDataType
	enchant?: EnchantDataType
}

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

// parse external placeholders
function parsePlaceholder(placeholder: string): string {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, `%${placeholder}%`)
}

// execute command on server console
function execConsoleCommand(command: string): boolean {
	if (typeof command === 'undefined' || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
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

// check any item exists (in specific slot)
function checkSlot(slot: number): boolean {
	// set placeholder
	const placeholder = `checkitem_inslot:${slot}`

	// return result
	return parsePlaceholder(placeholder) === 'yes'
}

// get enchant data of target item (in specific slot)
function getEnchantData(slot: number): EnchantDataType {
	// get raw enchant data
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_enchantments:`).split('|')

	// parse enchant data from raw data string
	const enchantData: EnchantDataType = {}
	rawData.forEach((enchantStr) => {
		// split enchantments & level
		const [enchant, level] = enchantStr.replace('minecraft:', '').split(':')

		// store data
		enchantData[enchant] = parseInt(level)
	})

	// return enchant data
	return enchantData
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
function convertEnchantData(enchantData: EnchantDataType): string {
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

// check if item has custom lore
function checkCustomLore(slot: number): number | boolean {
	// get integer nbt data
	const { customLore } = getIntegerNBTData(slot)

	// return result
	return typeof customLore !== 'undefined' ? customLore : false
}

// merge custom & enchant lores
function mergeLores(
	lore: Array<string>,
	enchantData: EnchantDataType
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

// create enchantment lore
function createEnchantmentLore(enchantData: EnchantDataType): string[] {
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

// get integer nbt data of target item (in specific slot)
function getIntegerNBTData(slot: number): IntNBTDataType {
	// get raw repair nbt data
	const rawData = parsePlaceholder(`checkitem_getinfo:${slot}_nbtints:`)

	// default nbt data
	const nbtData: IntNBTDataType = {
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

// replace target item (in player's off-hand)
function replaceItem(itemData: ItemDataType, playerName: string): boolean {
	// item data
	const {
		nbt: { Damage, RepairCost },
		display: { Name, Lore },
		enchant,
	} = itemData

	// create new lore & custom nbt
	let newLore: Array<string> = []
	let customLoreNBT = ''
	if (typeof enchant !== 'undefined') {
		// create merged lore
		const { lore: mergedLore, loreStarts } = mergeLores(Lore, enchant)

		// merged lore
		newLore = mergedLore

		// custom lore nbt data
		customLoreNBT = `,customLore:${loreStarts}`
	} else {
		// only custom lore
		newLore = newLore.concat(Lore)
	}

	// converted item data
	const convertedItemData = {
		Damage,
		RepairCost,
		display: {
			Name,
			Lore: convertLore(newLore),
		},
		Enchantments: convertEnchantData(enchant),
		customLore: loreStarts,
		HideFlags: 1,
	}

	// get enchants after scroll applied
	const enchants =
		typeof enchant !== 'undefined' ? `,Enchantments:${convertEnchantData(enchant)}` : ''

	// get target item (in player's off hand)
	const targetItem = parsePlaceholder('player_item_in_offhand').toLowerCase()

	// set command
	const command = `minecraft:item replace entity ${playerName} weapon.offhand with ${targetItem}{Damage:${Damage},RepairCost:${RepairCost},display:{Name:'${Name}',Lore:${convertLore(
		newLore
	)}}${enchants}${customLoreNBT},HideFlags:1}`

	// exec command
	return execConsoleCommand(command)
}

function example() {
	// get item data
	const itemData: ItemDataType = {
		nbt: {
			Damage: getDamage(40),
			RepairCost: getRepairCost(40),
		},
		display: {
			Name: getDisplayName(),
			Lore: getLore(),
		},
		enchant: getEnchantData(40),
	}

	// replace item (update repair cost)
	replaceItem(itemData, PLAYER_NAME)

	// return result
	return true
}

example()
