import React, { useState } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, FormGroup, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Print } from '@mui/icons-material';

const positionTypes = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Work study', value: 'work-study' },
];

const defaultProfile = {
  firstName: '',
  lastName: '',
  middleInitial: '',
  employeeId: '',
  department: '',
  positionType: 'full-time',
};

const defaultSchedule = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

function ProfilePage({ profile, setProfile, schedule, setSchedule, timesheets, setTimesheets }) {
  const [editMode, setEditMode] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile);

  const handleProfileChange = (e) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  const handlePositionTypeChange = (e) => {
    setLocalProfile({ ...localProfile, positionType: e.target.value });
  };

  const saveProfile = () => {
    setProfile(localProfile);
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Profile</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField label="First Name" name="firstName" value={localProfile.firstName} onChange={handleProfileChange} disabled={!editMode} />
        <TextField label="Last Name" name="lastName" value={localProfile.lastName} onChange={handleProfileChange} disabled={!editMode} />
        <TextField label="Middle Initial" name="middleInitial" value={localProfile.middleInitial} onChange={handleProfileChange} disabled={!editMode} />
        <TextField label="Employee ID" name="employeeId" value={localProfile.employeeId} onChange={handleProfileChange} disabled={!editMode} />
        <TextField label="Department" name="department" value={localProfile.department} onChange={handleProfileChange} disabled={!editMode} />
        <Select value={localProfile.positionType} onChange={handlePositionTypeChange} disabled={!editMode}>
          {positionTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
        {editMode ? (
          <Button variant="contained" onClick={saveProfile}>Save</Button>
        ) : (
          <Button variant="outlined" onClick={() => setEditMode(true)}>Edit</Button>
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Position Details</Typography>
        {localProfile.positionType === 'full-time' && <Typography>Pending</Typography>}
        {localProfile.positionType === 'part-time' && <Typography>Pending</Typography>}
        {localProfile.positionType === 'work-study' && <Typography>Pending</Typography>}
      </Box>
      <ScheduleEditor schedule={schedule} setSchedule={setSchedule} editMode={editMode} />
      <TimesheetArchive timesheets={timesheets} setTimesheets={setTimesheets} />
    </Box>
  );
}

function ScheduleEditor({ schedule, setSchedule, editMode }) {
  const handleAddTime = (day) => {
    setSchedule({
      ...schedule,
      [day]: [...schedule[day], { start: '', end: '' }],
    });
  };
  const handleRemoveTime = (day, idx) => {
    setSchedule({
      ...schedule,
      [day]: schedule[day].filter((_, i) => i !== idx),
    });
  };
  const handleTimeChange = (day, idx, field, value) => {
    const newDay = schedule[day].map((slot, i) =>
      i === idx ? { ...slot, [field]: value } : slot
    );
    setSchedule({ ...schedule, [day]: newDay });
  };
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Schedule</Typography>
      {Object.keys(schedule).map((day) => (
        <Box key={day} sx={{ mb: 1 }}>
          <Typography>{day}</Typography>
          {schedule[day].map((slot, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Start Time"
                type="time"
                value={slot.start}
                onChange={(e) => handleTimeChange(day, idx, 'start', e.target.value)}
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
              <TextField
                label="End Time"
                type="time"
                value={slot.end}
                onChange={(e) => handleTimeChange(day, idx, 'end', e.target.value)}
                disabled={!editMode}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
              {editMode && (
                <Button color="error" onClick={() => handleRemoveTime(day, idx)}>Remove</Button>
              )}
            </Box>
          ))}
          {editMode && (
            <Button variant="outlined" onClick={() => handleAddTime(day)}>Add Time</Button>
          )}
        </Box>
      ))}
    </Box>
  );
}

function TimesheetArchive({ timesheets, setTimesheets }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Timesheet Archive</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheets.map((sheet, idx) => (
              <TableRow key={idx}>
                <TableCell>{sheet.date}</TableCell>
                <TableCell>
                  <IconButton><Edit /></IconButton>
                  <IconButton><Delete /></IconButton>
                  <IconButton><Print /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProfilePage;
