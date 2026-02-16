# playwright-izertis-guru99

# Proyecto de Automatización QA utilizando Playwright + TypeScript para la prueba técnica de Izertis

Este proyecto contiene tests automatizados para práctica utilizando Playwright y TypeScript aplicando arquitectura Page Object Model (POM) y ejecuciión de varios exploradores (Chromium y Firefox).

## Requisitos

- Node.js ≥ 20
- npm ≥ 10
- Navegadores que instalará Playwright automáticamente (Chromium, Firefox)

## Instalación del proyecto

1. Clonar el repositorio:

``
git clone https://github.com/Zemanser/Prueba-playwright-izertis-guru99.git

cd /izertis-playwright

2. Instalar dependencias:

npm install

3. Instalar navegadores de Playwright:

npx playwright install

## Configuración

No requiere variables de entorno actualmente.
La URL base está definida directamente en los Page Objects o en el archivo playwright.config.ts.

## Estructura del proyecto

/data           -> Datos de prueba reutilizables
/locators       -> Selectores centralizados
/pages          -> Clases Page Object con la lógica de interacción
/tests          -> Archivos de test
/screenshots    -> Evidencias generadas
playwright.config.ts
package.json
tsconfig.json
README.md

## Comandos disponibles

# Ejecutar todos los tests:

npx playwright test


# Ejecutar en modo UI:

npx playwright test --ui


# Ejecutar en modo visible (no headless):

npx playwright test --headed


# Ejecutar en modo debug:

npx playwright test --debug


# Abrir HTML report:

npx playwright show-report


# Ejecutar tests en un navegador específico:

npx playwright test --project=chromium


# Ejecutar tests con trazas y videos (según configuración playwright.config.ts):

npx playwright test --trace on --video retain-on-failure


