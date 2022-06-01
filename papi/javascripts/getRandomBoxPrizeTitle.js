function getRandomBoxPrizeTitle() {
	var prize = args[0]
	var titleObj

	switch (prize) {
		case 'coal':
			titleObj = [
				{ text: '석탄', color: 'dark_gray', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '10', color: 'white', bold: 'true' },
			]
			break
		case 'copper':
			titleObj = [
				{ text: '구리 주괴', color: 'yellow', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '10', color: 'white', bold: 'true' },
			]
			break
		case 'iron':
			titleObj = [
				{ text: '철 주괴', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '10', color: 'white', bold: 'true' },
			]
			break
		case 'gold':
			titleObj = [
				{ text: '금 주괴', color: 'gold', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '10', color: 'white', bold: 'true' },
			]
			break
		case 'emerald':
			titleObj = [
				{ text: '에메랄드', color: 'green', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '10', color: 'white', bold: 'true' },
			]
			break
		case 'diamond':
			titleObj = [
				{ text: '다이아몬드', color: 'aqua', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '5', color: 'white', bold: 'true' },
			]
			break
		case 'netherite':
			titleObj = [
				{ text: '네더라이트 주괴', color: 'dark_purple', bold: 'true' },
				{ text: ' ' },
				{ text: 'x', color: 'gray', bold: 'true' },
				{ text: ' ' },
				{ text: '2', color: 'white', bold: 'true' },
			]
			break
		default:
			titleObj = [{ text: '꽝...', color: 'red', bold: 'true' }]
			break
	}

	return JSON.stringify(titleObj)
}

getRandomBoxPrizeTitle()
