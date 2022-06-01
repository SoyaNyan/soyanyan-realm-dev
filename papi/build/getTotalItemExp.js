// global constants
var EXP_ITEMS = {
	100: {
		placeholder: 'checkitem_amount_mat:EXPERIENCE_BOTTLE,lorecontains:100exp',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '100exp',
		exp: 100,
	},
	500: {
		placeholder: 'checkitem_amount_mat:EXPERIENCE_BOTTLE,lorecontains:500exp',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '500exp',
		exp: 500,
	},
	1000: {
		placeholder: 'checkitem_amount_mat:EXPERIENCE_BOTTLE,lorecontains:1,000exp',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '1,000exp',
		exp: 1000,
	},
	5000: {
		placeholder: 'checkitem_amount_mat:AMETHYST_SHARD,lorecontains:5,000exp',
		mat: 'AMETHYST_SHARD',
		keyword: '5,000exp',
		exp: 5000,
	},
	10000: {
		placeholder: 'checkitem_amount_mat:AMETHYST_SHARD,lorecontains:10,000exp',
		mat: 'AMETHYST_SHARD',
		keyword: '10,000exp',
		exp: 10000,
	},
	100000: {
		placeholder: 'checkitem_amount_mat:NETHER_STAR,lorecontains:100,000exp',
		mat: 'NETHER_STAR',
		keyword: '100,000exp',
		exp: 100000,
	},
	1000000: {
		placeholder: 'checkitem_amount_mat:END_CRYSTAL,lorecontains:1,000,000exp',
		mat: 'END_CRYSTAL',
		keyword: '1,000,000exp',
		exp: 1000000,
	},
}
// parse external placeholders
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
// get amount of expeconomy item by value
function getAmount(value) {
	var _a = EXP_ITEMS[value],
		placeholder = _a.placeholder,
		exp = _a.exp
	return parseInt(parsePlaceholder(placeholder)) * exp
}
// calculate total exp in player inventory
function checkTotalItemExp() {
	var totalExp = 0
	// check all exp items
	for (var item in EXP_ITEMS) {
		totalExp += getAmount(parseInt(item))
	}
	return ''.concat(totalExp)
}
checkTotalItemExp()
