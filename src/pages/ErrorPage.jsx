import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import img from "../images/404.gif";

export default function ErrorPage() {

    return (
        <Container
            maxWidth="sm"
            sx={{ pt: 10, display: "grid", placeItems: "center", minHeight: "50vh" }}
        >
            <Helmet>
                <title>PAGE NOT FOUND!</title>
            </Helmet>

            <img
                alt='ERROR IMAGE'
                style={{ borderRadius: 5 }}
                width="100%"
                src={img} />

            <Typography
                component="h1"
                sx={{ mt: 1 }}
                variant="h4"
                color="error"
                textAlign="center"
                gutterBottom
            >
                ERROR 404. PAGE NOT FOUND!
            </Typography>

            <Button
                LinkComponent={Link}
                to="/"
                variant='outlined'
                color="secondary"
                size="large"
                sx={{ mt: 1 }}
            >
                Back to home
            </Button>
        </Container>
    )
}
