# Capacitor y Android para MiFAE

Este documento explica paso a paso cómo preparar y generar una APK Android usando Capacitor.
Está pensado para alguien que no conoce Android.

## ¿Qué es Capacitor?

Capacitor es una herramienta que empaqueta una webapp (HTML/CSS/JS) dentro de una app nativa.
En MiFAE se usa para crear el proyecto Android y ejecutar la interfaz React en un WebView.

## ¿Por qué usar Capacitor en MiFAE?

- Mantiene la misma base de código React/Vite.
- Genera un proyecto Android listo para abrir en Android Studio.
- Permite instalar la app en el celular como APK y usarla offline.
- No requiere backend ni servidor una vez instalada.

## Requisitos mínimos en Windows

1. Node.js 18+ y npm.
2. Android Studio.
3. Java JDK 11 o 17.
4. Cable USB para un celular físico.

## Cómo instalar Android Studio

1. Descarga Android Studio desde el sitio oficial.
2. Instala con la configuración recomendada.
3. Abre Android Studio y asegúrate de instalar el Android SDK.
4. Verifica que el SDK Manager tenga una versión de Android instalada.

## Cómo activar el celular para depuración USB

1. En el celular, abre `Ajustes`.
2. Busca `Acerca del teléfono`.
3. Toca varias veces sobre `Número de compilación` hasta activar opciones de desarrollador.
4. Vuelve a `Ajustes` y abre `Opciones de desarrollador`.
5. Activa `Depuración USB`.
6. Conecta el celular por USB y acepta el prompt de autorización RSA.

## Primer setup de Capacitor en el proyecto

1. Instala dependencias del proyecto:

```bash
npm install
```

2. Agrega las dependencias de Capacitor:

```bash
npm install
```

> En este repositorio ya están declaradas `@capacitor/core`, `@capacitor/cli` y `@capacitor/android`.

3. Inicializa Capacitor (la configuración ya está en `capacitor.config.ts`):

```bash
npx cap init MiFAE ar.com.mifae.app --web-dir=dist
```

4. Añade Android a tu proyecto:

```bash
npm run android:add
```

Esto crea la carpeta `android/` con el proyecto nativo.

## Cómo sincronizar la build web con Android

Cada vez que hagas cambios en la app web, ejecuta:

```bash
npm run android:sync
```

Este comando:

- genera el build web
- copia el contenido de `dist` al proyecto Android
- actualiza los recursos nativos necesarios

## Cómo abrir Android Studio

```bash
npm run android:open
```

Android Studio abre el proyecto `android/`.

## Cómo generar un APK debug

1. Ejecuta:

```bash
npm run build
npm run android:sync
npm run android:open
```

2. En Android Studio selecciona el dispositivo físico o emulador.
3. Haz clic en `Run` -> `app`.
4. El APK debug se instala en el celular.

### Dónde queda el APK

El archivo debug suele quedar en:

`android/app/build/outputs/apk/debug/app-debug.apk`

## Cómo instalar el APK manualmente

1. Copia `app-debug.apk` al celular.
2. Abre el archivo desde el explorador del celular.
3. Acepta la instalación desde orígenes desconocidos si es necesario.

## Problemas frecuentes y soluciones

- Dispositivo no detectado: activa `Depuración USB` y acepta la autorización en el celular.
- Error de Java: instala JDK 11 o 17 y configura `JAVA_HOME`.
- Faltan paquetes de SDK: abre Android Studio -> SDK Manager.
- Error al abrir Android Studio desde terminal: usa la terminal normal de Windows, no WSL.

## Notas sobre la app Android

- La APK incluye todos los archivos necesarios para funcionar offline.
- No depende de WiFi ni datos móviles después de instalada.
- No se usa color verde en la UI nativa ni en la web.
- La app instalada se llama `MiFAE`.

## Íconos Android

Capacitor copia los recursos nativos desde `android/app/src/main/res/mipmap-*/`.
Si necesitas reemplazar el icono, usa ese directorio con tamaños estándar:

- mdpi: 48x48
- hdpi: 72x72
- xhdpi: 96x96
- xxhdpi: 144x144
- xxxhdpi: 192x192

## Qué debes documentar para otro usuario

- Cómo ejecutar `npm run dev` en Windows.
- Cómo ejecutar `npm run build`.
- Cómo sincronizar con Android.
- Cómo abrir Android Studio.
- Cómo instalar en el celular.
- Dónde queda el APK generado.
