import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, FormControlLabel, Checkbox, Paper, Grid, Button } from "@mui/material";
import { Person, Badge, Business, AssignmentInd, Work, Edit, Save, FileDownload, FileUpload } from "@mui/icons-material";
import "../styles/profile.scss";

const defaultProfile = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    employeeId: "",
    department: "",
    positionType: "",
    // Add more fields as needed
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

    return (
        <Box className="profile-page" sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h4" className="profile-title" sx={{ fontWeight: 700 }}>
                    <Person sx={{ mr: 1, verticalAlign: "middle" }} /> Profile
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" startIcon={<FileDownload />} onClick={handleExport} sx={{ mr: 1 }}>
                        Export
                    </Button>
                    <Button variant="outlined" startIcon={<FileUpload />} onClick={() => fileInputRef.current.click()} sx={{ mr: 1 }}>
                        Import
                    </Button>
                    <input type="file" accept=".json" ref={fileInputRef} style={{ display: "none" }} onChange={handleImport} />
                    {loaded && (
                        editMode ? (
                            <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSave}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="outlined" startIcon={<Edit />} onClick={handleEdit}>
                                Edit
                            </Button>
                        )
                    )}
                </Box>
            </Box>
            <Paper className="profile-section" sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Personal Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="First Name" fullWidth value={profile.firstName} onChange={handleChange("firstName")} disabled={!editMode} InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Last Name" fullWidth value={profile.lastName} onChange={handleChange("lastName")} disabled={!editMode} InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Middle Initial" fullWidth value={profile.middleInitial} onChange={handleChange("middleInitial")} disabled={!editMode} InputProps={{ startAdornment: <Badge sx={{ mr: 1 }} /> }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Employee ID" fullWidth value={profile.employeeId} onChange={handleChange("employeeId")} disabled={!editMode} InputProps={{ startAdornment: <AssignmentInd sx={{ mr: 1 }} /> }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Department" fullWidth value={profile.department} onChange={handleChange("department")} disabled={!editMode} InputProps={{ startAdornment: <Business sx={{ mr: 1 }} /> }} />
                    </Grid>
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
