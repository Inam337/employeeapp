"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterComplaintPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the complaints page since register is now in a drawer
    router.push("/complaints");
  }, [router]);

  return null;
}
