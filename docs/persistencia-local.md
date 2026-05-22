# Persistencia local en MiFAE

MiFAE guarda solo la configuración de los combos. No guarda pacientes ni datos clínicos reales.

## Qué datos se guardan

- Combos de `induccion`.
- Combos de `mantenimiento`.
- Combos de `despertar`.
- Nombre del combo.
- Items dentro de cada combo.
- Nombre de la droga o acción.
- Dosis.
- Unidad.
- Vía de administración.

## Qué no se guarda

- Pacientes.
- Historia clínica.
- Actos médicos reales.
- Datos de usuario reales.

## Dónde se guardan

- En la web: `localStorage` del navegador.
- En Android: `localStorage` del WebView de Capacitor.

El estado se guarda bajo la clave `mifae-saved-phases`.

## Por qué se usa `localStorage`

- Funciona en navegador y en Android WebView.
- No requiere configuración adicional.
- Es suficiente para el prototipo.

## Cómo carga los datos al iniciar

- Al iniciar `App`, se intenta leer la clave `mifae-saved-phases`.
- Si hay datos válidos, la app carga `phases` y `savedComboIds`.
- Si no hay datos, inicia vacío.

## Cómo se actualiza al editar combos

- Cada cambio en el estado `phases` actualiza el almacenamiento.
- La función `persistState` escribe el objeto completo en `localStorage`.
- Los combos se actualizan al agregar, editar o eliminar.

## Si se borra el almacenamiento

- Los combos guardados se pierden.
- La app vuelve a iniciar con fases vacías.
- La app sigue funcionando, pero sin los datos previos.

## Cómo verificarlo

1. Crea combos.
2. Recarga la app.
3. Comprueba que los combos siguen visibles.
4. En Android, cierra y abre la app de nuevo.

## Futuras mejoras

- Migrar a IndexedDB para mayor robustez.
- Agregar exportación de JSON.
- Añadir respaldo opcional en la nube.
