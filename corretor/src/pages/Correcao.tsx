import { Header } from "../components/Header";
import { PageHeader } from "../ui/PageHeader";
import { PdfUploader } from "../ui/PdfUploader";

const EXPORT_URL = `${import.meta.env.VITE_API_URL}/api/dashboard/export-xlsx`;

export const Correcao = () => {
  const handleExport = async () => {
    try {
      const response = await fetch(EXPORT_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erro ao exportar o arquivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "dados-dashboard.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erro ao exportar o arquivo");
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-0 lg:ml-60 transition-all duration-300">
        <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
          <PageHeader
            title="Correção"
            description="Tela de Envio de PDF para Correção"
            action={
              <button
                onClick={handleExport}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Exportar XLSX
              </button>
            }
          />
          <PdfUploader />
        </div>
      </main>
    </>
  );
};
