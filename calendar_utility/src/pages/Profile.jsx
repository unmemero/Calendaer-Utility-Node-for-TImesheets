import React from "react";
import { Box, Typography, TextField, FormControlLabel, Checkbox, Paper, Divider, Grid } from "@mui/material";
import { Person, Badge, Business, AssignmentInd, Work } from "@mui/icons-material";
import "../styles/profile.scss";

export default function Profile() {
    return (
        <Box className="profile-page" sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 4 }}>
            <Typography variant="h4" className="profile-title" sx={{ mb: 3, fontWeight: 700 }}>
                <Person sx={{ mr: 1, verticalAlign: "middle" }} /> Profile
            </Typography>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Personal Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" fullWidth InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" fullWidth InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Middle Initial" fullWidth InputProps={{ startAdornment: <Badge sx={{ mr: 1 }} /> }} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Employee ID" fullWidth InputProps={{ startAdornment: <AssignmentInd sx={{ mr: 1 }} /> }} disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Department" fullWidth InputProps={{ startAdornment: <Business sx={{ mr: 1 }} /> }} disabled />
                    </Grid>
                </Grid>
            </Paper>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Position Type
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                    <FormControlLabel control={<Checkbox />} label={<><Work sx={{ mr: 1 }} />Full Time</>} />
                    <FormControlLabel control={<Checkbox />} label={<><Work sx={{ mr: 1 }} />Part Time</>} />
                    <FormControlLabel control={<Checkbox />} label={<><Work sx={{ mr: 1 }} />Work Study</>} />
                </Box>
                <Box className="employment-details-container" sx={{ mt: 2, p: 2, border: "1px dashed #bbb", borderRadius: 2 }}>
                    {/* Employment type details will go here */}
                    <Typography variant="body2" color="text.secondary">Employment type details (pending)</Typography>
                </Box>
            </Paper>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Schedule
                </Typography>
                <Box className="schedule-container" sx={{ p: 2, border: "1px dashed #bbb", borderRadius: 2 }}>
                    {/* Schedule editor will go here */}
                    <Typography variant="body2" color="text.secondary">Schedule editor (pending)</Typography>
                </Box>
            </Paper>
            <Paper className="profile-section" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Timesheets Archive
                </Typography>
                <Box className="timesheet-archive-container" sx={{ p: 2, border: "1px dashed #bbb", borderRadius: 2 }}>
                    {/* Timesheet archive table will go here */}
                    <Typography variant="body2" color="text.secondary">Timesheet archive table (pending)</Typography>
                </Box>
            </Paper>
        </Box>
    );
}
