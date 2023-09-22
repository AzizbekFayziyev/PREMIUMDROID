import { AddReaction, Architecture, ArrowRight, Extension, Gamepad, Instagram, MoodBad, MyLocation, Park, Psychology, Public, QueryBuilder, School, Snowmobile, SportsBaseball, Star, VideogameAsset, Widgets, Wifi } from '@mui/icons-material';
import { Breadcrumbs, Container, List, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react';
import Title from '../components/Title';
import Breadcrumb from "@mui/material/Link";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import onlineGamesImg from "../images/online-games.jpg";

export default function Categories() {
    const media = useMediaQuery('(max-width: 420px)');
    const apps = useSelector(state => state.apps);
    const categories = {
        apps: [
            {
                title: "education",
                icon: School,
            },
            {
                title: "lifestyle",
                icon: Star,
            },
            {
                title: "social media",
                icon: Instagram,
            },
            {
                title: "tool",
                icon: Architecture,
            },
            {
                title: "widget",
                icon: Widgets,
            },
            {
                title: "game app",
                icon: Extension,
            },
            {
                title: "entertainment",
                icon: AddReaction,
            },
            {
                title: "network",
                icon: Wifi,
            },
        ],
        games: [
            {
                title: "arcade",
                icon: VideogameAsset,
            },
            {
                title: "sport",
                icon: SportsBaseball,
            },
            {
                title: "horror",
                icon: MoodBad,
            },
            {
                title: "shooter",
                icon: MyLocation,
            },
            {
                title: "open world",
                icon: Public,
            },
            {
                title: "strategy",
                icon: Psychology,
            },
            {
                title: "action",
                icon: Gamepad,
            },
            {
                title: "survival",
                icon: Park,
            },
            {
                title: "time killers",
                icon: QueryBuilder,
            }
        ]
    };

    return (
        <Container sx={{ pt: 10 }} maxWidth="xl">

            <Helmet>
                <title>CATEGORY</title>
                <meta name="title" content="CATEGORY" />
                <meta name="description" content="Game categories" />
                <meta property="og:title" content="APPS & GAMES CATEGORIES - PREMIUMDROID" />
                <meta property="og:description" content="Apps & games categories" />
                <meta name="keywords" content="game categories, app categories, social media apps, shooter games, open world games for android, strategy games, premiumdroid, apps & games for android, premium apps and games for android, mod games, mod apps" />
                <meta property="og:url" content="https://premiumdroid.netlify.app/category/" />
            </Helmet>


            <Breadcrumbs separator={<ArrowRight />} sx={{ mb: 2 }} aria-label="breadcrumb">
                <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/">
                    HOME
                </Breadcrumb>
                <Typography color="text.primary">
                    CATEGORY
                </Typography>
            </Breadcrumbs>

            <Title>Apps</Title>
            <List dense sx={{ mt: -3 }}>
                {categories.apps.map((e, id) => (
                    <ListItemButton
                        divider
                        component={Link}
                        to={`/category/${e.title}`}
                        key={id}
                    >

                        <ListItemIcon>{<e.icon fontSize='large' />}</ListItemIcon>

                        <ListItemText
                            primary={<Typography color="text.primary" variant='h6'>{e.title.toLocaleUpperCase()}</Typography>}
                            secondary={`${apps?.filter(s => s.category.toLowerCase().includes(e.title)).length} APPS`}
                        />

                        <ListItemSecondaryAction>
                            <ArrowRight fontSize='large' htmlColor='gray' />
                        </ListItemSecondaryAction>

                    </ListItemButton>
                ))}
            </List>

            <Title>Games</Title>
            <List dense sx={{ mt: -3 }}>
                {categories.games.map((e, id) => (
                    <ListItemButton
                        divider
                        component={Link}
                        to={`/category/${e.title}`}
                        key={id}
                    >

                        <ListItemIcon>{<e.icon fontSize='large' />}</ListItemIcon>

                        <ListItemText
                            primary={<Typography color="text.primary" variant='h6'>{e.title.toLocaleUpperCase()}</Typography>}
                            secondary={`${apps?.filter(s => s.category.toLowerCase().includes(e.title)).length} GAMES`}
                        />

                        <ListItemSecondaryAction>
                            <ArrowRight fontSize='large' htmlColor='gray' />
                        </ListItemSecondaryAction>

                    </ListItemButton>
                ))}
            </List>

            <Stack
                component={Link}
                to="/online"
                className="online-games"
            >
                <Typography
                    position="relative"
                    zIndex={2}
                    color="white"
                    component="h1"
                    variant={media ? "h4" : "h2"}
                    fontWeight={500}
                >
                    ONLINE GAMES
                </Typography>

                <img src={onlineGamesImg} alt="Online games" />
            </Stack>

        </Container>
    )
}
