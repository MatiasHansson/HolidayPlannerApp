import test from 'ava'
import HolidayPlanner from "../HolidayPlannerApp/HolidayPlanner.js"

test('test for counting holidays', t => {
    const startDate = "2021-05-10" 
    const endDate = "2021-06-20" 
    const instance = new HolidayPlanner(startDate, endDate)
    
    t.is(instance.holidayDays.length, 35, 'it should have 35 days');
});