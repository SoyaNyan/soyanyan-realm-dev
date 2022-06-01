function checkItemRepairCostLimit() {
	var enchantment = args[0]
	var targetItem = '%player_item_in_offhand%'
	var placeholder = 'javascript_item_repair_cost_' + enchantment
	var itemRepairCost = PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%' + placeholder + '%')
	var limit = 35

	var MATERIAL_LIMIT = {
		NETHERITE: 10,
		DIAMOND: 5,
		GOLDEN: 15,
		CHAINMAIL: 0,
		IRON: -5,
		STONE: -10,
		WOODEN: -15,
		TURTLE: 5,
	}

	var BASE_LIMIT = {
		SWORD: 50,
		PICKAXE: 50,
		AXE: 50,
		SHOVEL: 40,
		HOE: 35,
		HELMET: 45,
		CHESTPLATE: 40,
		LEGGINGS: 40,
		BOOTS: 45,
	}

	var OTHERS_LIMIT = {
		BOW: 55,
		FISHING_ROD: 40,
		TRIDENT: 55,
		CROSSBOW: 55,
		SHEARS: 30,
		SHIELD: 30,
		ELYTRA: 30,
		FLINT_AND_STEEL: 30,
		CARROT_ON_A_STICK: 30,
	}

	var isOtherItem = false
	for (var key in OTHERS_LIMIT) {
		if (key == targetItem) {
			isOtherItem = true
			limit = OTHERS_LIMIT[key]
		}
	}

	if (!isOtherItem) {
		var material = targetItem.split('_')[0]
		var item = targetItem.split('_')[1]
		limit = BASE_LIMIT[item] + MATERIAL_LIMIT[material]
	}

	return limit >= itemRepairCost ? true : limit.toString()
}

checkItemRepairCostLimit()
