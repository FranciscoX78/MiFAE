import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SectionEditor from './components/SectionEditor.jsx';
import QRModal from './components/QRModal.jsx';

// Identificación fija del médico, hardcodeada en el prototipo.
// Nota: Este valor se mantiene fijo por diseño del prototipo.
const MEDICO = {
  nombre: 'Alejandro',
  apellido: 'Figar',
};

const INITIAL_STATE = {
  induccion: [],
  mantenimiento: [],
  despertar: [],
};

const PHASES = [
  { key: 'induccion', label: 'Inducción' },
  { key: 'mantenimiento', label: 'Mantenimiento' },
  { key: 'despertar', label: 'Educcion' },
];

const DROGAS_ACCIONES = [
  { label: 'Propofol', type: 'droga' },
  { label: 'Fentanilo', type: 'droga' },
  { label: 'Rocuronio', type: 'droga' },
  { label: 'Succinilcolina', type: 'droga' },
  { label: 'Ketamina', type: 'droga' },
  { label: 'Midazolam', type: 'droga' },
  { label: 'Lidocaína', type: 'droga' },
  { label: 'Fenilefrina', type: 'droga' },
  { label: 'Efedrina', type: 'droga' },
  { label: 'Oxitocina', type: 'droga' },
  { label: 'Sulfato de magnesio', type: 'droga' },
  { label: 'Anestesia epidural', type: 'accion' },
  { label: 'Bloqueo espinal', type: 'accion' },
  { label: 'Intubación', type: 'accion' },
  { label: 'Extubación', type: 'accion' },
  { label: 'Reversión', type: 'accion' },
];

const UNIT_OPTIONS = ['mg', 'mcg', 'UI', 'ml', 'g', '%'];
const VIA_OPTIONS = ['EV', 'IM', 'SC', 'Intratecal', 'Inhalatoria', 'Endotraqueal'];

