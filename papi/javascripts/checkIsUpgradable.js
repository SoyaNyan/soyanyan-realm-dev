var ENCHANT_UPGRADE_SETTINGS = {
	minLevel: {
		mending: 1,
		silk_touch: 1,
		unbreaking: 3,
		efficiency: 5,
		fortune: 3,
		aqua_affinity: 1,
		respiration: 3,
		thorns: 3,
		protection: 4,
		projectile_protection: 4,
		fire_protection: 4,
		blast_protection: 4,
		swift_sneak: 3,
		feather_falling: 4,
		soul_speed: 3,
		depth_strider: 3,
		frost_walker: 2,
		fire_aspect: 2,
		looting: 3,
		knockback: 2,
		sweeping: 3,
		sharpness: 5,
		smite: 5,
		bane_of_arthropods: 5,
		cleaving: 3,
		power: 5,
		punch: 2,
		flame: 1,
		infinity: 1,
		lure: 3,
		luck_of_the_sea: 3,
		impaling: 5,
		channeling: 1,
		loyalty: 3,
		riptide: 3,
		quick_charge: 3,
		piercing: 4,
		multishot: 1,
	},
	maxLevel: {
		mending: 1,
		silk_touch: 1,
		unbreaking: 10,
		efficiency: 10,
		fortune: 10,
		aqua_affinity: 1,
		respiration: 10,
		thorns: 10,
		protection: 10,
		projectile_protection: 10,
		fire_protection: 10,
		blast_protection: 10,
		swift_sneak: 10,
		feather_falling: 10,
		soul_speed: 10,
		depth_strider: 10,
		frost_walker: 10,
		fire_aspect: 10,
		looting: 10,
		knockback: 10,
		sweeping: 10,
		sharpness: 10,
		smite: 10,
		bane_of_arthropods: 10,
		cleaving: 10,
		power: 10,
		punch: 10,
		flame: 1,
		infinity: 1,
		lure: 10,
		luck_of_the_sea: 10,
		impaling: 10,
		channeling: 10,
		loyalty: 10,
		riptide: 10,
		quick_charge: 10,
		piercing: 10,
		multishot: 1,
	},
}

function checkIsUpgradable() {
	var enchantment = args[0]

	var isUpgradable = false
	var enchantData = PlaceholderAPI.static
		.setPlaceholders(BukkitPlayer, '%checkitem_getinfo:40_enchantments:enchantment%')
		.split('|')
	enchantData.forEach(function (item) {
		var enchantInfo = item.split(':')
		var enchantId = enchantInfo[1]
		var enchantLevel = parseInt(enchantInfo[2])

		if (
			enchantId == enchantment &&
			ENCHANT_UPGRADE_SETTINGS.maxLevel[enchantment] > enchantLevel &&
			ENCHANT_UPGRADE_SETTINGS.minLevel[enchantment] <= enchantLevel
		) {
			isUpgradable = true
		}
	})

	return isUpgradable
}

checkIsUpgradable()
