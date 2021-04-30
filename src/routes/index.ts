import { TestAdapter, FirestoreAdapter } from "@Adapters";
import { UserController } from "@Controllers";
import { IUser } from "@Interfaces";
import {Request, Response, Router} from "express";

const testAdapter = new TestAdapter<IUser>()
const firestoreAdapter = new FirestoreAdapter<IUser>('users')

const userController = new UserController(firestoreAdapter)

const UserRouters = Router();

UserRouters.get('/users', (request, response) => {
  userController.getAll(request, response)
})

UserRouters.get('/users/:id', (request, response) => {
  userController.getById(request, response)
})

UserRouters.post('/users', (request: Request, response: Response) => {
  console.log(request.body);
  userController.save(request, response)
})


export {UserRouters}