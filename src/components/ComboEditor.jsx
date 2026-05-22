import ItemEditor from './ItemEditor.jsx';

export default function ComboEditor({ combo, drugOptions, isSaved, onRemove, onSave, onChangeName, onAddItem, onUpdateItem, onRemoveItem }) {
  return (
    <div className="combo-card">
      <div className="combo-title-row">
        <input
          className="combo-name-input"
          type="text"
          placeholder="Nombre del combo"
          value={combo.nombre}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <button className="icon-button" type="button" onClick={onRemove} aria-label="Eliminar combo">
          ×
        </button>
      </div>
      <div className="combo-actions-row">
        <button className="small-button" type="button" onClick={onAddItem}>
          + Item
        </button>
        <button className="small-button" type="button" onClick={onSave}>
          {isSaved ? 'Guardado' : 'Guardar combo'}
        </button>
      </div>
      <div className="item-list">
        {combo.items.map((item) => (
          <ItemEditor
            key={item.id}
            item={item}
            drugOptions={drugOptions}
            onUpdate={(field, value) => onUpdateItem(item.id, field, value)}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
