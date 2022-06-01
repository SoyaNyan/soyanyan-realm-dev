function getRandomBoxTitle() {
	var titleObj = [
		{ text: '랜', color: '#fbd300', bold: 'true' },
		{ text: '덤', color: '#f0d706', bold: 'true' },
		{ text: '박', color: '#e6db0b', bold: 'true' },
		{ text: '스', color: '#dbde11', bold: 'true' },
		{ text: '를', color: '#d0e217', bold: 'true' },
		{ text: ' ' },
		{ text: '사', color: '#c6e61c', bold: 'true' },
		{ text: '용', color: '#bbea22', bold: 'true' },
		{ text: '했', color: '#b1ee27', bold: 'true' },
		{ text: '습', color: '#a6f22d', bold: 'true' },
		{ text: '니', color: '#9bf533', bold: 'true' },
		{ text: '다', color: '#91f938', bold: 'true' },
		{ text: '!', color: '#86fd3e', bold: 'true' },
	]
	return JSON.stringify(titleObj)
}

getRandomBoxTitle()
