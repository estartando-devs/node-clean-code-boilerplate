import { IDatabase } from "@Interfaces";
import * as dataBase from "firebase-admin";
import 'dotenv/config'
// const  serviceAccount = require('../../serviceAccountKey.json')

dataBase.initializeApp({
  credential: dataBase.credential.cert({
    projectId: process.env.APP_PROJECT_ID,
    privateKey: process.env.APP_PRIVATE_KEY,
    clientEmail: process.env.APP_CLIENT_EMAIL,
  } /* or serviceAccount */),
  databaseURL: process.env.APP_DATABASE_URL
});

const basePath = "/root_collection/document";

export class FirestoreAdapter<T> implements IDatabase<T> {
  constructor(private path: string) {}
  async save(data: T): Promise<T> {
    try {
      await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .add(data);

      return data;
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<T[] | Error> {
    try {
      const list: T[] = [];
      const query = await dataBase
        .firestore()
        .collection(`${basePath}/${this.path}`)
        .get();

      query.forEach((snapshot) =>
        list.push({ ...(snapshot.data() as T), id: snapshot.id })
      );
      return list;
    } catch (error) {
      return error;
    }
  }

  async getById(id: string): Promise<T | Error> {
    const data: T | Error = await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .get()
      .then((snapshot) => {
        return snapshot.data() as T;
      })
      .catch((err: Error) => {
        return err;
      });

    return data;
  }

  async update(id: string, newData: T): Promise<T | Error> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .update(newData);

    return newData;
  }

  async delete(id: string): Promise<string | Error> {
    await dataBase
      .firestore()
      .collection(`${basePath}/${this.path}`)
      .doc(id)
      .delete();
    return id;
  }
}