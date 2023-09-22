import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppCards from '../components/AppCards';
import { filterGames } from '../utils/filters';
import gamesImage from "../images/games-bg.jpg";

export default function Games() {
  return (
    <>
      <Helmet>
        <title>ANDROID GAMES</title>
        <meta name="title" content="ANDROID GAMES" />
        <meta name="description" content="Free premium games!" />
        <meta name="keywords" content="premium games, vzlom games, mod games, mod apk, android games, premiumdroid, free android games, pubg, minecraft, mod android games" />
        <meta property="og:title" content="ANDROID GAMES" />
        <meta property="og:description" content="Free premium android games!" />
        <meta property="og:url" content="https://premiumdroid.netlify.app/games/" />
      </Helmet>

      <AppCards
        bg={gamesImage}
        filter={filterGames}
        title="ANDROID GAMES"
      />
    </>
  )
}
