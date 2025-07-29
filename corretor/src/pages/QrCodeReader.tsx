import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { QrScanner } from "../components/QrScanner";

export const LeituraQrCode = () => {

  return (
    <>
      <Header />
      <main className="ml-60 transition-all duration-300 p-0">
        <div className="pt-10 p-12 bg-gray-100 min-h-screen space-y-10">
          <PageHeader
            title="Leitor"
            description="Utilize a câmera para identificar o aluno e a prova, ou faça a seleção manual."
          />
        <QrScanner/>
        
        </div>
      </main>
    </>
  );
};
