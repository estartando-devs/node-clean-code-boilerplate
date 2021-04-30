import { IDatabase, IUser } from "@Interfaces";
import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity<IUser>{
  constructor(db: IDatabase<IUser>) {
    super(db);
  }
}