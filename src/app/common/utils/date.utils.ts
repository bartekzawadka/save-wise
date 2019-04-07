export class DateUtils{
    public static getUnifiedDateString(date: Date) : string {
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('-');
    }
}
