import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './pages/Product';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import { useDispatch } from 'react-redux';
import { fetchingApps, fetchingComments, fetchingOnlineGames } from './redux/reucer';
import Games from './pages/Games';
import Apps from './pages/Apps';
import Contact from './pages/Contact';
import { get, onValue, ref } from 'firebase/database';
import { db, messaging } from './firebase/firebase';
import { getToken } from 'firebase/messaging';
import { commentsDb } from './firebase/firebase-comments';
import Categories from './pages/Categories';
import Category from './pages/Category';
import OnlineGames from './pages/OnlineGames';
import OnlineGame from './pages/OnlineGame';
import onlineGamesData from "./utils/onlineGames.json";
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  const dispatch = useDispatch();

  const requestPermission = async () => {
    const promission = await Notification.requestPermission();
    if (promission === "granted") {
      await getToken(messaging, { vapidKey: 'BMlYgUI5ygX0JjeRHTbkfJnk0njWD7FEQ2cW8-kZ2D3ufId0amuTr6KqPhsMoGBvXjfuq3i2BFE7o6-BfsZy6NI' });
    } else if (promission === "denied") {
      alert("You denied for the notification!")
    }
  }

  useEffect(() => {
    // Fetching comments
    onValue(ref(commentsDb), snapshot => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(fetchingComments(data));
      }
    })
    // Request to notification
    requestPermission()
    // Fetching data
    const request = async () => {
      const response = await get(ref(db));
      const data = await response.val();
      if (data !== null) {
        dispatch(fetchingApps(data))
      }
    }
    request();

    // Fetching online games
    dispatch(fetchingOnlineGames(onlineGamesData));

  }, []);

  return (
    <HelmetProvider>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='app/:id' element={<Product />} />
          <Route path="profile" element={<Profile />} />
          <Route path="games" element={<Games />} />
          <Route path="apps" element={<Apps />} />
          <Route path="contact" element={<Contact />} />
          <Route path="category" element={<Categories />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="online" element={<OnlineGames />} />
          <Route path="online/:id" element={<OnlineGame />} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
