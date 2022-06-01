var MAGIC_RECIPE_NAME = '&7[&#FFC8A2 ★ &7] &#ECEAE4&l주문서 &#FF968A&l제작 &#FFC8A2&l레시피'
var ENCHANT_SCROLLS = [
	'enchantScrollBlastProtection',
	'enchantScrollFeatherFalling',
	'enchantScrollFireProtection',
	'enchantScrollProjectileProtection',
	'enchantScrollProtection',
	'enchantScrollUnbreaking',
	'enchantScrollEfficiency',
	'enchantScrollFortune',
	'enchantScrollLuckOfTheSea',
	'enchantScrollLure',
	'enchantScrollBaneOfArthropods',
	'enchantScrollImpaling',
	'enchantScrollLooting',
	'enchantScrollPower',
	'enchantScrollRiptide',
	'enchantScrollRoyalty',
	'enchantScrollSharpness',
	'enchantScrollSmite',
	'enchantScrollSweeping',
]
var ENCHANT_SCROLL_NAMES = {
	enchantScrollBlastProtection:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l폭발보호 #ECEAE4&l강화 주문서',
	enchantScrollFeatherFalling:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l가착 #ECEAE4&l강화 주문서',
	enchantScrollFireProtection:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l화염보호 #ECEAE4&l강화 주문서',
	enchantScrollProjectileProtection:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l투사체보호 #ECEAE4&l강화 주문서',
	enchantScrollProtection: '&7[#FFC8A2 ★★ &7] #55CBCD&l방어구 #FFFFB5&l보호 #ECEAE4&l강화 주문서',
	enchantScrollUnbreaking: '&7[#FFC8A2 ★★ &7] #55CBCD&l아이템 #FFFFB5&l내구 #ECEAE4&l강화 주문서',
	enchantScrollEfficiency: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l효율 #ECEAE4&l강화 주문서',
	enchantScrollFortune: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l행운 #ECEAE4&l강화 주문서',
	enchantScrollLuckOfTheSea:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l바다의행운 #ECEAE4&l강화 주문서',
	enchantScrollLure: '&7[#FFC8A2 ★★ &7] #55CBCD&l도구 #FFFFB5&l미끼 #ECEAE4&l강화 주문서',
	enchantScrollBaneOfArthropods:
		'&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l살충 #ECEAE4&l강화 주문서',
	enchantScrollImpaling: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l찌르기 #ECEAE4&l강화 주문서',
	enchantScrollLooting: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l약탈 #ECEAE4&l강화 주문서',
	enchantScrollPower: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l힘 #ECEAE4&l강화 주문서',
	enchantScrollRiptide: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l집전 #ECEAE4&l강화 주문서',
	enchantScrollRoyalty: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l충성 #ECEAE4&l강화 주문서',
	enchantScrollSharpness: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l날카로움 #ECEAE4&l강화 주문서',
	enchantScrollSmite: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l강타 #ECEAE4&l강화 주문서',
	enchantScrollSweeping: '&7[#FFC8A2 ★★ &7] #55CBCD&l무기 #FFFFB5&l휩쓸기 #ECEAE4&l강화 주문서',
}

function getMagicRecipeCommand() {
	var randomInt = Math.floor(Math.random() * ENCHANT_SCROLLS.length)
	var giveCommand = 'ei give %player_name% ' + ENCHANT_SCROLLS[randomInt] + ' 1'
	return giveCommand
}

getMagicRecipeCommand()
