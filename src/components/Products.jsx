import { ArrowRightAlt, Bookmark, CalendarMonth, Download, PhoneAndroid } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Grid, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppContext from '../context/Context';
import { filterApps, filterGames } from '../utils/filters';
import Title from './Title';
import Tilt from 'react-vanilla-tilt';

export default function Products() {
    const apps = useSelector(state => state.apps);

    return (
        <Container maxWidth="xl">
            <Title>Latest Games</Title>

            <Cards data={filterGames(apps)} />
            <Button to="/games" LinkComponent={Link} size='large' sx={{ mt: 1.5 }} variant="contained">All games <ArrowRightAlt /></Button>
            <Title>Latest Apps</Title>
            <Cards data={filterApps(apps)} />
            <Button to="/apps" LinkComponent={Link} size='large' sx={{ mt: 1.5 }} variant="contained">All apps <ArrowRightAlt /></Button>
        </Container>
    )
};

export const Cards = ({ data }) => {
    const context = useContext(AppContext);
    const sceleton = new Array(5).fill(" ");

    return (
        <Grid container spacing={2.3}>
            {data.length ?
                data.slice(0, 13).sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                }).map((app) => (
                    <Grid
                        key={app.id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        xl={3}
                    >
                        <Tilt style={{ padding: 0, border: 0, margin: 0 }}>
                            <Card
                                variant={context.theme ? "outlined" : "elevation"}
                                sx={{ display: "block", }}
                                component={Link}
                                to={`/app/${app.id}`}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        width={200}
                                        component="img"
                                        image={app.logo}
                                        alt={app.title}
                                    />

                                    <CardContent>
                                        <Typography component="h2" noWrap fontWeight={600} variant="h6" gutterBottom>{app.title}</Typography>
                                        <Typography component="p" height={50} textOverflow="hidden" fontWeight={400} variant="subtitle1" gutterBottom>{app.subTitle.slice(0, 80)}...</Typography>

                                        <Stack flexDirection="row" alignItems="center" >
                                            <Typography variant="subtitle1" sx={{ width: 140, display: "flex", alignItems: "center", mt: 3, mr: 2, }} noWrap gutterBottom><CalendarMonth sx={{ mr: 1 }} /> {app.date || app.updated}</Typography>
                                            <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", mt: 3 }} gutterBottom><Download sx={{ mr: 1 }} /> {app.size}</Typography>
                                        </Stack>

                                        <Stack flexDirection="row" alignItems="center" >
                                            <Typography variant="subtitle1" sx={{ width: 140, display: "flex", alignItems: "center", mt: 1.5, mr: 2 }} gutterBottom><PhoneAndroid sx={{ mr: 1 }} /> {app.version}</Typography>
                                            <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center", mt: 1.5 }} gutterBottom><Bookmark sx={{ mr: 1 }} /> {app.advantage.toUpperCase()}</Typography>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Tilt>
                    </Grid>
                ))
                : <Container fixed>
                    <Grid container spacing={2.3}>
                        {sceleton.map((e, id) => (
                            <Grid
                                key={id}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                xl={3}>

                                <Card variant={context.theme ? "outlined" : "elevation"}>
                                    <Skeleton animation="wave" variant="rectangular" width="100%" height={200} />
                                    <Skeleton animation="wave" variant='text' sx={{ my: 1, mx: 0.5 }} />
                                    <Skeleton animation="wave" variant='text' sx={{ my: 1, mx: 0.5 }} />
                                    <Skeleton animation="wave" variant='text' sx={{ my: 1, mx: 0.5 }} />
                                    <Skeleton animation="wave" width="60%" variant='text' sx={{ my: 1, mx: 0.5 }} />
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                </Container>
            }
        </Grid>
    )
}

// <CircularProgress color='secondary' sx={{ my: 3, mx: "auto" }} />