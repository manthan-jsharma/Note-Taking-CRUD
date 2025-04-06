"use client";

import NoteList from "@/components/notes/note-list";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to your Notes</h1>
        <p className="text-muted-foreground">
          Manage all your notes in one place
        </p>
      </div>
      <NoteList />
    </div>
  );
}
