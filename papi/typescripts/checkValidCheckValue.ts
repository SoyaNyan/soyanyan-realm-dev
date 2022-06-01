// parse external placeholders
function parsePlaceholder(placeholder: string): string {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, `%${placeholder}%`)
}

// check player has valid amound of check item in inventory
function checkValidCheckValue(): boolean {
	const value = args[0]
	const placeholder = `checkitem_amount_mat:paper,namecontains:${value}원,lorecontains:발행인,enchanted`

	// get amount of check item
	const amount = parseInt(parsePlaceholder(placeholder))

	return amount > 0
}

checkValidCheckValue()
