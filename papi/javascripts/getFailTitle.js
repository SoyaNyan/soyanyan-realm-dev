function getFailTitle() {
	var titleObj = [
		{ text: '강', color: '#fb004b', bold: 'true' },
		{ text: '화', color: '#fb1e3f', bold: 'true' },
		{ text: '실', color: '#fc3d32', bold: 'true' },
		{ text: '패', color: '#fc5b26', bold: 'true' },
		{ text: '.', color: '#fc7919', bold: 'true' },
		{ text: '.', color: '#fd980d', bold: 'true' },
		{ text: '.', color: '#fdb600', bold: 'true' },
	]
	return JSON.stringify(titleObj)
}

getFailTitle()
