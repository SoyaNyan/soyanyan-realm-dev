var MAGIC_RECIPE_NAME = '&7[&#FFC8A2 ★ &7] &#ECEAE4&l주문서 &#FF968A&l제작 &#FFC8A2&l레시피'
var ENCHANT_SCROLLS = [
	'enchantScrollBlastProtectionPlus',
	'enchantScrollFeatherFallingPlus',
	'enchantScrollFireProtectionPlus',
	'enchantScrollProjectileProtectionPlus',
	'enchantScrollProtectionPlus',
	'enchantScrollUnbreakingPlus',
	'enchantScrollEfficiencyPlus',
	'enchantScrollFortunePlus',
	'enchantScrollLuckOfTheSeaPlus',
	'enchantScrollLurePlus',
	'enchantScrollBaneOfArthropodsPlus',
	'enchantScrollImpalingPlus',
	'enchantScrollLootingPlus',
	'enchantScrollPowerPlus',
	'enchantScrollRiptidePlus',
	'enchantScrollRoyaltyPlus',
	'enchantScrollSharpnessPlus',
	'enchantScrollSmitePlus',
	'enchantScrollSweepingPlus',
]
var ENCHANT_SCROLL_NAMES = {
	enchantScrollBlastProtectionPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l폭발보호 #ECEAE4&l강화 주문서',
	enchantScrollFeatherFallingPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l가착 #ECEAE4&l강화 주문서',
	enchantScrollFireProtectionPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l화염보호 #ECEAE4&l강화 주문서',
	enchantScrollProjectileProtectionPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l투사체보호 #ECEAE4&l강화 주문서',
	enchantScrollProtectionPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l방어구 #FFFFB5&l보호 #ECEAE4&l강화 주문서',
	enchantScrollUnbreakingPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l아이템 #FFFFB5&l내구 #ECEAE4&l강화 주문서',
	enchantScrollEfficiencyPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l효율 #ECEAE4&l강화 주문서',
	enchantScrollFortunePlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l행운 #ECEAE4&l강화 주문서',
	enchantScrollLuckOfTheSeaPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l바다의행운 #ECEAE4&l강화 주문서',
	enchantScrollLurePlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l도구 #FFFFB5&l미끼 #ECEAE4&l강화 주문서',
	enchantScrollBaneOfArthropodsPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l살충 #ECEAE4&l강화 주문서',
	enchantScrollImpalingPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l찌르기 #ECEAE4&l강화 주문서',
	enchantScrollLootingPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l약탈 #ECEAE4&l강화 주문서',
	enchantScrollPowerPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l힘 #ECEAE4&l강화 주문서',
	enchantScrollRiptidePlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l집전 #ECEAE4&l강화 주문서',
	enchantScrollRoyaltyPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l충성 #ECEAE4&l강화 주문서',
	enchantScrollSharpnessPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l날카로움 #ECEAE4&l강화 주문서',
	enchantScrollSmitePlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l강타 #ECEAE4&l강화 주문서',
	enchantScrollSweepingPlus:
		'&7[#FFC8A2 ★★★ &7] #ECD5E3&l놀라운 #55CBCD&l무기 #FFFFB5&l휩쓸기 #ECEAE4&l강화 주문서',
}

function getMagicRecipeCommandPlus() {
	var randomInt = Math.floor(Math.random() * ENCHANT_SCROLLS.length)
	var giveCommand = 'ei give %player_name% ' + ENCHANT_SCROLLS[randomInt] + ' 1'
	return giveCommand
}

getMagicRecipeCommandPlus()
