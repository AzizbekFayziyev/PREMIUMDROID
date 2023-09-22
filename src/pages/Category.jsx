import React from 'react';
import { filterCategory } from '../utils/filters';
import AppCards from '../components/AppCards';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import Breadcrumb from "@mui/material/Link";
import { Container } from '@mui/system';

export default function Category() {
    const { id } = useParams();

    return (
        <>
            <Helmet>
                <title>{id.toUpperCase()}</title>
                <meta name="title" content={id.toUpperCase()} />
                <meta name="description" content={`${id.toUpperCase()} APKS`} />
                <meta name="keywords" content={`${id} games, ${id} apps, premium ${id} apps, ${id} mod games, ${id}, ${id} apks, ${id} games for android, ${id} apps for android, premium games, vzlom games, mod games, mod apk, android games, premiumdroid, free android games, pubg, minecraft, mod android games`} />
                <meta property="og:title" content={id.toUpperCase()} />
                <meta property="og:description" content={`${id.toUpperCase()} APKS`} />
                <meta property="og:url" content={`https://premiumdroid.netlify.app/category/${id}`} />
            </Helmet>

            <Container sx={{ pt: 10, mb: -7 }} maxWidth="xl">
                <Breadcrumbs separator={<ArrowRight />} aria-label="breadcrumb">
                    <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/">
                        HOME
                    </Breadcrumb>
                    <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/category">
                        CATEGORY
                    </Breadcrumb>
                    <Typography color="text.primary">
                        {id.toUpperCase()}
                    </Typography>
                </Breadcrumbs>
            </Container>

            <AppCards
                isHeaderVisible={false}
                filter={filterCategory}
                title={id.toUpperCase()}
                filterId={id}
            />
        </>
    )
}
