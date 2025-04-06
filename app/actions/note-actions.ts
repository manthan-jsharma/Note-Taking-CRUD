"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { Note } from "@/lib/models/note";

export async function getNotes(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const notes = await db
      .collection("notes")
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return JSON.parse(JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error("Failed to fetch notes");
  }
}

export async function createNote(data: {
  userId: string;
  title: string;
  content: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const note: Note = {
      userId: data.userId,
      title: data.title,
      content: data.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("notes").insertOne(note);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to create note:", error);
    return { success: false, error: "Failed to create note" };
  }
}

export async function updateNote(data: {
  noteId: string;
  title: string;
  content: string;
}) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("notes").updateOne(
      { _id: new ObjectId(data.noteId) },
      {
        $set: {
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        },
      }
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update note:", error);
    return { success: false, error: "Failed to update note" };
  }
}

export async function deleteNote(noteId: string) {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.collection("notes").deleteOne({ _id: new ObjectId(noteId) });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete note:", error);
    return { success: false, error: "Failed to delete note" };
  }
}
