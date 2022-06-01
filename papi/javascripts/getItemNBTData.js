var ENCHANT_PANALTY_SETTINGS = {
	unbreaking: 2,
	efficiency: 1,
	fortune: 3,
	respiration: 2,
	thorns: 2,
	protection: 1,
	projectile_protection: 1,
	fire_protection: 1,
	blast_protection: 1,
	swift_sneak: 2,
	feather_falling: 1,
	soul_speed: 2,
	depth_strider: 2,
	frost_walker: 2,
	fire_aspect: 2,
	looting: 3,
	knockback: 2,
	sweeping: 2,
	sharpness: 1,
	smite: 1,
	bane_of_arthropods: 1,
	cleaving: 2,
	power: 1,
	punch: 2,
	lure: 2,
	luck_of_the_sea: 3,
	impaling: 1,
	loyalty: 2,
	riptide: 2,
	piercing: 1,
}

function getItemNBTData() {
	var nbtDataStr = '%checkitem_getinfo:40_nbtints:nbt%'
	var nbtDataArr = nbtDataStr.replaceAll('INTEGER:', '').split('|')
	var nbtData = {
		Damage: 0,
		RepairCost: 0,
	}

	nbtDataArr = nbtDataArr.map(function (item) {
		var data = item.split(':')
		if (data[0] == 'Damage') {
			nbtData.Damage = parseInt(data[1])
		}
		if (data[0] == 'RepairCost') {
			nbtData.RepairCost = parseInt(data[1])
		}
	})

	if (args.length > 0) {
		var enchantment = args[0]
		switch (enchantment) {
			case 'fail':
				nbtData.RepairCost += 1
				break
			case 'random':
				if (args.length > 1 && args[1] == 'plus') {
					nbtData.RepairCost += 3
				}
				nbtData.RepairCost += 3
				break
			default:
				if (args.length > 1 && args[1] == 'plus') {
					nbtData.RepairCost += ENCHANT_PANALTY_SETTINGS[enchantment]
				}
				nbtData.RepairCost += ENCHANT_PANALTY_SETTINGS[enchantment]
		}
	}

	return JSON.stringify(nbtData).slice(1, -1).replaceAll('"', '')
}

getItemNBTData()
