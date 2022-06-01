function getItemDamage() {
	var nbtIntData = '%checkitem_getinfo:40_nbtints:Damage%'
	if (nbtIntData.indexOf('INTEGER:Damage:') === 1) {
		return 0
	}
	return nbtIntData.split('INTEGER:Damage:')[1]
}

getItemDamage()
