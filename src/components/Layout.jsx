import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/global.scss";
import "../styles/layout.scss";

export default function Layout() {
    return (
        <Box className="layout-bg">
            <Header />
            <Box component="main" className="layout-main">
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}
