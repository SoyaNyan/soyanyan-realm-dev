var UNUPGRADABLE_ENCHANTS = [
	'mending',
	'silk_touch',
	'aqua_affinity',
	'flame',
	'infinity',
	'channeling',
	'multishot',
]

function checkValidItem() {
	var enchantData = '%checkitem_getinfo:40_enchantments:enchantment%'.split('|')
	var isEnchanted = '%checkitem_getinfo:40_enchanted%' == 'true'
	var isValid = false

	if (!isEnchanted) {
		return false
	}

	var upgradableEnchants = enchantData.filter(function (enchant) {
		var enchantInfo = enchant.split(':')
		var enchantId = enchantInfo[1]
		return UNUPGRADABLE_ENCHANTS.indexOf(enchantId) === -1
	})
	if (upgradableEnchants.length < 1) {
		return false
	}

	isValid = true
	enchantData.forEach(function (enchant) {
		var enchantInfo = enchant.split(':')
		var enchantId = enchantInfo[1]
		if (UNUPGRADABLE_ENCHANTS.indexOf(enchantId) === -1) {
			var placeholder = 'javascript_is_upgradable_' + enchantId

			var isUpgradable = PlaceholderAPI.static.setPlaceholders(
				BukkitPlayer,
				'%' + placeholder + '%'
			)

			if (isUpgradable == 'false') {
				isValid = false
			}
		}
	})

	return isValid
}

checkValidItem()
