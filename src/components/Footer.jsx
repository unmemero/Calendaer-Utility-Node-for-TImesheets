import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { GitHub, Email } from "@mui/icons-material";

export default function Footer() {
    return (
        <AppBar position="fixed" sx={{ top: "auto", bottom: 0, backgroundColor: "#000", boxShadow: "none" }}>
            <hr style={{ width: "100%", border: "none", borderTop: "1px solid #444", margin: 0 }} />
            <Toolbar sx={{ justifyContent: "center", flexDirection: "column", alignItems: "center", minHeight: 64 }}>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", mb: 1 }}>
                    <Link href="https://github.com/unmemero/Calendaer-Utility-Node-for-TImesheets" target="_blank" color="inherit" underline="none" sx={{ display: "flex", alignItems: "center" }}>
                        <GitHub sx={{ mr: 0.5 }} /> GitHub
                    </Link>
                    <Link href="mailto:support@example.com" color="inherit" underline="none" sx={{ display: "flex", alignItems: "center" }}>
                        <Email sx={{ mr: 0.5 }} /> Contact
                    </Link>
                </Box>
                <Typography variant="body2" sx={{ color: "#bbb", textAlign: "center" }}>
                    &copy; {new Date().getFullYear()} Timesheet Utility
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
