"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createNote, updateNote } from "@/app/actions/note-actions";
import { useAuth } from "@/contexts/auth-context";

interface NoteFormProps {
  initialData?: {
    noteId: string;
    title: string;
    content: string;
  };
  onSuccess?: () => void;
}

export default function NoteForm({ initialData, onSuccess }: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      if (isEditing) {
        await updateNote({
          noteId: initialData.noteId,
          title,
          content,
        });
      } else {
        await createNote({
          userId: user.uid,
          title,
          content,
        });
        // Reset form after creating a new note
        setTitle("");
        setContent("");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          className="min-h-[200px]"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : isEditing ? "Update Note" : "Create Note"}
      </Button>
    </form>
  );
}
