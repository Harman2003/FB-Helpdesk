const hasDayPassed = (date_string) => {
    const old_date = new Date(date_string);
    const current_date = new Date();
    return (Math.abs(current_date.getTime() - old_date.getTime()) >= 24 * 60 * 60 * 60);
}
module.exports = hasDayPassed;
