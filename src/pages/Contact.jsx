import { Alert, Breadcrumbs, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Title from '../components/Title';
import Breadcrumb from "@mui/material/Link";
import { ArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import $ from 'jquery';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
    const { isAuthenticated, user } = useAuth0();
    const [verifed, setVerifed] = useState(false);
    const [snackBar, setSnackBar] = useState(false);

    const sendMessage = (e) => {
        e.preventDefault();
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.telegram.org/bot" + import.meta.env.VITE_TELEGRAM_BOT_ID + "/sendMessage",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            "data": JSON.stringify({
                "chat_id": import.meta.env.VITE_CHAT_ID,
                "text":
                    `\n CONTACT
                     \n User name: ${e.target.name.value}
                     \n User email: ${e.target.email.value}
                     \n User telegram: ${e.target.telegram.value}
                     \n User message: ${e.target.message.value}
                     \n Page: ${window.location.href}
                    `
            })
        };
        $.ajax(settings).done(function () {
            setSnackBar(true);
            navigator.vibrate([800]);
            e.target.reset()
        });
    }

    function onVerifed() {
        setVerifed(true);
    }

    return (
        <Container maxWidth="xl" sx={{ pt: 10 }}>

            <Helmet>
                <title>CONTACT US</title>
                <meta name="title" content="CONTACT US" />
                <meta name="description" content="Contact form for contact us" />
                <meta name="keywords" content="Contact us, premiumdroid, contact form, contact premiumdroid, contact premiumdroid, contact form for premiumdroid" />
                <meta property="og:title" content="CONTACT US - PREMIUMDROID" />
                <meta property="og:title" content="Contact form for contact us" />
                <meta property="og:url" content="https://premiumdroid.netlify.app/contact/" />
            </Helmet>

            <Breadcrumbs separator={<ArrowRight />} aria-label="breadcrumb">
                <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/">
                    HOME
                </Breadcrumb>
                <Typography color="text.primary">
                    CONTACT
                </Typography>
            </Breadcrumbs>

            <Title>Contact Us</Title>

            <form
                onSubmit={sendMessage}
                autoComplete="off"
                style={{ maxWidth: "850px", margin: "auto" }}
            >

                <TextField
                    sx={{ mb: 1, width: "100%" }}
                    defaultValue={isAuthenticated ? user?.name : ""}
                    required
                    color="secondary"
                    label="Name"
                    name="name"
                />

                <TextField
                    sx={{ my: 1, width: "100%" }}
                    defaultValue={isAuthenticated ? user?.email : ""}
                    required
                    color="secondary"
                    type="email"
                    label="Email"
                    name="email"
                />

                <TextField
                    sx={{ my: 1, width: "100%" }}
                    color="secondary"
                    label="Telegram username"
                    name="telegram"
                />

                <TextField
                    multiline
                    sx={{ my: 1, width: "100%" }}
                    required
                    color="secondary"
                    label="Message"
                    name="message"
                />

                <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
                    onChange={onVerifed}
                />

                <Button
                    sx={{ mt: 2 }}
                    color="secondary"
                    type="submit"
                    variant="outlined"
                    disabled={!verifed}
                >
                    Submit
                </Button>

            </form>

            <Snackbar
                open={snackBar}
                autoHideDuration={5000}
                onClose={() => setSnackBar(false)}
            >
                <Alert>Message successful sended!</Alert>
            </Snackbar>
        </Container>
    )
}
