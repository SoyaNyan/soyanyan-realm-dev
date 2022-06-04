/**
 * Author: SOYANYAN (소야냥)
 * Name: stockDataStore.ts
 * Version: v1.2.0
 * Last Update: 2022-06-04
 *
 * TypeScript Version: v4.7.2
 * Target: ES5
 * JSX: None
 * Module: ESNext
 */

/**
  [ global objects ] 
*/
const Data: any = new Object()
const PlaceholderAPI: any = new Object()
const Placeholder: any = new Object()
const BukkitServer: any = new Object()
const BukkitPlayer: any = new Object()
const args: string[] = []

/**
  [ type definition ] 
*/
// available stored data types
type DataType = number | string | boolean
type StockDataType = {
	[index: string]: number | string | undefined
	name?: string
	lastPrice?: number
	currentPrice?: number
	totalShares?: number
	slotBuy?: number
	slotSell?: number
	slotBuyBal?: number
	slotSellBal?: number
	totalBuy?: number
	totalSell?: number
	totalBuyBal?: number
	totalSellBal?: number
	priceFluct?: string
	accounts?: string
}
type StrictStockDataType = {
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
	priceFluct: string
}

/**
  [ constants ] 
*/
// player name
const PLAYER_NAME = '%player_name%'

// stock trading fee setting
const TRADING_FEE_RATE = 0.01

