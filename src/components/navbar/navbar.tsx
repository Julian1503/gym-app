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

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    alignItems: "center",
    padding: theme.spacing(2),
}));

const pages = ["Products", "Pricing", "About Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const Navbar = () => {
    const [anchorElNav, setAnchorNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorUser] = React.useState<null | HTMLElement>(
        null
    );
    const [isLogedIn, setLogedIn] = React.useState<boolean>(
        false
    );
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
    return (
        <AppBar sx={{
            background: '#1F1F21',
            color: "#F2F2F2",
            opacity: {md:0.9},
            position: {md:"fixed", xs:"relative"},
            borderRadius: {md:"20px"},
            height: "90px",
            width: {xs: "100%", md: "60%"},
            boxShadow: '2px 4px 8px rgba(0, 0, 0, 1)',
            zIndex: "1",
            margin: {md: "10px auto"},
        }}  style={{top: 0, left: 0, right: 0 }}>
            <StyledToolbar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: "none", md: "flex"},
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            GYMNASIUM
                        </Typography>
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
                        <Box sx={{flexGrow: 1,
                            justifyContent: "center", display: {xs: "flex", md: "none", mr: 1}}}>
                            <AdbIcon sx={{ mr: "10px" }}/>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
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
                            >
                                LOGO
                            </Typography>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: "inherit", display: "block"}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {isLogedIn ? <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box> : <Button sx={{backgroundColor: "#007F5F", fontWeight: "bold", justifyContent: "center", flexGrow: 1, display: {xs: "flex", md: "flex"}}}
                                         onClick={() => setLogedIn(true)}>Login</Button>}
                    </Toolbar>
                </Container>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;
