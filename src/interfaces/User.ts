import { IAddress } from "./Address";

export interface IUser {
  id?: string;
  name: string;
  dateBirth?: Date;
  email: string;
  imgSrc?: string;
  address?: IAddress;
}