

import React, { useState } from "react";
import { Box, Paper, Typography, Toolbar, Button, TextField, Grid } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

import "../styles/Calendar.scss";

export default function Calendar() {
    const [month, setMonth] = useState(9); // Default: September
    const [year, setYear] = useState(2025);
    const daysInMonth = getDaysInMonth(month, year);
    // State for hours input
    const [hours, setHours] = useState(() => Array(daysInMonth + 1).fill(0));

    // Recreate hours array if month/year changes
    React.useEffect(() => {
        setHours(Array(getDaysInMonth(month, year) + 1).fill(0));
    }, [month, year]);

    // Build weeks
    const weeks = [];
    let day = 1;
    const firstWeekday = getWeekday(year, month, 1);
    let firstCol = (firstWeekday === 0) ? 6 : firstWeekday - 1;
    let week = Array(7).fill(null);
    for (let i = firstCol; i < 7 && day <= daysInMonth; i++) {
        week[i] = day;
        day++;
    }
    weeks.push(week);
    while (day <= daysInMonth) {
        week = Array(7).fill(null);
        for (let i = 0; i < 7 && day <= daysInMonth; i++) {
            week[i] = day;
            day++;
        }
        weeks.push(week);
    }

    // Calculate weekly totals and overtime
    const getWeekTotals = (week) => {
        let total = 0;
        week.forEach(dayNum => {
            if (dayNum) total += hours[dayNum] || 0;
        });
        return {
            total,
            overtime: total > 40 ? total - 40 : 0
        };
    };

    // Calculate grand totals
    let grandTotal = 0;
    let grandOvertime = 0;
    weeks.forEach(week => {
        const { total, overtime } = getWeekTotals(week);
        grandTotal += total;
        grandOvertime += overtime;
    });

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value));
    };
    const handleYearChange = (e) => {
        setYear(Number(e.target.value));
    };

    return (
        <Box className="calendar-page">
            {/* Title */}
            <Typography variant="h4" className="calendar-title" gutterBottom>
                Timesheet Calendar
            </Typography>

            {/* Month/Year Input */}
            <Paper elevation={2} className="calendar-inputs" sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField
                            label="Month"
                            type="number"
                            inputProps={{ min: 1, max: 12 }}
                            value={month}
                            onChange={handleMonthChange}
                            size="small"
                            className="calendar-month-input"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Year"
                            type="number"
                            inputProps={{ min: 2000, max: 2100 }}
                            value={year}
                            onChange={handleYearChange}
                            size="small"
                            className="calendar-year-input"
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Sticky Toolbar */}
            <Toolbar className="calendar-toolbar" sx={{ position: "sticky", top: 0, zIndex: 100, background: "#fff", mb: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} startIcon={<SaveIcon />}> 
                    Save
                </Button>
                <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
                >
                    Print
                </Button>
            </Toolbar>

            {/* Calendar Table */}
            <Paper elevation={1} className="calendar-table" sx={{ p: 3, mt: 2 }}>
                <CalendarTable weeks={weeks} hours={hours} setHours={setHours} />
            </Paper>

            {/* Summary Boxes */}
            <CalendarSummary regular={grandTotal - grandOvertime} overtime={grandOvertime} />
        </Box>
    );
// End of file

// Helper to get number of days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Helper to get the weekday (0=Sunday, 1=Monday, ...)
function getWeekday(year, month, day) {
    return new Date(year, month - 1, day).getDay();
}

function CalendarTable({ weeks, hours, setHours }) {
    const handleHourChange = (day, value) => {
        const newHours = [...hours];
        newHours[day] = Number(value);
        setHours(newHours);
    };
    // ...existing code...
    return (
        <Box sx={{ overflowX: 'auto' }}>
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
                        // Calculate weekly totals and overtime
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
        </Box>
    );
}

// Summary component
function CalendarSummary({ regular, overtime }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
            <Paper elevation={2} sx={{ p: 2, minWidth: 220, textAlign: 'center', background: '#e3f2fd' }}>
                <Typography variant="subtitle1" fontWeight={600}>Total Regular Hours</Typography>
                <Typography variant="h5" color="primary">{regular}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2, minWidth: 220, textAlign: 'center', background: '#ffebee' }}>
                <Typography variant="subtitle1" fontWeight={600}>Total Overtime Hours</Typography>
                <Typography variant="h5" color="error">{overtime}</Typography>
            </Paper>
        </Box>
    );
}
}