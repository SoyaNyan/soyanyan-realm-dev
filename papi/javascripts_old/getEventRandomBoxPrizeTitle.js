function getEventRandomBoxPrizeTitle() {
	var prize = args[0]
	var titleObj

	switch (prize) {
		case 'costReducerLow':
			titleObj = [
				{ text: '희미한', color: '#55CBCD', bold: 'true' },
				{ text: ' ' },
				{ text: '정화의', color: '#FFFFB5', bold: 'true' },
				{ text: ' ' },
				{ text: '가루', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'costReducerMedium':
			titleObj = [
				{ text: '선명한', color: '#55CBCD', bold: 'true' },
				{ text: ' ' },
				{ text: '정화의', color: '#FFFFB5', bold: 'true' },
				{ text: ' ' },
				{ text: '가루', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'costReducerHigh':
			titleObj = [
				{ text: '반짝이는', color: '#55CBCD', bold: 'true' },
				{ text: ' ' },
				{ text: '정화의', color: '#FFFFB5', bold: 'true' },
				{ text: ' ' },
				{ text: '가루', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'enchantEssenceLow':
			titleObj = [
				{ text: '미약한', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '인챈트', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '에센스', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'enchantEssenceMedium':
			titleObj = [
				{ text: '쓸만한', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '인챈트', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '에센스', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'enchantEssenceHigh':
			titleObj = [
				{ text: '강력한', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '인챈트', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '에센스', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'enchantProtectScroll':
			titleObj = [
				{ text: '아이템', color: '#ECD5E3', bold: 'true' },
				{ text: ' ' },
				{ text: '프로텍트', color: '#FFFFB5', bold: 'true' },
				{ text: ' ' },
				{ text: '스크롤', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'magicBook':
			titleObj = [
				{ text: '주문서', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '제작', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '레시피', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'magicBook':
			titleObj = [
				{ text: '주문서', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '제작', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '레시피', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'magicBookPlus':
			titleObj = [
				{ text: '놀라운', color: '#ECD5E3', bold: 'true' },
				{ text: ' ' },
				{ text: '주문서', color: '#ECEAE4', bold: 'true' },
				{ text: ' ' },
				{ text: '제작', color: '#FF968A', bold: 'true' },
				{ text: ' ' },
				{ text: '레시피', color: '#FFC8A2', bold: 'true' },
			]
			break
		case 'softPaper':
			titleObj = [
				{ text: '매끄러운', color: '#CCE2CB', bold: 'true' },
				{ text: ' ' },
				{ text: '종이', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'magicPaper':
			titleObj = [
				{ text: '신비로운', color: '#55CBCD', bold: 'true' },
				{ text: ' ' },
				{ text: '종이', color: '#ECEAE4', bold: 'true' },
			]
			break
		case 'magicInk':
			titleObj = [
				{ text: '마법의', color: 'gold', bold: 'true' },
				{ text: ' ' },
				{ text: '잉크', color: 'gray', bold: 'true' },
			]
			break
		default:
			titleObj = [{ text: '꽝...', color: 'red', bold: 'true' }]
			break
	}

	return JSON.stringify(titleObj)
}

getEventRandomBoxPrizeTitle()
