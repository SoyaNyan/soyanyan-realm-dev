function getNextEnchantLevelPlus() {
	var enchantment = args[0]

	var nextEnchantLevel = 0
	var enchantData = PlaceholderAPI.static
		.setPlaceholders(BukkitPlayer, '%checkitem_getinfo:40_enchantments:enchantment%')
		.split('|')
	enchantData.forEach(function (item) {
		var enchantInfo = item.split(':')
		var enchantId = enchantInfo[1]
		var enchantLevel = parseInt(enchantInfo[2])

		if (enchantId == enchantment) {
			nextEnchantLevel = enchantLevel + 2
		}
	})
	return Math.floor(nextEnchantLevel) + ''
}

getNextEnchantLevelPlus()
