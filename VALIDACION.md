# Validación — 2026-10-09

- 5/5 pruebas unitarias: node tests/core.test.mjs.
- Pruebas de navegador: nueve escenas offline, pausa y movimiento reducido, imagen y video local persistentes tras recarga, video silenciado, eliminación de blob y disposición Cordis.
- Los tres plugins se cargaron juntos, sin errores de página, y se retiraron independientemente.
- Runtime: DSH Web 0.2.0-rc.2 aislado, carga por overlay; Desktop no instalado ni reiniciado.
- Build: esbuild 0.28.2; cliente precompilado con ModuleLoader y exports ./client.
- SHA-256 lib/client.js: 33b78e0adf94754e7a77364526236030ea1c80fd4c3bb6e61776620b6f10acb1.

## Límites de la comprobación

No se ejecutaron turnos reales de agente, ni se instaló el paquete público en Desktop. En Pets, las pruebas de prioridad de estados usan fixtures; render, slots y uiSession sí se componen en el runtime real. La prueba de video usa un WebM generado localmente; no verifica todos los codecs MP4 del sistema. La carga conjunta verifica convivencia, no una instalación en el perfil Desktop reservado.

## Repetir las pruebas

Usa un DSH_HOME aislado, un overlay que apunte al archivo lib/index.js de este paquete y el URL autenticado que imprime el CLI. Nunca publiques el token. Instala Playwright como herramienta de desarrollo aparte (npm install --no-save playwright y npx playwright install chromium), define DSH_TEST_URL y ejecuta npm run test:browser. Pets añade npm run test:pixel. Los tests escriben artefactos en artifacts/, carpeta ignorada.
