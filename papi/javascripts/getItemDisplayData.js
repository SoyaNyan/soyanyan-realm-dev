function getItemDisplayData() {
	var player = BukkitPlayer
	var rawDataStr = player.getInventory().getItemInOffHand().getItemMeta().serialize() + ''
	rawDataStr = rawDataStr.slice(1, -1).replaceAll(', ', ',')
	rawDataStr = rawDataStr
		.replace(',display-name=', ', display-name=')
		.replace(',lore=', ', lore=')
		.replace(',enchants=', ', enchants=')
		.replace(',repair-cost=', ', repair-cost=')
		.replace(',Damage=', ', Damage=')
	var rawDataArr = rawDataStr.split(', ')
	var displayStrArr = []
	rawDataArr.forEach(function (data) {
		var keyVal = data.split('=')
		if (keyVal[0] == 'display-name') {
			displayStrArr.push("Name:'" + keyVal[1] + "'")
		}
		if (keyVal[0] == 'lore') {
			var tmpStr = keyVal[1].slice(1, -1)
			tmpStr = '[' + tmpStr.replaceAll('\\[', "'\\[").replaceAll('\\]', "\\]'") + ']'
			displayStrArr.push('Lore:' + tmpStr)
		}
	})

	return displayStrArr.join(',')
}

getItemDisplayData()
