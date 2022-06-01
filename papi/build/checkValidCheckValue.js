// parse external placeholders
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
// check player has valid amound of check item in inventory
function checkValidCheckValue() {
	var value = args[0]
	var placeholder = 'checkitem_amount_mat:paper,namecontains:'.concat(
		value,
		'원,lorecontains:발행인,enchanted'
	)
	// get amount of check item
	var amount = parseInt(parsePlaceholder(placeholder))
	return amount > 0
}
checkValidCheckValue()
