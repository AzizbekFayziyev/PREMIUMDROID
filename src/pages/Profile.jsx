import { useAuth0 } from '@auth0/auth0-react'
import { AccountBox, AlternateEmail, ArrowRight, Bookmark, Bookmarks, Comment, Devices, LocationCity, Logout, Visibility } from '@mui/icons-material';
import { Alert, AlertTitle, Avatar, Breadcrumbs, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Typography, useMediaQuery } from '@mui/material'
import React, { useCallback } from 'react';
import Breadcrumb from "@mui/material/Link";
import { Link } from 'react-router-dom';
import authImage from "../images/auth.png";
import gradients from '../utils/gradients.js';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { addToBookmark } from '../redux/reucer';
import { Helmet } from 'react-helmet-async';

export default function Profile() {
    const { user, isAuthenticated, logout, loginWithPopup } = useAuth0();
    const media = useMediaQuery('(max-width: 420px)');
    const bookmarks = useSelector(state => state.bookmarks);
    const comments = useSelector(state => state.comments);
    const dispatch = useDispatch();

    const profileBgStyles = useCallback({
        background: gradients[Math.floor(Math.random() * gradients.length)],
        width: "100%",
        height: media ? "180px" : "240px",
        position: "relative",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    }, []);


    return (
        <Container sx={{ pt: 10 }} maxWidth="xl">
            <Helmet>
                <title>PROFILE</title>
                <meta name="description" content="My profile" />
                <meta name="og:description" content="My profile" />
            </Helmet>

            <Breadcrumbs separator={<ArrowRight />} sx={{ mb: 2 }} aria-label="breadcrumb">
                <Breadcrumb color="text.secondary" component={Link} underline='hover' to="/">
                    HOME
                </Breadcrumb>
                <Typography color="text.primary">
                    PROFILE
                </Typography>
            </Breadcrumbs>
            {isAuthenticated ?
                <>
                    <div
                        style={profileBgStyles}
                    >
                        <Avatar
                            sx={{ width: 120, height: 120, mb: 2, position: "absolute", left: "20px", bottom: "-70px" }}
                            src={user.picture}
                            alt={user.name}
                        />
                    </div>



                    <Typography sx={{ mt: 8 }} variant="h3" color="text.primary" gutterBottom>{user.name}</Typography>
                    {user.nickname && (
                        <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5" color="text.primary" gutterBottom><AccountBox sx={{ mr: 0.8 }} /> {user.nickname}</Typography>
                    )}
                    {user.email && (
                        <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5" color="text.primary" gutterBottom><AlternateEmail sx={{ mr: 0.8 }} /> {user.email}</Typography>
                    )}
                    {user.location && (
                        <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5" color="text.primary" gutterBottom><LocationCity sx={{ mr: 0.8 }} /> {user.location}</Typography>
                    )}
                    <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5" color="text.primary" gutterBottom><Devices sx={{ mr: 0.8 }} /> {navigator.platform && navigator.platform}</Typography>
                    <Button color="error" sx={{ mt: 2 }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} variant='contained'><Logout sx={{ mr: 0.5 }} /> Log out</Button>
                    <Title><Bookmarks /> Bookmarks</Title>
                    <List sx={{ mt: -5 }}>
                        {bookmarks && bookmarks.length ? bookmarks.map((app) => (
                            <ListItemButton disableTouchRipple sx={{ py: 2, my: 1, cursor: "default" }}>
                                <ListItemAvatar><Avatar src={app.logo} /></ListItemAvatar>
                                <ListItemText sx={{ mr: 2 }} primary={
                                    <Typography variant="h5" component="span" color="text.primary">{app.title}</Typography>
                                } />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => dispatch(addToBookmark(app))}><Bookmark /></IconButton>
                                    <IconButton to={`/app/${app.id}`} LinkComponent={Link}><Visibility /></IconButton>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                        )) : <Alert sx={{ mt: 2 }} severity="info"><AlertTitle>You have no saved apps!</AlertTitle></Alert>}
                    </List>
                    <Title><Comment /> Comments</Title>
                    <List sx={{ mt: -5 }}>
                        {comments
                            &&
                            comments.filter(s => s.userEmail == user.email).length
                            ?
                            comments.filter(s => s.userEmail == user.email).map((comment) => (
                                <ListItemButton disableTouchRipple sx={{ py: 1, my: 1, cursor: "default" }}>
                                    <ListItemAvatar><Avatar src={comment.userImage} /></ListItemAvatar>
                                    <ListItemText sx={{ mr: 2 }} secondary={comment.date} primary={
                                        <Typography variant="h5" component="span" color="text.primary">{comment.message}</Typography>
                                    } />
                                    <ListItemSecondaryAction>
                                        <IconButton to={`/app/${comment.gameId}`} LinkComponent={Link}><Visibility /></IconButton>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            )) : <Alert sx={{ mt: 2 }} severity="info"><AlertTitle>You have not commented yet!</AlertTitle></Alert>}
                    </List>
                </>
                :
                <>
                    <img
                        style={{ height: media ? "auto" : "400px", width: !media ? "400px" : "100%", borderRadius: 30, margin: "10px auto", display: "block" }}
                        src={authImage} alt="no registred image"
                    />

                    <Typography sx={{ my: 2, textAlign: "center" }} color="text.primary" variant='h4' gutterBottom>
                        You are not registered!
                    </Typography>

                    <Button onClick={() => loginWithPopup()} sx={{ mx: "auto", display: "block", color: "white" }} variant="contained" color="secondary">Sign up</Button>
                </>
            }
        </Container >
    )
}
