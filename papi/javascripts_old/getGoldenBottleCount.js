var TAX_RATE = 0.05

function getGoldenBottleCount() {
	var targetVal = args[0]
	var playerExp = parseInt('%player_total_exp%')

	// subs tax
	playerExp = playerExp - Math.floor(playerExp * TAX_RATE)

	var bottleCount = {
		'100': 0,
		'500': 0,
		'1000': 0,
		'5000': 0,
		'10000': 0,
		'100000': 0,
		'1000000': 0,
	}
	var restExp = 0

	// 1,000,000
	bottleCount['1000000'] = parseInt(playerExp / 1000000)
	restExp = playerExp % 1000000

	// 100,000
	bottleCount['100000'] = parseInt(restExp / 100000)
	restExp = restExp % 100000

	// 10,000
	bottleCount['10000'] = parseInt(restExp / 10000)
	restExp = restExp % 10000

	// 5,000
	bottleCount['5000'] = parseInt(restExp / 5000)
	restExp = restExp % 5000

	// 1,000
	bottleCount['1000'] = parseInt(restExp / 1000)
	restExp = restExp % 1000

	// 500
	bottleCount['500'] = parseInt(restExp / 500)
	restExp = restExp % 500

	// 100
	bottleCount['100'] = parseInt(restExp / 100)
	restExp = restExp % 100

	return bottleCount[targetVal].toString()
}

getGoldenBottleCount()
