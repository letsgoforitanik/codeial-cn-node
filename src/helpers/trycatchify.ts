import { Express, NextFunction, Request, Response, Router } from 'express';


function trycatchifyRouter(router: Router) {
    const routerStack = router.stack;

    for (const layer of routerStack) {

        if (layer.name === 'router') {
            const router = layer.handle as Router;
            trycatchifyRouter(router);
        }

        if (layer.route && layer.route.path) {
            const route = layer.route;
            const routeHandler = route.stack[0].handle;

            route.stack[0].handle = function (req: Request, res: Response, next: NextFunction) {
                Promise.resolve().then(() => routeHandler(req, res, next)).catch(next);
            };
        }

    }
}


export default function trycatchify(app: Express) {
    trycatchifyRouter(app._router);
}