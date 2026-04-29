"use client"

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Form = dynamic(() => import('./components/Form'), { ssr: false });
const Result = dynamic(() => import('./components/Result'), { ssr: false });
const DiagnosticButton = dynamic(() => import('./components/DiagnosticButton'), { ssr: false });
const CropImage = dynamic(() => import('./components/CropImage'), { ssr: false });
const Header = dynamic(() => import('./components/Header'), { ssr: false });


export default function Page() {
  const [samplePreview, setSamplePreview] = useState<string | null>(null); // Novo estado
   const [response, setResponse] = useState({
      area: 0,
      perimeter: 0,
      circularity: 0,
      solidity: 0
   });

  useEffect(() => {
    if (window === undefined) return;

    window?.addEventListener('RESPONSE_API', (data: any) => {
      console.log('Evento RESPONSE_API recebido!', data);
      setResponse(data.detail);
    });
    
    return () => window?.removeEventListener('RESPONSE_API', () =>{});
  }, []);

  return (
    <>
      <Header 
        title="AI Medical Image Analysis" 
        logo="" 
      />
      <div className="container">
        <div className="container-item patient-data">
          <h2>Dados do paciente</h2>
          <Form 
            />
        </div>

          <div className="container-item">
            <CropImage onPreviewUpdate={setSamplePreview} />
          </div>

          <div className="container-item">
            <div className="sample-box">
            {samplePreview ? (
               <img src={samplePreview} alt="Amostra" style={{ maxWidth: '100%', height: '200px', borderRadius: '8px' }} />
            ) : (
               <span>Aguardando seleção de área...</span>
            )}
         </div>
            <DiagnosticButton />

            <div style={{ marginBottom: '48px' }}>
              <Result response={response} />
            </div>
          </div>
      </div>
     </>
  )

  
}
