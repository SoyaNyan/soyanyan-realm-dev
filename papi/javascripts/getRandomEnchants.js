var UNUPGRADABLE_ENCHANTS = [
	'mending',
	'silk_touch',
	'aqua_affinity',
	'flame',
	'infinity',
	'multishot',
	'channeling',
]

var ENCHANT_UPGRADE_SETTINGS = {
	upgradeChance: [1, 0.8, 0.7, 0.6, 0.55, 0.5, 0.3, 0.1, 0.01, 0.001],
	downgradeChance: [0, 0, 0, 0.05, 0.05, 0.1, 0.1, 0.1, 0.2, 0.3],
}

function getRandomEnchant() {
	var enchantData = '%checkitem_getinfo:40_enchantments:enchantment%'.split('|')
	var enchantArr = enchantData.map(function (enchant) {
		var enchantInfo = enchant.split(':')
		var enchantId = enchantInfo[1]
		var enchantLevel = parseInt(enchantInfo[2])

		if (UNUPGRADABLE_ENCHANTS.indexOf(enchantId) === -1) {
			var upgradeChance = 1000 * ENCHANT_UPGRADE_SETTINGS.upgradeChance[enchantLevel]
			var isUpgraded = upgradeChance >= Math.floor(Math.random() * (1000 - 1) + 1)
			if (isUpgraded) {
				enchantLevel++
			} else {
				var downgradeChance = 100 * ENCHANT_UPGRADE_SETTINGS.downgradeChance[enchantLevel]
				var isDowngraded = downgradeChance >= Math.floor(Math.random() * (100 - 1) + 1)
				if (isDowngraded) {
					enchantLevel--
				}
			}
		}

		return {
			id: 'minecraft:' + enchantId,
			lvl: enchantLevel,
		}
	})

	return JSON.stringify(enchantArr)
}

getRandomEnchant()
