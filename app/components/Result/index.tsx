import { useState } from 'react';
import styles from './diagnostic-result.module.css';
import { MdAutoGraph } from "react-icons/md";
import { MdBlurOn } from "react-icons/md";
import { MdOutlineToken } from "react-icons/md";
import { MdLooks } from "react-icons/md";
import { MdOutlineWarning } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import { MdFolderSpecial } from "react-icons/md";
import { MdChecklistRtl } from "react-icons/md";
import { patientService } from '@/app/services/patientService';


export default function Result({response}: any) {

  const [isConfirmedData, setIsConfirmedData] = useState({
    isConfirmed: false
  });

  window?.addEventListener('REQUEST_ANALYSIS', () => {
    setIsConfirmedData({ isConfirmed: false });
  });



  function postAISample() {
    patientService.confirmSample(response.patient_data)
    .then((data: any) => {
      console.log('Resposta do servidor:', data); 
      setIsConfirmedData({
        isConfirmed: true
      });
    })
    .catch((reason: any) => {
      console.error('Erro no upload:', reason);
    });
  }

  const renderRiskIcon = (riskLabel: string) => {
    switch (riskLabel) {
      case ('high_risk'):
        const highRiskClasses = [styles['result-icon'], styles['high-risk']].join(' ');
        return <MdOutlineWarning className={highRiskClasses} />;
      case ('moderate_risk'):
        const moderateRiskClasses = [styles['result-icon'], styles['moderate-risk']].join(' ');
        return <MdInfo className={moderateRiskClasses} />;
      case ('no_risk'):
        const NoRiskclasses = [styles['result-icon'], styles['no-risk']].join(' ');
        return <MdChecklistRtl className={NoRiskclasses} />;
      default:
        return null;
    }
  };

  const RISK_CLASSES: { [key: string]: string } = {
    'no_risk': styles['no-risk'],
    'moderate_risk': styles['moderate-risk'],
    'high_risk': styles['high-risk'],
  };
  const currentRiskClass = RISK_CLASSES[response.risk_label];

  return (
    <div>
      <h3 className={styles['sub-title']}>Resultados da análise</h3>
      <div className={styles['diagnostic-result-container']}>

        <div className={styles['result-title']}>
          <span className={`${currentRiskClass}`}>Probabilidade de risco {response.risk_score}%</span>
        </div>

        <div className={styles['result-item-container']}>

          {renderRiskIcon(response.risk_label)}

          <div>
            <div className={styles['result-item']}>
                <span>Area:</span>
                <span className={styles['label']}>{response.area} mm²<MdAutoGraph /></span>
            </div>
            <div className={styles['result-item']}>
                <span>Perimetro:</span>
                <span className={styles['label']}>{response.perimeter} mm<MdOutlineToken /></span>
            </div>
            <div className={styles['result-item']}>
                <span>Circularidade:</span>
                <span className={styles['label']}>{response.circularity}<MdLooks /></span>
            </div>
            <div className={styles['result-item']}>
                <span>Solidez:</span>
                <span className={styles['label']}>{response.solidity}<MdBlurOn /></span>
            </div>
          </div>
        </div>


        {
          response.patient_data ? 
          <div className={styles['save-sample-container']}>
            {
              !isConfirmedData.isConfirmed ?
              <button 
              onClick={() => postAISample()}
              className={styles['save-sample-btn']}>
                <MdFolderSpecial/>
                Salvar analise
              </button>
            : <span className={styles['saved-sample-label']}>Analise armazenada com sucesso!</span>
            }
            
          </div>
          : null
        }

      </div>
    </div>
  );
}