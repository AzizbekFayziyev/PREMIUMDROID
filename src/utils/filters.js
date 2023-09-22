export const filterGames = (apps) => apps.filter((s) => {
    return s.type.toLowerCase().includes("game");
});

export const filterApps = (apps) => apps.filter((s) => {
    return s.type.toLowerCase().includes("app");
});

export const smilarApps = (apps, app) => apps.filter((s) => {
    return s.category.includes(app.category) && s.id !== app.id;
});

export const filterCategory = (apps, id) => apps.filter((s) => {
    return s.category.toLowerCase().includes(id);
});