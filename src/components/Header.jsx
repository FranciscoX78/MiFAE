import logoUrl from '../assets/mifae-logo.png';

export default function Header({ medico }) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <img src={logoUrl} alt="Logo MiFAE" className="brand-logo" />
        <div>
          <p className="brand-name">MiFAE</p>
        </div>
      </div>
      <div className="doctor-chip">
        <span>Dr. {medico.nombre} {medico.apellido}</span>
      </div>
    </header>
  );
}
