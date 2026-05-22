# Despliegue de MiFAE en GitHub Pages

## Preparar el repositorio

1. Crea un repositorio en GitHub llamado `mifae`.
2. Clona el repositorio en tu máquina local o configura el remoto en tu proyecto existente.
3. Asegúrate de que `package.json` y `vite.config.js` estén configurados correctamente.

## Publicar en GitHub

1. Agrega los cambios:

```bash
git add .
```

2. Haz commit:

```bash
git commit -m "Configurar MiFAE como PWA y despliegue GitHub Pages"
```

3. Empuja a la rama principal:

```bash
git push origin main
```

## Configurar GitHub Pages

1. Ve a la página del repositorio en GitHub.
2. Ingresa a `Settings` > `Pages`.
3. En `Source`, selecciona `gh-pages`.
4. Guarda la configuración.

## Cómo funciona el workflow

El workflow de GitHub Actions `deploy.yml` hace lo siguiente:

- instala dependencias
- ejecuta `npm run build`
- publica el contenido de `dist` en la rama `gh-pages`

## URL final esperada

La URL final será:

```
https://FranciscoX78.github.io/mifae/
```

Si el nombre del repositorio cambia, actualiza la propiedad `base` en `vite.config.js` al nombre correcto y repite el build.

## Verificar la URL

1. Espera a que el workflow termine en GitHub Actions.
2. Abre la URL final.
3. Verifica que MiFAE se cargue y muestre la app.
4. Prueba la instalación PWA en Chrome Android.
