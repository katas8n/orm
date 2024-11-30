import { app } from "./app.js";
import { AppDataSource } from "./config/data-source.js";
AppDataSource.initialize()
    .then(() => {
    console.log("Database has been initialized.");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch(error => {
    console.error("Error during Data Source initialization:", error);
});
