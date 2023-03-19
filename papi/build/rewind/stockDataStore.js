/**
 * Author: SOYANYAN (소야냥)
 * Name: stockDataStore.ts
 * Version: v1.2.0
 * Last Update: 2023-03-19
 *
 * TypeScript Version: v5.0.2
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

if (!String.prototype.repeat) {
	String.prototype.repeat = function (count) {
		var str = '' + this
		count = Math.floor(count)
		if (str.length === 0 || count === 0) {
			return ''
		}
		var maxCount = str.length * count
		count = Math.floor(Math.log(count) / Math.log(2))
		while (count) {
			str += str
			count--
		}
		str += str.substring(0, maxCount - str.length)
		return str
	}
}
var PLAYER_NAME = '%player_name%'
var TRADING_FEE_RATE = 0.01
var VOLATILITY = {
	'10000000': 0.05,
	'1000000': 0.5,
	'100000': 2.5,
	'10000': 5,
}
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
	'stock04': {
		name: '소야냥화학',
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
	'stock05': {
		name: '소야냥전자',
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
var MONEY_ITEMS = {
	1000: {
		placeholder: 'checkitem_amount_lorecontains:RM-MO001',
		mat: 'PAPER',
		keyword: '1,000',
		balance: 1000,
	},
	10000: {
		placeholder: 'checkitem_amount_lorecontains:RM-MO002',
		mat: 'PAPER',
		keyword: '10,000',
		balance: 10000,
	},
	100000: {
		placeholder: 'checkitem_amount_lorecontains:RM-MO003',
		mat: 'PAPER',
		keyword: '100,000',
		balance: 100000,
	},
	1000000: {
		placeholder: 'checkitem_amount_lorecontains:RM-MO004',
		mat: 'PAPER',
		keyword: '1,000,000',
		balance: 1000000,
	},
}
function exists(path) {
	return Data.exists(path)
}
function get(path) {
	var result
	if (path.length > 0) {
		if (!exists(path)) return false
		result = Data.get(path)
	} else {
		result = Data.getData()
	}
	return result
}
function set(path, payload) {
	if (exists(path)) {
		return update(path, payload)
	}
	Data.set(path, payload)
	save()
	return true
}
function update(path, payload) {
	if (!exists(path)) {
		return set(path, payload)
	}
	Data.set(path, payload)
	save()
	return true
}
function remove(path) {
	if (!exists(path)) return false
	Data.remove(path)
	save()
	return true
}
function clear() {
	Data.clear()
	save()
	return true
}
function save() {
	Placeholder.saveData()
}
function parsePlaceholder(placeholder) {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, '%'.concat(placeholder, '%'))
}
function stringify(data) {
	return ''.concat(data)
}
function encodeBoolean(data) {
	return data ? '1' : '0'
}
function fixDigits(value, roundValue) {
	return Math.round(value / roundValue) * roundValue
}
function formatWithCommas(value) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
function execConsoleCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}
function execCommand(command) {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}
function sendMessage(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitPlayer.sendMessage(message)
}
function logConsole(message) {
	if (message === undefined || message.length === 0) return false
	return BukkitServer.getConsoleSender().sendMessage(message)
}
function initStock(stockId) {
	setStockData(stockId, STOCKS[stockId])
}
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
function setStockData(stockId, data) {
	for (var key in data) {
		if (typeof data[key] !== 'undefined') {
			set(''.concat(stockId, '.').concat(key), data[key])
		}
	}
}
function removeStockData(stockId) {
	return remove(''.concat(stockId))
}
function clearStockData() {
	return clear()
}
function checkStock(stockId) {
	if (!exists(stockId)) initStock(stockId)
}
function getAccountData(stockId, playerName) {
	return {
		stocks: get(''.concat(stockId, '.accounts.').concat(playerName, '.stocks')),
		totalPrice: get(''.concat(stockId, '.accounts.').concat(playerName, '.totalPrice')),
	}
}
function setAccountData(stockId, playerName, data) {
	for (var key in data) {
		if (typeof data[key] !== 'undefined') {
			set(''.concat(stockId, '.accounts.').concat(playerName, '.').concat(key), data[key])
		}
	}
}
function checkAccount(stockId, playerName) {
	var path = ''.concat(stockId, '.accounts.').concat(playerName, '.stocks')
	if (!exists(path))
		setAccountData(stockId, playerName, {
			stocks: 0,
			totalPrice: 0,
		})
}
function formatFluct(fluctData) {
	return fluctData.replace(/1/gi, '▲').replace(/-/gi, '=').replace(/0/gi, '▼')
}
function processTransaction(stockData, amount, type) {
	var currentPrice = stockData.currentPrice
	var totalBalance = checkTotalBalance()
	if (type === 'buy') {
		var cost = getCost(currentPrice, amount)
		if (totalBalance < cost) return false
		if (!removeAllMoney()) return false
		var change = getChange(totalBalance, cost)
		var items = getMoneyItemAmount(change)
		giveMoney(items)
	}
	if (type === 'sell') {
		var profit = getProfit(currentPrice, amount)
		var items = getMoneyItemAmount(profit)
		giveMoney(items)
	}
	return true
}
function getLastFluct(priceFluct) {
	return priceFluct.replace(/#/gi, '').slice(-1)
}
function pushFluct(priceFluct, symbol) {
	if (priceFluct.indexOf('#') !== -1) {
		return priceFluct.replace('#', symbol)
	}
	return priceFluct.slice(1).concat(symbol)
}
function getCost(currentPrice, amount) {
	var cost = amount * currentPrice
	var fee = fixDigits(cost * TRADING_FEE_RATE, 1000)
	return cost + fee
}
function getChange(totalBalance, cost) {
	var change = totalBalance - cost
	return change
}
function getProfit(currentPrice, amount) {
	var profit = amount * currentPrice
	var fee = fixDigits(profit * TRADING_FEE_RATE, 1000)
	return profit - fee
}
function getVolatility(currentPrice) {
	for (var keyValue in VOLATILITY) {
		if (parseInt(keyValue) <= currentPrice) {
			return Math.random() * VOLATILITY[keyValue]
		}
	}
	return Math.random() * 10
}
function checkBias(priceFluct, fluct) {
	var ratio = 4
	var regex = new RegExp('/'.concat(fluct.repeat(ratio), '/g'))
	return (priceFluct.match(regex) || []).length > 0
}
function updateStockPrice(stockId) {
	checkStock(stockId)
	var stockData = getStockData(stockId)
	var updateData = getNextStockData(stockData)
	setStockData(stockId, updateData)
}
function getNextStockData(stockData) {
	var currentPrice = stockData.currentPrice,
		priceFluct = stockData.priceFluct
	var volatility = getVolatility(currentPrice)
	var varPerc = 2 * volatility * (Math.random() - 0.5)
	var varPrice = currentPrice * (varPerc / 100)
	var updatedPrice = fixDigits(currentPrice + varPrice, 100)
	var fluct = updatedPrice === currentPrice ? '-' : updatedPrice > currentPrice ? '1' : '0'
	if (checkBias(priceFluct, fluct)) {
		updatedPrice = fixDigits(currentPrice + varPrice * -1, 100)
		fluct = updatedPrice === currentPrice ? '-' : updatedPrice > currentPrice ? '1' : '0'
	}
	var updatedFluct = pushFluct(priceFluct, fluct)
	return {
		lastPrice: currentPrice,
		currentPrice: updatedPrice,
		slotBuy: 0,
		slotSell: 0,
		slotBuyBal: 0,
		slotSellBal: 0,
		priceFluct: updatedFluct,
	}
}
function logCurrentPrice() {
	var message = '[\uC8FC\uC2DD\uB85C\uADF8]'
	var priceInfos = []
	for (var stock in STOCKS) {
		checkStock(stock)
		var _a = getStockData(stock),
			name_1 = _a.name,
			currentPrice_1 = _a.currentPrice,
			lastPrice_1 = _a.lastPrice,
			priceFluct = _a.priceFluct
		var percentage = (Math.abs(currentPrice_1 - lastPrice_1) / lastPrice_1) * 100
		var lastFluct = formatFluct(getLastFluct(priceFluct))
		var message_1 = ''
			.concat(name_1, ':')
			.concat(lastFluct, ' ')
			.concat(currentPrice_1, '|')
			.concat(percentage.toFixed(2))
		priceInfos.push(message_1)
	}
	var priceMessage = priceInfos.join(',')
	var logMessage = ''.concat(message).concat(priceMessage)
	logConsole(logMessage)
}
function getItemValue(value) {
	var _a = MONEY_ITEMS[value],
		placeholder = _a.placeholder,
		balance = _a.balance
	return parseInt(parsePlaceholder(placeholder)) * balance
}
function checkTotalBalance() {
	var totalBalance = 0
	for (var item in MONEY_ITEMS) {
		totalBalance += getItemValue(parseInt(item))
	}
	return totalBalance
}
function removeAllMoney() {
	var placeholder = 'checkitem_remove_lorecontains:RM-MO'
	return parsePlaceholder(placeholder) === 'yes'
}
function getMoneyItemAmount(balance) {
	var itemAmounts = {
		'1000000': 0,
		'100000': 0,
		'10000': 0,
		'1000': 0,
	}
	var itemKeys = Object.keys(itemAmounts).sort(function (a, b) {
		return parseInt(b) - parseInt(a)
	})
	var rest = balance
	for (var _i = 0, itemKeys_1 = itemKeys; _i < itemKeys_1.length; _i++) {
		var v = itemKeys_1[_i]
		itemAmounts[v] += Math.floor(rest / parseInt(v))
		rest = rest % parseInt(v)
	}
	return itemAmounts
}
function giveMoney(items) {
	var moneyItems = {
		'1000': 'money_1000',
		'10000': 'money_10000',
		'100000': 'money_100000',
		'1000000': 'money_1000000',
	}
	for (var item in items) {
		var itemId = moneyItems[item]
		var amount = items[item]
		if (amount > 0) {
			var command = 'ei give '.concat(PLAYER_NAME, ' ').concat(itemId, ' ').concat(amount)
			execConsoleCommand(command)
		}
	}
	return true
}
function initStocks(args) {
	var stockId = args[1]
	if (stockId === undefined) {
		for (var stock in STOCKS) {
			initStock(stock)
		}
	} else {
		initStock(stockId)
	}
	return true
}
function checkBalance(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	var totalBalance = checkTotalBalance()
	if (typeof stockId !== 'undefined' && typeof trscAmount !== 'undefined') {
		var amount = parseInt(trscAmount)
		checkStock(stockId)
		var currentPrice_2 = getStockData(stockId).currentPrice
		var price = getCost(currentPrice_2, amount)
		var cond = totalBalance >= price
		if (returnType === '1') return cond
		if (returnType === '2') return encodeBoolean(cond)
	}
	return totalBalance
}
function stockName(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.name')
	var data = get(path)
	return data
}
function buyPrice(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	var amount = parseInt(trscAmount)
	checkStock(stockId)
	var currentPrice = getStockData(stockId).currentPrice
	var price = getCost(currentPrice, amount)
	if (returnType === '1') return formatWithCommas(price)
	return price
}
function sellPrice(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	var amount = parseInt(trscAmount)
	checkStock(stockId)
	var currentPrice = getStockData(stockId).currentPrice
	var price = getProfit(currentPrice, amount)
	if (returnType === '1') return formatWithCommas(price)
	return price
}
function currentPrice(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.currentPrice')
	var data = get(path)
	var last = get(''.concat(stockId, '.lastPrice'))
	var cond = data > last
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function lastPrice(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.lastPrice')
	var data = get(path)
	var curr = get(''.concat(stockId, '.currentPrice'))
	var cond = data < curr
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function totalShares(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.totalShares')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function fluctPercentage(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var _a = getStockData(stockId),
		currentPrice = _a.currentPrice,
		lastPrice = _a.lastPrice
	var percentage = (Math.abs(currentPrice - lastPrice) / lastPrice) * 100
	return percentage.toFixed(2)
}
function playerStockCount(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	checkStock(stockId)
	checkAccount(stockId, PLAYER_NAME)
	var path = ''.concat(stockId, '.accounts.').concat(PLAYER_NAME, '.stocks')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	if (returnType === '3') {
		var totalShares_1 = get(''.concat(stockId, '.totalShares'))
		var shareRatio = totalShares_1 <= 0 ? 0 : (data / totalShares_1) * 100
		return shareRatio.toFixed(2)
	}
	if (returnType === '4') {
		if (typeof trscAmount === 'undefined') return false
		var amount = parseInt(trscAmount)
		return data - amount >= 0
	}
	return formatWithCommas(data)
}
function averagePrice(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var currentPrice = getStockData(stockId).currentPrice
	checkAccount(stockId, PLAYER_NAME)
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	var averagePrice = stocks <= 0 ? 0 : totalPrice / stocks
	var cond = stocks <= 0 ? false : averagePrice < currentPrice
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(averagePrice.toFixed(2))
}
function estimatedProfit(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var currentPrice = getStockData(stockId).currentPrice
	checkAccount(stockId, PLAYER_NAME)
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	var estimatedProfit = stocks <= 0 ? 0 : currentPrice * stocks - totalPrice
	var cond = estimatedProfit > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	if (returnType === '3') return cond ? '&a+' : estimatedProfit === 0 ? '' : '&c'
	if (returnType === '4') {
		var percentage = stocks <= 0 ? 0 : (estimatedProfit / totalPrice) * 100
		return percentage.toFixed(2)
	}
	return formatWithCommas(estimatedProfit)
}
function slotBuy(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.slotBuy')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function slotSell(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.slotSell')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function slotBuyBal(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.slotBuyBal')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function slotSellBal(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.slotSellBal')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function totalBuy(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.totalBuy')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function totalSell(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.totalSell')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function totalBuyBal(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.totalBuyBal')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function totalSellBal(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.totalSellBal')
	var data = get(path)
	var cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return formatWithCommas(data)
}
function priceFluctuation(args) {
	var returnType = args[1],
		stockId = args[2]
	checkStock(stockId)
	var path = ''.concat(stockId, '.priceFluct')
	var data = get(path)
	var fluctData = stringify(data)
	if (returnType === '1') return formatFluct(fluctData)
	if (returnType === '2') return formatFluct(getLastFluct(fluctData))
	if (returnType === '3') {
		var fluctSymbols = formatFluct(fluctData)
		return fluctSymbols
			.replace(/▲/g, '&c▲')
			.replace(/\=/g, '&7=')
			.replace(/▼/g, '&9▼')
			.replace(/#/g, '&7#')
	}
	if (returnType === '4') {
		var fluctSymbol = formatFluct(getLastFluct(fluctData))
		if (fluctSymbol === '▲') return '&c'.concat(fluctSymbol)
		if (fluctSymbol === '▼') return '&9'.concat(fluctSymbol)
		return '&7'.concat(fluctSymbol)
	}
	return data
}
function buyStock(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	var amount = parseInt(trscAmount)
	checkStock(stockId)
	checkAccount(stockId, PLAYER_NAME)
	var stockData = getStockData(stockId)
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	var processResult = processTransaction(stockData, amount, 'buy')
	if (processResult) {
		var cost = stockData.currentPrice * amount
		var updateData = {
			totalShares: stockData.totalShares + amount,
			slotBuy: stockData.slotBuy + amount,
			slotBuyBal: stockData.slotBuyBal + cost,
			totalBuy: stockData.totalBuy + amount,
			totalBuyBal: stockData.totalBuyBal + cost,
		}
		setStockData(stockId, updateData)
		var updateAccount = {
			stocks: stocks + amount,
			totalPrice: totalPrice + cost,
		}
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}
	if (returnType === '1') return encodeBoolean(processResult)
	return processResult
}
function sellStock(args) {
	var returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	var amount = parseInt(trscAmount)
	checkStock(stockId)
	checkAccount(stockId, PLAYER_NAME)
	var stockData = getStockData(stockId)
	var _a = getAccountData(stockId, PLAYER_NAME),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	if (stocks - amount < 0) return false
	var processResult = processTransaction(stockData, amount, 'sell')
	if (processResult) {
		var profit = stockData.currentPrice * amount
		var updateData = {
			totalShares: stockData.totalShares - amount,
			slotSell: stockData.slotSell + amount,
			slotSellBal: stockData.slotSellBal + profit,
			totalSell: stockData.totalSell + amount,
			totalSellBal: stockData.totalSellBal + profit,
		}
		setStockData(stockId, updateData)
		var updatedAccount = {
			stocks: stocks - amount,
			totalPrice: totalPrice - profit,
		}
		setAccountData(stockId, PLAYER_NAME, updatedAccount)
	}
	if (returnType === '1') return encodeBoolean(processResult)
	return processResult
}
function giveStock(args) {
	var returnType = args[1],
		stockId = args[2],
		giveAmount = args[3],
		playerName = args[4]
	var amount = parseInt(giveAmount)
	checkStock(stockId)
	var stockData = getStockData(stockId)
	var cost = stockData.currentPrice * amount
	var updateData = {
		totalShares: stockData.totalShares + amount,
		slotBuy: stockData.slotBuy + amount,
		slotBuyBal: stockData.slotBuyBal + cost,
		totalBuy: stockData.totalBuy + amount,
		totalBuyBal: stockData.totalBuyBal + cost,
	}
	setStockData(stockId, updateData)
	checkAccount(stockId, playerName)
	var _a = getAccountData(stockId, playerName),
		stocks = _a.stocks,
		totalPrice = _a.totalPrice
	var updatedStocks = stocks + amount
	var updatedTotalPrice = totalPrice + stockData.currentPrice * amount
	var updatedAccount = {
		stocks: updatedStocks < 0 ? 0 : updatedStocks,
		totalPrice: updatedTotalPrice < 0 ? 0 : updatedTotalPrice,
	}
	setAccountData(stockId, playerName, updatedAccount)
	return true
}
function updateStock(args) {
	var returnType = args[1],
		stockId = args[2]
	if (stockId === undefined) {
		for (var stock in STOCKS) {
			updateStockPrice(stock)
		}
	} else {
		updateStockPrice(stockId)
	}
	var cond = true
	if (returnType === '1') return encodeBoolean(cond)
	logCurrentPrice()
	return '[주식] 주식가격 변동 완료!'
}
function nextUpdateETA(args) {
	var returnType = args[1]
	var seconds = parseInt(parsePlaceholder('commandtimer_UpdateStock_nextExecution'))
	if (seconds <= 0) return '&60&f분 &60&f초'
	var etaMins = Math.floor(seconds / 60)
	var etaSecs = seconds % 60
	var cond = seconds > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	return '&6'.concat(etaMins, '&f\uBD84 &6').concat(etaSecs, '&f\uCD08')
}
function removeStock(args) {
	var stockId = args[1]
	return removeStockData(stockId)
}
function clearStock() {
	return clearStockData()
}
function stockDataStore() {
	var result = false
	var action = args[0]
	var VALID_COMMANDS = {
		initStocks: {
			argLen: [1, 2],
			callback: initStocks,
		},
		checkBalance: {
			argLen: [2, 4],
			callback: checkBalance,
		},
		stockName: {
			argLen: [3],
			callback: stockName,
		},
		buyPrice: {
			argLen: [4],
			callback: buyPrice,
		},
		sellPrice: {
			argLen: [4],
			callback: sellPrice,
		},
		currentPrice: {
			argLen: [3],
			callback: currentPrice,
		},
		lastPrice: {
			argLen: [3],
			callback: lastPrice,
		},
		totalShares: {
			argLen: [3],
			callback: totalShares,
		},
		priceFluctPercent: {
			argLen: [3],
			callback: fluctPercentage,
		},
		playerStockCount: {
			argLen: [3, 4],
			callback: playerStockCount,
		},
		averagePrice: {
			argLen: [3],
			callback: averagePrice,
		},
		estimatedProfit: {
			argLen: [3],
			callback: estimatedProfit,
		},
		slotBuy: {
			argLen: [3],
			callback: slotBuy,
		},
		slotSell: {
			argLen: [3],
			callback: slotSell,
		},
		slotBuyBal: {
			argLen: [3],
			callback: slotBuyBal,
		},
		slotSellBal: {
			argLen: [3],
			callback: slotSellBal,
		},
		totalBuy: {
			argLen: [3],
			callback: totalBuy,
		},
		totalSell: {
			argLen: [3],
			callback: totalSell,
		},
		totalBuyBal: {
			argLen: [3],
			callback: totalBuyBal,
		},
		totalSellBal: {
			argLen: [3],
			callback: totalSellBal,
		},
		stockFluct: {
			argLen: [3],
			callback: priceFluctuation,
		},
		buyStock: {
			argLen: [4],
			callback: buyStock,
		},
		sellStock: {
			argLen: [4],
			callback: sellStock,
		},
		giveStock: {
			argLen: [5],
			callback: giveStock,
		},
		updateStock: {
			argLen: [2, 3],
			callback: updateStock,
		},
		nextUpdateETA: {
			argLen: [2],
			callback: nextUpdateETA,
		},
		removeStock: {
			argLen: [2],
			callback: removeStock,
		},
		clearStock: {
			argLen: [1],
			callback: clearStock,
		},
	}
	if (!(action in VALID_COMMANDS)) return 'false'
	var _a = VALID_COMMANDS[action],
		argLen = _a.argLen,
		callback = _a.callback
	var isValidArgs = argLen.some(function (len) {
		return args.length === len
	})
	if (!isValidArgs) return 'false'
	result = callback(args)
	return stringify(result)
}
stockDataStore()
