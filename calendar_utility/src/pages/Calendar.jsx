
import React, { useState } from "react";
import { Box, Paper, Typography, Toolbar, Button, TextField, Grid } from "@mui/material";

import "../styles/Calendar.scss";

export default function Calendar() {
    const [month, setMonth] = useState(9); // Default: September
    const [year, setYear] = useState(2025);

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
                <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Save
                </Button>
                        <Button variant="outlined" color="secondary">
                            Print
                        </Button>
            </Toolbar>

            {/* Calendar Table Placeholder */}
            <Paper elevation={1} className="calendar-table" sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" color="textSecondary" align="center">
                    [Calendar Table Placeholder]
                </Typography>
            </Paper>
        </Box>
    );
}