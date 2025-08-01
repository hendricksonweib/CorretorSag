import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export const QrScanner = () => {
  const qrRegionId = "qr-reader";
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState(false);

  useEffect(() => {
    if (!scannerActive) return;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode(qrRegionId);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 200, height: 200 } },
          (decodedText) => {
            setQrResult(decodedText);
            scanner.stop().catch(console.error);
            setScannerActive(false);
          },
          () => {}
        );
      } catch (err) {
        console.error("Erro ao iniciar scanner:", err);
        setScannerActive(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [scannerActive]);

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop().catch(console.error);
      scannerRef.current = null;
    }
    setScannerActive(false);
  };

  return (
    <div className="relative w-full max-w-[90vw] sm:max-w-xl mx-auto h-[70vw] sm:h-[500px] bg-black rounded-xl overflow-hidden">
      {/* Scanner ativo */}
      {scannerActive && <div id={qrRegionId} className="w-full h-full" />}

      {/* Moldura e botões */}
      {scannerActive && (
        <>
          {/* overlay escuro */}
          <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none" />

          {/* moldura azul */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 sm:w-64 sm:h-64 border-4 border-blue-500 rounded-lg" />
          </div>

          {/* botão fechar */}
          <button
            onClick={stopScanner}
            className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 z-10"
          >
            Fechar
          </button>
        </>
      )}

      {/* Iniciar scanner */}
      {!scannerActive && (
        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="mb-4 text-base sm:text-lg">
            Clique para iniciar a leitura do QR Code
          </p>
          <button
            onClick={() => setScannerActive(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            📷 Iniciar Scanner
          </button>
        </div>
      )}

      {/* Resultado */}
      {qrResult && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-6 py-2 rounded-full text-sm">
          Código detectado: {qrResult}
        </div>
      )}
    </div>
  );
};
