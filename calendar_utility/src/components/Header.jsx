import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { AccountCircle, CalendarMonth } from "@mui/icons-material";
import logo from "../assets/logo.png"; // Import PNG as image

export default function Calendar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#111", boxShadow: "none" }}>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <img src={logo} alt="Logo" style={{ height: 32, marginRight: 12 }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 1, color: "#fff" }}>
                        Timesheet Information
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton component={Link} to="/profile" color="inherit">
                        <AccountCircle sx={{ mr: 1 }} />
                        <Typography variant="body1" sx={{ color: "#fff" }}>Profile</Typography>
                    </IconButton>
                    <IconButton component={Link} to="/calendar" color="inherit">
                        <CalendarMonth sx={{ mr: 1 }} />
                        <Typography variant="body1" sx={{ color: "#fff" }}>Calendar</Typography>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}