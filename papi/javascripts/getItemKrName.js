function getItemKrName() {
	var targetItem = '%player_item_in_offhand%'

	var ITEMS_KR = {
		BOW: '활',
		FISHING_ROD: '낚싯대',
		TRIDENT: '삼지창',
		CROSSBOW: '쇠뇌',
		SHEARS: '가위',
		SHIELD: '방패',
		ELYTRA: '겉날개',
		FLINT_AND_STEEL: '부싯돌과 부시',
		CARROT_ON_A_STICK: '당근 낚싯대',
	}

	var MATERIALS_KR = {
		NETHERITE: '네더라이트',
		DIAMOND: '다이아몬드',
		GOLDEN: '금',
		CHAINMAIL: '사슬',
		IRON: '철',
		STONE: '돌',
		WOODEN: '나무',
		TURTLE: '거북',
	}
	var SUFFIXES_KR = {
		SWORD: '검',
		PICKAXE: '곡괭이',
		AXE: '도끼',
		SHOVEL: '삽',
		HOE: '괭이',
		HELMET: '투구(모자)',
		CHESTPLATE: '흉갑(조끼)',
		LEGGINGS: '레깅스(바지)',
		BOOTS: '부츠(장화)',
	}

	var checkItem = false
	for (var key in ITEMS_KR) {
		if (key == targetItem) {
			checkItem = true
		}
	}

	if (checkItem) {
		return ITEMS_KR[targetItem]
	} else {
		var material = targetItem.split('_')[0]
		var suffix = targetItem.split('_')[1]

		return MATERIALS_KR[material] + ' ' + SUFFIXES_KR[suffix]
	}
}

getItemKrName()
