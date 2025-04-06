"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <header className="border-b">
      <div className="container flex justify-between items-center h-16">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold">Note Taking App</h1>
        </Link>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <p className="text-sm text-muted-foreground hidden md:block">
                {user.email}
              </p>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
