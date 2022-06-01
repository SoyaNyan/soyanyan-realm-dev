function checkRepairCost() {
	var nbtDataStr = '%checkitem_getinfo:40_nbtints:nbt%'
	var nbtDataArr = nbtDataStr.replaceAll('INTEGER:', '').split('|')
	var nbtData = {
		RepairCost: 0,
	}

	nbtDataArr = nbtDataArr.map(function (item) {
		var data = item.split(':')
		if (data[0] == 'RepairCost') {
			nbtData.RepairCost = parseInt(data[1])
		}
	})

	return parseInt(nbtData.RepairCost) > 0
}

checkRepairCost()
