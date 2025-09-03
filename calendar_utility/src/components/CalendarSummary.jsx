import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function CalendarSummary({ regular, overtime }) {
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
