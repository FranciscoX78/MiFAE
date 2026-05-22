# Flujo de desarrollo: Web + Android (Capacitor)

Este flujo mantiene la app web en Windows y añade la capacidad de generar una APK para Android.

## 1. Desarrollo web en Windows

```bash
npm install
npm run dev
```

- Trabaja en tu navegador.
- Revisa la experiencia, el estilo y la generación del QR.
- El modo web sigue funcionando como antes.

## 2. Probar en Android cuando el cambio está listo

Cuando quieras validar el build en Android, ejecuta:

```bash
npm run build
npm run android:sync
npm run android:open
```

- `npm run build` genera los archivos optimizados.
- `npm run android:sync` copia esos archivos al proyecto Android.
- `npm run android:open` abre Android Studio.

## 3. Ejecutar en un celular Android

- Conecta el celular por USB.
- Activa depuración USB en Opciones de desarrollador.
- Selecciona el dispositivo en Android Studio.
- Ejecuta `Run app`.

La app se instalará como APK debug y debe abrir sin internet.

## 4. Probar sin internet

- Cierra la app en el celular.
- Apaga WiFi y datos móviles.
- Vuelve a abrir MiFAE.
- Verifica que los combos guardados sigan disponibles.
- Genera el QR sin conexión.

## 5. Nueva modificación

Después de cambiar el código de React, repite:

```bash
npm run build
npm run android:sync
```

Luego vuelve a ejecutar o reinstala la app desde Android Studio.

## 6. Diferencia entre el modo web y la APK

- En Windows sigues usando `npm run dev`.
- En Android usas `npm run android:sync` y `npm run android:open`.
- El código base es el mismo.
- La app Android usa `localStorage` dentro de un WebView.

## 7. Qué se mantiene

- La versión web no se rompe.
- Los estilos actuales se conservan.
- La pantalla del QR sigue siendo elegante y profesional.
- No se agrega color verde.
- No se elimina ningún componente existente.

## 8. Recomendación

Para cada cambio grande:

1. Verifica en web con `npm run dev`.
2. Genera el build con `npm run build`.
3. Sincroniza con Android.
4. Abre Android Studio.
5. Prueba en el celular.
