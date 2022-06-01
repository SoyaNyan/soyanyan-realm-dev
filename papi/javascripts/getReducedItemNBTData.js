function getReducedItemNBTData() {
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
		var reducedCost = parseInt(args[0])
		nbtData.RepairCost -= reducedCost
		if (nbtData.RepairCost < 0) {
			nbtData.RepairCost = 0
		}
	}

	return JSON.stringify(nbtData).slice(1, -1).replaceAll('"', '')
}

getReducedItemNBTData()
