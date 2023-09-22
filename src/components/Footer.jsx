import { AccountBox, Favorite, Games, Newspaper, OnlinePrediction, Phone } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/Context';

export default function Footer() {
    const context = useContext(AppContext);

    const links = [
        {
            title: "About Us",
            to: "/about",
            icon: <Newspaper sx={{ mr: 1 }} />,
        },
        {
            title: "Contact",
            to: "/contact",
            icon: <Phone sx={{ mr: 1 }} />,
        },
        {
            title: "Profile",
            to: "/profile",
            icon: <AccountBox sx={{ mr: 1 }} />,
        },
        {
            title: "Pc games",
            to: "/online",
            icon: <Games sx={{ mr: 1 }} />,
        },
        {
            title: "Online games",
            to: "/online?search=&platform=true",
            icon: <OnlinePrediction sx={{ mr: 1 }} />,
        }
    ]

    return (
        <footer
            style={{ background: context.theme ? "" : context.siteTheme.palette.primary.main }}
        >
            <div className="custom-shape-divider-top-1676986455">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path style={{ fill: context.siteTheme.palette.background.default }} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
            </div>

            <Stack
                zIndex={2}
                sx={{ my: 2, pb: 1, pt: 10, borderBottom: "1px solid #fff", width: "100%" }}
                flexDirection={"row"}
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
            >

                {links.map((e, id) => (
                    <Button
                        sx={{ mx: 0.5, my: 1, color: "#fff", fontSize: "medium" }}
                        to={e.to}
                        key={id}
                        underline='hover'
                        component={Link}
                    >
                        {e.icon} {e.title}
                    </Button>
                ))}
            </Stack>

            <Typography zIndex={2} variant="h5" color="white" gutterBottom>CREATED BY <a target="_blank" style={{color: "#fff", borderBottom: "1px solid #dddddd"}} href="https://avancoder.netlify.app">AVANCODER</a></Typography>

            <Typography zIndex={2} color="white" variant="h5">&copy;PREMIUM<span style={{ color: !context.theme ? "" : context.siteTheme.palette.secondary.main }}>DROID</span> VERSION 0.0.1</Typography>
        </footer>
    )
}
