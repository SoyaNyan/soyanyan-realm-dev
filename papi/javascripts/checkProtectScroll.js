var ENCHANT_PROTECT_SCROLL_NAME =
	'&7[&#&5&5&C&B&C&D ★★★ &7] &#&E&C&D&5&E&3&l아이템 &#&F&F&F&F&B&5&l프로텍트 &#&E&C&E&A&E&4&l스크롤'

function checkProtectScroll() {
	for (var i = 1; i <= 8; i++) {
		var placeholder = 'checkitem_getinfo:' + i + '_namecontains:name'
		var itemName = PlaceholderAPI.static
			.setPlaceholders(BukkitPlayer, '%' + placeholder + '%')
			.replaceAll('§', '&')
			.replaceAll('x', '#')
		if (itemName == ENCHANT_PROTECT_SCROLL_NAME) {
			return 1
		}
	}
	return 0
}

checkProtectScroll()
