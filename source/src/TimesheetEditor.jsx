import React, { useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TimesheetEditor({ profile, schedule, timesheets, setTimesheets }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendar, setCalendar] = useState([]);

  // Generate calendar for selected month/year
  React.useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const weeks = [];
    let week = Array(9).fill('');
    let dayOfWeek = new Date(year, month - 1, 1).getDay();
    let dayCounter = 1;
    while (dayCounter <= daysInMonth) {
      week = Array(9).fill('');
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter;
        dayCounter++;
      }
      weeks.push(week);
    }
    setCalendar(weeks);
  }, [month, year]);

  // Placeholder for overtime logic and extra boxes for full-time

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Monthly Timesheet Editor</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Month"
          type="number"
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          inputProps={{ min: 1, max: 12 }}
        />
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          inputProps={{ min: 2000, max: 2100 }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sun</TableCell>
              <TableCell>Mon</TableCell>
              <TableCell>Tue</TableCell>
              <TableCell>Wed</TableCell>
              <TableCell>Thu</TableCell>
              <TableCell>Fri</TableCell>
              <TableCell>Sat</TableCell>
              <TableCell>Reg Hours</TableCell>
              <TableCell>Overtime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {calendar.map((week, idx) => (
              <TableRow key={idx}>
                {week.slice(0, 7).map((day, i) => (
                  <TableCell key={i}>{day ? <TextField type="number" size="small" /> : ''}</TableCell>
                ))}
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={7}>Total</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {profile.positionType === 'full-time' && (
        <Box sx={{ mt: 2 }}>
          <Typography>Full-time extra boxes (generic label)</Typography>
          <TextField label="Generic Box 1" />
          <TextField label="Generic Box 2" />
        </Box>
      )}
    </Box>
  );
}

export default TimesheetEditor;
