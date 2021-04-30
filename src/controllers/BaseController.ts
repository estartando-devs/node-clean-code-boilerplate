import { IDatabase } from "@Interfaces";
import { Request, Response } from 'express'

export class BaseController<T> {
  constructor(private domain: IDatabase<T>) {}

  async save(request: Request, response: Response): Promise<Response> {
    const data = request.body;    
    const responseData = await this.domain.save(data);
    return response.status(200).json(responseData);
  }

  async getAll(request: Request, response: Response): Promise<Response> {
    const list = await this.domain.getAll();
    return response.status(200).json(list);
  }

  async getById(request: Request, response: Response): Promise<Response> {
    const { id  } = request.params
    const data = await this.domain.getById(id);
    return response.status(200).json(data);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const data = request.body
    const updatedData = await this.domain.update(id, data);
    return response.json(updatedData);
  }
  
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const _id = await this.domain.delete(id);
    return response.json(_id);
  }
}