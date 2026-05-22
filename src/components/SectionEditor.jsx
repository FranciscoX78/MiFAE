import ComboEditor from './ComboEditor.jsx';

export default function SectionEditor({
  phaseKey,
  label,
  combos,
  drugOptions,
  savedComboIds,
  onAddCombo,
  onRemoveCombo,
  onUpdateComboName,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onSaveCombo,
}) {
  return (
    <section className="phase-section">
      <div className="phase-header">
        <div>
          <h3>{label}</h3>
          <p>Agrega combo y items para esta fase.</p>
        </div>
        <button className="small-button" type="button" onClick={onAddCombo}>
          + Combo
        </button>
      </div>
      <div className="combo-list">
        {combos.length === 0 && <p className="empty-state">No hay combos en esta fase.</p>}
        {combos.map((combo) => (
          <ComboEditor
            key={combo.id}
            combo={combo}
            drugOptions={drugOptions}
            isSaved={savedComboIds.includes(combo.id)}
            onRemove={() => onRemoveCombo(combo.id)}
            onSave={() => onSaveCombo(combo.id)}
            onChangeName={(value) => onUpdateComboName(combo.id, value)}
            onAddItem={() => onAddItem(combo.id)}
            onUpdateItem={(itemId, field, value) => onUpdateItem(combo.id, itemId, field, value)}
            onRemoveItem={(itemId) => onRemoveItem(combo.id, itemId)}
          />
        ))}
      </div>
    </section>
  );
}
