import { InstallMobile, KeyboardDoubleArrowUp, Search, Share } from "@mui/icons-material";
import { Alert, Autocomplete, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, Divider, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Widgets() {
    const { pathname } = useLocation();
    const media = useMediaQuery('(max-width: 550px)');
    let [deferredPrompt, setDeferredPrompt] = useState(null);
    const apps = useSelector(state => state.apps);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchRes, setSearchRes] = useState("");
    const [snackBar, setSnackBar] = useState(false);

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
    });

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    const installApp = async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    };

    const onShare = () => {
        try {
            navigator.share({
                title: "PREMIUMDROID",
                url: window.location.href
            })
        } catch {
            setSnackBar(true);
            navigator.vibrate([1000]);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const actions = [
        { icon: <KeyboardDoubleArrowUp />, name: 'Up', click: scrollTop },
        { icon: <Share />, name: 'Share', click: onShare },
        { icon: <Search />, name: 'Search', click: () => setSearchOpen(true) },
        { icon: <InstallMobile />, name: 'Install App', click: installApp, installBtn: "true" },
    ];

    return (
        <>
            <Dialog open={isSearchOpen} onClose={() => setSearchOpen(false)}>
                <DialogContent>
                    <Typography
                        component="span"
                        variant="h6"
                    >
                        Search...
                    </Typography>

                    <Autocomplete
                        onChange={(e, val) => setSearchRes(val)}
                        sx={{ width: media ? "100%" : 500, minWidth: 240, mt: 2 }}
                        getOptionLabel={e => `${e.title}, ${e.size}, ${e.advantage}`}
                        options={apps.length && apps}
                        renderInput={(props) => <TextField
                            variant="filled"
                            label="App or game name"
                            {...props}
                            color="secondary"
                        />}
                    />

                    {searchRes &&
                        <Card sx={{ mt: 2 }}>
                            <CardMedia
                                component="img"
                                image={searchRes.logo}
                                alt={searchRes.logo}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{searchRes.title}</Typography>
                                <Typography variant="subtitle1" gutterBottom>{searchRes.subTitle}</Typography>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Button
                                    onClick={() => setSearchOpen(false)}
                                    size="large"
                                    color="secondary"
                                    to={`/app/${searchRes.id}`}
                                    component={Link}
                                >
                                    DOWNLOAD
                                </Button>
                            </CardActions>
                        </Card>}
                </DialogContent>
            </Dialog>

            <SpeedDial FabProps={{
                sx: {
                    bgcolor: "primary.main",
                    '&:hover': {
                        bgcolor: 'primary.dark',
                    }
                }
            }}
                ariaLabel="Widgets"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon sx={{ transform: "scale(1.3)" }} />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        className={action.installBtn && "installBtn"}
                        onClick={action.click}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>

            <Snackbar
                open={snackBar}
                autoHideDuration={5000}
                onClose={() => setSnackBar(false)}
            >
                <Alert severity="info">Your browser not supported this function!</Alert>
            </Snackbar>
        </>
    )
}