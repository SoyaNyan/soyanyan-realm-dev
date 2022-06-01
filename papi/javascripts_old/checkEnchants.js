function checkEnchants() {
	var enchantData = PlaceholderAPI.static.setPlaceholders(
		BukkitPlayer,
		'%checkitem_getinfo:40_enchantments:enchantment%'
	)
	return enchantData.length != 0
}

checkEnchants()
