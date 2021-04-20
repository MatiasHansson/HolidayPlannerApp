export default class HolidayPlanner {
    startDate
    endDate

    constructor(startDate, endDate) {
        this.startDate = new Date(startDate)
        this.endDate = new Date(endDate)
    }

    // validate is given date range in current holiday period
    isInCurrentHolidayPeriod() {
        const year = new Date().getFullYear()
        const startYear = new Date() > new Date(`${year}-03-31`) ? year : year - 1
        const currentPeriodStart = new Date(`${startYear}-04-01`)
        const currentPeriodEnd = new Date(`${startYear + 1}-03-31`)
        return (currentPeriodStart <= this.startDate && currentPeriodStart <= this.endDate) && (currentPeriodEnd >= this.startDate && currentPeriodEnd >= this.endDate)
    }

    // validate if the given dates are in chronological order
    isInChronologicalOrder() {
        return this.startDate < this.endDate
    }

    // validate that given period is in limited days range (50 days)
    isInLimitedRange() {
        const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((this.startDate - this.endDate) / oneDay)) <= 50
    }

    // filter a new list with non consuming days
    filterNonConsumingDays() {
        const holidaysList =
            [
                "2020-1-1", "2020-1-6", "2020-4-10", "2020-4-13", "2020-5-1", "2020-5-21", "2020-6-19",
                "2020-12-24", "2020-12-25", "2021-1-1", "2021-1-6", "2021-4-2", "2021-4-5", "2021-5-13",
                "2021-6-20", "2021-12-6", "2021-12-24"
            ]
        const selectedDays = this.getDatesBetween(this.startDate, this.endDate)
        const nonConsumingDays = holidaysList.map(day => new Date(day))
        const filteredHolidays = (d1, d2) => {
            return (d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth() &&
                d1.getDate() === d2.getDate()) ||
                d1.getDay() === 0 //Sunday
        }

        const filtered = selectedDays.filter(s =>
            !nonConsumingDays.some(t => {
                return filteredHolidays(s, t)
            }))
            return filtered
    }

    // Returns an array of dates between the two dates
    getDatesBetween(startDate, endDate) {
        const dates = []

        let currentDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        )

        while (currentDate <= endDate) {
            dates.push(currentDate)

            currentDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() + 1,
            )
        }

        return dates
    }

    computeHolidayPlan() {
        if(!this.isInCurrentHolidayPeriod()) {
            return "Selected days are not in current holiday period"
        }

        if(!this.isInChronologicalOrder()) {
            return "Selected days must be in chronological order"
        }

        if(!this.isInLimitedRange()) {
            return "Max days limit reached. Cannot choose over 50 days"
        }

        else return `Days to use holidays: ${this.filterNonConsumingDays().length}`
    }

}