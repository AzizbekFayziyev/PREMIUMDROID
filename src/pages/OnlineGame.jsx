import { ArrowRight, PlayArrow } from '@mui/icons-material';
import { Breadcrumbs, Button, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from "@mui/material/Link";
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

export default function OnlineGame() {
    const games = useSelector(state => state.onlineGames);
    const { id } = useParams();
    const filteredData = games.filter(s => s.id === +id);
    const game = filteredData[0];
    const media = useMediaQuery('(max-width: 420px)');

    return (
        <Container sx={{ pt: 10 }} maxWidth="xl">

            <Helmet>
                <title>{game?.title}</title>
                <meta name="title" content={game?.title} />
                <meta name="description" content={game?.short_description} />
                <meta property="og:title" content={game?.title} />
                <meta property="og:description" content={game?.short_description} />
                <meta name="keywords" content={`${game?.title}, ${game?.title} free play, ${game?.title} for pc, ${game?.title} mod, ${game?.title} download for pc, ${game?.title} play for free, ${game?.title} for android`} />
                <meta property="og:url" content={`https://premiumdroid.netlify.app/online/${id}`} />
            </Helmet>

            <Breadcrumbs separator={<ArrowRight />} sx={{ mb: 2 }} aria-label="breadcrumb">
                <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/">
                    HOME
                </Breadcrumb>
                <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/online">
                    ONLINE GAMES
                </Breadcrumb>
                <Typography color="text.primary">
                    {game?.title}
                </Typography>
            </Breadcrumbs>

            {game ? (
                <Stack
                    sx={{ mt: media ? 2 : 5 }}
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                >

                    <img
                        style={{ borderRadius: "8px" }}
                        src={game.thumbnail}
                        alt={game.title}
                        width={media && "100%"}
                    />

                    <Typography
                        component="h1"
                        sx={{ my: 1 }}
                        color="text.primary"
                        variant='h4'
                    >
                        {game.title} ({game.genre})
                    </Typography>

                    <Typography
                        component="h2"
                        sx={{ my: 1 }}
                        color="text.primary"
                        variant='h6'
                        maxWidth={450}
                    >
                        {game.short_description}
                    </Typography>

                    <Stack
                        sx={{ my: 1 }}
                        flexDirection="row"
                    >
                        <Typography
                            component="h3"
                            variant='h6'
                            color="text.secondary"
                            sx={{ mr: 4 }}
                        >
                            DEVELOPER: {game.developer}
                        </Typography>

                        <Typography
                            component="h3"
                            variant='h6'
                            color="text.secondary"
                        >
                            PLATFORM: {game.platform}
                        </Typography>
                    </Stack>

                    <Stack
                        sx={{ mb: 2 }}
                        flexDirection="row"
                    >
                        <Typography
                            component="h3"
                            variant='h6'
                            color="text.secondary"
                            sx={{ mr: 4 }}
                        >
                            PUBLISHER: {game.publisher}
                        </Typography>

                        <Typography
                            component="h3"
                            variant='h6'
                            color="text.secondary"
                        >
                            RELESE DATA: {game.release_date}
                        </Typography>
                    </Stack>

                    <Button
                        LinkComponent="a"
                        href={game.game_url}
                        target="_blank"
                        size="large"
                        sx={{ color: "white", my: 1 }}
                        color="secondary"
                        variant='contained'
                    >

                        FREE PLAY <PlayArrow />
                    </Button>

                </Stack>
            ) : (
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mt: media ? 2 : 5 }}
                >

                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width={media ? "100%" : 338}
                        height={200}
                    />

                    <Skeleton
                        sx={{ my: 1.5 }}
                        variant="text"
                        animation="wave"
                        width={media ? "100%" : 400}
                        height={28}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={media ? "100%" : 400}
                        height={28}
                    />

                    <Skeleton
                        sx={{ my: 1 }}
                        variant="text"
                        animation="wave"
                        width={media ? "100%" : 400}
                        height={28}
                    />

                    <Skeleton
                        variant="text"
                        animation="wave"
                        width={media ? 200 : 300}
                        height={28}
                    />

                    <Skeleton
                        sx={{ mt: 2 }}
                        variant="rounded"
                        animation="wave"
                        width={120}
                        height={40}
                    />

                </Stack>
            )}

        </Container>
    )
}
