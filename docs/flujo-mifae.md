# Flujo funcional de MiFAE

## Estado inicial de la app

Al iniciar MiFAE, la app carga los combos guardados en `localStorage` si existen. Si no hay datos guardados, la app comienza con las fases vacías:

- induccion: []
- mantenimiento: []
- despertar: []

El médico se muestra siempre como Alejandro Figar y no es editable.

## Creación de combos

1. El usuario añade un combo en la fase correspondiente.
2. Completa el nombre del combo.
3. Agrega items con droga o acción.
4. Si la selección es una droga, se muestran los campos:
   - Dosis
   - Unidad
   - Vía
5. Si la selección es una acción, se muestra un campo de texto libre en lugar de Unidad y Vía.
6. El usuario puede guardar el combo con `Guardar combo`.

## Edición de combos

- Se puede cambiar el nombre del combo.
- Se puede agregar o eliminar items.
- Se puede editar cada campo de cada item.
- El estado cambia en memoria y también se sincroniza a `localStorage`.

## Persistencia local de combos

MiFAE guarda los combos en `localStorage` al agregar, editar o eliminar combos o items. Esto permite que la app cargue los combos guardados cuando la PWA se abra posteriormente, incluso sin conexión.

Los datos guardados incluyen:

- nombre del combo
- nombre de droga o acción
- dosis
- unidad
- vía de administración

## Generación del JSON

Cuando se presiona `Generar QR para pFAE`, la app construye un JSON que siempre contiene las claves:

- medico
- induccion
- mantenimiento
- despertar

Cada fase puede estar vacía o contener combos.

## Generación del QR

El QR se crea a partir del JSON completo. Cada item se convierte en texto legible:

- drogas: `Propofol 150 mg EV`
- acciones: `Acción detalle libre`

La pantalla del QR mantiene la tarjeta elegante con:

- logo o ícono MiFAE
- MiFAE
- Alejandro Figar
- Código de configuración pFAE
- QR grande y centrado

## Qué información viaja en el QR

- identificación del médico (Alejandro Figar)
- combos de inducción
- combos de mantenimiento
- combos de despertar
- items y sus valores

## Qué información no viaja en el QR

- no hay datos de pacientes
- no hay historia clínica
- no hay datos de autenticación
- no hay registros reales de actos médicos

## Cómo pFAE usa esa información

pFAE debe leer el JSON generado y extraer la configuración de interfaz. MiFAE sólo envía los datos del médico y los combos, no las decisiones clínicas.

## Por qué no hay backend

MiFAE es una app frontend puro. La persistencia se realiza en el dispositivo mediante `localStorage`. No hay servidor remoto, base de datos ni autenticación.

## Por qué no hay datos clínicos reales

Esta app sólo configura parámetros de interfaz. No almacena historiales de pacientes, ni datos personales, ni acciones clínicas verificables.
