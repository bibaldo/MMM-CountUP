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
    date: '2020-03-21', // YYYY-MM-DD
    time: '00:00:00', // HH:MM:SS
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
    var startDate = this.config.date.split('-'),
        startYear = startDate[0],
        startMonth = startDate[1],
        startDay = startDate[2]
    var startTime = this.config.time.split(':'),
        startHour = startTime[0],
        startMinute = startTime[1],
        startSecond = startTime[2]

    var start = new Date(startYear, startMonth - 1 , startDay, startHour, startMinute, startSecond)
    var now = new Date()

    var seconds = Math.floor(((now) - start)/1000)
    var minutes = Math.floor(seconds/60)
    var hours = Math.floor(minutes/60)
    var days = Math.floor(hours/24)
    
    hours = hours-(days*24)
    minutes = minutes-(days*24*60)-(hours*60)
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60)

    var wrapper = document.createElement("table")
    wrapper.className = 'countUP'

    var infoRow = document.createElement("tr")
    var daysWrapper = document.createElement("td")
    daysWrapper.className = 'digits'
    var hoursWrapper = document.createElement("td")
    hoursWrapper.className = 'digits'
    var minutesWrapper = document.createElement("td")
    minutesWrapper.className = 'digits'
    var secondsWrapper = document.createElement("td")

    daysWrapper.innerHTML = days
    hoursWrapper.innerHTML = hours
    minutesWrapper.innerHTML = minutes
    secondsWrapper.innerHTML = seconds

    infoRow.appendChild(daysWrapper)
    infoRow.appendChild(hoursWrapper)
    infoRow.appendChild(minutesWrapper)
    infoRow.appendChild(secondsWrapper)

    wrapper.appendChild(infoRow)

    var textsRow = document.createElement("tr")
    textsRow.className = 'textsRow'
    var textDaysWrapper = document.createElement("td")
    var textHoursWrapper = document.createElement("td")
    var textMinutesWrapper = document.createElement("td")
    var textSecondsWrapper = document.createElement("td")

    textDaysWrapper.innerHTML = 'DAYS'
    textHoursWrapper.innerHTML = 'HOURS'
    textMinutesWrapper.innerHTML = 'MINUTES'
    textSecondsWrapper.innerHTML = 'SECONDS'

    textsRow.appendChild(textDaysWrapper)
    textsRow.appendChild(textHoursWrapper)
    textsRow.appendChild(textMinutesWrapper)
    textsRow.appendChild(textSecondsWrapper)

    wrapper.appendChild(textsRow)

    return wrapper  
  }

})