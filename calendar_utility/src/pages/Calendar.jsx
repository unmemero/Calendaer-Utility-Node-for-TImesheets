

import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Toolbar, Button, TextField, Grid } from "@mui/material";
import CalendarSummary from '../components/CalendarSummary';
import CalendarTable from '../components/CalendarTable';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import { decrypt } from "../utils/encryptionUtils";
import {getDaysInMonth, getWeekday } from "../utils/dateUtils";

import "../styles/Calendar.scss";

export default function Calendar() {
    const [profile, setProfile] = useState(null);
    const [timesheets, setTimesheets] = useState([]);
    //const [maxHours, setMaxHours] = useState(80);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const daysInMonth = getDaysInMonth(month, year);
    const [hours, setHours] = useState(() => Array(daysInMonth + 1).fill(0));

    // Get profile from local storage on page load
    useEffect(()=>{
        const encryptedStorage = localStorage.getItem("profile");
        if (encryptedStorage){
            const decryptedStorage = decrypt(encryptedStorage);
            if (decryptedStorage) {
                setProfile(decryptedStorage.get("profile",{}));
                setTimesheets(decryptedStorage.get("timesheets",[]));
                //setMaxHours(decryptedStorage.get("maxHours",80));
            }
        }
    }, []);

    // Recreate hours array if month/year changes
    useEffect(() => {
        if(!profile) {
            setHours(Array(daysInMonth + 1).fill(0));
        }
        else {
            const timesheetArchive = timesheets.get(`${year}-${month}`, null);
            if (timesheetArchive) {
                setHours(timesheetArchive.get("hours", Array(daysInMonth + 1).fill(0)));
            }
        }
    }, [month, year, daysInMonth, profile, timesheets]);

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
}