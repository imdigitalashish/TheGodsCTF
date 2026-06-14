import { useEffect } from "react";
import { useGame } from "@/store/gameStore";

export function Toast() {
  const toast = useGame((s) => s.toast);
  const clearToast = useGame((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 2600);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;
  return (
    <div className={`toast ${toast.kind}`} dangerouslySetInnerHTML={{ __html: toast.msg }} />
  );
}
