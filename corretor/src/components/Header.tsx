import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  const tipo = user?.tipo_usuario;

  const [mobileOpen, setMobileOpen] = useState(false);

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
    { name: "Leitura de gabarito", path: "/leitura-de-gabarito", allowed: true },
    { name: "Alunos", path: "/alunos", allowed: tipo !== "GESTOR" },
    { name: "Usuários", path: "/usuarios", allowed: tipo === "ADMINISTRADOR" },
  ];

  return (
    <>
      {/* Header no topo apenas no mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white flex items-center justify-between px-4 z-50 shadow-md">
        <span className="text-lg font-bold">SAG CORRETOR</span>
        <button onClick={() => setMobileOpen(true)} className="text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar fixa no desktop */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-60 bg-blue-600 text-white shadow-lg z-40 flex-col justify-between">
        <div>
          <div className="p-4 border-b border-blue-500">
            <span className="text-2xl font-bold">SAG CORRETOR</span>
          </div>

          <nav className="flex flex-col mt-4">
            {navItems
              .filter((item) => item.allowed)
              .map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    `px-6 py-3 text-sm ${
                      isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-500"
                    } transition`
                  }
                >
                  {name}
                </NavLink>
              ))}
          </nav>
        </div>

        <div className="p-4 border-t border-blue-500 flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-blue-600 font-bold rounded-full flex items-center justify-center">
            {getInitials(user?.nome || "U")}
          </div>
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
        </div>
      </aside>

      {/* Sidebar como drawer no mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Overlay escuro */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileOpen(false)}
          ></div>

          <aside className="relative w-60 h-full bg-blue-600 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between p-4 border-b border-blue-500">
                <span className="text-2xl font-bold">SAG CORRETOR</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col mt-4">
                {navItems
                  .filter((item) => item.allowed)
                  .map(({ name, path }) => (
                    <NavLink
                      key={name}
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `px-6 py-3 text-sm ${
                          isActive
                            ? "bg-blue-700 font-semibold"
                            : "hover:bg-blue-500"
                        } transition`
                      }
                    >
                      {name}
                    </NavLink>
                  ))}
              </nav>
            </div>

            <div className="p-4 border-t border-blue-500 flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-blue-600 font-bold rounded-full flex items-center justify-center">
                {getInitials(user?.nome || "U")}
              </div>
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
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
