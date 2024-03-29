/* Middleware to reject the request if the user is not logged in */
import {Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

//Assuming this middleware is never run without the current-user middleware before
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if(!req.currentUser) {
        //User is trying to access route they do not have access to
        throw new NotAuthorizedError();
    }
    next();
}