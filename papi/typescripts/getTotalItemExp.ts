// type definition
type ExpEconomyValues = number

// global constants
const EXP_ITEMS: {
	[index: string]: any
} = {
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
function parsePlaceholder(placeholder: string): string {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, `%${placeholder}%`)
}

// get amount of expeconomy item by value
function getAmount(value: ExpEconomyValues): number {
	const { placeholder, exp } = EXP_ITEMS[value]
	return parseInt(parsePlaceholder(placeholder)) * exp
}

// calculate total exp in player inventory
function checkTotalItemExp(): string {
	let totalExp = 0
	// check all exp items
	for (const item in EXP_ITEMS) {
		totalExp += getAmount(parseInt(item))
	}
	return `${totalExp}`
}

checkTotalItemExp()
