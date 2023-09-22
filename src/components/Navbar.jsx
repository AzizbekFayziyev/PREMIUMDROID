import React, { useState } from 'react';
import { AppBar, Avatar, Button, Card, CardActionArea, Container, Drawer, Grid, IconButton, ListSubheader, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Apps, Category, Close, DarkMode, Games, Home, LightMode, Login, Public } from '@mui/icons-material';
import MenuIcon from "@mui/icons-material/Menu"
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../context/Context';
import logo from "../../public/logo.png";
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
    const media = useMediaQuery('(max-width: 920px)');
    const verySmallPhone = useMediaQuery(`(max-width: 320px)`)
    const { loginWithPopup, isAuthenticated, user } = useAuth0();
    const [menuActive, setMenuActive] = useState(false);
    const context = useContext(AppContext);

    const menuItems = [
        {
            title: "Home",
            link: "/",
            icon: Home,
        },
        {
            title: "Games",
            link: "/games",
            icon: Games,
        },
        {
            title: "Apps",
            link: "/apps",
            icon: Apps,
        },
        {
            title: "Category",
            link: "/category",
            icon: Category,
        },
        {
            title: "Online games",
            link: "/online",
            icon: Public,
        }
    ];

    const toggleMenu = () => {
        setMenuActive(true);
    };

    const toggleTheme = () => {
        context.setTheme(e => !e);
        localStorage.setItem("theme", context.siteTheme.palette.mode);
    }


    return (
        <>
            <AppBar
                className='navbar'
                position="fixed"
                color={context.theme ? "transparent" : "primary"}
                sx={{ boxShadow: "none" }}
            >

                <Toolbar>

                    <Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-between">

                        <Stack alignItems="center" flexDirection="row">
                            {media && (
                                <Tooltip arrow title="Menu">
                                    <IconButton onClick={toggleMenu} edge="start" size="large">
                                        <MenuIcon fontSize='large' htmlColor='white' />
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Typography
                                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                component={NavLink}
                                to="/"
                                className='navbar__logo'
                                fontWeight={500}
                                color="white"
                                variant={media ? "h6" : 'h5'}
                            >
                                <img
                                    width={media ? 30 : 35}
                                    height={media ? 30 : 35}
                                    src={logo}
                                    alt="premiumdroid logo"
                                />
                                {!verySmallPhone && <>
                                    PREMIUM<span style={{ color: context.theme ? context.siteTheme.palette.secondary.main : "" }}>DROID</span>
                                </>}
                            </Typography>

                        </Stack>

                        {!media && (
                            <Box>
                                {menuItems.map((e, id) => (
                                    <Button
                                        sx={{ mr: 0.3, color: "#fff", textTransform: "capitalize" }}
                                        className='navbar__btn'
                                        startIcon={<e.icon htmlColor='white' />}
                                        key={id}
                                        component={NavLink}
                                        to={e.link}
                                        variant="text"
                                    >
                                        <Typography
                                            className='navbar__link'
                                            color="white"
                                            fontWeight={500}
                                        >
                                            {e.title}
                                        </Typography>
                                    </Button>
                                ))}
                            </Box>
                        )}

                        <Box>
                            <Tooltip title={context.theme ? "Light mode" : "Dark mode"} arrow>
                                <IconButton
                                    onClick={toggleTheme}
                                    sx={{ mr: media ? -0.5 : 0.5 }}
                                    edge="end"
                                    size='large'
                                >
                                    {context.theme ? (
                                        <LightMode htmlColor='white' />
                                    ) : (
                                        <DarkMode htmlColor='white' />
                                    )}
                                </IconButton>
                            </Tooltip>

                            {isAuthenticated ? (
                                <Tooltip title="Profile" arrow>
                                    <IconButton LinkComponent={Link} to="/profile" edge="end">
                                        <Avatar alt='profile' src={user.picture} />
                                    </IconButton>
                                </Tooltip>

                            ) : (
                                <Tooltip title="Login" arrow>
                                    <IconButton onClick={() => loginWithPopup()} edge="end" size='large'>
                                        <Login htmlColor='white' />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>

                    </Stack>

                </Toolbar>

            </AppBar>

            <Drawer
                className={context.theme && 'navbar-menu'}
                open={menuActive}
                onClose={() => setMenuActive(false)}
            >
                <ListSubheader
                    sx={{ fontSize: "large", display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                    <span>MENU</span> <IconButton onClick={() => setMenuActive(false)}><Close /></IconButton>
                </ListSubheader>

                <Container sx={{ overflowX: "hidden", pb: 3 }} fixed>
                    <Grid
                        sx={{ mt: 1 }}
                        container
                        spacing={1.5}
                    >
                        {menuItems.map((e, id) => (
                            <Grid
                                item
                                xs={6}
                                sx={{ textAlign: "center" }}
                                key={id}
                            >
                                <Card
                                    onClick={() => setTimeout(() => setMenuActive(false), 300)}
                                    variant="outlined"
                                    to={e.link}
                                    component={NavLink}
                                    sx={{ display: "block" }}
                                >
                                    <CardActionArea sx={{ py: 2.5, px: 0.5, width: "100%" }}>
                                        <IconButton disableRipple color='text.primary'>{<e.icon fontSize='large' />}</IconButton>
                                        <Typography
                                            className={context.theme && "navbar-menu__link"}
                                            variant="h5"
                                        >
                                            {e.title}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Drawer>
        </>
    )
}
