import { IDatabase } from "@Interfaces";

export class TestAdapter<T> implements IDatabase<T> {
  dataBase: Array<T> = []

  async save(data: T): Promise<T> {
    try {
      this.dataBase.push(data)
      return data;
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<T[] | Error> {
    try {
      const list: T[] = this.dataBase;
      
      return list;
    } catch (error) {
      return error;
    }
  }

  async getById(id: string): Promise<T | Error> {
    const data: T | Error = this.dataBase[0]

    return data;
  }

  async update(id: string, newData: T): Promise<T | Error> {

    return newData;
  }

  async delete(id: string): Promise<string | Error> {
    return id;
  }
}