'use client';
import { useState } from 'react';
import styles from './diagnostic-button.module.css';
import { MdOutlineImageSearch } from "react-icons/md";

export default function DiagnosticButton() {
  const [formData, setFormData] = useState({
    pacient_name: '',
    pacient_id: ''
  });


    window?.addEventListener('SAVE_FORM_DATA', (event: any) => {
      setFormData(event.detail);
    });
    const handleAnaliseClick = () => {
    // Dispara o evento global
    const evento = new CustomEvent('REQUEST_ANALYSIS', { detail: formData });
    window?.dispatchEvent(evento);
    };
  return (
    <>
      <button className={styles['custom-button']} onClick={handleAnaliseClick}>
        <MdOutlineImageSearch /> Analisar amostra
      </button>
    </>
  );
}