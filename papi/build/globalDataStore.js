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
// parse payload data by specific types
function parsePayload(type, payload) {
	// check required types
	switch (type) {
		case 'integer':
		case 'i':
			return parseInt(payload)
		case 'float':
		case 'f':
			return parseFloat(payload)
		case 'string':
		case 's':
			return payload
		case 'boolean':
		case 'b':
			return payload === 'true'
		default:
			return payload
	}
}
// stringify data for placeholder return
function stringify(data) {
	return ''.concat(data)
}
// placeholder controller
function globalDataStore() {
	// action result
	var result = 'false'
	// filter action
	var action = args[0],
		path = args[1],
		payload = args[2],
		type = args[3]
	switch (action) {
		case 'exists':
			// check args
			if (args.length !== 2) return 'false'
			// execute query
			result = stringify(exists(path))
			break
		case 'get':
			// check args
			if (args.length !== 1 && args.length !== 2) return 'false'
			// execute query
			result = stringify(get(path))
			break
		case 'set':
			// check args
			if (args.length !== 4) return 'false'
			// execute query
			result = stringify(set(path, parsePayload(type, payload)))
			break
		case 'update':
			// check args
			if (args.length !== 4) return 'false'
			// execute query
			result = stringify(update(path, parsePayload(type, payload)))
			break
		case 'remove':
			// check args
			if (args.length !== 2) return 'false'
			// execute query
			result = stringify(remove(path))
			break
		case 'clear':
			// check args
			if (args.length !== 1) return 'false'
			// execute query
			result = stringify(clear())
			break
		default:
			result = 'false'
	}
	// return action result
	return result
}
globalDataStore()
