import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, FormControlLabel, Checkbox, Paper, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { Person, Badge, Business, AssignmentInd, Work, Edit, Save, FileDownload, FileUpload } from "@mui/icons-material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Add, Delete } from "@mui/icons-material";
import "../styles/profile.scss";

const defaultProfile = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    employeeId: "",
    department: "",
    positionType: "",
    // Employment details
    payPeriod: "",
    positionNumber: "",
    fund: "",
    org: "",
    acct: "",
    prog: "",
    hourlyRate: "",
    ptFund1: "",
    ptOrg1: "",
    ptAcct1: "",
    ptProg1: "",
    ptFund2: "",
    ptOrg2: "",
    ptAcct2: "",
    ptProg2: "",
    schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    },
};

function encrypt(data) {
    // Stub: Replace with real encryption
    return btoa(JSON.stringify(data));
}
function decrypt(data) {
    // Stub: Replace with real decryption
    try { return JSON.parse(atob(data)); } catch { return null; }
}

export default function Profile() {
    const [profile, setProfile] = useState(defaultProfile);
    const [editMode, setEditMode] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {
        // Simulate loading encrypted JSON from localStorage
        const encrypted = localStorage.getItem("profileData");
        if (encrypted) {
            const data = decrypt(encrypted);
            if (data) {
                setProfile(data);
                setEditMode(false);
            } else {
                setEditMode(true);
            }
        } else {
            setEditMode(true);
        }
        setLoaded(true);
    }, []);

    const handleChange = (field) => (e) => {
        setProfile({ ...profile, [field]: e.target.value });
    };

    const handlePositionType = (type) => () => {
        setProfile({ ...profile, positionType: type });
    };

    const handleEdit = () => setEditMode(true);
    const handleSave = () => {
        localStorage.setItem("profileData", encrypt(profile));
        setEditMode(false);
    };

    // Export profile data as encrypted JSON file
    const handleExport = () => {
        const encrypted = localStorage.getItem("profileData");
        if (!encrypted) return;
        const blob = new Blob([encrypted], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "profile.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import profile data from encrypted JSON file
    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const encrypted = event.target.result;
            const data = decrypt(encrypted);
            if (data) {
                setProfile(data);
                localStorage.setItem("profileData", encrypted);
                setEditMode(false);
            } else {
                alert("Invalid or corrupted profile file.");
            }
        };
        reader.readAsText(file);
    };

    // Employment type details rendering
    let employmentDetails = null;
    if (profile.positionType === "full-time") {
        employmentDetails = (
            <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <TextField label="Pay Period" fullWidth value={profile.payPeriod} onChange={handleChange("payPeriod")} disabled={!editMode} />
                <TextField label="Position Number" fullWidth value={profile.positionNumber} onChange={handleChange("positionNumber")} disabled={!editMode} />
                <TextField label="Fund" fullWidth value={profile.fund} onChange={handleChange("fund")} disabled={!editMode} />
                <TextField label="Org" fullWidth value={profile.org} onChange={handleChange("org")} disabled={!editMode} />
                <TextField label="Acct" fullWidth value={profile.acct} onChange={handleChange("acct")} disabled={!editMode} />
                <TextField label="Prog" fullWidth value={profile.prog} onChange={handleChange("prog")} disabled={!editMode} />
            </Grid>
        );
    } else if (profile.positionType === "part-time") {
        employmentDetails = (
            <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <TextField label="Position Number" fullWidth value={profile.positionNumber} onChange={handleChange("positionNumber")} disabled={!editMode} />
                <TextField label="Hourly Rate" fullWidth value={profile.hourlyRate} onChange={handleChange("hourlyRate")} disabled={!editMode} />
                <Box sx={{ gridColumn: '1 / span 2', mb: 2, p: 2, background: "rgba(56,178,172,0.07)", borderRadius: 2, border: "1px solid #38b2ac" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Fund/Org/Acct/Prog (Row 1)</Typography>
                    <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <TextField label="Fund" fullWidth value={profile.ptFund1} onChange={handleChange("ptFund1")} disabled={!editMode} />
                        <TextField label="Org" fullWidth value={profile.ptOrg1} onChange={handleChange("ptOrg1")} disabled={!editMode} />
                        <TextField label="Acct" fullWidth value={profile.ptAcct1} onChange={handleChange("ptAcct1")} disabled={!editMode} />
                        <TextField label="Prog" fullWidth value={profile.ptProg1} onChange={handleChange("ptProg1")} disabled={!editMode} />
                    </Grid>
                </Box>
                <Box sx={{ gridColumn: '1 / span 2', p: 2, background: "rgba(56,178,172,0.07)", borderRadius: 2, border: "1px solid #38b2ac" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Fund/Org/Acct/Prog (Row 2)</Typography>
                    <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <TextField label="Fund" fullWidth value={profile.ptFund2} onChange={handleChange("ptFund2")} disabled={!editMode} />
                        <TextField label="Org" fullWidth value={profile.ptOrg2} onChange={handleChange("ptOrg2")} disabled={!editMode} />
                        <TextField label="Acct" fullWidth value={profile.ptAcct2} onChange={handleChange("ptAcct2")} disabled={!editMode} />
                        <TextField label="Prog" fullWidth value={profile.ptProg2} onChange={handleChange("ptProg2")} disabled={!editMode} />
                    </Grid>
                </Box>
            </Grid>
        );
    } else if (profile.positionType === "work-study") {
        employmentDetails = (
            <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <TextField label="Hourly Rate" fullWidth value={profile.hourlyRate} onChange={handleChange("hourlyRate")} disabled={!editMode} />
            </Grid>
        );
    } else {
        employmentDetails = (
            <Typography variant="body2" color="text.secondary">Select a position type to enter details.</Typography>
        );
    }

    return (
        <Box className="profile-page" sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 4, position: "relative" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" className="profile-title" sx={{ fontWeight: 700 }}>
                    <Person sx={{ mr: 1, verticalAlign: "middle" }} /> Profile
                </Typography>
            </Box>
            {/* Sticky sidebar for actions */}
            <Box
                className="profile-actions-sidebar"
                sx={{
                    position: "fixed",
                    top: 100,
                    right: 40,
                    zIndex: 1200,
                    transition: "width 0.3s, box-shadow 0.3s",
                    width: 56,
                    height: "auto",
                    background: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    '&:hover': {
                        width: 220,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    p: 1,
                }}
                onMouseEnter={e => { e.currentTarget.style.width = '220px'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.width = '56px'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)'; }}
            >
                <Button fullWidth variant="outlined" startIcon={<FileDownload />} onClick={handleExport} sx={{ mb: 1, justifyContent: "flex-start" }}>
                    Export
                </Button>
                <Button fullWidth variant="outlined" startIcon={<FileUpload />} onClick={() => fileInputRef.current.click()} sx={{ mb: 1, justifyContent: "flex-start" }}>
                    Import
                </Button>
                <input type="file" accept=".json" ref={fileInputRef} style={{ display: "none" }} onChange={handleImport} />
                {loaded && (
                    editMode ? (
                        <Button fullWidth variant="contained" color="primary" startIcon={<Save />} onClick={handleSave} sx={{ justifyContent: "flex-start" }}>
                            Save
                        </Button>
                    ) : (
                        <Button fullWidth variant="outlined" startIcon={<Edit />} onClick={handleEdit} sx={{ justifyContent: "flex-start" }}>
                            Edit
                        </Button>
                    )
                )}
            </Box>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Personal Information
                </Typography>
                <Grid container columnSpacing={2} rowSpacing={2} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <TextField label="First Name" fullWidth value={profile.firstName} onChange={handleChange("firstName")} disabled={!editMode} InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
                    <TextField label="Last Name" fullWidth value={profile.lastName} onChange={handleChange("lastName")} disabled={!editMode} InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
                    <TextField label="Middle Initial" fullWidth value={profile.middleInitial} onChange={handleChange("middleInitial")} disabled={!editMode} InputProps={{ startAdornment: <Badge sx={{ mr: 1 }} /> }} />
                    <TextField label="Employee ID" fullWidth value={profile.employeeId} onChange={handleChange("employeeId")} disabled={!editMode} InputProps={{ startAdornment: <AssignmentInd sx={{ mr: 1 }} /> }} />
                    <TextField label="Department" fullWidth value={profile.department} onChange={handleChange("department")} disabled={!editMode} InputProps={{ startAdornment: <Business sx={{ mr: 1 }} /> }} sx={{ gridColumn: '1 / span 2' }} />
                </Grid>
            </Paper>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Position Type
                </Typography>
                <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                    <FormControlLabel control={<Checkbox checked={profile.positionType === "full-time"} onChange={handlePositionType("full-time")} disabled={!editMode} />} label={<><Work sx={{ mr: 1 }} />Full Time</>} />
                    <FormControlLabel control={<Checkbox checked={profile.positionType === "part-time"} onChange={handlePositionType("part-time")} disabled={!editMode} />} label={<><Work sx={{ mr: 1 }} />Part Time</>} />
                    <FormControlLabel control={<Checkbox checked={profile.positionType === "work-study"} onChange={handlePositionType("work-study")} disabled={!editMode} />} label={<><Work sx={{ mr: 1 }} />Work Study</>} />
                </Box>
                <Box className="employment-details-container" sx={{ mt: 2, p: 2, border: "1px dashed #bbb", borderRadius: 2 }}>
                    {employmentDetails}
                </Box>
            </Paper>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Schedule
                </Typography>
                <Box className="schedule-container" sx={{ p: 2, border: "1px dashed #bbb", borderRadius: 2 }}>
                    {/* Schedule editor table */}
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Day</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>Times</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                                    const schedule = (profile.schedule && profile.schedule[day]) ? profile.schedule[day] : [];
                                    return (
                                        <TableRow key={day}>
                                            <TableCell>{day}</TableCell>
                                            <TableCell>
                                                {schedule.length === 0 ? (
                                                    editMode && (
                                                        <Button variant="outlined" size="small" startIcon={<Add />} onClick={() => {
                                                            const newSchedule = { ...profile.schedule };
                                                            newSchedule[day] = [...(newSchedule[day] || []), { start: null, end: null }];
                                                            setProfile({ ...profile, schedule: newSchedule });
                                                        }}>
                                                            Add Time
                                                        </Button>
                                                    )
                                                ) : (
                                                    schedule.map((range, idx) => (
                                                        <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                            <TextField
                                                                type="time"
                                                                label="Start"
                                                                value={range.start || ""}
                                                                onChange={(e) => {
                                                                    const newSchedule = { ...profile.schedule };
                                                                    newSchedule[day][idx].start = e.target.value;
                                                                    setProfile({ ...profile, schedule: newSchedule });
                                                                }}
                                                                disabled={!editMode}
                                                                size="small"
                                                                sx={{ minWidth: 100 }}
                                                            />
                                                            <Typography sx={{ mx: 1 }}>-</Typography>
                                                            <TextField
                                                                type="time"
                                                                label="End"
                                                                value={range.end || ""}
                                                                onChange={(e) => {
                                                                    const newSchedule = { ...profile.schedule };
                                                                    newSchedule[day][idx].end = e.target.value;
                                                                    setProfile({ ...profile, schedule: newSchedule });
                                                                }}
                                                                disabled={!editMode}
                                                                size="small"
                                                                sx={{ minWidth: 100 }}
                                                            />
                                                            {editMode && (
                                                                <IconButton size="small" color="error" onClick={() => {
                                                                    const newSchedule = { ...profile.schedule };
                                                                    newSchedule[day] = newSchedule[day].filter((_, i) => i !== idx);
                                                                    setProfile({ ...profile, schedule: newSchedule });
                                                                }}>
                                                                    <Delete fontSize="small" />
                                                                </IconButton>
                                                            )}
                                                            {editMode && idx === schedule.length - 1 && (
                                                                <IconButton size="small" color="primary" onClick={() => {
                                                                    const newSchedule = { ...profile.schedule };
                                                                    newSchedule[day] = [...(newSchedule[day] || []), { start: null, end: null }];
                                                                    setProfile({ ...profile, schedule: newSchedule });
                                                                }}>
                                                                    <Add fontSize="small" />
                                                                </IconButton>
                                                            )}
                                                        </Box>
                                                    ))
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
