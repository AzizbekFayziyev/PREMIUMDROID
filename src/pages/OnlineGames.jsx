import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Divider, FormControlLabel, FormGroup, Grid, InputAdornment, Switch, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '../components/Title';
import AppContext from '../context/Context';
import { Search } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tilt from 'react-vanilla-tilt';
import notFoundImg from "../images/auth.png";
import { useEffect } from 'react';

export default function OnlineGames() {
    const games = useSelector(state => state.onlineGames);
    const [limit, setLimit] = useState(30);
    const [onlyWeb, setOnlyWeb] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const platformQuery = searchParams.get("platform") || false;
    const [isLoading, setLoading] = useState(false);
    const media = useMediaQuery('(max-width: 740px)');
    const context = useContext(AppContext);

    const filteredGames = games.filter(s => {
        return s.title.toLowerCase().includes(searchQuery.toLowerCase())
            && s.platform.toLowerCase().includes(platformQuery === "true" ? "browser" : "");
    });

    const onSearch = useCallback((e) => {
        setSearchInput(e.target.value);
        setSearchParams({ search: e.target.value, platform: onlyWeb });
    }, [searchInput]);

    const onChangePlatform = (e) => {
        setOnlyWeb(e => !e);
        setSearchParams({ search: searchInput, platform: !onlyWeb });
    }

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setLimit(e => e + 30);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        if (platformQuery == "true") {
            setOnlyWeb(true);
        };
        setSearchInput(searchQuery);
    }, [])

    return (
        <>
            <Helmet>
                <title>ONLINE GAMES</title>
                <meta name="title" content="ONLINE GAMES" />
                <meta name="description" content="DISCOVER THE BEST ONLINE FREE TO PLAY PC AND WEB GAMES!" />
                <meta property="og:title" content="ONLINE FREE TO PLAY GAMES" />
                <meta property="og:description" content="DISCOVER THE BEST ONLINE FREE TO PLAY PC AND WEB GAMES!" />
                <meta name="keywords" content="online games, free to play games, android games online, web games, free gamas online, play games for free, online web games, pc games, pc online games, free to play premiumdroid, online games for free, play games for free online" />
                <meta property="og:url" content="https://premiumdroid.netlify.app/online/" />
            </Helmet>


            <div className="apps-header">
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    zIndex: 2,
                    transform: "translate(-50%,-50%)"
                }}>
                    <Typography
                        className='apps-header__text'
                        width={media ? "100%" : 700}
                        textAlign="center"
                        fontWeight={500}
                        color="white"
                        variant={media ? "h5" : "h3"}
                        component="h1"
                    >
                        DISCOVER THE BEST ONLINE FREE TO PLAY PC AND WEB GAMES!
                    </Typography>
                </div>

                <video autoPlay muted loop>
                    <source src="https://static.enlisted.net/i/lp/back.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div style={{ position: 'absolute', bottom: -10, left: 0, width: "100%" }}>
                    <svg fill={context.siteTheme.palette.background.default} width="100%" height="100%" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 74.63846153846151,159.05897435897435 149.27692307692303,118.11794871794874 220,138 C 290.723076923077,157.88205128205126 357.53076923076935,238.58717948717947 453,258 C 548.4692307692306,277.41282051282053 672.5999999999999,235.53333333333336 756,203 C 839.4000000000001,170.46666666666664 882.0692307692308,147.27948717948718 943,153 C 1003.9307692307692,158.72051282051282 1083.123076923077,193.34871794871793 1169,206 C 1254.876923076923,218.65128205128207 1347.4384615384615,209.32564102564103 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                </div>
            </div>
            <Container sx={{ pt: 10 }} maxWidth="xl">

                <Title>ONLINE GAMES ({games?.length})</Title>

                <TextField
                    value={searchInput}
                    onChange={onSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3, mt: -2, width: "100%" }}
                    color='secondary'
                    label='search'
                />

                <FormGroup sx={{ mb: 2 }}>
                    <FormControlLabel onChange={onChangePlatform} sx={{ color: "text.primary" }} control={<Switch checked={onlyWeb} />} label="ONLY WEB GAMES" />
                </FormGroup>

                <Grid
                    justifyContent="center"
                    container
                    spacing={2}
                >
                    {filteredGames.length ? games.length ? filteredGames.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).slice(0, limit).map((e) => (
                        <Grid xs={12} sm={6} md={4} lg={3} key={e.id} item>
                            <Tilt style={{ margin: 0, border: 0, padding: 0 }}>
                                <Card>
                                    <CardActionArea LinkComponent={Link} to={`/online/${e.id}`}>
                                        <CardMedia
                                            image={e.thumbnail}
                                            component='img'
                                            alt={e.title}
                                        />

                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                noWrap
                                            >
                                                {e.title}
                                            </Typography>

                                            <Divider sx={{ my: 1 }} />

                                            <Typography
                                                gutterBottom
                                                className='textScrollBar'
                                                sx={{
                                                    height: 75,
                                                    overflow: "auto",
                                                    pr: 1
                                                }}
                                                variant="body1"
                                            >
                                                {e.short_description}
                                            </Typography>

                                            <Typography
                                                fontWeight={500}
                                                sx={{ mt: 2 }}
                                                variant='subtitle1'
                                            >
                                                PLATFORM: {e.platform}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Tilt>
                        </Grid>
                    )) : (
                        <CircularProgress color='secondary' sx={{ mx: "auto", my: 5 }} />
                    ) : (
                        <div>
                            <img
                                style={{ height: media ? "auto" : "400px", width: !media ? "400px" : "100%", borderRadius: 30, margin: "10px auto", display: "block" }}
                                src={notFoundImg}
                                alt="not found image"
                            />

                            <Typography
                                color="error"
                                variant='h5'
                                component="span"
                                sx={{ m: 3, mx: "auto", wordBreak: "break-all" }}>
                                {searchInput} NOT FOUND ):
                            </Typography>
                        </div>
                    )}
                </Grid>

                {limit >= filteredGames.length ? "" : <Button
                    disabled={isLoading}
                    onClick={loadMore}
                    size="large"
                    sx={{ my: 2, mx: "auto", display: "block" }}
                    variant='contained'
                >
                    LOAD MORE
                </Button>}

            </Container>
        </>
    )
}
