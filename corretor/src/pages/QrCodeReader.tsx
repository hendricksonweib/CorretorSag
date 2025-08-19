import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";

export const LeituraQrCode = () => {
  return (
    <>
      <Header />
      <main className="md:ml-60 ml-0 transition-all duration-300 p-0">
        <div className="pt-10 px-4 mt-8 md:px-12 bg-gray-100 min-h-screen space-y-10">
          <PageHeader
            title="Leitor"
            description="Utilize a câmera para identificar o aluno e a prova, ou faça a seleção manual."
          />
          
        </div>
      </main>
    </>
  );
};
