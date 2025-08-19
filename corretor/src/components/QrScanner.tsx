import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export const QrScanner = () => {
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const intervalIdRef = useRef<number | null>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    if (scannerActive) {
      setLoading(true);
      
      const id = window.setInterval(async () => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          if (imageSrc) {
            await sendImageToApi(imageSrc);
          }
        }
      }, 1000);

      intervalIdRef.current = id;
      setLoading(false);
    }

    return () => {
      if (intervalIdRef.current) {
        window.clearInterval(intervalIdRef.current);
      }
    };
  }, [scannerActive]);

  const sendImageToApi = async (imageSrc: string) => {
    try {
      const base64Data = imageSrc.split(',')[1];
      const blob = await fetch(`data:image/png;base64,${base64Data}`).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('arquivo', blob, 'captura.png');

      const response = await axios.post('http://127.0.0.1:8000/api/ler-qrcode/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verifica se a resposta tem status 200 e contém qr_codes
      if (response.status === 200 && response.data.qr_codes) {
        setQrResult(`QR Code detectado: ${response.data.qr_codes}`);
        stopScanner();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      // Não definir qrResult com mensagem de erro para evitar sobreposição
    }
  };

  const stopScanner = () => {
    if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current);
    }
    setScannerActive(false);
  };

  return (
    <div className="relative w-full max-w-[90vw] sm:max-w-xl mx-auto h-[70vw] sm:h-[500px] bg-black rounded-xl overflow-hidden">
      {scannerActive && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{
              facingMode: "environment",
              width: 1280,
              height: 720,
            }}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 sm:w-64 sm:h-64 border-4 border-blue-500 rounded-lg" />
          </div>
        </>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <p>Carregando câmera...</p>
        </div>
      )}

      {!scannerActive && (
        <div className="flex flex-col items-center justify-center h-full text-center text-white px-4">
          <p className="mb-4 text-base sm:text-lg">
            Clique para iniciar a leitura do QR Code
          </p>
          <button
            onClick={() => setScannerActive(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Iniciar Scanner
          </button>
        </div>
      )}

      {qrResult && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-70 px-6 py-2 rounded-full text-sm">
          {qrResult}
        </div>
      )}

      {scannerActive && (
        <button
          onClick={stopScanner}
          className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 z-10"
        >
          Fechar
        </button>
      )}
    </div>
  );
};