function getGoldenBottleTax() {
	var playerExp = parseInt('%player_total_exp%')
	var TAX_RATE = 0.05
	return Math.floor(playerExp * TAX_RATE).toString()
}

getGoldenBottleTax()
