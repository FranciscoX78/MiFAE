import QRCode from 'react-qr-code';
import logoUrl from '../assets/mifae-logo.png';

export default function QRModal({ payload, onClose }) {
  const qrString = JSON.stringify(payload, null, 2);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-shell">
        <div className="qr-card animate-flip">
          <img src={logoUrl} alt="Logo MiFAE" className="qr-card-logo" />
          <div className="qr-card-title">
            <p className="qr-doctor">Dr. {payload.medico.nombre} {payload.medico.apellido}</p>
          </div>
          <div className="qr-code-panel">
            <QRCode value={qrString} size={220} bgColor="#ffffff" fgColor="#111827" level="M" />
          </div>
          <div className="qr-actions">
            <button className="primary-button" type="button" onClick={onClose}>
              Cerrar QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
