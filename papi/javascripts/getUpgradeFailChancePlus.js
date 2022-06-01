var ENCHANT_UPGRADE_SETTINGS = {
	upgradeChance: [1, 1, 0.5, 0.45, 0.4, 0.35, 0.3, 0.1, 0.01, 0.001],
	destroyChance: [0, 0, 0, 0.1, 0.1, 0.15, 0.15, 0.2, 0.25, 0.3],
	rarityWeight: {
		mending: 1,
		silk_touch: 1,
		unbreaking: 0.8,
		efficiency: 1,
		fortune: 0.5,
		aqua_affinity: 1,
		respiration: 0.8,
		thorns: 0.8,
		protection: 0.8,
		projectile_protection: 0.9,
		fire_protection: 0.9,
		blast_protection: 0.9,
		swift_sneak: 0.8,
		feather_falling: 0.8,
		soul_speed: 0.8,
		depth_strider: 0.8,
		frost_walker: 0.7,
		fire_aspect: 0.7,
		looting: 0.5,
		knockback: 0.7,
		sweeping: 0.8,
		sharpness: 0.9,
		smite: 0.9,
		bane_of_arthropods: 1,
		cleaving: 0.8,
		power: 0.9,
		punch: 0.7,
		flame: 1,
		infinity: 1,
		lure: 0.5,
		luck_of_the_sea: 0.5,
		impaling: 0.9,
		channeling: 1,
		loyalty: 0.8,
		riptide: 0.8,
		quick_charge: 0.8,
		piercing: 0.8,
		multishot: 1,
	},
}

function getUpgradeFailChancePlus() {
	var enchantment = args[0]

	var enchantEssence = PlaceholderAPI.static.setPlaceholders(
		BukkitPlayer,
		'%javascript_has_enchant_essence%'
	)
	var chanceBoost = 0
	if (enchantEssence != 'false') {
		var essenceData = JSON.parse(enchantEssence)
		chanceBoost = essenceData.chance
	}

	var netUpgradeFailChance = 0
	var enchantData = PlaceholderAPI.static
		.setPlaceholders(BukkitPlayer, '%checkitem_getinfo:40_enchantments:enchantment%')
		.split('|')
	enchantData.forEach(function (item) {
		var enchantInfo = item.split(':')
		var enchantId = enchantInfo[1]
		var enchantLevel = parseInt(enchantInfo[2])

		if (enchantId == enchantment) {
			var upgradeFailChance =
				1000 *
				(1 -
					(ENCHANT_UPGRADE_SETTINGS.upgradeChance[enchantLevel] + chanceBoost) *
						ENCHANT_UPGRADE_SETTINGS.rarityWeight[enchantment])
			var destroyChance =
				upgradeFailChance * ENCHANT_UPGRADE_SETTINGS.destroyChance[enchantLevel + 1]
			netUpgradeFailChance = upgradeFailChance - destroyChance
		}
	})

	return Math.floor(netUpgradeFailChance) + ''
}

getUpgradeFailChancePlus()
