"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../lib/stores/authStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  // Attendre la réhydratation du store persisté (zustand/persist)
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const api: any = useAuthStore as any;
      const has = api?.persist?.hasHydrated?.() ?? true;
      setHydrated(has);
      const unsub = api?.persist?.onFinishHydration?.(() => setHydrated(true));
      return typeof unsub === "function" ? unsub : undefined;
    } catch {
      // Fallback: au moins marquer monté côté client
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return; // Ne pas rediriger avant hydratation
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [hydrated, isAuthenticated, user, router]);

  if (!hydrated) return null; // écran neutre le temps d'hydrater
  if (!isAuthenticated || user?.role !== "admin") return null;

  return <>{children}</>;
}


