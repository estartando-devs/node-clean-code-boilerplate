import { IDatabase } from "@Interfaces";

export class BaseEntity<T> {
  constructor(private db: IDatabase<T>) {}

  save(entity: T): Promise<T | Error> {
    return this.db.save(entity);
  }

  getAll(): Promise<T[] | Error> {
    return this.db.getAll();
  }

  getById(id: string): Promise<T | Error> {
    return this.db.getById(id);
  }

  update(id: string, data: T): Promise<T | Error> {
    return this.db.update(id, data);
  }

  delete(id: string): Promise<string | Error> {
    return this.db.delete(id);
  }
}