import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/router";
import { LogOut } from "lucide-react";

export default function Menu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-lg font-bold text-blue-700 hover:underline">Dashboard</Link>
          <Link href="/new-ticket" className="text-lg font-medium text-gray-700 hover:underline">Nouveau Ticket</Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 hidden sm:inline">
            Connecté en tant que : <strong>{user?.prenom} {user?.nom}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800 text-sm"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
