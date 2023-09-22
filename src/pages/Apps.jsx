import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppCards from '../components/AppCards';
import appsImage from "../images/apps-bg.jpg";

export default function Apps() {
    return (
        <>
            <Helmet>
                <title>ANDROID APPS</title>
                <meta name="title" content="ANDROID APPS" />
                <meta name="description" content="Free premium android apps" />
                <meta name="keywords" content="premium apps, vzlom apps, mod apps, mod apk, android apps, premiumdroid, free android apps, telegram, youtube, mod android apps" />
                <meta property="og:title" content="ANDROID APPS" />
                <meta property="og:description" content="Free premium android apps!" />
                <meta property="og:url" content="https://premiumdroid.netlify.app/apps/" />
            </Helmet>

            <AppCards bg={appsImage} />
        </>
    )
}
