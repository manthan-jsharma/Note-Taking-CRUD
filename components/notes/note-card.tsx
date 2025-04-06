"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Note } from "@/lib/models/note";
import { deleteNote } from "@/app/actions/note-actions";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NoteForm from "./note-form";

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    setIsDeleting(true);
    try {
      await deleteNote(note._id as string);
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(note.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold truncate">
            {note.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {formattedDate}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-4">{note.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <NoteForm
            initialData={{
              noteId: note._id as string,
              title: note.title,
              content: note.content,
            }}
            onSuccess={() => setIsEditing(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
