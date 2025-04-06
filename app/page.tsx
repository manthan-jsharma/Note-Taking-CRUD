import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Note Taking App</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Capture Your Thoughts</h2>
            <p className="text-xl text-muted-foreground mb-8">
              A simple and secure note-taking app to organize your ideas, tasks,
              and memories.
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </section>
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">
                  Secure Authentication
                </h3>
                <p className="text-muted-foreground">
                  Your notes are protected with Firebase authentication,
                  ensuring only you can access them.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Create & Edit</h3>
                <p className="text-muted-foreground">
                  Easily create new notes and edit existing ones with our
                  intuitive interface.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-2">Reliable Storage</h3>
                <p className="text-muted-foreground">
                  All your notes are safely stored in MongoDB, providing
                  reliable and scalable storage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Note Taking App. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
