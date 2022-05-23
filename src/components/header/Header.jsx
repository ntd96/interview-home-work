import { AppBar, Grid, IconButton, Toolbar, Typography, Menu, MenuItem, Avatar, Box } from "@mui/material"
import { Container } from "@mui/system"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import './Header.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {

    const [openListMenu, setOpenListMenu] = useState(null); // Tạo state đóng mở list Menu
    const [openListMenuOut, setOpenListMenuOut] = useState(null); // Tạo state đóng mở list Menu

    let navigate = useNavigate(); // Tạo navigate

    // Sự kiện Open Login ListMenu
    const handleClick = (event) => {
        setOpenListMenu(event.currentTarget);

    };
    // Sự kiện Open Logout ListMenu
    const handleClickOut = (event) => {
        setOpenListMenuOut(event.currentTarget);
    };

    // Sự kiện thoát ra ngoài ListMenu
    const handleClose = () => {
        setOpenListMenu(null);
        setOpenListMenuOut(null);
    };
    // Sự kiện Click Login
    const onLoginClick = () => {
        navigate('/login')
    }

    // Sự kiện Click Logout
    const onLogoutClick = () => {
        setUser(null)
        navigate('/')
    }

    return (
        <AppBar position="static" className="appbar">
            <Container maxWidth='xl'>
                {/* Logo */}
                <Grid container className="header_" >
                    <Link to='/'>
                        <img
                            src={require('../../asset/images/logo/logo.jpg')}
                            alt='Logo'
                            className="header_logo"
                        />
                    </Link>
                    <Typography className="header_textlogo"> Bloger </Typography>
                    {
                        user ?
                            <Toolbar>
                                <div className="header_name">
                                    <Typography> {user.data[0].name} </Typography>
                                    <IconButton
                                        onClick={handleClickOut}>
                                        <Avatar sx={{ background: 'Black' }}> Z </Avatar>
                                    </IconButton>
                                    <Menu
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        anchorEl={openListMenuOut}
                                        open={Boolean(openListMenuOut)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={onLogoutClick}>
                                            <LogoutIcon /> &ensp;Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </Toolbar>
                            :
                            <Toolbar>
                                <div>
                                    <IconButton
                                        onClick={handleClick}
                                    >
                                        <AccountCircleRoundedIcon sx={{ fontSize: 30 }} />
                                    </IconButton>
                                    <Menu
                                        anchorEl={openListMenu}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(openListMenu)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={onLoginClick}>
                                            <LoginIcon /> &ensp;Login
                                        </MenuItem>
                                        <Link to='/signup' style={{ color: ' black' }}>
                                            <MenuItem >
                                                <AppRegistrationIcon /> &ensp;Đăng kí
                                            </MenuItem>
                                        </Link>
                                    </Menu>
                                </div>
                            </Toolbar>

                    }
                </Grid>
            </Container>
        </AppBar>
    )
}

export default Header