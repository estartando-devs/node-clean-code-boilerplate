import { Request, Response } from "express";
import { IdProviderAdapter } from "@Adapters";
import { User } from "@Domain";
import { IUser, IDatabase } from "@Interfaces";
import { BaseController } from "./BaseController";

export class UserController<IDProvider extends IdProviderAdapter> implements BaseController<IUser>{
  private UserDomain: User<IDProvider>
  constructor(
    private dbAdapter: IDatabase<IUser>,
    idProvider: IDProvider
  ) { 
    this.UserDomain = new User(idProvider);
  }
  
  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const user = this.UserDomain.create(data)  
    return response.status(200).json(user);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const list = await this.dbAdapter.getAll();
    return response.status(200).json(list);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id  } = request.params
    const data = await this.dbAdapter.getById(id);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body
    const updatedData = await this.dbAdapter.update(id, data);
    return response.json(updatedData);
  }
  
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const _id = await this.dbAdapter.delete(id);
    return response.json(_id);
  }
}