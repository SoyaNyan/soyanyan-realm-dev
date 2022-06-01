var ENCHANT_ESSENCE_NAME = {
	low: '&7[&#&5&5&C&B&C&D ★ &7] &#&E&C&E&A&E&4&l미약한 &#&F&F&9&6&8&A&l인챈트 &#&F&F&C&8&A&2&l에센스',
	medium:
		'&7[&#&5&5&C&B&C&D ★★ &7] &#&E&C&E&A&E&4&l쓸만한 &#&F&F&9&6&8&A&l인챈트 &#&F&F&C&8&A&2&l에센스',
	high: '&7[&#&5&5&C&B&C&D ★★★ &7] &#&E&C&E&A&E&4&l강력한 &#&F&F&9&6&8&A&l인챈트 &#&F&F&C&8&A&2&l에센스',
}

var ENCHANT_ESSENCE_SETTINGS = {
	low: 0.001,
	medium: 0.005,
	high: 0.01,
}

function checkEnchantEssence() {
	for (var i = 1; i <= 8; i++) {
		var placeholder = 'checkitem_getinfo:' + i + '_namecontains:name'
		var itemName = PlaceholderAPI.static
			.setPlaceholders(BukkitPlayer, '%' + placeholder + '%')
			.replaceAll('§', '&')
			.replaceAll('x', '#')
		placeholder = 'checkitem_getinfo:' + i + '_amt:0'
		var itemAmount = PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%' + placeholder + '%')

		switch (itemName) {
			case ENCHANT_ESSENCE_NAME.low:
				return JSON.stringify({
					slot: parseInt(i),
					level: 'low',
					amount: parseInt(itemAmount),
					chance: parseInt(itemAmount) * ENCHANT_ESSENCE_SETTINGS.low,
				})
			case ENCHANT_ESSENCE_NAME.medium:
				return JSON.stringify({
					slot: parseInt(i),
					level: 'medium',
					amount: parseInt(itemAmount),
					chance: parseInt(itemAmount) * ENCHANT_ESSENCE_SETTINGS.medium,
				})
			case ENCHANT_ESSENCE_NAME.high:
				return JSON.stringify({
					slot: parseInt(i),
					level: 'high',
					amount: parseInt(itemAmount),
					chance: parseInt(itemAmount) * ENCHANT_ESSENCE_SETTINGS.high,
				})
			default:
		}
	}
	return 'false'
}

checkEnchantEssence()
