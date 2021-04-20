import HolidayPlanner from "../HolidayPlannerApp/HolidayPlanner.js"
import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
// set the view engine to ejs
app.set('view engine', 'ejs')
let result = ""

// compute holiday plan and render result to the view
app.post("/computeHolidayPlan", function (req, res) {
    let startDate = req.body.startDate
    let endDate = req.body.endDate
    console.log(startDate)
    console.log(endDate)
    const holidayPlanner = new HolidayPlanner(startDate, endDate)
    const holidayPlan = holidayPlanner.computeHolidayPlan()
    console.log(holidayPlanner.filterNonConsumingDays())
    result = holidayPlan
    res.redirect("/")
})


// render index page
app.get('/', function (req, res) {
    console.log(result)
    res.render('index', {result})
})

app.listen(8080)