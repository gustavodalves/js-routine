class DateFormatter {
    static format(date: Date): string {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static addOneDay(date: Date): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }
}

export class DateRange {
    getDatesInRange(startDate: string, endDate: string): string[] {
        const dates: string[] = [];
        let currentDate = new Date(startDate);
        const finalDate = new Date(endDate);

        while (currentDate <= finalDate) {
            dates.push(DateFormatter.format(currentDate));
            currentDate = DateFormatter.addOneDay(currentDate);
        }

        return dates;
    }
}
