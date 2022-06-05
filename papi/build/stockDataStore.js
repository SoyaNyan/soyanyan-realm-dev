/**
 * Author: SOYANYAN (소야냥)
 * Name: stockDataStore.ts
 * Version: v1.3.0
 * Last Update: 2022-06-05
 *
 * TypeScript Version: v4.7.2
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */
var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i]
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
				}
				return t
			}
		return __assign.apply(this, arguments)
	}
/**
[ constants ]
*/
// player name
var PLAYER_NAME = '%player_name%'
// stock trading fee setting
var TRADING_FEE_RATE = 0.01
// setting of stocks
var STOCKS = {
	'stock01': {
		name: '소야냥건설',
		lastPrice: 10000,
		currentPrice: 10000,
		totalShares: 0,
		slotBuy: 0,
		slotSell: 0,
		slotBuyBal: 0,
		slotSellBal: 0,
		totalBuy: 0,
		totalSell: 0,
		totalBuyBal: 0,
		totalSellBal: 0,
		priceFluct: '##########',
		accounts: '',
	},
	'stock02': {
		name: '소야냥톡',
		lastPrice: 50000,
		currentPrice: 50000,
		totalShares: 0,
		slotBuy: 0,
		slotSell: 0,
		slotBuyBal: 0,
		slotSellBal: 0,
		totalBuy: 0,
		totalSell: 0,
		totalBuyBal: 0,
		totalSellBal: 0,
		priceFluct: '##########',
		accounts: '',
	},
	'stock03': {
		name: '소야냥그룹',
		lastPrice: 100000,
		currentPrice: 100000,
		totalShares: 0,
		slotBuy: 0,
		slotSell: 0,
		slotBuyBal: 0,
		slotSellBal: 0,
		totalBuy: 0,
		totalSell: 0,
		totalBuyBal: 0,
		totalSellBal: 0,
		priceFluct: '##########',
		accounts: '',
	},
}
// exp item setting
var EXP_ITEMS = {
	100: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC001',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '100exp',
		exp: 100,
	},
	500: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC002',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '500exp',
		exp: 500,
	},
	1000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC003',
		mat: 'EXPERIENCE_BOTTLE',
		keyword: '1,000exp',
		exp: 1000,
	},
	5000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC004',
		mat: 'AMETHYST_SHARD',
		keyword: '5,000exp',
		exp: 5000,
	},
	10000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC005',
		mat: 'AMETHYST_SHARD',
		keyword: '10,000exp',
		exp: 10000,
	},
	100000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC006',
		mat: 'NETHER_STAR',
		keyword: '100,000exp',
		exp: 100000,
	},
	1000000: {
		placeholder: 'checkitem_amount_lorecontains:EE-FC007',
		mat: 'END_CRYSTAL',
		keyword: '1,000,000exp',
		exp: 1000000,
	},
}
/**
[ data utilities ]
*/
// check if data(key) exists in global store
function exists(path) {
	// returns true if a key exists; else false. (Placeholder API)
	return Data.exists(path)
}
// get data from global store
function get(path) {
	var result
	// check data exists
	if (path.length > 0) {
		// check data exists
		if (!exists(path)) return false
		// returns the value stored under key. (Placeholder API)
		// type of data value => number | string | boolean
		result = Data.get(path)
	} else {
		// returns a Map<String, Object> of the entire placeholder script's data. (Placeholder API)
		result = Data.getData()
	}
	return result
}
// set data in global store
function set(path, payload) {
	// check data exists
	if (exists(path)) {
		return update(path, payload)
	}
	// stores a value under key. (Placeholder API)
	Data.set(path, payload)
	save()
	return true
}
// update data in global store
function update(path, payload) {
	// check data exists
	if (!exists(path)) {
		return set(path, payload)
	}
	// stores a value under key. (Placeholder API)
	Data.set(path, payload)
	save()
	return true
}
// remove data from global store
function remove(path) {
	// check data exists
	if (!exists(path)) return false
	// removes a key from the data. (Placeholder API)
	Data.remove(path)
	save()
	return true
}
// remove all data from global store
function clear() {
	// removes all data. (Placeholder API)
	Data.clear()
	save()
	return true
}
// saves current state
function save() {
	// saves the current data state to the data file. (Placeholder API)
	Placeholder.saveData()
}
/**
[ general utilities ]
*/
// parse external placeholders
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
// stringify data for placeholder return
function stringify(data) {
	return ''.concat(data)
}
// encode boolean as '1' or '0'
function encodeBoolean(data) {
	return data ? '1' : '0'
}
// round under 100
function fixDigits(value) {
	return Math.round(value / 100) * 100
}
// format currency with commas
function formatWithCommas(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/, ',')
}
/**
	[ Spigot API utilities ]
*/
// execute command on server console
function execConsoleCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}
// execute command as player
function execCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}
/**
[ stock utilities ]
*/
// initialize stock data
function initStock(stockId) {
	// set stock data as init object
	setStockData(stockId, STOCKS[stockId])
}
// get specific stock data
function getStockData(stockId) {
	return {
		name: get(''.concat(stockId, '.name')),
		lastPrice: get(''.concat(stockId, '.lastPrice')),
		currentPrice: get(''.concat(stockId, '.currentPrice')),
		totalShares: get(''.concat(stockId, '.totalShares')),
		slotBuy: get(''.concat(stockId, '.slotBuy')),
		slotSell: get(''.concat(stockId, '.slotSell')),
		slotBuyBal: get(''.concat(stockId, '.slotBuyBal')),
		slotSellBal: get(''.concat(stockId, '.slotSellBal')),
		totalBuy: get(''.concat(stockId, '.totalBuy')),
		totalSell: get(''.concat(stockId, '.totalSell')),
		totalBuyBal: get(''.concat(stockId, '.totalBuyBal')),
		totalSellBal: get(''.concat(stockId, '.totalSellBal')),
		priceFluct: get(''.concat(stockId, '.priceFluct')),
	}
}
// set or update each stock data
function setStockData(stockId, data) {
	// set data
	for (var key in data) {
		if (typeof data[key] !== 'undefined') {
			set(''.concat(stockId, '.').concat(key), data[key])
		}
	}
}
// remove specific stock data
function removeStockData(stockId) {
	return remove(''.concat(stockId))
}
// remove all stock data
function clearStockData() {
	return clear()
}
// check stock data exists if not initialize
function checkStock(stockId) {
	// if stock data not exists, initialize it
	if (!exists(stockId)) initStock(stockId)
}
// get player's stock account data
function getAccountData(stockId, playerName) {
	return {
		stocks: get(''.concat(stockId, '.accounts.').concat(playerName, '.stocks')),
		totalPrice: get(''.concat(stockId, '.accounts.').concat(playerName, '.totalPrice')),
	}
}
// set or update player's stock account data
function setAccountData(stockId, playerName, data) {
	// set data
	for (var key in data) {
		if (typeof data[key] !== 'undefined') {
			set(''.concat(stockId, '.accounts.').concat(playerName, '.').concat(key), data[key])
		}
	}
}
// check player has specific stock account
function checkAccount(stockId, playerName) {
	var path = ''.concat(stockId, '.accounts.').concat(playerName, '.stocks')
	// if account not exists, initialize it
	if (!exists(path))
		setAccountData(stockId, playerName, {
			stocks: 0,
			totalPrice: 0,
		})
}
// format stock price fluctuation data
function formatFluct(fluctData) {
	// replace fluct data to symbols
	return fluctData.replace(/1/gi, '▲').replace(/-/gi, '=').replace(/0/gi, '▼')
}
// process stock transaction
function processTransaction(stockData, amount, type) {
	// get current stock price
	var currentPrice = stockData.currentPrice
	// get player's total exp in own inventory
	var totalExp = checkTotalItemExp()
	// buying process
	if (type === 'buy') {
		// set required cost
		var cost = getCost(currentPrice, amount)
		// check player has enough exp
		if (totalExp < cost) return false
		// take all exp items from player, check failed
		if (!removeAllExp()) return false
		// calculate total value of change
		var change = getChange(totalExp, cost)
		// caclutate amount of items
		var items = getExpItemAmount(change)
		// give change to player
		giveExp(items)
	}
	// selling process
	if (type === 'sell') {
		// calculate total value of profit
		var profit = getProfit(currentPrice, amount)
		// caclutate amount of items
		var items = getExpItemAmount(profit)
		// give profit to player
		giveExp(items)
	}
	// return success ack
	return true
}
// convert fluct data
function convertFluctData(priceFluct) {
	var fluctArr = priceFluct.split('')
	// count
	var fluctData = fluctArr.reduce(
		function (acc, fluct) {
			if (fluct !== '#') {
				// rise
				if (fluct === '1') {
					return __assign(__assign({}, acc), { rise: acc.rise + 1, total: acc.total + 1 })
				}
				// hold
				if (fluct === '-') {
					return __assign(__assign({}, acc), { hold: acc.rise + 1, total: acc.total + 1 })
				}
				// drop
				if (fluct === '0') {
					return __assign(__assign({}, acc), { drop: acc.rise + 1, total: acc.total + 1 })
				}
			}
			return __assign({}, acc)
		},
		{
			rise: 0,
			hold: 0,
			drop: 0,
			total: 0,
		}
	)
	return fluctData
}
// get last stock fluctuation
function getLastFluct(priceFluct) {
	// return last fluct symbol
	return priceFluct.replace(/#/gi, '').slice(-1)
}
// push and pop fluctuation data
function pushFluct(priceFluct, symbol) {
	// if empty slot exists
	if (priceFluct.indexOf('#') !== -1) {
		return priceFluct.replace('#', symbol)
	}
	return priceFluct.slice(1).concat(symbol)
}
// calculate required amount of exp
function getCost(currentPrice, amount) {
	// set required cost
	var cost = amount * currentPrice
	// add traiding fee
	var fee = fixDigits(cost * TRADING_FEE_RATE)
	// return total value of profit
	return cost + fee
}
// calculate value of change for player
function getChange(totalExp, cost) {
	// calc change
	var change = totalExp - cost
	// return total value of change
	return change
}
// calculate value of selling profit for player
function getProfit(currentPrice, amount) {
	// set profit
	var profit = amount * currentPrice
	// subs traiding fee
	var fee = fixDigits(profit * TRADING_FEE_RATE)
	// return total value of profit
	return profit - fee
}
// set volatility to each stock data
function setVolatility(stockId) {
	// check stock exists
	checkStock(stockId)
	// get stock data
	var stockData = getStockData(stockId)
	// update current price with volatility
	var updateData = getNextStockData(stockData)
	// update stock data
	setStockData(stockId, updateData)
}
// create next stock data with volitility
function getNextStockData(stockData) {
	var currentPrice = stockData.currentPrice,
		priceFluct = stockData.priceFluct
	// get volatility
	var randomVolit = Math.random()
	var volatility = randomVolit * 10 + 2
	var randomPerc = Math.random()
	var variancePerc = 2 * volatility * randomPerc
	if (variancePerc > volatility) variancePerc -= 2 * volatility
	// update current price
	var variancePrice = currentPrice * (variancePerc / 100)
	var updatePrice = fixDigits(currentPrice + variancePrice)
	// updated fluct data
	var fluct = '-'
	if (updatePrice > currentPrice) {
		fluct = '1'
	}
	if (updatePrice < currentPrice) {
		fluct = '0'
	}
	var updateFluct = pushFluct(priceFluct, fluct)
	// return stock data for update
	return {
		lastPrice: currentPrice,
		currentPrice: updatePrice,
		slotBuy: 0,
		slotSell: 0,
		slotBuyBal: 0,
		slotSellBal: 0,
		priceFluct: updateFluct,
	}
}
/**
[ exp economy utilities ]
*/
// get amount of expeconomy item by value
function getItemValue(value) {
	var _a = EXP_ITEMS[value],
		placeholder = _a.placeholder,
		exp = _a.exp
	// return calculated total exp
	return parseInt(parsePlaceholder(placeholder)) * exp
}
// calculate total exp in player inventory
function checkTotalItemExp() {
	var totalExp = 0
	// check all exp items
	for (var item in EXP_ITEMS) {
		totalExp += getItemValue(parseInt(item))
	}
	return totalExp
}
// remove all exp items (filled containers)
function removeAllExp() {
	var placeholder = 'checkitem_remove_lorecontains:EE-FC'
	// remove items from player's inventory
	return parsePlaceholder(placeholder) === 'yes'
}
// give calculated exp item to player
function getExpItemAmount(balance) {
	// exp item values
	var itemAmounts = {
		'1000000': 0,
		'100000': 0,
		'10000': 0,
		'5000': 0,
		'1000': 0,
		'500': 0,
		'100': 0,
	}
	var itemKeys = Object.keys(itemAmounts).sort(function (a, b) {
		return parseInt(b) - parseInt(a)
	})
	// check amount of each items
	var rest = balance
	for (var _i = 0, itemKeys_1 = itemKeys; _i < itemKeys_1.length; _i++) {
		var v = itemKeys_1[_i]
		itemAmounts[v] += Math.floor(rest / parseInt(v))
		rest = rest % parseInt(v)
	}
	// return amount of specific item
	return itemAmounts
}
// give exp items to player
function giveExp(items) {
	// exp items
	var expItems = {
		'100': 'exp_filled_bottle_100',
		'500': 'exp_filled_bottle_500',
		'1000': 'exp_filled_bottle_1000',
		'5000': 'exp_filled_crystal_5000',
		'10000': 'exp_filled_crystal_10000',
		'100000': 'exp_filled_starlight_100000',
		'1000000': 'exp_filled_starlight_1000000',
	}
	// give each item to player
	for (var item in items) {
		// item id
		var itemId = expItems[item]
		// item amount
		var amount = items[item]
		// check amount is 0
		if (amount > 0) {
			// create command
			var command = 'ei give '.concat(PLAYER_NAME, ' ').concat(itemId, ' ').concat(amount)
			// execute command
			execConsoleCommand(command)
		}
	}
	// return success ack
	return true
}
/**
[ action handler ]
*/
// initialize stocks' data
function initStocks(args) {
	// get args
	var stockId = args[0]
	// check stockId specified
	if (stockId === undefined) {
		for (var stock in STOCKS) {
			initStock(stock)
		}
	} else {
		initStock(stockId)
	}
	// normal return
	return true
}
// check player balance
function checkBalance(args) {
	// get total exp balance in player's inventory
	var balance = checkTotalItemExp()
	// normal return
	return balance
}
// get name of stock
function stockName(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.name')
	// get data
	var data = get(path)
	// normal return
	return data
}
// get current buying price with trading fee
function buyPrice(args) {
	// get args
	var returnType = args[0],
		stockId = args[1],
		trscAmount = args[2]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// get stock data
	var currentPrice = getStockData(stockId).currentPrice
	// get price when buying
	var price = getCost(currentPrice, amount)
	// check return type (condition: currentPrice > lastPrice)
	if (returnType === '1') return formatWithCommas(price)
	// normal return
	return price
}
// get current selling price with trading fee
function sellPrice(args) {
	// get args
	var returnType = args[0],
		stockId = args[1],
		trscAmount = args[2]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// get stock data
	var currentPrice = getStockData(stockId).currentPrice
	// get price when buying
	var price = getProfit(currentPrice, amount)
	// check return type (condition: currentPrice > lastPrice)
	if (returnType === '1') return formatWithCommas(price)
	// normal return
	return price
}
// get current price by stockId
function currentPrice(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.currentPrice')
	// get data
	var data = get(path)
	// check return type (condition: currentPrice > lastPrice)
	var last = get(''.concat(stockId, '.lastPrice'))
	var cond = data > last
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get last price by stockId
function lastPrice(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.lastPrice')
	// get data
	var data = get(path)
	// check return type (condition: currentPrice > lastPrice)
	var curr = get(''.concat(stockId, '.currentPrice'))
	var cond = data < curr
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
function totalShares(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalShares')
	// get data
	var data = get(path)
	// check return type (condition: totalShares > 0)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
function fluctPercentage(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// get stock data
	var _a = getStockData(stockId),
		currentPrice = _a.currentPrice,
		lastPrice = _a.lastPrice
	// calc percentage
	var percentage = (Math.abs(currentPrice - lastPrice) / lastPrice) * 100
	// fix decimals digits to 2
	return percentage.toFixed(2)
}
// get stock count that player has
function playerStockCount(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// set yaml data path
	var path = ''.concat(stockId, '.accounts.').concat(PLAYER_NAME)
	// get data
	var data = get(path)
	// check return type (condition: player has stock in own account)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	if (returnType === '3') {
		// get total shares of stock
		var totalShares_1 = get(''.concat(stockId, '.totalShares'))
		// calc share ratio
		var shareRatio = fixDigits((data / totalShares_1) * 100)
		return shareRatio
	}
	// normal return
	return formatWithCommas(data)
}
// get average price of player's stock
function averagePrice(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// get stock data
	var currentPrice = getStockData(stockId).currentPrice
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get player account data
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	// calc average price
	var averagePrice = totalPrice / stocks
	// check return type (condition: average price < current price)
	var cond = averagePrice < currentPrice
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(averagePrice.toFixed(2))
}
// get estimated profit of player
function estimatedProfit(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// get stock data
	var currentPrice = getStockData(stockId).currentPrice
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get player account data
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	// calc estimated profit
	var estimatedProfit = currentPrice * stocks - totalPrice
	// check return type (condition: estimated profit > 0)
	var cond = estimatedProfit > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	if (returnType === '3') return cond ? '&a+' : estimatedProfit === 0 ? '' : '&c-'
	if (returnType === '4') {
		// calc estimated profit as percentage
		var percentage = ((currentPrice * stocks) / totalPrice) * 100
		return percentage.toFixed(2)
	}
	// normal return
	return formatWithCommas(estimatedProfit)
}
// get slot stock buy count
function slotBuy(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.slotBuy')
	// get data
	var data = get(path)
	// check return type (condition: if player bought this stock one or more)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get slot stock sell count
function slotSell(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.slotSell')
	// get data
	var data = get(path)
	// check return type (condition: if player sold this stock one or more)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get slot stock buy balance
function slotBuyBal(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.slotBuyBal')
	// get data
	var data = get(path)
	// check return type (condition: if total buy balance is larger then 0)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get slot stock sell balance
function slotSellBal(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.slotSellBal')
	// get data
	var data = get(path)
	// check return type (condition: if total sell balance is larger then 0)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get total stock buy count
function totalBuy(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalBuy')
	// get data
	var data = get(path)
	// check return type (condition: if player bought this stock one or more)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get total stock sell count
function totalSell(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalSell')
	// get data
	var data = get(path)
	// check return type (condition: if player sold this stock one or more)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get total stock buy balance
function totalBuyBal(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalBuyBal')
	// get data
	var data = get(path)
	// check return type (condition: if total buy balance is larger then 0)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get total stock sell balance
function totalSellBal(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalSellBal')
	// get data
	var data = get(path)
	// check return type (condition: if total sell balance is larger then 0)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(data)
}
// get stock price fluctuation data
function priceFluctuation(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.priceFluct')
	// get data
	var data = get(path)
	// check return type (condition: convert fluctuation data to symbol)
	var fluctData = stringify(data)
	if (returnType === '1') return formatFluct(fluctData)
	if (returnType === '2') return formatFluct(getLastFluct(fluctData))
	if (returnType === '3') {
		var fluctSymbols = formatFluct(fluctData)
		// replace symbol with color coded symbol
		return fluctSymbols
			.replace(/▲/g, '&c▲')
			.replace(/\=/g, '&7=')
			.replace(/▼/g, '&9▼')
			.replace(/#/g, '&7#')
	}
	if (returnType === '4') {
		var fluctSymbol = formatFluct(getLastFluct(fluctData))
		// rise
		if (fluctSymbol === '▲') return '&c'.concat(fluctSymbol)
		// drop
		if (fluctSymbol === '▼') return '&9'.concat(fluctSymbol)
		// no change
		return '&7'.concat(fluctSymbol)
	}
	// normal return
	return data
}
// buy stock (give stock to player)
function buyStock(args) {
	// get args
	var returnType = args[0],
		stockId = args[1],
		trscAmount = args[2]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get stock data
	var stockData = getStockData(stockId)
	// get account data
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	// process transaction
	var processResult = processTransaction(stockData, amount, 'buy')
	// update data
	if (processResult) {
		// calc cost
		var cost = stockData.currentPrice * amount
		// update stock data
		var updateData = {
			totalShares: stockData.totalShares + amount,
			slotBuy: stockData.slotBuy + amount,
			slotBuyBal: stockData.slotBuyBal + cost,
			totalBuy: stockData.totalBuy + amount,
			totalBuyBal: stockData.totalBuyBal + cost,
		}
		setStockData(stockId, updateData)
		// update account data
		var updateAccount = {
			stocks: stocks + amount,
			totalPrice: totalPrice + cost,
		}
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}
	return processResult
}
// sell stock (take stock from player)
function sellStock(args) {
	// get args
	var returnType = args[0],
		stockId = args[1],
		trscAmount = args[2]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get stock data
	var stockData = getStockData(stockId)
	// get account data
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	// check stock amount
	if (stocks - amount < 0) return false
	// process transaction
	var processResult = processTransaction(stockData, amount, 'sell')
	// update data
	if (processResult) {
		// calc profit
		var profit = stockData.currentPrice * amount
		// update stock data
		var updateData = {
			totalShares: stockData.totalShares - amount,
			slotSell: stockData.slotSell + amount,
			slotSellBal: stockData.slotSellBal + profit,
			totalSell: stockData.totalSell + amount,
			totalSellBal: stockData.totalSellBal + profit,
		}
		setStockData(stockId, updateData)
		// update account data
		var updatedAccount = {
			stocks: stocks - amount,
			totalPrice: totalPrice - profit,
		}
		setAccountData(stockId, PLAYER_NAME, updatedAccount)
	}
	return processResult
}
// give stock to player (for admin)
function giveStock(args) {
	// get args
	var returnType = args[0],
		stockId = args[1],
		giveAmount = args[2],
		playerName = args[3]
	// parse args
	var amount = parseInt(giveAmount)
	// check stock exists
	checkStock(stockId)
	var currentPrice = getStockData(stockId).currentPrice
	// check player stock account exists
	checkAccount(stockId, playerName)
	// get account data
	var _a = getAccountData(stockId, playerName),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	// update account data
	var updatedStocks = stocks + amount
	var updatedTotalPrice = totalPrice + currentPrice * amount
	var updatedAccount = {
		stocks: updatedStocks < 0 ? 0 : updatedStocks,
		totalPrice: updatedTotalPrice < 0 ? 0 : updatedTotalPrice,
	}
	setAccountData(stockId, playerName, updatedAccount)
	return true
}
// set volatility to stock price
function setStockVolatility(args) {
	// get args
	var returnType = args[0],
		stockId = args[1]
	// check stockId specified
	if (stockId === undefined) {
		for (var stock in STOCKS) {
			setVolatility(stock)
		}
	} else {
		setVolatility(stockId)
	}
	// check return type (condition: in update cooldown)
	var cond = true
	if (returnType === '1') return encodeBoolean(cond)
	// return success ack
	return '[주식] 주식가격 변동!'
}
// get next update ETA in mm:ss units
function nextUpdateETA(args) {
	// get args
	var returnType = args[0]
	// get seconds from 'Command Timer' plugin's placeholder
	// >> https://www.spigotmc.org/resources/command-timer.24141/
	var seconds = parseInt(parsePlaceholder('commandtimer_stockTimer_nextExecution'))
	// check seconds larger than 0
	if (seconds <= 0) return '&60&f분 &60&f초'
	// format time
	var etaMins = Math.floor(seconds / 60)
	var etaSecs = seconds % 60
	// check return type (condition: in update cooldown)
	var cond = seconds > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return '&6'.concat(etaMins, '&f\uBD84 &6').concat(etaSecs, '&f\uCD08')
}
// remove specific stock data
function removeStock(args) {
	// get args
	var stockId = args[0]
	// remove stock data
	return removeStockData(stockId)
}
// clear all stock data
function clearStock() {
	// remove stock data
	return clearStockData()
}
/**
[ data store structure ]
	- Format: YAML

[stockId]:
	name: string
	lastPrice: number
	currentPrice: number
			totalShares: number
	slotBuy: number
	slotSell: number
	slotBuyBal: number
	slotSellBal: number
			totalBuy: number
	totalSell: number
	totalBuyBal: number
	totalSellBal: number
			priceFluct: string # '1', '0', '-' 10 slots
	account:
		[playerName]:
							stocks: number
							totalPrice: number
*/
// placeholder controller
function stockDataStore() {
	// action result
	var result = false
	// get args
	/* args: string[]
			[
					action      => data store action,
					returnType  => shlould return value or condition as boolean | number (0 => normal, 1 => boolean, 2 => '0' or '1'),
					stockId     => stock identifier(code),
					trscAmount? => transaction amount(amount of stock). 0 (defualt),
					trscType?   => transaction type. 'buy' | 'sell'
			]
	*/
	var action = args[0],
		restArgs = args.slice(1)
	// filter action
	switch (action) {
		case 'initStocks': // initialize stocks' data
			// check args
			if (restArgs.length !== 0 && args.length !== 1) return 'false'
			// execute
			result = initStocks(restArgs)
			break
		case 'checkBalance': // check player balance
			// check args
			if (restArgs.length !== 0) return 'false'
			// execute
			result = checkBalance(restArgs)
			break
		case 'stockName': // get name of stock
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = stockName(restArgs)
			break
		case 'buyPrice': // get buying price with trading fee
			// check args
			if (restArgs.length !== 3) return 'false'
			// execute
			result = buyPrice(restArgs)
			break
		case 'sellPrice': // get selling price with trading fee
			// check args
			if (restArgs.length !== 3) return 'false'
			// execute
			result = sellPrice(restArgs)
			break
		case 'currentPrice': // get current price by stockId
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = currentPrice(restArgs)
			break
		case 'lastPrice': // get last price by stockId
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = lastPrice(restArgs)
			break
		case 'totalShares': // get total shares of stock
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = totalShares(restArgs)
			break
		case 'priceFluctPercent': // get price fluct in percentage
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = fluctPercentage(restArgs)
			break
		case 'playerStockCount': // get stock count that player has
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = playerStockCount(restArgs)
			break
		case 'averagePrice': // get average price of player's stock
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = averagePrice(restArgs)
			break
		case 'estimatedProfit': // get estimated profit of player
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = estimatedProfit(restArgs)
			break
		case 'slotBuy': // get slot stock buy count
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = slotBuy(restArgs)
			break
		case 'slotSell': // get slot stock sell count
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = slotSell(restArgs)
			break
		case 'slotBuyBal': // get slot stock buy balance
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = slotBuyBal(restArgs)
			break
		case 'slotSellBal': // get slot stock sell balance
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = slotSellBal(restArgs)
			break
		case 'totalBuy': // get total stock buy count
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = totalBuy(restArgs)
			break
		case 'totalSell': // get total stock sell count
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = totalSell(restArgs)
			break
		case 'totalBuyBal': // get total stock buy balance
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = totalBuyBal(restArgs)
			break
		case 'totalSellBal': // get total stock sell balance
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = totalSellBal(restArgs)
			break
		case 'stockFluct': // get stock price fluctuation data
			// check args
			if (restArgs.length !== 2) return 'false'
			// execute
			result = priceFluctuation(restArgs)
			break
		case 'buyStock': // buy stock (give stock to player)
			// check args
			if (restArgs.length !== 3) return 'false'
			// execute
			result = buyStock(restArgs)
			break
		case 'sellStock': // sell stock (take stock from player)
			// check args
			if (restArgs.length !== 3) return 'false'
			// execute
			result = sellStock(restArgs)
			break
		case 'giveStock': // give stock to player (for event only)
			// check args
			if (restArgs.length !== 4) return 'false'
			// execute
			result = giveStock(restArgs)
			break
		case 'setV':
			// check args
			if (restArgs.length !== 1 && restArgs.length !== 2) return 'false'
			// execute
			result = setStockVolatility(restArgs)
			break
		case 'nextUpdateETA': // get next update ETA in mm:ss units
			// check args
			if (restArgs.length !== 1) return 'false'
			// execute
			result = nextUpdateETA(restArgs)
			break
		case 'removeStock': // remove specific stock data
			// check args
			if (restArgs.length !== 1) return 'false'
			// execute
			result = removeStock(restArgs)
			break
		case 'clearStock': // clear all stock data
			// check args
			if (restArgs.length !== 0) return 'false'
			// execute
			result = clearStock()
			break
		default:
			result = false
	}
	// return action result
	return stringify(result)
}
stockDataStore()