// setting of stocks
const STOCKS: {
	[index: string]: any
} = {
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
const EXP_ITEMS: {
	[index: string]: any
} = {
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
function exists(path: string): boolean {
	// returns true if a key exists; else false. (Placeholder API)
	return Data.exists(path)
}

// get data from global store
function get(path: string): DataType {
	let result: DataType

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
function set(path: string, payload: DataType): boolean {
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
function update(path: string, payload: DataType): boolean {
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
function remove(path: string): boolean {
	// check data exists
	if (!exists(path)) return false

	// removes a key from the data. (Placeholder API)
	Data.remove(path)
	save()

	return true
}

// remove all data from global store
function clear(): boolean {
	// removes all data. (Placeholder API)
	Data.clear()
	save()

	return true
}

// saves current state
function save(): void {
	// saves the current data state to the data file. (Placeholder API)
	Placeholder.saveData()
}

/**
  [ general utilities ] 
*/
// parse external placeholders
function parsePlaceholder(placeholder: string): string {
	return PlaceholderAPI.static.setPlaceholders(BukkitPlayer, `%${placeholder}%`)
}

// stringify data for placeholder return
function stringify(data: DataType): string {
	return `${data}`
}

// encode boolean as '1' or '0'
function encodeBoolean(data: boolean): string {
	return data ? '1' : '0'
}

// round under 100
function fixDigits(value: number): number {
	return Math.round(value / 100) * 100
}

// format currency with commas
function formatWithCommas(value: DataType): string {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/, ',')
}

/**
	[ Spigot API utilities ]
*/
// execute command on server console
function execConsoleCommand(command: string): boolean {
	if (command === undefined || command.length === 0) return false
	return BukkitServer.dispatchCommand(BukkitServer.getConsoleSender(), command)
}

// execute command as player
function execCommand(command: string): boolean {
	if (command === undefined || command.length === 0) return false
	return BukkitPlayer.performCommand(command)
}

/**
  [ stock utilities ] 
*/
// initialize stock data
function initStock(stockId: string): void {
	// set stock data as init object
	setStockData(stockId, STOCKS[stockId])
}

// get specific stock data
function getStockData(stockId: string): StockDataType {
	return {
		name: get(`${stockId}.name`) as string,
		lastPrice: get(`${stockId}.lastPrice`) as number,
		currentPrice: get(`${stockId}.currentPrice`) as number,
		totalShares: get(`${stockId}.totalShares`) as number,
		slotBuy: get(`${stockId}.slotBuy`) as number,
		slotSell: get(`${stockId}.slotSell`) as number,
		slotBuyBal: get(`${stockId}.slotBuyBal`) as number,
		slotSellBal: get(`${stockId}.slotSellBal`) as number,
		totalBuy: get(`${stockId}.totalBuy`) as number,
		totalSell: get(`${stockId}.totalSell`) as number,
		totalBuyBal: get(`${stockId}.totalBuyBal`) as number,
		totalSellBal: get(`${stockId}.totalSellBal`) as number,
		priceFluct: get(`${stockId}.priceFluct`) as string,
	}
}

// set or update each stock data
function setStockData(stockId: string, data: StockDataType): void {
	// set data
	for (const key in data) {
		if (typeof data[key] !== 'undefined') {
			set(`${stockId}.${key}`, data[key] as DataType)
		}
	}
}

// remove specific stock data
function removeStockData(stockId: string): boolean {
	return remove(`${stockId}`)
}

// remove all stock data
function clearStockData(): boolean {
	return clear()
}

// check stock data exists if not initialize
function checkStock(stockId: string): void {
	// if stock data not exists, initialize it
	if (!exists(stockId)) initStock(stockId)
}

// get player's stock account data
function getAccountData(stockId: string, playerName: string): number {
	return get(`${stockId}.accounts.${playerName}`) as number
}

// set or update player's stock account data
function setAccountData(stockId: string, playerName: string, data: number): void {
	// set player's stock count
	if (data !== undefined) {
		set(`${stockId}.accounts.${playerName}`, data)
	}
}

// check player has specific stock account
function checkAccount(stockId: string, playerName: string): void {
	const path = `${stockId}.accounts.${playerName}`

	// if account not exists, initialize it
	if (!exists(path)) set(path, 0)
}

// format stock price fluctuation data
function formatFluct(fluctData: string): string {
	// replace fluct data to symbols
	return fluctData.replace(/1/gi, '▲').replace(/-/gi, '=').replace(/0/gi, '▼')
}

// process stock transaction
function processTransaction(stockData: StrictStockDataType, amount: number, type: string): boolean {
	// get current stock price
	const { currentPrice } = stockData

	// get player's total exp in own inventory
	const totalExp = checkTotalItemExp()

	// buying process
	if (type === 'buy') {
		// set required cost
		const cost = getCost(currentPrice, amount)

		// check player has enough exp
		if (totalExp < cost) return false

		// take all exp items from player, check failed
		if (!removeAllExp()) return false

		// calculate total value of change
		const change = getChange(totalExp, cost)

		// caclutate amount of items
		const items = getExpItemAmount(change)

		// give change to player
		giveExp(items)
	}

	// selling process
	if (type === 'sell') {
		// calculate total value of profit
		const profit = getProfit(currentPrice, amount)

		// caclutate amount of items
		const items = getExpItemAmount(profit)

		// give profit to player
		giveExp(items)
	}

	// return success ack
	return true
}

// convert fluct data
function convertFluctData(priceFluct: string): { [index: string]: number } {
	const fluctArr = priceFluct.split('')

	// count
	const fluctData = fluctArr.reduce(
		(acc, fluct) => {
			if (fluct !== '#') {
				// rise
				if (fluct === '1') {
					return {
						...acc,
						rise: acc.rise + 1,
						total: acc.total + 1,
					}
				}

				// hold
				if (fluct === '-') {
					return {
						...acc,
						hold: acc.rise + 1,
						total: acc.total + 1,
					}
				}

				// drop
				if (fluct === '0') {
					return {
						...acc,
						drop: acc.rise + 1,
						total: acc.total + 1,
					}
				}
			}

			return {
				...acc,
			}
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
function getLastFluct(priceFluct: string): string {
	// return last fluct symbol
	return priceFluct.replace(/#/gi, '').slice(-1)
}

// push and pop fluctuation data
function pushFluct(priceFluct: string, symbol: string): string {
	// if empty slot exists
	if (priceFluct.indexOf('#') !== -1) {
		return priceFluct.replace('#', symbol)
	}
	return priceFluct.slice(1).concat(symbol)
}

// calculate required amount of exp
function getCost(currentPrice: number, amount: number): number {
	// set required cost
	const cost = amount * currentPrice

	// add traiding fee
	const fee = fixDigits(cost * TRADING_FEE_RATE)

	// return total value of profit
	return cost + fee
}

// calculate value of change for player
function getChange(totalExp: number, cost: number): number {
	// calc change
	const change = totalExp - cost

	// return total value of change
	return change
}

// calculate value of selling profit for player
function getProfit(currentPrice: number, amount: number): number {
	// set profit
	const profit = amount * currentPrice

	// subs traiding fee
	const fee = fixDigits(profit * TRADING_FEE_RATE)

	// return total value of profit
	return profit - fee
}

// set volatility to each stock data
function setVolatility(stockId: string) {
	// check stock exists
	checkStock(stockId)

	// get stock data
	const stockData = getStockData(stockId) as StrictStockDataType

	// update current price with volatility
	const updateData = getNextStockData(stockData)

	// update stock data
	setStockData(stockId, updateData)
}

// create next stock data with volitility
function getNextStockData(stockData: StrictStockDataType): StockDataType {
	const { currentPrice, priceFluct } = stockData

	// get volatility
	const randomVolit = Math.random()
	const volatility = randomVolit * 10 + 2

	const randomPerc = Math.random()
	let variancePerc = 2 * volatility * randomPerc
	if (variancePerc > volatility) variancePerc -= 2 * volatility

	// update current price
	const variancePrice = currentPrice * (variancePerc / 100)
	const updatePrice = fixDigits(currentPrice + variancePrice)

	// updated fluct data
	let fluct = '-'
	if (updatePrice > currentPrice) {
		fluct = '1'
	}
	if (updatePrice < currentPrice) {
		fluct = '0'
	}
	const updateFluct = pushFluct(priceFluct, fluct)

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
function getItemValue(value: number): number {
	const { placeholder, exp } = EXP_ITEMS[value]

	// return calculated total exp
	return parseInt(parsePlaceholder(placeholder)) * exp
}

// calculate total exp in player inventory
function checkTotalItemExp(): number {
	let totalExp = 0

	// check all exp items
	for (const item in EXP_ITEMS) {
		totalExp += getItemValue(parseInt(item))
	}

	return totalExp
}

// remove all exp items (filled containers)
function removeAllExp(): boolean {
	const placeholder = 'checkitem_remove_lorecontains:EE-FC'

	// remove items from player's inventory
	return parsePlaceholder(placeholder) === 'yes'
}

// give calculated exp item to player
function getExpItemAmount(balance: number): { [index: string]: number } {
	// exp item values
	const itemAmounts: {
		[index: string]: number
	} = {
		'1000000': 0,
		'100000': 0,
		'10000': 0,
		'5000': 0,
		'1000': 0,
		'500': 0,
		'100': 0,
	}
	const itemKeys = Object.keys(itemAmounts).sort(
		(a: string, b: string) => parseInt(b) - parseInt(a)
	)

	// check amount of each items
	let rest = balance
	for (const v of itemKeys) {
		itemAmounts[v] += Math.floor(rest / parseInt(v))
		rest = rest % parseInt(v)
	}

	// return amount of specific item
	return itemAmounts
}

// give exp items to player
function giveExp(items: { [index: string]: number }): boolean {
	// exp items
	const expItems: {
		[index: string]: string
	} = {
		'100': 'exp_filled_bottle_100',
		'500': 'exp_filled_bottle_500',
		'1000': 'exp_filled_bottle_1000',
		'5000': 'exp_filled_crystal_5000',
		'10000': 'exp_filled_crystal_10000',
		'100000': 'exp_filled_starlight_100000',
		'1000000': 'exp_filled_starlight_1000000',
	}

	// give each item to player
	for (const item in items) {
		// item id
		const itemId = expItems[item]

		// item amount
		const amount = items[item]

		// check amount is 0
		if (amount > 0) {
			// create command
			const command = `ei give ${PLAYER_NAME} ${itemId} ${amount}`

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
function initStocks(args: string[]): boolean {
	// get args
	const [action, stockId] = args

	// check stockId specified
	if (stockId === undefined) {
		for (const stock in STOCKS) {
			initStock(stock)
		}
	} else {
		initStock(stockId)
	}

	// normal return
	return true
}

// check player balance
function checkBalance(args: string[]): number {
	// get total exp balance in player's inventory
	const balance = checkTotalItemExp()

	// normal return
	return balance
}

// get name of stock
function stockName(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.name`

	// get data
	const data = get(path)

	// normal return
	return data
}

// get current buying price with trading fee
function buyPrice(args: string[]): DataType {
	// get args
	const [action, returnType, stockId, trscAmount] = args

	// parse args
	const amount = parseInt(trscAmount)

	// check stock exists
	checkStock(stockId)

	// get stock data
	const { currentPrice } = getStockData(stockId) as StrictStockDataType

	// get price when buying
	const price = getCost(currentPrice, amount)

	// check return type (condition: currentPrice > lastPrice)
	if (returnType === '1') return formatWithCommas(price)

	// normal return
	return price
}

// get current selling price with trading fee
function sellPrice(args: string[]): DataType {
	// get args
	const [action, returnType, stockId, trscAmount] = args

	// parse args
	const amount = parseInt(trscAmount)

	// check stock exists
	checkStock(stockId)

	// get stock data
	const { currentPrice } = getStockData(stockId) as StrictStockDataType

	// get price when buying
	const price = getProfit(currentPrice, amount)

	// check return type (condition: currentPrice > lastPrice)
	if (returnType === '1') return formatWithCommas(price)

	// normal return
	return price
}

// get current price by stockId
function currentPrice(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.currentPrice`

	// get data
	const data = get(path)

	// check return type (condition: currentPrice > lastPrice)
	const last = get(`${stockId}.lastPrice`)
	const cond = data > last
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get last price by stockId
function lastPrice(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.lastPrice`

	// get data
	const data = get(path)

	// check return type (condition: currentPrice > lastPrice)
	const curr = get(`${stockId}.currentPrice`)
	const cond = data < curr
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

function totalShares(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.totalShares`

	// get data
	const data = get(path)

	// check return type (condition: totalShares > 0)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

function fluctPercentage(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// get stock data
	const { currentPrice, lastPrice } = getStockData(stockId) as StrictStockDataType

	// calc percentage
	const percentage = (Math.abs(currentPrice - lastPrice) / lastPrice) * 100

	// fix decimals digits to 2
	return percentage.toFixed(2)
}

// get stock count that player has
function playerStockCount(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)

	// set yaml data path
	const path = `${stockId}.accounts.${PLAYER_NAME}`

	// get data
	const data = get(path)

	// check return type (condition: player has stock in own account)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get slot stock buy count
function slotBuy(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.slotBuy`

	// get data
	const data = get(path)

	// check return type (condition: if player bought this stock one or more)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get slot stock sell count
function slotSell(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.slotSell`

	// get data
	const data = get(path)

	// check return type (condition: if player sold this stock one or more)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get slot stock buy balance
function slotBuyBal(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.slotBuyBal`

	// get data
	const data = get(path)

	// check return type (condition: if total buy balance is larger then 0)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get slot stock sell balance
function slotSellBal(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.slotSellBal`

	// get data
	const data = get(path)

	// check return type (condition: if total sell balance is larger then 0)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get total stock buy count
function totalBuy(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.totalBuy`

	// get data
	const data = get(path)

	// check return type (condition: if player bought this stock one or more)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get total stock sell count
function totalSell(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.totalSell`

	// get data
	const data = get(path)

	// check return type (condition: if player sold this stock one or more)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get total stock buy balance
function totalBuyBal(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.totalBuyBal`

	// get data
	const data = get(path)

	// check return type (condition: if total buy balance is larger then 0)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get total stock sell balance
function totalSellBal(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.totalSellBal`

	// get data
	const data = get(path)

	// check return type (condition: if total sell balance is larger then 0)
	const cond = data > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return formatWithCommas(data)
}

// get stock price fluctuation data
function priceFluctuation(args: string[]): DataType {
	// get args
	const [action, returnType, stockId] = args

	// check stock exists
	checkStock(stockId)

	// set yaml data path
	const path = `${stockId}.priceFluct`

	// get data
	const data = get(path)

	// check return type (condition: convert fluctuation data to symbol)
	const fluctData = stringify(data)
	if (returnType === '1') return formatFluct(fluctData)
	if (returnType === '2') return formatFluct(getLastFluct(fluctData))
	if (returnType === '3') {
		const fluctSymbols = formatFluct(fluctData)
		// replace symbol with color coded symbol
		return fluctSymbols
			.replace(/▲/g, '&c▲')
			.replace(/\=/g, '&7=')
			.replace(/▼/g, '&9▼')
			.replace(/#/g, '&7#')
	}
	if (returnType === '4') {
		const fluctSymbol = formatFluct(getLastFluct(fluctData))
		// rise
		if (fluctSymbol === '▲') return `&c${fluctSymbol}`
		// drop
		if (fluctSymbol === '▼') return `&9${fluctSymbol}`
		// no change
		return `&7${fluctSymbol}`
	}

	// normal return
	return data
}

// buy stock (give stock to player)
function buyStock(args: string[]): boolean {
	// get args
	const [action, returnType, stockId, trscAmount] = args

	// parse args
	const amount = parseInt(trscAmount)

	// check stock exists
	checkStock(stockId)

	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)

	// get stock data
	const stockData = getStockData(stockId) as StrictStockDataType

	// get account data
	const accountData = getAccountData(stockId, PLAYER_NAME)

	// process transaction
	const processResult = processTransaction(stockData, amount, 'buy')

	// update data
	if (processResult) {
		// calc cost
		const cost = stockData.currentPrice * amount

		// update stock data
		const updateData: StockDataType = {
			totalShares: stockData.totalShares + amount,
			slotBuy: stockData.slotBuy + amount,
			slotBuyBal: stockData.slotBuyBal + cost,
			totalBuy: stockData.totalBuy + amount,
			totalBuyBal: stockData.totalBuyBal + cost,
		}
		setStockData(stockId, updateData)

		// update account data
		const updateAccount: number = accountData + amount
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}

	return processResult
}

// sell stock (take stock from player)
function sellStock(args: string[]): boolean {
	// get args
	const [action, returnType, stockId, trscAmount] = args

	// parse args
	const amount = parseInt(trscAmount)

	// check stock exists
	checkStock(stockId)

	// check player stock account exists
	checkAccount(stockId, PLAYER_NAME)

	// get stock data
	const stockData = getStockData(stockId) as StrictStockDataType

	// get account data
	const accountData = getAccountData(stockId, PLAYER_NAME)

	// check stock amount
	if (accountData - amount < 0) return false

	// process transaction
	const processResult = processTransaction(stockData, amount, 'sell')

	// update data
	if (processResult) {
		// calc profit
		const profit = stockData.currentPrice * amount

		// update stock data
		const updateData: StockDataType = {
			totalShares: stockData.totalShares - amount,
			slotSell: stockData.slotSell + amount,
			slotSellBal: stockData.slotSellBal + profit,
			totalSell: stockData.totalSell + amount,
			totalSellBal: stockData.totalSellBal + profit,
		}
		setStockData(stockId, updateData)

		// update account data
		const updateAccount: number = accountData - amount
		setAccountData(stockId, PLAYER_NAME, updateAccount)
	}

	return processResult
}

// give stock to player (for admin)
function giveStock(args: string[]): boolean {
	// get args
	const [action, returnType, stockId, giveAmount, playerName] = args

	// parse args
	const amount = parseInt(giveAmount)

	// check player stock account exists
	checkAccount(stockId, playerName)

	// get account data
	const accountData = getAccountData(stockId, playerName)

	// update account data
	const updatedAmount = accountData + amount
	const updateAccount: number = updatedAmount < 0 ? 0 : updatedAmount
	setAccountData(stockId, playerName, updateAccount)

	return true
}

// set volatility to stock price
function setStockVolatility(args: string[]): string | boolean {
	// get args
	const [action, returnType, stockId] = args

	// check stockId specified
	if (stockId === undefined) {
		for (const stock in STOCKS) {
			setVolatility(stock)
		}
	} else {
		setVolatility(stockId)
	}

	// check return type (condition: in update cooldown)
	const cond = true
	if (returnType === '1') return encodeBoolean(cond)

	// return success ack
	return '[주식] 주식가격 변동!'
}

// get next update ETA in mm:ss units
function nextUpdateETA(args: string[]): string | boolean {
	// get args
	const [action, returnType] = args

	// get seconds from 'Command Timer' plugin's placeholder
	// >> https://www.spigotmc.org/resources/command-timer.24141/
	const seconds = parseInt(parsePlaceholder('commandtimer_stockTimer_nextExecution'))

	// check seconds larger than 0
	if (seconds <= 0) return '&60&f분 &60&f초'

	// format time
	const etaMins = Math.floor(seconds / 60)
	const etaSecs = seconds % 60

	// check return type (condition: in update cooldown)
	const cond = seconds > 0
	if (returnType === '1') return cond
	if (returnType === '2') return encodeBoolean(cond)

	// normal return
	return `&6${etaMins}&f분 &6${etaSecs}&f초`
}

// remove specific stock data
function removeStock(args: string[]): boolean {
	// get args
	const [action, stockId] = args

	// remove stock data
	return removeStockData(stockId)
}

// clear all stock data
function clearStock(): boolean {
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
      [playerName]: [playerStockCount: number]
      ...
*/

// placeholder controller
function stockDataStore(): string {
	// action result
	let result: any = false

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
	const [action] = args

	// filter action
	switch (action) {
		case 'initStocks': // initialize stocks' data
			// check args
			if (args.length !== 1 && args.length !== 2) return 'false'

			// execute
			result = initStocks(args)
			break
		case 'checkBalance': // check player balance
			// check args
			if (args.length !== 1) return 'false'

			// execute
			result = checkBalance(args)
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
		case 'totalShares': // get total shares of stock
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = totalShares(args)
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
		case 'slotBuy': // get slot stock buy count
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = slotBuy(args)
			break
		case 'slotSell': // get slot stock sell count
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = slotSell(args)
			break
		case 'slotBuyBal': // get slot stock buy balance
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = slotBuyBal(args)
			break
		case 'slotSellBal': // get slot stock sell balance
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = slotSellBal(args)
			break
		case 'totalBuy': // get total stock buy count
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = totalBuy(args)
			break
		case 'totalSell': // get total stock sell count
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = totalSell(args)
			break
		case 'totalBuyBal': // get total stock buy balance
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = totalBuyBal(args)
			break
		case 'totalSellBal': // get total stock sell balance
			// check args
			if (args.length !== 3) return 'false'

			// execute
			result = totalSellBal(args)
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

// for fix block scope variable error
export {}
