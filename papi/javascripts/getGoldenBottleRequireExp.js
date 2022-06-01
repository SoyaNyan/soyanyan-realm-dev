function getGoldenBottleRequireExp() {
	var playerExp = parseInt('%player_total_exp%')
	var restExp = 0

	// 1,000,000
	restExp = playerExp % 1000000

	// 100,000
	restExp = playerExp % 100000

	// 10,000
	restExp = playerExp % 10000

	// 5,000
	restExp = playerExp % 5000

	// 1,000
	restExp = playerExp % 1000

	// 500
	restExp = playerExp % 500

	// 100
	restExp = playerExp % 100

	return (playerExp - restExp).toString()
}

getGoldenBottleRequireExp()
