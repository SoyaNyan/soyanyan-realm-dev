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
		buyCount: 0,
		sellCount: 0,
		totalBuy: 0,
		totalSell: 0,
		priceFluct: '##########',
		accounts: '',
	},
	'stock02': {
		name: '소야냥톡',
		lastPrice: 50000,
		currentPrice: 50000,
		buyCount: 0,
		sellCount: 0,
		totalBuy: 0,
		totalSell: 0,
		priceFluct: '##########',
		accounts: '',
	},
	'stock03': {
		name: '소야냥그룹',
		lastPrice: 100000,
		currentPrice: 100000,
		buyCount: 0,
		sellCount: 0,
		totalBuy: 0,
		totalSell: 0,
		priceFluct: '##########',
		accounts: '',
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
		buyCount: get(''.concat(stockId, '.buyCount')),
		sellCount: get(''.concat(stockId, '.sellCount')),
		totalBuy: get(''.concat(stockId, '.totalBuy')),
		totalSell: get(''.concat(stockId, '.totalSell')),
		priceFluct: get(''.concat(stockId, '.priceFluct')),
	}
}
// set or update each stock data
function setStockData(stockId, data) {
	// set name
	if (data.name !== undefined) {
		set(''.concat(stockId, '.name'), data.name)
	}
	// set last price
	if (data.lastPrice !== undefined) {
		set(''.concat(stockId, '.lastPrice'), data.lastPrice)
	}
	// set current price
	if (data.currentPrice !== undefined) {
		set(''.concat(stockId, '.currentPrice'), data.currentPrice)
	}
	// set buy count
	if (data.buyCount !== undefined) {
		set(''.concat(stockId, '.buyCount'), data.buyCount)
	}
	// set sell count
	if (data.sellCount !== undefined) {
		set(''.concat(stockId, '.sellCount'), data.sellCount)
	}
	// set total buy
	if (data.totalBuy !== undefined) {
		set(''.concat(stockId, '.totalBuy'), data.totalBuy)
	}
	// set total sell
	if (data.totalSell !== undefined) {
		set(''.concat(stockId, '.totalSell'), data.totalSell)
	}
	// set price fluctuation
	if (data.priceFluct !== undefined) {
		set(''.concat(stockId, '.priceFluct'), data.priceFluct)
	}
	// set player accounts
	if (data.accounts !== undefined) {
		set(''.concat(stockId, '.accounts'), data.accounts)
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
	return get(''.concat(stockId, '.accounts.').concat(playerName))
}
// set or update player's stock account data
function setAccountData(stockId, playerName, data) {
	// set player's stock count
	if (data !== undefined) {
		set(''.concat(stockId, '.accounts.').concat(playerName), data)
	}
}
// check player has specific stock account
function checkAccount(stockId, playerName) {
	var path = ''.concat(stockId, '.accounts.').concat(playerName)
	// if account not exists, initialize it
	if (!exists(path)) set(path, 0)
}
// format stock price fluctuation data
function formatFluct(fluctData) {
	// replace fluct data to symbols
	return fluctData.replace(/1/gi, '▲').replace(/-/gi, '=').replace(/0/gi, '▼')
}
// process stock transaction
function processTransaction(stockData, amount, type, playerName) {
	// get current stock price
	var currentPrice = stockData.currentPrice
	// buying process
	if (type === 'buy') {
		// set required cost
		var cost = getCost(currentPrice, amount)
		// take check from player, check failed
		if (!removeCheck(cost, playerName)) return false
	}
	// selling process
	if (type === 'sell') {
		// calculate total value of profit
		var profit = getProfit(currentPrice, amount)
		// give profit to player
		giveCheck(profit, playerName)
	}
	// return success ack
	return true
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
// calculate required amount of check
function getCost(currentPrice, amount) {
	// set required cost
	var cost = amount * currentPrice
	// add traiding fee
	var fee = fixDigits(cost * TRADING_FEE_RATE)
	// return total value of profit
	return cost + fee
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
		buyCount: 0,
		sellCount: 0,
		totalBuy: 0,
		totalSell: 0,
		priceFluct: updateFluct,
	}
}
/**
  [ check economy utilities ]
*/
// remove check item (valid amount)
function removeCheck(value, playerName) {
	var placeholder = 'checkitem_remove_nameequals:&f[&xB3FFB3\uC218\uD45C&r] '
		.concat(value, '\uC6D0,lorecontains:')
		.concat(playerName, ',amt:1,enchanted')
	// remove items from player's inventory
	return parsePlaceholder(placeholder) === 'yes'
}
// give check to player
function giveCheck(value, playerName) {
	// create command
	var command = 'minecraft:give '
		.concat(
			playerName,
			' paper{display:{Name:\'[{"text":"[","italic":false,"color":"white"},{"text":"\uC218\uD45C","color":"#b3ffb3"},{"text":"] "},{"text":"'
		)
		.concat(
			value,
			'"},{"text":"\uC6D0"}]\',Lore:[\'[{"text":"\uBC1C\uD589\uC778: ","color":"#b3ffb3"},{"text":"'
		)
		.concat(
			playerName,
			'","color":"#b3ffb3"}]\']},Enchantments:[{id:feather_falling,lvl:4}],HideFlags:1} 1'
		)
	// execute command
	execConsoleCommand(command)
	// return success ack
	return true
}
/**
  [ action handler ]
*/
// initialize stocks' data
function initStocks(args) {
	// get args
	var action = args[0],
		stockId = args[1]
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
// get name of stock
function stockName(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.name')
	// normal return
	return get(path)
}
// get current buying price with trading fee
function buyPrice(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
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
	var action = args[0],
		returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
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
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.currentPrice')
	// check return type (condition: currentPrice > lastPrice)
	var last = get(''.concat(stockId, '.lastPrice'))
	var cond = get(path) > last
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get last price by stockId
function lastPrice(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.lastPrice')
	// check return type (condition: currentPrice > lastPrice)
	var curr = get(''.concat(stockId, '.currentPrice'))
	var cond = get(path) < curr
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
function fluctPercentage(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
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
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// set yaml data path
	var path = ''.concat(stockId, '.accounts.').concat(PLAYER_NAME)
	// check return type (condition: player has stock in own account)
	var cond = get(path) > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get total stock buy count
function stockBuyCount(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.buyCount')
	// check return type (condition: if player bought this stock one or more)
	var cond = get(path) > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get total stock sell count
function stockSellCount(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.sellCount')
	// check return type (condition: if player sold this stock one or more)
	var cond = get(path) > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get total stock buy balance
function stockBuyBalance(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalBuy')
	// check return type (condition: if total buy balance is larger then 0)
	var cond = get(path) > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get total stock sell balance
function stockSellBalance(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.totalSell')
	// check return type (condition: if total sell balance is larger then 0)
	var cond = get(path) > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)
	// normal return
	return formatWithCommas(get(path))
}
// get stock price fluctuation data
function priceFluctuation(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
	// check stock exists
	checkStock(stockId)
	// set yaml data path
	var path = ''.concat(stockId, '.priceFluct')
	// check return type (condition: convert fluctuation data to symbol)
	var fluctData = stringify(get(path))
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
	return get(path)
}
// buy stock (give stock to player)
function buyStock(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get stock data
	var stockData = getStockData(stockId)
	// get account data
	var accountData = getAccountData(stockId, PLAYER_NAME)
	// process transaction
	var processResult = processTransaction(stockData, amount, 'buy', PLAYER_NAME)
	// update data
	if (processResult) {
		// update stock data
		var updateData = {
			buyCount: stockData.buyCount !== undefined ? stockData.buyCount + amount : 0,
			totalBuy:
				stockData.totalBuy !== undefined && stockData.currentPrice !== undefined
					? stockData.totalBuy + stockData.currentPrice * amount
					: 0,
		}
		setStockData(stockId, updateData)
		// update account data
		var updateAccount = accountData + amount
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}
	return processResult
}
// sell stock (take stock from player)
function sellStock(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2],
		trscAmount = args[3]
	// parse args
	var amount = parseInt(trscAmount)
	// check stock exists
	checkStock(stockId)
	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)
	// get stock data
	var stockData = getStockData(stockId)
	// get account data
	var accountData = getAccountData(stockId, PLAYER_NAME)
	// check stock amount
	if (accountData - amount < 0) return false
	// process transaction
	var processResult = processTransaction(stockData, amount, 'sell', PLAYER_NAME)
	// update data
	if (processResult) {
		// update stock data
		var updateData = {
			sellCount: stockData.sellCount !== undefined ? stockData.sellCount + amount : 0,
			totalSell:
				stockData.totalSell !== undefined && stockData.currentPrice !== undefined
					? stockData.totalSell + stockData.currentPrice * amount
					: 0,
		}
		setStockData(stockId, updateData)
		// update account data
		var updateAccount = accountData - amount
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}
	return processResult
}
// give stock to player (for admin)
function giveStock(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2],
		giveAmount = args[3],
		playerName = args[4]
	// parse args
	var amount = parseInt(giveAmount)
	// check player stock account exists
	checkAccount(stockId, playerName)
	// get account data
	var accountData = getAccountData(stockId, playerName)
	// update account data
	var updatedAmount = accountData + amount
	var updateAccount = updatedAmount < 0 ? 0 : updatedAmount
	setAccountData(stockId, playerName, updateAccount)
	return true
}
// set volatility to stock price
function setStockVolatility(args) {
	// get args
	var action = args[0],
		returnType = args[1],
		stockId = args[2]
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
	var action = args[0],
		returnType = args[1]
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
	var action = args[0],
		stockId = args[1]
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
    buyCount: number
    sellCount: number
    totalBuy: number
    totalSell: number
        priceFluct: string # '1', '0', '-' 10 slots
    account:
      [playerName]: [playerStockCount: number]
      ...
*/
// placeholder controller
function stockDataStore() {
	// check constants
	if (BukkitPlayer === undefined) return 'false'
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
	var action = args[0]
	// filter action
	switch (action) {
		case 'initStocks': // initialize stocks' data
			// check args
			if (args.length !== 1 && args.length !== 2) return 'false'
			// execute
			result = initStocks(args)
			break
		case 'stockName': // get name of stock
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = stockName(args)
			break
		case 'buyPrice': // get buying price with trading fee
			// check args
			if (args.length !== 4) return 'false'
			// execute
			result = buyPrice(args)
			break
		case 'sellPrice': // get selling price with trading fee
			// check args
			if (args.length !== 4) return 'false'
			// execute
			result = sellPrice(args)
			break
		case 'currentPrice': // get current price by stockId
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = currentPrice(args)
			break
		case 'lastPrice': // get last price by stockId
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = lastPrice(args)
			break
		case 'priceFluctPercent': // get price fluct in percentage
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = fluctPercentage(args)
			break
		case 'playerStockCount': // get stock count that player has
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = playerStockCount(args)
			break
		case 'stockBuyCount': // get total stock buy count
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = stockBuyCount(args)
			break
		case 'stockSellCount': // get total stock sell count
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = stockSellCount(args)
			break
		case 'stockBuyBalance': // get total stock buy balance
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = stockBuyBalance(args)
			break
		case 'stockSellBalance': // get total stock sell balance
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = stockSellBalance(args)
			break
		case 'stockFluct': // get stock price fluctuation data
			// check args
			if (args.length !== 3) return 'false'
			// execute
			result = priceFluctuation(args)
			break
		case 'buyStock': // buy stock (give stock to player)
			// check args
			if (args.length !== 4) return 'false'
			// execute
			result = buyStock(args)
			break
		case 'sellStock': // sell stock (take stock from player)
			// check args
			if (args.length !== 4) return 'false'
			// execute
			result = sellStock(args)
			break
		case 'giveStock': // give stock to player (for event only)
			// check args
			if (args.length !== 5) return 'false'
			// execute
			result = giveStock(args)
			break
		case 'setV':
			// check args
			if (args.length !== 2 && args.length !== 3) return 'false'
			// execute
			result = setStockVolatility(args)
			break
		case 'nextUpdateETA': // get next update ETA in mm:ss units
			// check args
			if (args.length !== 2) return 'false'
			// execute
			result = nextUpdateETA(args)
			break
		case 'removeStock': // remove specific stock data
			// check args
			if (args.length !== 2) return 'false'
			// execute
			result = removeStock(args)
			break
		case 'clearStock': // clear all stock data
			// check args
			if (args.length !== 1) return 'false'
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
