import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom'
import AppContext from '../context/Context';
import Footer from './Footer'
import Navbar from './Navbar'
import Widgets from './Widgets';

export default function Layout() {
    const [theme, setTheme] = useState(true);

    const siteTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light",
            primary: {
                main: "#156CDD",
            },
            secondary: {
                main: "#00BF63"
            },
            background: {
                default: theme ? "#1b1b1d" : "#f8f8f8",
            },
            text: {
                primary: theme ? "#f8f8f8" : "#333333"
            }
        },
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            if (savedTheme === "dark") {
                setTheme(false)
            }
        }
    }, []);

    const value = {
        theme,
        setTheme,
        siteTheme
    };


    return (
        <AppContext.Provider value={value}>

            <ThemeProvider theme={siteTheme}>

                <Widgets />

                <Helmet>
                    <meta name='theme-color' content={siteTheme.palette.background.default} />
                </Helmet>

                <Box
                    className="site-bg"
                    minHeight="100vh"
                    bgcolor="background.default"
                >
                    <Navbar />
                    <Outlet />
                    <Footer />
                </Box>

            </ThemeProvider>

        </AppContext.Provider>
    )
}
