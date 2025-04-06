import type { ObjectId } from "mongodb";

export interface Note {
  _id?: ObjectId | string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
