import { useState } from 'react';
import QRCode from 'react-qr-code';
import logoUrl from '../assets/mifae-logo.png';

export default function QRModal({ payload, onClose }) {
  const [showJson, setShowJson] = useState(false);
  const qrString = JSON.stringify(payload, null, 2);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-shell">
        <div className="qr-card animate-flip">
          <img src={logoUrl} alt="Logo MiFAE" className="qr-card-logo" />
          <div className="qr-card-title">
            <p className="qr-heading">MiFAE</p>
            <p className="qr-subtitle">Código de configuración pFAE</p>
            <p className="qr-doctor">Dr. {payload.medico.nombre} {payload.medico.apellido}</p>
          </div>
          <div className="qr-code-panel">
            <QRCode value={qrString} size={220} bgColor="#ffffff" fgColor="#111827" level="M" />
          </div>
          <div className="qr-actions">
            <button className="secondary-button" type="button" onClick={() => setShowJson((current) => !current)}>
              {showJson ? 'Ocultar JSON' : 'Ver JSON'}
            </button>
            <button className="primary-button" type="button" onClick={onClose}>
              Cerrar QR
            </button>
          </div>
          {showJson && (
            <div className="json-preview">
              <div className="json-preview-header">JSON generado</div>
              <pre>{qrString}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
