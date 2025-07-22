import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, ChevronLeft } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  const tipo = user?.tipo_usuario;

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((part: string) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { name: "Home", path: "/Home", allowed: true },
    { name: "Leitura de Qr code", path: "/leitura-qr", allowed: true },
    // { name: "Escolas", path: "/escolas", allowed: tipo !== "GESTOR" },
    // { name: "Turmas", path: "/turmas", allowed: tipo !== "GESTOR" },
    // { name: "Alunos", path: "/alunos", allowed: tipo !== "GESTOR" },
    // { name: "Provas", path: "/provas", allowed: tipo !== "GESTOR" },
    // { name: "Gabaritos", path: "/gabaritos", allowed: tipo !== "GESTOR" },
    { name: "Usuários", path: "/usuarios", allowed: tipo === "ADMINISTRADOR" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        collapsed ? "w-20" : "w-60"
      } bg-blue-600 text-white shadow-lg z-50 flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <span className="text-2xl font-bold">
            {collapsed ? "SAG" : "SAG CORRETOR"}
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-blue-300"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          {navItems
            .filter((item) => item.allowed)
            .map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-3 text-sm ${
                    isActive
                      ? "bg-blue-700 font-semibold"
                      : "hover:bg-blue-500"
                  } transition`
                }
              >
                <span className={`${collapsed ? "hidden" : "block"}`}>
                  {name}
                </span>
              </NavLink>
            ))}
        </nav>
      </div>

      <div className="p-4 border-t border-blue-500 flex items-center gap-3">
        <div className="w-8 h-8 bg-white text-blue-600 font-bold rounded-full flex items-center justify-center">
          {getInitials(user?.nome || "U")}
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm">{user?.nome || "Usuário"}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs hover:underline mt-1"
            >
              <LogOut size={14} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
