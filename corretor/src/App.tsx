import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Correcao } from "./pages/Correcao";
import AlunosPage from "./pages/AlunosPage";
import { UsuariosPage } from "./pages/UsuariosPage";
import { FiltroDashboardProvider } from "./hooks/useFiltroDashboard";
import { useAuthContext } from "./context/AuthContext";
import { LeituraQrCode } from "./pages/QrCodeReader";
function App() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  const isAdmin = user.tipo_usuario === "ADMINISTRADOR";
  // const isGestor = user.tipo_usuario === "GESTOR";

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/Home"
        element={
          <FiltroDashboardProvider>
            <Correcao />
          </FiltroDashboardProvider>
        }
      />
      <Route path="/leitura-de-gabarito" element={<LeituraQrCode />} />
      <Route path="/alunos" element={<AlunosPage />} />

      {/* Apenas ADMINISTRADOR e outros tipos (exceto GESTOR) */}
      {/* {(isAdmin || !isGestor) && (
        <>
          <Route path="/escolas" element={<EscolasPage />} />
        </>
      )} */}

      {/* Só ADMINISTRADOR tem acesso a usuários */}
      {isAdmin && <Route path="/usuarios" element={<UsuariosPage />} />}
    </Routes>
  );
}

export default App;
