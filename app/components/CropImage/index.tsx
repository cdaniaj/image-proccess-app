'use client';

import React, { useState, useRef, useEffect } from 'react'
import styles from './crop-image.module.css'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDebounceEffect } from './useDebounceEffect'
import { canvasPreview } from './canvasPreview'
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { patientService } from '@/app/services/patientService';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function App({ onPreviewUpdate }: { onPreviewUpdate?: (img: string) => void }) {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined)


  useEffect(() => {
    const handleWheel = (event: any) => {
      // Evita a rolagem da página
      event.preventDefault();

      // Ajuste fino: quanto maior o divisor, mais lento e suave o zoom
      const zoomIntensity = 0.005; 
      const delta = event.deltaY * zoomIntensity;

      setScale((prevScale) => {
        const newScale = prevScale - delta;
        // Define limites para não sumir com a imagem ou travar o navegador
        return Math.min(Math.max(0.5, newScale), 5);
      });
    };

    // Adiciona o evento com passive: false para permitir o preventDefault
    const imageContainer = document.getElementById('image-container');
    if (imageContainer) {
      imageContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Cleanup: remove o evento corretamente ao desmontar o componente
    return () => {
      imageContainer?.removeEventListener('wheel', handleWheel);
    };
  }, []); // Array vazio para rodar apenas uma vez no mount

  useEffect(() => {
  const escutarEvento = ({detail}: any) => {
    onDownloadCropClick({patient_name: detail.name, patient_id: detail.id}).catch(console.error);
  };

  window?.addEventListener('REQUEST_ANALYSIS', escutarEvento);
  
  return () => window?.removeEventListener('REQUEST_ANALYSIS', escutarEvento);
}, [onDownloadCropClick]);


  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

async function onDownloadCropClick({patient_name, patient_id}: any) {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }
    

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })
    
    postAIAnalyze(patient_name, patient_id, blob);
  }


  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )

        if (onPreviewUpdate) {
          const dataUrl = previewCanvasRef.current.toDataURL('image/png');
          onPreviewUpdate(dataUrl);
        }
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function postAIAnalyze(patientName: string, patiendId: string, blob: any) {
      let formData = new FormData();

      formData.append('patient_name', patientName);
      formData.append('patient_id', patiendId);
      formData.append('file', blob, `${patiendId}-${uuidv4().substring(0, 4)}.png`);
      const result = patientService.analyzeSample(formData);

      result.then((response: any) => {
        const event = new CustomEvent('RESPONSE_API', { detail: response });
        window?.dispatchEvent(event);

      }).catch((reason: any) => {
        console.error('Erro no upload:', reason);
      });
  }

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        

        <div className={styles['input-file-container']}>
          <label htmlFor="file-upload" className={styles['btn-upload']}>
            <MdOutlineDriveFolderUpload />
            Carregar mamografia
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            onChange={onSelectFile} 
          />
       </div>


        <div style={{ display: 'none' }}>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
          />
        </div>
        <div style={{ display: 'none' }}>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div style={{ display: 'none' }}>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
      </div>
      
      <div 
      id="image-container"
      className={styles['image-container']}>
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              id="zoom-image"
              style={{ 
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                maxWidth: '100%',
                maxHeight: '500px'
            }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
      </div>
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
                display: 'none'
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
