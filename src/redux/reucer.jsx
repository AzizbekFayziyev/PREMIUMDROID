import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apps: [],
    app: [],
    bookmarks: [],
    comments: [],
    onlineGames: [],
}

const appReducer = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchingApps(state, action) {
            state.apps = [];
            Object.values(action.payload).map(e => state.apps.push(e));
            const savedBookmaks = localStorage.getItem("bookmarks");
            if (savedBookmaks) {
                state.bookmarks = JSON.parse(savedBookmaks);
            }
        },
        selectedApp(state, action) {
            state.app = action.payload
        },
        addToBookmark(state, action) {
            const findApp = state.bookmarks.find(e => action.payload.id === e.id);
            if (!findApp) {
                state.bookmarks.push({
                    id: action.payload.id,
                    logo: action.payload.logo,
                    link: `/app/${action.payload.id}`,
                    title: action.payload.title,
                });
                state.bookmarks.sort((a, b) => b.id - a.id);
            } else {
                state.bookmarks = state.bookmarks.filter(s => {
                    return s.id !== action.payload.id
                });
            }
            localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
        },
        fetchingComments(state, action) {
            state.comments = [];
            Object.values(action.payload).map(e => state.comments.push(e));
        },
        fetchingOnlineGames(state, action) {
            state.onlineGames = action.payload;
        }
    }
});

export const { fetchingApps, selectedApp, addToBookmark, fetchingComments, fetchingOnlineGames } = appReducer.actions;
export default appReducer.reducer;