export default function ItemEditor({ item, drugOptions, onUpdate, onRemove }) {
  const unitOptions = ['mg', 'mcg', 'UI', 'ml', 'g', '%'];
  const viaOptions = ['EV', 'IM', 'SC', 'Intratecal', 'Inhalatoria', 'Endotraqueal'];
  const selectedOption = drugOptions.find((option) => option.label === item.nombre);
  const isAction = selectedOption?.type === 'accion';

  return (
    <div className="item-row">
      <div className="item-fields">
        <select
          className="item-input"
          value={item.nombre}
          onChange={(e) => onUpdate('nombre', e.target.value)}
        >
          <option value="">Droga o acción</option>
          {drugOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="item-small-group">
          <input
            className="item-small-input"
            type="text"
            placeholder={isAction ? 'Detalle de la acción' : 'Dosis'}
            value={item.dosis}
            onChange={(e) => onUpdate('dosis', e.target.value)}
          />
          {isAction ? null : (
            <>
              <select
                className="item-small-input"
                value={item.unidad}
                onChange={(e) => onUpdate('unidad', e.target.value)}
              >
                <option value="">Unidad</option>
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <select
                className="item-small-input"
                value={item.via}
                onChange={(e) => onUpdate('via', e.target.value)}
              >
                <option value="">Vía</option>
                {viaOptions.map((via) => (
                  <option key={via} value={via}>
                    {via}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      <button className="icon-button" type="button" onClick={onRemove} aria-label="Eliminar item">
        −
      </button>
    </div>
  );
}
