import React from 'react'
import Slider from '../components/Slider'
import Products from '../components/Products'
import { Helmet } from 'react-helmet-async'
import { Typography } from '@mui/material'
import gradients from '../utils/gradients'

export default function Home() {
    return (
        <>
            <Helmet>
                <title>PREMIUMDROID</title>
                <meta name="title" content="PREMIUMDROID" />
                <meta name="author" content="Avancoder" />
                <meta name="description" content="Free premium games and apps for android!" />
                <meta name="keywords"
                    content="premium games, premium apps, premiumdroid, vzlom apps, vzlom games, android games, mod games, mod apps, happymod, standoff 2, brawl stars, capcut, terraria, pubg, gta v android" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="PREMIUMDROID" />
                <meta property="og:description" content="Free premium games and apps for android!" />
                <meta property="og:url" content="https://premiumdroid.netlify.app/" />
            </Helmet>

            <marquee
                style={{
                    background: gradients[Math.floor(Math.random() * gradients.length)],
                    padding: "5px 0",
                    marginTop: "56px",
                    marginBottom: "-5px",

                }}>

                <Typography color="white" variant="h6" component="span">
                    PREMIUMDROID - Free premium, mod games and apps for android!
                </Typography>
            </marquee>

            <Slider />

            <Products />
        </>
    )
}
