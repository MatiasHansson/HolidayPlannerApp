import test from 'ava'
import HolidayPlanner from "../HolidayPlannerApp/HolidayPlanner.js"

test('test if given date data is in current holiday period', t => {
	const startDate1 = "2021-04-20" //Correct
    const endDate1 = "2021-05-20" //Correct
    const startDate2 = "2020-04-20" //False
    const endDate2 = "2020-05-20" //False
    const instance1 = new HolidayPlanner(startDate1, endDate1)
    const instance2 = new HolidayPlanner(startDate2, endDate2)
    t.true(instance1.isInCurrentHolidayPeriod(), "It should be")
    t.false(instance2.isInCurrentHolidayPeriod(), "It should not be")
});

test('test for counting holidays', t => {
    const startDate = "2021-05-10" 
    const endDate = "2021-06-20" 
    const instance = new HolidayPlanner(startDate, endDate)
    
    t.is(instance.computeHolidayPlan(), "Days to use holidays: 35", 'it should have 35 days');
});