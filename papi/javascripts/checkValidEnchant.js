var ENCHANTS = {
	unbreaking: {
		ITEM_SUFFIXES: [
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
		ITEMS: [
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
		ITEM_SUFFIXES: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		ITEMS: ['SHEARS'],
	},
	fortune: {
		ITEM_SUFFIXES: ['_PICKAXE', '_AXE', '_SHOVEL', '_HOE'],
		ITEMS: [],
	},
	respiration: {
		ITEM_SUFFIXES: ['_HELMET'],
		ITEMS: [],
	},
	thorns: {
		ITEM_SUFFIXES: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		ITEMS: [],
	},
	protection: {
		ITEM_SUFFIXES: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		ITEMS: [],
	},
	projectile_protection: {
		ITEM_SUFFIXES: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		ITEMS: [],
	},
	fire_protection: {
		ITEM_SUFFIXES: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		ITEMS: [],
	},
	blast_protection: {
		ITEM_SUFFIXES: ['_HELMET', '_CHESTPLATE', '_LEGGINGS', '_BOOTS'],
		ITEMS: [],
	},
	swift_sneak: {
		ITEM_SUFFIXES: ['_LEGGINGS'],
		ITEMS: [],
	},
	feather_falling: {
		ITEM_SUFFIXES: ['_BOOTS'],
		ITEMS: [],
	},
	soul_speed: {
		ITEM_SUFFIXES: ['_BOOTS'],
		ITEMS: [],
	},
	depth_strider: {
		ITEM_SUFFIXES: ['_BOOTS'],
		ITEMS: [],
	},
	frost_walker: {
		ITEM_SUFFIXES: ['_BOOTS'],
		ITEMS: [],
	},
	fire_aspect: {
		ITEM_SUFFIXES: ['_SWORD'],
		ITEMS: [],
	},
	looting: {
		ITEM_SUFFIXES: ['_SWORD'],
		ITEMS: [],
	},
	knockback: {
		ITEM_SUFFIXES: ['_SWORD'],
		ITEMS: [],
	},
	sweeping: {
		ITEM_SUFFIXES: ['_SWORD'],
		ITEMS: [],
	},
	sharpness: {
		ITEM_SUFFIXES: ['_SWORD', '_AXE'],
		ITEMS: [],
	},
	smite: {
		ITEM_SUFFIXES: ['_SWORD', '_AXE'],
		ITEMS: [],
	},
	bane_of_arthropods: {
		ITEM_SUFFIXES: ['_SWORD', '_AXE'],
		ITEMS: [],
	},
	cleaving: {
		ITEM_SUFFIXES: ['_AXE'],
		ITEMS: [],
	},
	power: {
		ITEM_SUFFIXES: [],
		ITEMS: ['BOW'],
	},
	punch: {
		ITEM_SUFFIXES: [],
		ITEMS: ['BOW'],
	},
	lure: {
		ITEM_SUFFIXES: [],
		ITEMS: ['FISHING_ROD'],
	},
	luck_of_the_sea: {
		ITEM_SUFFIXES: [],
		ITEMS: ['FISHING_ROD'],
	},
	impaling: {
		ITEM_SUFFIXES: [],
		ITEMS: ['TRIDENT'],
	},
	loyalty: {
		ITEM_SUFFIXES: [],
		ITEMS: ['TRIDENT'],
	},
	riptide: {
		ITEM_SUFFIXES: [],
		ITEMS: ['TRIDENT'],
	},
	quick_charge: {
		ITEM_SUFFIXES: [],
		ITEMS: ['CROSSBOW'],
	},
	piercing: {
		ITEM_SUFFIXES: [],
		ITEMS: ['CROSSBOW'],
	},
}

function checkValidEnchant() {
	var enchantment = args[0]
	var targetItem = '%player_item_in_offhand%'
	var ITEM_SUFFIXES = ENCHANTS[enchantment].ITEM_SUFFIXES
	var ITEMS = ENCHANTS[enchantment].ITEMS

	var checkSuffix = ITEM_SUFFIXES.some(function (item) {
		return targetItem.indexOf(item) != -1
	})
	var checkItem = ITEMS.some(function (item) {
		return targetItem.indexOf(item) != -1
	})

	return checkSuffix || checkItem
}

checkValidEnchant()