const STORAGE_KEY = 'mifae-saved-phases';

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 11)}`;
};

export default function App() {
  const [phases, setPhases] = useState(() => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).phases ?? INITIAL_STATE : INITIAL_STATE;
    } catch {
      return INITIAL_STATE;
    }
  });

  const [savedComboIds, setSavedComboIds] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).savedComboIds ?? [] : [];
    } catch {
      return [];
    }
  });

  const [qrPayload, setQrPayload] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // Persistencia local compatible con Web y con WebView de Android (Capacitor).
  // Usamos `localStorage` para mantener los combos en el dispositivo.
  // - En la web (npm run dev / preview) funciona igual.
  // - En la app Android (APK) el WebView también expone `localStorage` por defecto.
  // Si en el futuro se desea migrar a IndexedDB, hay que mantener compatibilidad
  // con ambos entornos o usar un adaptador.
  const persistState = (nextPhases, nextSavedComboIds) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ phases: nextPhases, savedComboIds: nextSavedComboIds })
      );
    } catch (error) {
      console.warn('No se pudo persistir el estado en localStorage:', error);
    }
  };

  useEffect(() => {
    persistState(phases, savedComboIds);
  }, [phases, savedComboIds]);

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const markComboUnsaved = (comboId) => {
    setSavedComboIds((current) => current.filter((id) => id !== comboId));
  };

  const saveCombo = (phaseKey, comboId) => {
    const nextSavedComboIds = [...new Set([...savedComboIds, comboId])];
    setSavedComboIds(nextSavedComboIds);
    persistState(phases, nextSavedComboIds);
  };

  const hasAnyCombo = useMemo(
    () => PHASES.some((phase) => phases[phase.key].length > 0),
    [phases]
  );

  const findItemType = (itemName) => {
    const option = DROGAS_ACCIONES.find((entry) => entry.label === itemName);
    return option ? option.type : 'droga';
  };

  const buildItemText = (item) => {
    const itemType = findItemType(item.nombre);
    if (itemType === 'accion') {
      return [item.nombre, item.dosis].filter(Boolean).join(' ').trim();
    }
    return [item.nombre, item.dosis, item.unidad, item.via].filter(Boolean).join(' ').trim();
  };

  // Construye el JSON que irá dentro del QR. Se mantiene la estructura exacta
  // requerida por pFAE: siempre incluye `medico`, `induccion`, `mantenimiento`, `despertar`.
  // Cada item se serializa a texto legible por pFAE (ej. "Propofol 150 mg EV").
  const buildPayload = () => {
    return {
      medico: MEDICO,
      induccion: phases.induccion.map((combo) => ({
        nombre: combo.nombre || 'Combo sin nombre',
        items: combo.items.map(buildItemText).filter(Boolean),
      })),
      mantenimiento: phases.mantenimiento.map((combo) => ({
        nombre: combo.nombre || 'Combo sin nombre',
        items: combo.items.map(buildItemText).filter(Boolean),
      })),
      despertar: phases.despertar.map((combo) => ({
        nombre: combo.nombre || 'Combo sin nombre',
        items: combo.items.map(buildItemText).filter(Boolean),
      })),
    };
  };

  const updatePhase = (phaseKey, updater) => {
    setPhases((current) => ({
      ...current,
      [phaseKey]: updater(current[phaseKey]),
    }));
  };

  const addCombo = (phaseKey) => {
    updatePhase(phaseKey, (items) => [
      ...items,
      {
        id: createId(),
        nombre: '',
        items: [
          { id: createId(), nombre: '', dosis: '', unidad: '', via: '' },
        ],
      },
    ]);
  };

  const removeCombo = (phaseKey, comboId) => {
    setPhases((current) => {
      const nextPhases = {
        ...current,
        [phaseKey]: current[phaseKey].filter((combo) => combo.id !== comboId),
      };
      const nextSavedComboIds = savedComboIds.filter((id) => id !== comboId);
      setSavedComboIds(nextSavedComboIds);
      persistState(nextPhases, nextSavedComboIds);
      return nextPhases;
    });
  };

  const updateComboName = (phaseKey, comboId, nombre) => {
    markComboUnsaved(comboId);
    updatePhase(phaseKey, (items) =>
      items.map((combo) =>
        combo.id === comboId ? { ...combo, nombre } : combo
      )
    );
  };

  const addItem = (phaseKey, comboId) => {
    markComboUnsaved(comboId);
    updatePhase(phaseKey, (items) =>
      items.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              items: [
                ...combo.items,
                { id: createId(), nombre: '', dosis: '', unidad: '', via: '' },
              ],
            }
          : combo
      )
    );
  };

  const updateItemField = (phaseKey, comboId, itemId, field, value) => {
    markComboUnsaved(comboId);
    updatePhase(phaseKey, (items) =>
      items.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              items: combo.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item
              ),
            }
          : combo
      )
    );
  };

  const removeItem = (phaseKey, comboId, itemId) => {
    markComboUnsaved(comboId);
    updatePhase(phaseKey, (items) =>
      items.map((combo) =>
        combo.id === comboId
          ? {
              ...combo,
              items: combo.items.filter((item) => item.id !== itemId),
            }
          : combo
      )
    );
  };

  const handleGenerateQR = () => {
    const payload = buildPayload();
    setQrPayload(payload);
    setShowQr(true);
    if (!hasAnyCombo) {
      setWarningMessage('No hay combos cargados. El QR seguirá generándose.');
    } else {
      setWarningMessage('');
    }
  };

  const closeQr = () => {
    setShowQr(false);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="app-shell">
      <Header medico={MEDICO} />

      <main className="page-content">
        <section className="hero-card">
          <div>
            <h2>Configura tus combos</h2>
            <p>Agrega combos para Inducción, Mantenimiento y Educcion.</p>
          </div>
          {showInstallButton && (
            <button className="secondary-button" type="button" onClick={handleInstallClick}>
              Instalar MiFAE
            </button>
          )}
        </section>

        {PHASES.map((phase) => (
          <SectionEditor
            key={phase.key}
            phaseKey={phase.key}
            label={phase.label}
            combos={phases[phase.key]}
            drugOptions={DROGAS_ACCIONES}
            savedComboIds={savedComboIds}
            onAddCombo={() => addCombo(phase.key)}
            onRemoveCombo={(comboId) => removeCombo(phase.key, comboId)}
            onUpdateComboName={(comboId, nombre) => updateComboName(phase.key, comboId, nombre)}
            onAddItem={(comboId) => addItem(phase.key, comboId)}
            onUpdateItem={(comboId, itemId, field, value) =>
              updateItemField(phase.key, comboId, itemId, field, value)
            }
            onRemoveItem={(comboId, itemId) => removeItem(phase.key, comboId, itemId)}
            onSaveCombo={(comboId) => saveCombo(phase.key, comboId)}
          />
        ))}

        <div className="actions-row">
          <button className="primary-button" type="button" onClick={handleGenerateQR}>
            Generar QR
          </button>
          {warningMessage && <span className="warning-text">{warningMessage}</span>}
        </div>
      </main>

      {showQr && qrPayload && <QRModal payload={qrPayload} onClose={closeQr} />}
    </div>
  );
}
