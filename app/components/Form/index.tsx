"use client";
import styles from './form.module.css';
import { useState } from 'react';
import { MdLockOpen } from "react-icons/md";

interface FormProps {
    label: React.ReactNode;
    className?: string;   
}

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
  });

  function saveForm(e:  any): void {
    e.preventDefault();
    let event = new CustomEvent('SAVE_FORM_DATA', { detail: formData });
    window.dispatchEvent(event);
  }

  return (
        <form className={styles['form-container']}>
          <fieldset>
            <label>Paciente</label>
            <input name="name" type="text" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />

            <label>Identificador</label>
            <input name="id" type="text"
            onChange={(e) => setFormData({...formData, id: e.target.value})} />
            <button onClick={saveForm}><MdLockOpen /> Salvar dados</button>
          </fieldset>
        </form>
  );
}