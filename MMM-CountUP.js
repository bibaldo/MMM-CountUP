/* global Module */

/* Magic Mirror
 * Module: MMM-CountUP
 *
 * By Jose Forte
 * MIT Licensed.
 */

Module.register("MMM-CountUP", {
  defaults: {
    header: 'Days passed since COVID19 Quarantine',
    date: '2020-03-20', // YYYY-MM-DD
    time: '00:00:00', // HH:MM:SS
    showFullDate : false
  },

  getStyles: function() {
    return ["MMM-CountUP.css"]
  },

  start: function() {
    Log.info("Starting module: " + this.name);
    
    // Schedule update interval.
    var self = this;
    var calcCountUP = setInterval(function() {
      self.updateDom();
    }, 1000)
  },

  getHeader: function() {
    return this.config.header
  },

  getDom: function() {
    var startDate = new Date(this.config.date + ' ' + this.config.time)
    // milliseconds since start timedate
    var timestamp = startDate.getTime()
    // difference between timestamp and now
    var datesDifference = this.dateDiff(timestamp)

    var wrapper = document.createElement("table")
    wrapper.className = 'countUP'

    var infoRow = document.createElement("tr")

    var yearsWrapper = document.createElement("td"),
        monthsWrapper = document.createElement("td"),
        weeksWrapper = document.createElement("td"),
        daysWrapper = document.createElement("td"),
        hoursWrapper = document.createElement("td"),
        minutesWrapper = document.createElement("td"),
        secondsWrapper = document.createElement("td");

    yearsWrapper.innerHTML = datesDifference.year
    yearsWrapper.className = 'digits'
    monthsWrapper.innerHTML = datesDifference.month
    monthsWrapper.className = 'digits'
    weeksWrapper.innerHTML = datesDifference.week
    weeksWrapper.className = 'digits'
    daysWrapper.innerHTML = datesDifference.day
    daysWrapper.className = 'digits'
    hoursWrapper.innerHTML = datesDifference.hour
    hoursWrapper.className = 'digits'
    minutesWrapper.innerHTML = datesDifference.minute
    minutesWrapper.className = 'digits'
    secondsWrapper.innerHTML = datesDifference.second

    infoRow.appendChild(yearsWrapper)
    infoRow.appendChild(monthsWrapper)
    infoRow.appendChild(weeksWrapper)
    infoRow.appendChild(daysWrapper)
    infoRow.appendChild(hoursWrapper)
    infoRow.appendChild(minutesWrapper)
    infoRow.appendChild(secondsWrapper)

    wrapper.appendChild(infoRow)

    var textsRow = document.createElement("tr")
    textsRow.className = 'textsRow'

    var textYearsWrapper = document.createElement("td"),
        textMonthsWrapper = document.createElement("td"),
        textWeeksWrapper = document.createElement("td"),
        textDaysWrapper = document.createElement("td"),
        textHoursWrapper = document.createElement("td"),
        textMinutesWrapper = document.createElement("td"),
        textSecondsWrapper = document.createElement("td");

    textYearsWrapper.innerHTML = 'YEARS'
    textMonthsWrapper.innerHTML = 'MONTHS'
    textWeeksWrapper.innerHTML = 'WEEKS'
    textDaysWrapper.innerHTML = 'DAYS'
    textHoursWrapper.innerHTML = 'HOURS'
    textMinutesWrapper.innerHTML = 'MINUTES'
    textSecondsWrapper.innerHTML = 'SECONDS'

    textsRow.appendChild(textYearsWrapper)
    textsRow.appendChild(textMonthsWrapper)
    textsRow.appendChild(textWeeksWrapper)  
    textsRow.appendChild(textDaysWrapper)
    textsRow.appendChild(textHoursWrapper)
    textsRow.appendChild(textMinutesWrapper)
    textsRow.appendChild(textSecondsWrapper)

    wrapper.appendChild(textsRow)
    
    if (!this.config.showFullDate || datesDifference.year == 0 ) {
      yearsWrapper.className += ' none'
      textYearsWrapper.className += ' none'
    }
    if (!this.config.showFullDate || datesDifference.month == 0 ) {
      monthsWrapper.className += ' none'
      textMonthsWrapper.className += ' none'
    }
    if (!this.config.showFullDate || datesDifference.week == 0 ) {
      weeksWrapper.className += ' none'
      textWeeksWrapper.className += ' none'
    }

    return wrapper  
  },

  dateDiff: function (timestamp) {
    let structure = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }
    
    let delta = Math.abs(timestamp - new Date().getTime()) / 1000
    let res = {}

    for(let key in structure) {
      if(this.config.showFullDate==true || (key !='month' && key !='week') )
        {
        res[key] = Math.floor(delta / structure[key])
        delta -= res[key] * structure[key]
      } 
    }

    return res
  }

})