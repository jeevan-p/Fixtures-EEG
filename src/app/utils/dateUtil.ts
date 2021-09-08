export const dateUtil = (date: string) => {
    const dateToConvert = new Date(date);
    if (isNaN(dateToConvert.getTime())) { 
        return (['Comming', 'Soon'])
    }
    const dateMinutes = dateToConvert.getMinutes();
    let returnStatements = [
        `${dateToConvert.getDate()} ${getMonthName(dateToConvert.getMonth())}`,
        `${dateToConvert.getHours()}:${dateMinutes < 10 && '0'}${dateMinutes}`
    ];
    return returnStatements;
};

export const getMonthName = (monthInNumber: number) => {
    const arrayOfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return arrayOfMonths[monthInNumber];
};