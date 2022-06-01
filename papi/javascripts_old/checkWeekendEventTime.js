function checkWeekendEventTime() {
	var today = new Date()
	var todayDay = today.getDay()
	return todayDay == 0 ? '1' : '0'
}

checkWeekendEventTime()
