import React from "react";

export default function CalendarTable({ weeks, hours, setHours }) {

    const handleHourChange = (day, value) => {
        const newHours = [...hours];
        newHours[day] = Number(value);
        setHours(newHours);
    };

    

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="calendar-hours-table">
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                        <th>Total</th>
                        <th>Overtime</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, wIdx) => {
                        let total = 0;
                        week.forEach(dayNum => {
                            if (dayNum) total += hours[dayNum] || 0;
                        });
                        let overtime = total > 40 ? total - 40 : 0;
                        return (
                            <tr key={wIdx}>
                                {week.map((dayNum, dIdx) => (
                                    <td key={dIdx} style={{ minWidth: 80, textAlign: 'center' }}>
                                        {dayNum ? (
                                            <div>
                                                <div style={{ fontSize: '0.8em', color: '#888' }}>{dayNum}</div>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={24}
                                                    value={hours[dayNum] || 0}
                                                    onChange={e => handleHourChange(dayNum, e.target.value)}
                                                    style={{ width: '50px', textAlign: 'center' }}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{ fontSize: '0.8em', color: '#ccc' }}>-</div>
                                                <input type="number" value={0} disabled style={{ width: '50px', background: '#f0f0f0' }} />
                                            </div>
                                        )}
                                    </td>
                                ))}
                                <td style={{ fontWeight: 'bold', background: '#e3f2fd' }}>{total}</td>
                                <td style={{ fontWeight: 'bold', color: overtime > 0 ? '#d32f2f' : '#388e3c' }}>{overtime}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
