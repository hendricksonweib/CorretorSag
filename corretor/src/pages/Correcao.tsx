import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { PdfUploader } from "../ui/PdfUploader";

const EXPORT_URL = `${import.meta.env.VITE_API_URL}/api/dashboard/export-xlsx`;

export const Correcao = () => {
  
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-0 lg:ml-60 transition-all duration-300">
        <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
          <PageHeader
            title="Correção"
            description="Tela de Envio de PDF para Correção"
           
          />
          <PdfUploader />
        </div>
      </main>
    </>
  );
};
