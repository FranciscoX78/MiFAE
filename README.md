# MiFAE

MiFAE es una app híbrida React + Capacitor que permite crear combos anestésicos por fase, generar un JSON válido y codificarlo en un QR que pFAE puede leer.

## Objetivo del prototipo

MiFAE es un prototipo de configuración de interfaz para pFAE. No es una historia clínica ni un registro médico real. El médico está hardcodeado como Alejandro Figar para este prototipo.

## Qué hace MiFAE

- Crea combos para:
  - Inducción
  - Mantenimiento
  - Despertar
- Cada combo incluye:
  - nombre del combo
  - lista de items
- Cada item incluye:
  - droga o acción
  - dosis o detalle libre
  - unidad
  - vía de administración
- Genera un JSON que siempre contiene:
  - `medico`
  - `induccion`
  - `mantenimiento`
  - `despertar`
- Convierte el JSON en un QR elegante y confiable.
- Guarda combos localmente usando `localStorage` tanto en navegador como en Android WebView.

## Qué no hace MiFAE

- No registra pacientes.
- No guarda datos clínicos reales.
- No almacena historia médica.
- No requiere servidor.
- No depende de GitHub Pages en la APK.

## Tecnologías usadas

- React
- Vite
- JavaScript
- CSS
- Capacitor
- Android (plataforma Capacitor)
- react-qr-code

## Estructura de carpetas

- `public/` - archivos estáticos y assets
- `src/` - código fuente de la app
- `src/components/` - componentes React
- `src/assets/` - íconos y recursos de MiFAE
- `docs/` - documentación del proyecto
- `android/` - proyecto Android generado por Capacitor

## Instalación de dependencias

```bash
npm install
```

## Desarrollo web en Windows

```bash
npm run dev
```

Abre la URL que muestra Vite en tu navegador.

## Generar el build

```bash
npm run build
```

## Previsualizar el build

```bash
npm run preview
```

## Capacitor y Android

### Agregar Android por primera vez

```bash
npm run android:add
```

### Sincronizar cambios web con Android

```bash
npm run android:sync
```

### Abrir Android Studio

```bash
npm run android:open
```

### Generar build Android (web + sync)

```bash
npm run android:build
```

### Abrir el proyecto Android en Android Studio

```bash
npm run android:run
```

> `android:run` abre Android Studio después de generar y sincronizar el build web.

## Cómo usar MiFAE en Android sin internet

1. Genera el build con `npm run build`.
2. Sincroniza el contenido con Android usando `npm run android:sync`.
3. Abre Android Studio con `npm run android:open`.
4. Instala la app en tu celular.
5. La app instalada puede abrir sin WiFi ni datos móviles.

## Cómo verificar la persistencia local

1. Crea combos en `Inducción`, `Mantenimiento` y `Despertar`.
2. Recarga la app en el navegador o cierra y vuelve a abrir la app Android.
3. Los combos deben aparecer nuevamente.

## Cómo generar el QR

1. Crea o edita combos.
2. Presiona `Guardar combo` en cada combo si quieres marcarlo como guardado.
3. Presiona `Generar QR para pFAE`.
4. Se mostrará una tarjeta elegante con el QR y el botón `Ver JSON`.

## Ejemplo completo del JSON generado

```json
{
  "medico": {
    "nombre": "Alejandro",
    "apellido": "Figar"
  },
  "induccion": [
    {
      "nombre": "Inducción estándar",
      "items": [
        "Propofol 150 mg EV",
        "Fentanilo 100 mcg EV",
        "Rocuronio 50 mg EV"
      ]
    }
  ],
  "mantenimiento": [
    {
      "nombre": "Hipotensión",
      "items": ["Efedrina 5 mg EV"]
    }
  ],
  "despertar": [
    {
      "nombre": "Reversión",
      "items": ["Sugammadex 200 mg EV"]
    }
  ]
}
```

## Explicación de cada campo del JSON

- `medico.nombre`: Alejandro
- `medico.apellido`: Figar
- `induccion`: array de combos para la fase de inducción
- `mantenimiento`: array de combos para la fase de mantenimiento
- `despertar`: array de combos para la fase de despertar
- `items`: strings formateadas para pFAE

## Limitaciones del prototipo

- No hay backend.
- No se guardan datos clínicos reales.
- Todos los datos son locales en el dispositivo.
- Si el usuario borra el almacenamiento o desinstala la app, los combos se pierden.

## Futuros pasos posibles

- Exportar e importar JSON.
- Soporte de temas claro/oscuro.
- Validación avanzada de combos.
- IndexedDB para mayor resiliencia.
- Integración directa con pFAE.
