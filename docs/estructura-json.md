# Estructura del JSON generado por MiFAE

MiFAE genera siempre un JSON con las claves:

- `medico`
- `induccion`
- `mantenimiento`
- `despertar`

## Formato general

```json
{
  "medico": {
    "nombre": "Alejandro",
    "apellido": "Figar"
  },
  "induccion": [],
  "mantenimiento": [],
  "despertar": []
}
```

## Campo `medico`

El objeto `medico` está hardcodeado en este prototipo:

- `nombre`: "Alejandro"
- `apellido`: "Figar"

No es editable desde la interfaz.

## Campos de fase

Cada fase es un array de combos:

- `induccion`
- `mantenimiento`
- `despertar`

## Estructura de un combo

Cada combo es:

```json
{
  "nombre": "Nombre del combo",
  "items": ["Item 1", "Item 2"]
}
```

## Cómo se estructura un item

Cada item se serializa a texto legible para pFAE.

### Droga

Si el item es una droga, el texto es:

`Droga dosis unidad via`

Ejemplo:

`Propofol 150 mg EV`

### Acción

Si el item es una acción, el texto es:

`Acción detalle`

Ejemplo:

`Intubación detalle libre`

## Ejemplo completo válido

```json
{
  "medico": {
    "nombre": "Alejandro",
    "apellido": "Figar"
  },
  "induccion": [
    {
      "nombre": "Inducción estándar",
      "items": ["Propofol 150 mg EV", "Fentanilo 100 mcg EV"]
    }
  ],
  "mantenimiento": [],
  "despertar": []
}
```

## Ejemplo con fases vacías

```json
{
  "medico": {
    "nombre": "Alejandro",
    "apellido": "Figar"
  },
  "induccion": [],
  "mantenimiento": [],
  "despertar": []
}
```

## Qué información viaja en el QR

- `medico`
- `induccion`
- `mantenimiento`
- `despertar`

## Qué información no viaja

- No se incluyen datos de pacientes.
- No se incluyen historiales clínicos.
- No se incluyen actos médicos reales.
- No se incluyen datos de autenticación.

## Validación mínima

- El JSON debe ser válido.
- Cada fase puede recibir 0 o más combos.
- Cada combo debe tener `nombre` e `items`.
- Cada item debe ser una cadena formateada.
