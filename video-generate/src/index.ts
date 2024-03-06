import app from "./app";
import DB from "./config/db";

const port = process.env.PORT || 4000;

DB().then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
