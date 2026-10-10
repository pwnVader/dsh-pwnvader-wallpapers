# dsh-pwnvader-wallpapers

Wallpapers independientes: tres escenas procedurales propias (aurora, ocean, space), seis escenas offline de ascii.rest y archivos locales PNG/JPEG/WebP/AVIF/MP4/WebM. Brillo, oscurecimiento, velocidad, FPS, ajuste, rotación, pausa y ahorro de energía. Los videos siempre se reproducen sin audio.

Autor del código de aplicación: [pwnVader](https://github.com/pwnVader). Versión 1.0.0. Licencia MIT; consulta [LICENSE](LICENSE) y [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Compatibilidad e instalación

<img width="1567" height="1061" alt="image" src="https://github.com/user-attachments/assets/a05630b5-46b9-44fb-b323-e0d8e52f8136" />

<img width="1556" height="1054" alt="image" src="https://github.com/user-attachments/assets/07069814-666e-4416-ba2a-20f1db1184f5" />

<img width="1558" height="1052" alt="Recording 2026-10-09 214121" src="https://github.com/user-attachments/assets/1ef5d18d-b433-452c-af7b-3a42d0d61b46" />

DeepSeek Harness Desktop/Web **0.2.0-rc.2**, Node >=22.19.0. Incluye lib/ precompilado y el wrapper __ModuleLoader__ requerido. No necesita los otros plugins de esta colección.

Desde una terminal donde dsh esté disponible:

```powershell
dsh plugin --profile desktop add "link:C:/ruta/dsh-pwnvader-wallpapers"
```

Si dsh no está en PATH, invoca la ruta absoluta del CLI instalado. Cierra la aplicación completamente desde la bandeja y vuelve a abrirla. No añadas un overlay si ya instalaste el bundle. Los botones de la esquina inferior derecha abren los controles; también se añaden a Ajustes generales.

## Desarrollo

```sh
npm install
npm test
npm run build
npm pack
```

El código fuente está en src/, el build usa esbuild 0.28.2 y React lo proporciona el Harness. No empaquetes node_modules/. El peer de DSH es opcional para compilar, pero obligatorio en el runtime.

## Datos y privacidad

Los ajustes se guardan en localStorage y un único archivo en IndexedDB. No hay solicitudes de red para las escenas ni subida de archivos. Imágenes hasta 64 MiB; videos hasta 200 MiB. La compatibilidad de codecs depende del navegador/Electron. El modo reducido y las pestañas ocultas detienen la animación. Eliminar archivo borra el blob guardado.

## Procedencia y pruebas

Consulta [VALIDACION.md](VALIDACION.md) para el alcance comprobado. Este paquete tiene su propio controlador, estado, UI y ciclo de vida. No instala ni duplica el plugin combinado anterior.

Inspiración: [opencode-wallpapers](https://github.com/vaprdev/opencode-wallpapers). No se incluye código de ese repositorio. Las seis escenas vendor/ascii-rest/ sí contienen código externo MIT; sus créditos se conservan.
