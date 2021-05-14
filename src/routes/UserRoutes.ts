import { Request, Response, Router } from "express";
import { FirestoreAdapter, IdProviderAdapter } from "@Adapters";
import { UserController } from "@Controllers";
import { IIdProvider, IUser } from "@Interfaces";


class UserRoutes<IDProvider extends IIdProvider> {
  private userController: UserController<IDProvider>
  constructor(
    dbAdapter = new FirestoreAdapter<IUser>('users'),
    idProvider = new IdProviderAdapter(),
    private userRouter = Router()
  ) {    
    this.userController = new UserController(dbAdapter, idProvider)
  }

  execute() {
    this.userRouter.post('/users', (request: Request, response: Response) => {
      this.userController.save(request, response)
    })

    this.userRouter.get('/users', (request: Request, response: Response) => {
      this.userController.getAll(request, response)
    })

    this.userRouter.get('/users/:id', (request: Request, response: Response) => {
      this.userController.getById(request, response)
    })

    this.userRouter.put('/users/:id', (request: Request, response: Response) => {
      this.userController.update(request, response)
    })
    
    this.userRouter.delete('/users/:id', (request: Request, response: Response) => {
      this.userController.delete(request, response)
    })

    return this.userRouter
  }
}

export const userRoutes = new UserRoutes().execute()