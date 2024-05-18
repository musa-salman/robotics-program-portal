import { NextFunction, Request, Response } from "express";

/**
 * Middleware to handle 404 Not Found errors.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Express middleware for handling errors.
 *
 * @param {Error} error - The error object.
 * @param {Request} _req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The Express next function.
 */
const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};

export { notFound, errorHandler };