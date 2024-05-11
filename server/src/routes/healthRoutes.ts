import { Express } from "express";

/**
 * Sets up the server health route.
 * 
 * @param {Express} app - The Express app instance.
 */
export const healthRoutes = (app: Express) => {
    app.get('/', (_req, res) => {
        res.status(200).send('Server is running');
    });
};