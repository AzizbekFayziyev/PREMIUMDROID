import React from 'react';
import Slide from 'react-slick';
import { Button, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import { Container } from '@mui/system';
import { Share, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Slider() {
    const media = useMediaQuery('(max-width: 420px)');
    const games = [
        {
            id: "537104c3528",
            img: "https://thumbs2.imgbox.com/e8/5d/PTlldciV_t.jpg",
            title: "Critical Ops",
            subTitle: "Top rated first-person shooter",
        },
        {
            id: "232bcec6801",
            img: "https://thumbs2.imgbox.com/47/d6/7SuqmyLO_t.png",
            title: "Need for Speed™ No Limits",
            subTitle: "The new part of the legendary series of games from EA",
        },
        {
            id: "32bcec68013",
            img: "https://thumbs2.imgbox.com/fe/5a/gOFCZJ2C_t.jpg",
            title: "Plants Vs Zombies 2",
            subTitle: "Continuing the hit. Plants vs Zombies on android",
        },
        {
            id: "763eba63e81",
            img: "https://thumbs2.imgbox.com/60/95/kM6c9bfS_t.jpg",
            title: "Altos Odyssey",
            subTitle: "Continuation of atmospheric runner",
        },
        {
            id: "0e4c86b9353",
            img: "https://thumbs2.imgbox.com/1c/e1/qaxfvXNS_t.jpg",
            title: "Counter-Strike 1.6",
            subTitle: "The original Counter-Strike 1.6 is now on android",
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    const onShare = (title, url) => {
        try {
            navigator.share({
                title,
                url,
            })
        } catch {
            alert("Your browser not supported this function!")
        }
    };

    return (
        <>
            {games.length ?
                <Slide className='home-slider' {...settings}>
                    {games.map((app) => (
                        <div
                            className='home-slider__slide'
                            key={app.id}
                        >

                            <img
                                src={app.img}
                                alt={app.subTitle}
                            />

                            <Container maxWidth="xl">
                                <Typography
                                    className='home-slider__title'
                                    component="h1"
                                    fontWeight={500}
                                    maxWidth={700}
                                    color="white"
                                    variant={media ? "h4" : "h3"}
                                    gutterBottom
                                >
                                    {app.title}
                                </Typography>

                                <Typography
                                    maxWidth={600}
                                    fontWeight={400}
                                    color="white"
                                    variant={media ? "h6" : "h5"}
                                >
                                    {app.subTitle}
                                </Typography>

                                <Stack
                                    flexDirection="row"
                                    alignItems="center">

                                    <Button
                                        LinkComponent={Link}
                                        to={`/app/${app.id}`}
                                        color='secondary'
                                        sx={{ maxWidth: 180, mt: 3, mr: 2, fontWeight: 700, color: "white" }}
                                        variant="contained">
                                        <Visibility sx={{ mr: 0.5 }} /> View
                                    </Button>

                                    <Button
                                        onClick={() => onShare(app.title, `${window.location}app/${app.id}`)}
                                        sx={{ maxWidth: 180, mt: 3, fontWeight: 700, color: "white" }}
                                        variant="contained"
                                    >
                                        <Share sx={{ mr: 0.5 }} /> Share
                                    </Button>

                                </Stack>

                            </Container>

                        </div>
                    ))}
                </Slide> : <Skeleton animation="wave" sx={{ mt: -20, mb: -15 }} height={700} width="100%" />}
        </>
    )
}
