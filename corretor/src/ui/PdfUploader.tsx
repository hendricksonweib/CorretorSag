import { useCallback, useState } from "react";

export const PdfUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Apenas arquivos PDF são permitidos.");
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Apenas arquivos PDF são permitidos.");
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Enviando gabarito:", file);
      // enviar para API aqui, se necessário
    } else {
      alert("Selecione um arquivo PDF primeiro.");
    }
  };

  return (
    <div className="w-full rounded-2xl shadow p-6 text-center bg-white">
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        Enviar Gabarito da Prova
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Faça o upload do gabarito da prova em PDF para correção automática.
      </p>

      <div
        className={`w-full border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
          dragActive ? "border-blue-700" : "border-blue-500"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-3xl mb-2 text-blue-600">⬆️</div>
        <p className="font-semibold text-lg mb-1 text-gray-800">
          Arraste e solte o PDF aqui
        </p>
        <p className="text-sm text-gray-600">
          ou{" "}
          <label className="text-blue-600 font-semibold cursor-pointer hover:underline">
            selecione um arquivo
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>{" "}
          do seu dispositivo
        </p>
      </div>

      {file && (
        <p className="mt-4 text-sm text-green-600 truncate">
          📄 {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-full mt-6 hover:bg-blue-700 transition"
      >
        Enviar Gabarito
      </button>
    </div>
  );
};
