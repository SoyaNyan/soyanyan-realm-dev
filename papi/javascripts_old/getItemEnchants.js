function getItemEnchants() {
	var enchantData = PlaceholderAPI.static
		.setPlaceholders(BukkitPlayer, '%checkitem_getinfo:40_enchantments:enchantment%')
		.split('|')
	var enchantArr = enchantData.map(function (item) {
		var enchantInfo = item.split(':')
		var enchantId = enchantInfo[1]
		var enchantLevel = parseInt(enchantInfo[2])
		return {
			id: 'minecraft:' + enchantId,
			lvl: enchantLevel,
		}
	})

	return JSON.stringify(enchantArr)
}

getItemEnchants()