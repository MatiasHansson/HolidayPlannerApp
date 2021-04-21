export default class HolidayPlanner {
    startDate
    endDate
    nonConsumingHolidays
    countDatesInRange
    nonConsumingDayMatcher
    nonConsumingHolidayList =
        [
            "2020-1-1", "2020-1-6", "2020-4-10", "2020-4-13", "2020-5-1", "2020-5-21", "2020-6-19",
            "2020-12-24", "2020-12-25", "2021-1-1", "2021-1-6", "2021-4-2", "2021-4-5", "2021-5-13",
            "2021-6-20", "2021-12-6", "2021-12-24"
        ]

    constructor(startDate, endDate) {
        this.startDate = new Date(startDate)
        this.endDate = new Date(endDate)
        this.nonConsumingHolidays = this.nonConsumingHolidayList.map(day => new Date(day))
        this.countDatesInRange = (startDate, endDate) => {
            const dates = []
            let iterator = startDate

            while (iterator <= endDate) {
                dates.push(iterator)

                iterator = new Date(
                    iterator.getFullYear(),
                    iterator.getMonth(),
                    iterator.getDate() + 1,
                )
            }
            return dates
        }
        this.nonConsumingDayMatcher = (selectedDay, nonConsumingHoliday) => {
            const isSameDate =
                selectedDay.getFullYear() === nonConsumingHoliday.getFullYear() &&
                selectedDay.getMonth() === nonConsumingHoliday.getMonth() &&
                selectedDay.getDate() === nonConsumingHoliday.getDate()
            const isSunday = selectedDay.getDay() === 0
            return isSameDate || isSunday
        }
    }

    get startDate() {
        return this.startDate
    }

    set startDate(date) {
        this.startDate = date
    }

    get endDate() {
        return this.startDate
    }

    set endDate(date) {
        this.startDate = date
    }

    // get a list of Date object with non consuming holiday days
    get holidayDays() {
        const datesInRange = this.countDatesInRange(this.startDate, this.endDate)
        const holidayDays = datesInRange.filter(selectedDay => {
            const isNonConsumingHoliday = this.nonConsumingHolidays.some(nonConsumingHoliday => {
                return this.nonConsumingDayMatcher(selectedDay, nonConsumingHoliday)
            })
            if (isNonConsumingHoliday) {
                return false
            }
            else return true
        }
        )
        return holidayDays
    }
}