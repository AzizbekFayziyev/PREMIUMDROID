import { Download, Search, Star } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress, Container, Grid, InputAdornment, Pagination, TextField, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { filterApps } from '../utils/filters';
import notFoundImg from "../images/auth.png";
import Tilt from 'react-vanilla-tilt';
import AppContext from '../context/Context';
import Title from './Title';

export default function AppCards({ filter = filterApps, title = "ANDROID APPS", bg, filterId, isHeaderVisible = true }) {
    const apps = useSelector(state => state.apps);
    const [searchInput, setSearchInput] = useState("");
    const media = useMediaQuery('(max-width: 740px)');
    const mediaSm = useMediaQuery('(max-width: 340px)');
    const context = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [perPage] = useState(14);
    const pageQuery = searchParams.get("page") || 1;
    const searchQuery = searchParams.get("search") || "";
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const currentIndex = apps.length && filter(apps, filterId).filter(e => e.title.toLowerCase().includes(searchInput.toLowerCase())).slice(firstIndex, lastIndex);

    const onChangePage = useCallback((e, count) => {
        setPage(count);
        setSearchParams({ page: count, search: searchQuery });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [page]);

    const onSearch = useCallback((e) => {
        setSearchInput(e.target.value);
        setSearchParams({ search: e.target.value });
        setPage(1);
    }, [searchInput])

    useEffect(() => {
        setPage(+pageQuery);
        setSearchInput(searchQuery);
    }, []);

    return (
        <>
            {isHeaderVisible && <div className="apps-header">
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
                        SPECIALLY FOR LOVERS OF MOD AND PREMIUM {title}!
                    </Typography>

                </div>

                <img src={bg} alt="Apps bg" />

                <div style={{ position: 'absolute', bottom: -10, left: 0, width: "100%" }}>
                    <svg fill={context.siteTheme.palette.background.default} width="100%" height="100%" viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 74.63846153846151,159.05897435897435 149.27692307692303,118.11794871794874 220,138 C 290.723076923077,157.88205128205126 357.53076923076935,238.58717948717947 453,258 C 548.4692307692306,277.41282051282053 672.5999999999999,235.53333333333336 756,203 C 839.4000000000001,170.46666666666664 882.0692307692308,147.27948717948718 943,153 C 1003.9307692307692,158.72051282051282 1083.123076923077,193.34871794871793 1169,206 C 1254.876923076923,218.65128205128207 1347.4384615384615,209.32564102564103 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                </div>
            </div>}


            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <Title>{title} ({filter(apps, filterId)?.length})</Title>
                <TextField
                    autoComplete='false'
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


                <Grid justifyContent="center" container spacing={media ? 1 : 2}>
                    {apps.length ? currentIndex.length ? currentIndex.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    }).map((e) => (
                        <Grid
                            key={e.id}
                            item
                            xs={6}
                            sm={4}
                            md={3}
                        >
                            <Tilt style={{ padding: 0, border: 0, margin: 0 }}>
                                <Card
                                    className='product-card'
                                    sx={{ display: "block", }}
                                    component={Link}
                                    to={`/app/${e.id}`}
                                    variant={context.theme ? "outlined" : "elevation"}
                                >

                                    <CardActionArea>
                                        <Stack minHeight={300} justifyContent="center">
                                            <CardMedia
                                                sx={{ width: media ? mediaSm ? "100px" : "135px" : "180px", borderRadius: "18px", mr: 1, mx: "auto", my: 2, minHeight: mediaSm ? "100px" : "135px" }}
                                                component="img"
                                                image={e.logo}
                                                alt={e.title}
                                            />

                                            <CardContent>
                                                <Typography
                                                    noWrap
                                                    variant={media ? "h6" : "h5"}
                                                    color="text.primary"
                                                    fontWeight={500}
                                                    gutterBottom
                                                >
                                                    {e.title}
                                                </Typography>

                                                <Typography
                                                    className='textScrollBar'
                                                    sx={{
                                                        wordBreak: "break-all",
                                                        mb: 2,
                                                        height: media ? 55 : 75,
                                                        overflow: "auto",
                                                        pr: 1
                                                    }}
                                                    variant="subtitle1"
                                                    color="text.secondary"
                                                >
                                                    {e.subTitle}
                                                </Typography>

                                                <Stack
                                                    sx={{ mt: 1 }}
                                                    flexDirection={media ? "column" : "row"}
                                                >

                                                    <Chip icon={<Star />} sx={{ mr: 1, width: "100%" }} label={e.advantage.toUpperCase()} />
                                                    <Chip icon={<Download />} sx={{ mt: media && 1, width: "100%" }} variant="outlined" label={e.size.toUpperCase()} />

                                                </Stack>
                                            </CardContent>
                                        </Stack>
                                    </CardActionArea>
                                </Card>
                            </Tilt>
                        </Grid>
                    )) : <div>
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
                        : <CircularProgress color='secondary' sx={{ mx: "auto", my: 5 }} />}
                </Grid>

                {filter(apps, filterId)?.length > perPage && (
                    <Pagination
                        sx={{ mt: 2 }}
                        defaultPage={1}
                        color="secondary"
                        variant="outlined"
                        page={page}
                        onChange={onChangePage}
                        count={Math.ceil(filter(apps).filter(e => e.title.toLowerCase().includes(searchInput.toLowerCase())).length / perPage)}
                    />
                )}

            </Container>
        </>
    )
}
