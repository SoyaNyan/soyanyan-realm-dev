function getRandomBoxRollingTitle() {
	var titleObj = [
		{ text: '아', color: '#fb0097', bold: 'true' },
		{ text: '이', color: '#fb159c', bold: 'true' },
		{ text: '템', color: '#fb2ba0', bold: 'true' },
		{ text: ' ' },
		{ text: '고', color: '#fc40a5', bold: 'true' },
		{ text: '르', color: '#fc56aa', bold: 'true' },
		{ text: '는', color: '#fc6bae', bold: 'true' },
		{ text: ' ' },
		{ text: '중', color: '#fc81b3', bold: 'true' },
		{ text: '.', color: '#fd96b8', bold: 'true' },
		{ text: '.', color: '#fdacbc', bold: 'true' },
		{ text: '.', color: '#fdc1c1', bold: 'true' },
	]
	return JSON.stringify(titleObj)
}

getRandomBoxRollingTitle()
