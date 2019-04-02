import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'SooTube';
    res.locals.routes = routes;
    next();
}