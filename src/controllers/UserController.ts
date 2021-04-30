import { User } from "@Domain";
import { IUser, IDatabase } from "@Interfaces";
import { BaseController } from "./BaseController";

export class UserController extends BaseController<IUser>{
  constructor(dbAdapter: IDatabase<IUser>){
    const user = new User(dbAdapter);
    super(user);
  }
}