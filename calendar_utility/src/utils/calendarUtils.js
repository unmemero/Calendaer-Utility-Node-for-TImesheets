// Calendar utility functions
export function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

export function getWeekday(year, month, day) {
    return new Date(year, month - 1, day).getDay();
}

export const calculateDailyHours = (weekday, profile) => {
    const weeklySchedule = profile?.get("schedule", null);
    if (!weeklySchedule) return 0;

    const todaySchedule = weeklySchedule.get(weekday, []);
    let total = 0;

    todaySchedule.forEach(shift => {
        const [startHour, startMin] = shift.get("start","00:00").split(":").map(Number);
        const [endHour, endMin] = shift.get("end","00:00").split(":").map(Number);

        const start = startHour + startMin / 60;
        const end = endHour + endMin / 60;

        if (!isNaN(start) && !isNaN(end)) {
            let duration = end - start;
        if (duration < 0) duration += 24; 
            total += duration;
        }
    });

    return total;
};