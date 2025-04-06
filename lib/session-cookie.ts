"use client";

import { auth } from "./firebase";
import { useEffect } from "react";

export function useSessionCookie() {
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        // Get the ID token
        const token = await user.getIdToken();

        // Set the cookie
        document.cookie = `session=${token}; path=/; max-age=${
          60 * 60 * 24 * 5
        }; SameSite=Strict; Secure`;
      } else {
        // Remove the cookie
        document.cookie = "session=; path=/; max-age=0";
      }
    });

    return () => unsubscribe();
  }, []);
}
