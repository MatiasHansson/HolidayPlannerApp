import HolidayPlanner from "../HolidayPlannerApp/HolidayPlanner.js"
import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// set the view engine to ejs
app.set('view engine', 'ejs')
let result = ""

 // validate is given date range in selected holiday period
 function validateSelectedHolidayPeriod(startDate, endDate) {
    const holidayPeriodMonth = startDate.getMonth()
    const holidayPeriodYear = startDate.getFullYear()
    let holidayPeriodEnd
    if(holidayPeriodMonth > 2) {
        holidayPeriodEnd = new Date(`${holidayPeriodYear + 1}-03-31`)
    }
    else holidayPeriodEnd = new Date(`${holidayPeriodYear}-04-01`)
    return endDate < holidayPeriodEnd 
}

// validate if the given dates are in chronological order
function validateChronologicalOrder(startDate, endDate) {
    return startDate < endDate
}

// validate that given period is in limited days range (50 days)
function validateRange(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    return Math.round(Math.abs((startDate - endDate) / oneDay)) <= 50
}

// compute holiday plan and render result to the view
app.post("/computeHolidayPlan", function (req, res) {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    let startDateObj = new Date(startDate)
    let endDateObj = new Date(endDate)
    const isInSelectedHolidayPeriod = validateSelectedHolidayPeriod(startDateObj, endDateObj)
    const isInChronologicalOrder = validateChronologicalOrder(startDateObj, endDateObj)
    const isInLimitedRange = validateRange(startDateObj, endDateObj)
    if(!isInSelectedHolidayPeriod) {
        result = "Selected days are not in current holiday period"
    }

    else if(!isInChronologicalOrder) {
        result = "Selected days must be in chronological order"
    }
    else if(!isInLimitedRange) {
        result = "Max days limit reached. Cannot choose over 50 days"
    }
    else {
        const holidayPlanner = new HolidayPlanner(startDate, endDate)
        const holidayDays = holidayPlanner.holidayDays
        result = `Days to use holidays: ${holidayDays.length}`

    }
    res.redirect("/")
})


// render index page
app.get('/', function (req, res) {
    res.render('index', {result})
})

app.listen(8080)