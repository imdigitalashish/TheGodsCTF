import { useGame } from "@/store/gameStore";
import { Boot } from "@/components/Boot";
import { Login } from "@/components/Login";
import { Desktop } from "@/components/Desktop";
import { Toast } from "@/components/Toast";
import { Victory } from "@/components/Victory";

export function App() {
  const phase = useGame((s) => s.phase);
  return (
    <>
      {phase === "boot" && <Boot />}
      {phase === "login" && <Login />}
      {phase === "desktop" && <Desktop />}
      <Toast />
      <Victory />
    </>
  );
}
