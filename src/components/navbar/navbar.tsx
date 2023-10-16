import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {styled} from "@mui/material/styles";
import { useTheme } from '@mui/material/styles';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Logo from "./logo";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    alignItems: "center",
    padding: theme.spacing(2),
}));

/* The above code is a TypeScript React component that represents a Navbar. It is responsible for rendering the navigation
bar at the top of the page. */
const pages = ["services","why us?", "contact us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Navbar = () => {
    const [anchorElNav, setAnchorNav] = React.useState<null | HTMLElement>(
            null
    );
    const [anchorElUser, setAnchorUser] = React.useState<null | HTMLElement>(
        null
    );
    const [showShadow, setShowShadow] = React.useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 10) {
            setShowShadow(true);
        } else {
            setShowShadow(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    const theme = useTheme();

    const navigator = useNavigate();

    const handleLoginButton = () => {
        navigator("/login");
    };

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <AppBar sx={{
            background: "linear-gradient(90deg, #1F1F21 0%, #2A2A2E 100%)",
            color: "#F2F2F2",
            opacity: {md:0.98},
            position: {md:"fixed", xs:"relative"},
            borderRadius: {md:"20px"},
            height: "90px",
            width: {xs: "100%", md: "60%"},
            boxShadow: showShadow
                ? { md: "0px 4px 10px rgba(0, 0, 0, 0.25)" }
                : { md: "none" },
            zIndex: "10",
            margin: {md: "10px auto"},
            top: 0, left: 0, right: 0
        }}>
            <StyledToolbar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Logo
                            variant="h6"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                            children="GYMNASIUM"
                            iconDisplay={{display: {xs: "none", md: "flex"}}}
                            textDisplay={{display: {xs: "none", md: "flex"}}}
                        />
                        <Box sx={{flexGrow: 1, display: {xs: "flex", md: "flex"}, justifyContent: "center"}}>
                            <IconButton
                                sx={{
                                    display: {xs: "flex", md: "none"}
                                }}
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: "block", md: "flex"}, justifyContent: "center"
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Logo
                            variant="h5"
                            href=""
                            sx={{
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                justifyContent: "center",
                            }}
                            children="GYMNASIUM"
                            iconDisplay={{display: {xs: "flex", md: "none"}, mr: "10px"}}
                            textDisplay={{display: {xs: "flex", md: "none", mr: 1}}}
                        />
                        <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{my: 2, color: "inherit", display: "block"}}
                                    onClick={() => {
                                        const element = document.getElementById(page);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Button sx={{backgroundColor: theme.palette.primary.main, color:"white", fontFamily:"Lora", fontWeight: "700", justifyContent: "center", flexGrow: 1, display: {xs: "flex", md: "flex"}}}
                                         onClick={handleLoginButton}>Login</Button>
                    </Toolbar>
                </Container>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;
