import { useAuth0 } from '@auth0/auth0-react';
import { Description, BookmarkAddOutlined, Category, DateRange, Download, Share, Star, Update, ArrowCircleRight, SecurityUpdate, Bookmark, Android, ArrowRight, Info, Delete, Visibility, Close, Telegram, Chat, Image, ListAlt, Settings, Search, } from '@mui/icons-material';
import { Alert, AlertTitle, Avatar, Breadcrumbs, Button, ButtonGroup, CardActionArea, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Skeleton, Snackbar, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBookmark, selectedApp } from '../redux/reucer';
import gradients from '../utils/gradients.js';
import { smilarApps } from '../utils/filters';
import Breadcrumb from "@mui/material/Link";
import { Helmet } from 'react-helmet-async';
import $ from 'jquery';
import { get, ref, remove, set } from 'firebase/database';
import { db } from '../firebase/firebase';
import { commentsDb } from '../firebase/firebase-comments';
import { uid } from 'uid';
import Title from "../components/Title";
import youTubeImage from "../images/youtube.jpg";
import googlePlayImage from "../images/google-play.jpg";

export default function Product() {
    const { id } = useParams("");
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated } = useAuth0();
    // Drawer
    const [drawer, setDrawer] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    // media queries
    const media = useMediaQuery('(max-width:620px)');
    const mediaLg = useMediaQuery('(max-width:1120px)');
    // Image viewer
    const [modal, setModal] = useState(false);
    const images = [
        selector.app.length && selector.app[0].screenShots.screen1,
        selector.app.length && selector.app[0].screenShots.screen2,
        selector.app.length && selector.app[0].screenShots.screen3,
        selector.app.length && selector.app[0].background,
    ];
    // Snackbar
    const [snackBar, setSnackBar] = useState(false);
    const [snacbarTitle, setSnackBarTitle] = useState("Snackbar");
    const [snackBarMode, setSnackBarMode] = useState("success");
    // Comments
    const [commentText, setcommentText] = useState("");
    // App infos
    const appInfo = [
        {
            title: "SIZE",
            icon: Download,
            info: selector.app[0]?.size
        },
        {
            title: "REQUIRED OS",
            icon: Android,
            info: selector.app[0]?.os
        },
        {
            title: "ADVANTAGE",
            icon: Star,
            info: selector.app[0]?.advantage
        },
        {
            title: "DATE",
            icon: DateRange,
            info: selector.app[0]?.updated || selector.app[0]?.date
        },
        {
            title: "CATEGORY",
            icon: Category,
            info: selector.app[0]?.category
        },
        {
            title: "TYPE",
            icon: Settings,
            info: selector.app[0]?.type
        },
        {
            title: "VERSION",
            icon: Info,
            info: selector.app[0]?.version
        },
    ];

    const addingComment = (e) => {
        e.preventDefault();
        const uuid = uid();
        if (isAuthenticated && commentText.length > 0) {
            set(ref(commentsDb, `/${uuid}`), {
                id: uuid,
                gameId: id,
                userId: isAuthenticated && user.sub,
                message: commentText,
                user: isAuthenticated && user.name,
                userEmail: isAuthenticated && user.email,
                userImage: isAuthenticated && user.picture,
                date: new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
            });
            setcommentText("");
        } else if (!isAuthenticated) {
            setSnackBarMode("error");
            setSnackBarTitle("You must register to post a comment!");
            setSnackBar(true);
            navigator.vibrate([800]);
        }
    };

    const deletingComment = (id) => {
        remove(ref(commentsDb, `/${id}`));
    }

    const toggleUserInfo = (user) => {
        setUserInfo({
            user: user.user,
            userEmail: user.userEmail,
            userImage: user.userImage,
            message: user.message,
        });

        setDrawer(true);
    };

    useEffect(() => {
        setLoading(true);
        // Fetching app
        get(ref(db, `/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(selectedApp([snapshot.val()]));
                setLoading(false);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, [id]);

    // Toggle bookmark
    const toggleBookmark = () => {
        if (isAuthenticated) {
            dispatch(addToBookmark(selector.app[0]));
        } else {
            setSnackBarMode("error");
            setSnackBarTitle("You are not registered!");
            setSnackBar(true);
        }
    }

    // Share app
    const onShare = () => {
        try {
            navigator.share({
                title: selector.app.length && selector.app[0].title,
                url: window.location.href
            })
        } catch {
            setSnackBarMode("info");
            setSnackBarTitle("Your browser not supported this function!");
            setSnackBar(true);
            navigator.vibrate([1000]);
        }
    };

    // Sending update request
    const sendUpdateRequest = () => {
        if (isAuthenticated) {
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.telegram.org/bot" + import.meta.env.VITE_TELEGRAM_BOT_ID + "/sendMessage",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                },
                "data": JSON.stringify({
                    "chat_id": import.meta.env.VITE_CHAT_ID,
                    "text":
                        `\n REQUEST TO UPDATE: ${selector.app.length && selector.app[0].title}
                         \n User name: ${user.name}
                         \n User email: ${user.email}
                         \n Page: ${window.location.href}
                        `
                })
            };
            $.ajax(settings).done(function () {
                setSnackBarMode("success");
                setSnackBarTitle("Request successful sended!");
                setSnackBar(true);
                navigator.vibrate([800]);
            });
        } else {
            setSnackBarMode("error");
            setSnackBarTitle("You are not registered!");
            setSnackBar(true);
            navigator.vibrate([1000]);
        }

        setModal(false);
    };

    //  Styles
    const bgStyles = useCallback({
        background: gradients[Math.floor(Math.random() * gradients.length)],
        width: "100%",
        height: media ? "260px" : "400px",
        position: "relative",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
    }, [media, id]);

    const imageStyles = {
        borderRadius: 10,
        width: "100%",
        height: selector.app.length && media ? selector.app[0].type.toLowerCase() == "game" ? "200px" : media ? "200px" : "500px" : "500px",
        marginRight: "10px",
        objectFit: "cover",
        cursor: "pointer",
    };

    return (
        <>
            {!loading && selector.app.length ? (
                <>
                    <Helmet>
                        <title>{selector.app[0].title.toUpperCase()}</title>
                        <link rel="icon" type="image/png" href={selector.app[0].logo} />
                        <link rel="shortcut icon" href={selector.app[0].logo} type="image/x-icon" />
                        <meta name="title" content={selector.app[0].title.toUpperCase()} />
                        <meta name="description" content={selector.app[0].subTitle} />
                        <meta name="keywords" content={`download ${selector.app[0].title}, ${selector.app[0].title}, ${selector.app[0].title} premium, ${selector.app[0].title} mod, ${selector.app[0].title} download for android, ${selector.app[0].title} mod download for android, ${selector.app[0].title} unlimited coins, ${selector.app[0].title} ${selector.app[0].advantage}, download ${selector.app[0].title} for android free, skachat ${selector.app[0].title} dlya android, ${selector.app[0].title} vzlom dlya android, premiumdroid`} />
                        <meta property="og:image" content={selector.app[0].logo} />
                        <meta property="og:title" content={selector.app[0].title.toUpperCase()} />
                        <meta property="og:description" content={selector.app[0].subTitle} />
                        <meta property="og:url" content={`https://premiumdroid.netlify.app/app/${id}`} />
                    </Helmet>

                    <div className='product-bg' style={bgStyles}>

                        <Breadcrumbs
                            separator={<ArrowRight htmlColor='white' />}
                            sx={{
                                position: "absolute",
                                zIndex: 2,
                                left: 20,
                                top: media ? 65 : 80,
                            }}
                            aria-label="breadcrumb"
                        >
                            <Breadcrumb color="white" component={Link} underline='hover' to="/">
                                HOME
                            </Breadcrumb>
                            <Breadcrumb color="white" component={Link} underline='hover' to={selector.app[0].type.toLowerCase() === "game" ? "/games" : "/apps"}>
                                {selector.app[0].type.toUpperCase()}S
                            </Breadcrumb>
                            <Breadcrumb color="white" component={Link} underline='hover' to={`/category/${selector.app[0].category}`}>
                                {selector.app[0].category.toUpperCase()}
                            </Breadcrumb>
                        </Breadcrumbs>

                        {selector.app[0].type.toLowerCase() === "game" &&
                            <img
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                    objectFit: "cover",

                                }}
                                src={selector.app[0].background || selector.app[0].screenShots.screen1}
                                alt="background image"
                            />}

                        <Stack flexDirection="row" alignItems="center" sx={{ position: "absolute", left: 30, bottom: "10%", zIndex: 2 }}>
                            <img className='product-bg__logo' src={selector.app[0].logo} alt={selector.app[0].title} />
                            <div>
                                <Typography color="white" fontWeight={500} variant={media ? "h6" : "h3"}>{selector.app[0].title}</Typography>
                                <Typography sx={{ mr: 2 }} width={media ? "auto" : 400} color="white" fontWeight={400} variant={media ? "subtitle2" : "h6"} gutterBottom>{selector.app[0].subTitle}</Typography>
                            </div>
                        </Stack>

                    </div>
                    <Container maxWidth="xl">


                        <Stack
                            sx={{ mt: 3 }}
                            className="textScrollBar"
                            overflow="auto"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="center"
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                            {appInfo.slice(0, media ? 3 : 6).map((e, id) => (
                                <Tooltip
                                    key={id}
                                    arrow
                                    title={e.title}
                                >
                                    <Typography
                                        sx={{
                                            mx: 2.5,
                                            display: "flex",
                                            alignItems: "center",
                                            whiteSpace: "nowrap",
                                            flexDirection: media ? "column" : "row"
                                        }}
                                        variant="h6"
                                        color="text.primary"
                                        fontWeight={550}
                                    >
                                        <e.icon
                                            sx={{ mr: 0.5 }}
                                        />
                                        {e.info.toUpperCase()}
                                    </Typography>
                                </Tooltip>
                            ))}
                        </Stack>



                        <div className="textScrollBar" style={{ textAlign: "center", overflow: "auto", margin: "25px 0" }}>
                            <ButtonGroup size={media ? "medium" : "large"} variant='contained'>
                                <Button
                                    sx={{ color: "white" }}
                                    onClick={() => window.open(selector.app[0].download, "_blank")}
                                    color="secondary">
                                    <Download sx={{ mr: 0.5 }} /> Download
                                </Button>

                                <Button
                                    onClick={onShare}
                                    sx={{ color: "white" }}>
                                    <Share sx={{ mr: 0.5 }} />
                                    {!media && "Share"}
                                </Button>

                                <Button
                                    onClick={() => setModal(true)} sx={{ color: "white" }}>
                                    <Update sx={{ mr: 0.5 }} />{!media && "Update request"}
                                </Button>

                                <Button
                                    onClick={toggleBookmark}
                                    sx={{ color: "white" }}>
                                    {selector.bookmarks.find(e => selector.app[0].id === e.id) ? <Bookmark sx={{ mr: 0.5 }} /> : <BookmarkAddOutlined sx={{ mr: 0.5 }} />} {!media && "Bookmark"}
                                </Button>
                            </ButtonGroup>
                        </div>

                        <Title
                            mt={3}
                            mb={1.5}
                            variant={media ? "h6" : "h5"}
                        >
                            <Stack
                                flexDirection="row"
                                alignItems="center"
                            >
                                <Image sx={{ mr: 0.5 }} /> SCREENSHOTS
                            </Stack>
                        </Title>

                        <Stack flexDirection={!mediaLg && "row"}>
                            <div>
                                <Stack sx={{ pb: 0.8 }} className="textScrollBar" overflow="auto" flexDirection="row" alignItems="center" justifyContent="space-between" >
                                    {images.map((src, id) => (
                                        <img
                                            onClick={() => window.open(src, "_blank")}
                                            key={id}
                                            style={imageStyles}
                                            src={src}
                                            alt={`Screenshot ${id + 1}`}
                                        />
                                    ))}
                                </Stack>

                                <Title
                                    mt={3}
                                    mb={1.5}
                                    variant={media ? "h6" : "h5"}
                                >
                                    <Stack
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <Chat sx={{ mr: 0.5 }} /> DESCRIPTION
                                    </Stack>
                                </Title>

                                <Typography
                                    sx={{ height: !showFullDesc ? 161 : "auto", overflow: "hidden" }}
                                    lineHeight={2}
                                    variant="subtitle1"
                                    fontWeight={450}
                                    color="text.primary"
                                >
                                    {selector.app[0].desc}
                                </Typography>

                                <Button
                                    sx={{ my: 1 }}
                                    size="small"
                                    color="secondary"
                                    onClick={() => setShowFullDesc(e => !e)}
                                >
                                    <Description sx={{ mr: 0.5, pb: 0.4 }} /> {showFullDesc ? "Hide" : "Full"} description
                                </Button>


                                {selector.app[0].descMod &&
                                    <Alert severity="info" sx={{ mt: 1 }}>
                                        <AlertTitle>MOD INFO</AlertTitle>
                                        <Typography
                                            color="text.primary"
                                            variant='h6'
                                            gutterBottom
                                        >
                                            {selector.app[0].descMod}
                                        </Typography>
                                    </Alert>}

                                <Title
                                    mt={3}
                                    mb={1.5}
                                    variant={media ? "h6" : "h5"}
                                >
                                    <Stack
                                        flexDirection="row"
                                        alignItems="center"
                                    >
                                        <ListAlt sx={{ mr: 0.5 }} /> {selector.app[0].type.toUpperCase()} INFO
                                    </Stack>
                                </Title>

                                <List>
                                    {appInfo.reverse().map((e, id) => (
                                        <ListItemButton sx={{ cursor: "default" }} key={id} divider disableTouchRipple>
                                            <ListItemIcon sx={{ mr: -3 }}><e.icon /></ListItemIcon>
                                            <ListItemText sx={{ color: "text.primary", width: "50%" }} primary={<Typography sx={{ fontWeight: 500, mr: 1 }}>{e.title}</Typography>} />
                                            <ListItemText sx={{ color: "text.primary", width: "50%" }} primary={e.info.toUpperCase()} />
                                        </ListItemButton>
                                    ))}
                                </List>

                                <Title
                                    mt={3}
                                    mb={1.5}
                                    variant={media ? "h6" : "h5"}
                                >
                                    SEARCH FROM
                                </Title>

                                <Stack flexDirection={media ? "column" : "row"} alignItems="center">
                                    <CardActionArea
                                        sx={{ width: "200px", m: 0.5 }}
                                        LinkComponent="a"
                                        href={`https://www.youtube.com/results?search_query=${selector.app[0].title} android review`}
                                        target="_blank"
                                    >

                                        <img
                                            style={{ objectFit: "cover" }}
                                            width="100%"
                                            height={60}
                                            src={youTubeImage}
                                            alt="youtube image"
                                        />
                                    </CardActionArea>

                                    <CardActionArea
                                        sx={{ width: "200px", m: 0.5 }}
                                        LinkComponent="a"
                                        href={`https://play.google.com/store/search?q=${selector.app[0].title}&c=apps`}
                                        target="_blank"
                                    >

                                        <img
                                            style={{ objectFit: "cover" }}
                                            width="100%"
                                            height={60}
                                            src={googlePlayImage}
                                            alt="google play image"
                                        />
                                    </CardActionArea>
                                </Stack>

                                <List sx={{ my: 3, border: "1px solid", borderColor: "text.primary" }} subheader={
                                    <ListSubheader sx={{ p: 2 }}>
                                        <Typography color="text.primary" variant="h5"><SecurityUpdate sx={{ mb: -0.5 }} /> How to install {selector.app[0].title}</Typography>
                                    </ListSubheader>
                                }>
                                    <ListItemButton divider onClick={() => window.open(selector.app[0].download, "_blank")}>
                                        <ListItemIcon sx={{ mr: -3 }}><ArrowCircleRight /></ListItemIcon>
                                        <ListItemText sx={{ color: "text.primary" }} primary="Download apk file." />
                                    </ListItemButton>
                                    <ListItem divider>
                                        <ListItemText sx={{ color: "text.primary" }} primary="Open your Android device's file explorer app." />
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText sx={{ color: "text.primary" }} primary="Locate your APK file in your file explorer app and select it." />
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText sx={{ color: "text.primary" }} primary="The APK installer menu will appear tap Install." />
                                    </ListItem>
                                    <ListItem divider>
                                        <ListItemText sx={{ color: "text.primary" }} primary="Allow time for the app to install." />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText sx={{ color: "text.primary" }} primary="Tap Done or Open once the installation is complete." />
                                    </ListItem>
                                </List>

                                <div style={{ marginTop: "40px" }}>
                                    <Stack
                                        onSubmit={addingComment}
                                        component="form"
                                        height={55}
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="center"
                                    >

                                        <TextField
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Tooltip title="Post comment">
                                                            <IconButton type="submit">
                                                                <Telegram />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={commentText}
                                            onChange={(e) => setcommentText(e.target.value)}
                                            sx={{ width: "100%" }}
                                            label="comment"
                                        />
                                    </Stack>
                                    <List>
                                        {
                                            selector.comments.filter(s => s.gameId === id).length ?
                                                selector.comments.filter(s => s.gameId === id).sort((a, b) => new Date(b.date) - new Date(a.date)).map(comment => (
                                                    <ListItemButton disableTouchRipple sx={{ cursor: "default" }} key={comment.id}>
                                                        <ListItemAvatar><Avatar src={comment.userImage} /></ListItemAvatar>
                                                        <ListItemText sx={{ color: "text.primary" }} primary={comment.message} secondary={comment.date} />
                                                        {isAuthenticated && comment.userId === user.sub ?
                                                            <ListItemSecondaryAction sx={{ alignItems: "flex-start" }}>
                                                                <Tooltip title="Delete comment" arrow>
                                                                    <IconButton onClick={() => deletingComment(comment.id)}>
                                                                        <Delete />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ListItemSecondaryAction>
                                                            :
                                                            <ListItemSecondaryAction sx={{ alignItems: "flex-start" }}>
                                                                <Tooltip title="View user profile" arrow>
                                                                    <IconButton onClick={() => toggleUserInfo(comment)}>
                                                                        <Visibility />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </ListItemSecondaryAction>}
                                                    </ListItemButton>
                                                )) : <Typography
                                                    sx={{ my: 1 }}
                                                    textAlign="center"
                                                    color="text.secondary"
                                                    variant='h6'>
                                                    Write the first comment!
                                                </Typography>}
                                    </List>

                                    <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
                                        {userInfo && <div style={{ width: media ? "100vw" : "400px" }}>
                                            <ListSubheader
                                                sx={{ fontSize: "large", display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                                <span>COMMENT INFO</span> <IconButton onClick={() => setDrawer(false)}><Close /></IconButton>
                                            </ListSubheader>
                                            <Container maxWidth="xl">
                                                <img style={{ borderRadius: "50%", margin: "20px 0" }} src={userInfo.userImage} alt={userInfo.user} />
                                                <Typography variant="h6" gutterBottom><b>Full name:</b> {userInfo.user}</Typography>
                                                <Typography variant="h6" gutterBottom><b>Email address:</b> {userInfo.userEmail}</Typography>
                                                <Typography variant="h6" gutterBottom><b>Comment:</b> {userInfo.message}</Typography>
                                            </Container>
                                        </div>}
                                    </Drawer>
                                </div>

                            </div>

                            {selector.apps.length && smilarApps(selector.apps, selector.app[0]).length ? <div style={{ minWidth: "400px", marginLeft: media ? 0 : "25px" }}>
                                <Title
                                    mt={2}
                                    mb={0}
                                    variant={media ? "h6" : "h5"}
                                >
                                    SMILAR APPS
                                </Title>
                                <List>
                                    {smilarApps(selector.apps, selector.app[0]).slice(0, 10).map((e) => (
                                        <Link to={`/app/${e.id}`}>
                                            <ListItemButton disableGutters disableTouchRipple key={e.id}>
                                                <ListItemAvatar sx={{ pl: 1 }}><Avatar alt={e.title} src={e.logo} /></ListItemAvatar>
                                                <ListItemText sx={{ color: "text.primary" }} primary={e.title.slice(0, 20)} secondary={`${e.subTitle.slice(0, 35)}...`} />
                                            </ListItemButton>
                                        </Link>
                                    ))}
                                </List>
                            </div> : ""}
                        </Stack>

                        <Snackbar

                            open={snackBar}
                            autoHideDuration={5000}
                            onClose={() => setSnackBar(false)}
                        >
                            <Alert severity={snackBarMode}>{snacbarTitle}</Alert>
                        </Snackbar>
                    </Container>
                </>
            ) : <Container fixed sx={{ pt: 10 }}>
                <Skeleton sx={{ mb: 1 }} variant="rounded" width="100%" height={200} animation="wave" />
                <Skeleton sx={{ mb: 1 }} variant="text" width="100%" height={20} animation="wave" />
                <Skeleton sx={{ mb: 1 }} variant="text" width="100%" height={20} animation="wave" />
                <Skeleton sx={{ mb: 1 }} variant="text" width="100%" height={20} animation="wave" />
                <Skeleton sx={{ mb: 1 }} variant="text" width="80%" height={20} animation="wave" />
                <Stack sx={{ my: 2 }} flexDirection="row" alignItems="center">
                    <Skeleton sx={{ mb: 1, mr: 2 }} variant="rectangular" width="100%" height={200} animation="wave" />
                    <Skeleton sx={{ mb: 1, mr: 2 }} variant="rectangular" width="100%" height={200} animation="wave" />
                    <Skeleton sx={{ mb: 1 }} variant="rectangular" width="100%" height={200} animation="wave" />
                </Stack>
                <Skeleton sx={{ mb: 1 }} variant="text" width="100%" height={20} animation="wave" />
                <Skeleton sx={{ mb: 1 }} variant="text" width="60%" height={20} animation="wave" />
                <Skeleton sx={{ mt: 2 }} variant="rectangular" width="100%" height={250} animation="wave" />
            </Container>
            }
            <Dialog open={modal} onClose={() => setModal(false)}>
                <DialogTitle>Is the app version out of date?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If the app version is out of date, please let us know and we will review and update this app.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModal(false)} color="error">Close</Button>
                    <Button variant='contained' onClick={sendUpdateRequest} color="primary">Notify</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
