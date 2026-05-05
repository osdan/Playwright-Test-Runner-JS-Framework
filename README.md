# 🚀 Playwright Test Automation Framework (JS)

Framework de automatización de pruebas End-to-End construido con **Playwright + JavaScript**, basado en arquitectura **Page Object Model (POM)** y diseñado para ejecución en pipelines CI/CD.

---

## 🧱 Architecture Overview

Este framework está diseñado para mantener escalabilidad, reutilización y separación de responsabilidades:

- 🧪 Tests desacoplados de la lógica de UI
- 📄 Page Object Model (POM)
- 🧰 Helpers reutilizables
- 📊 Data-driven testing con fixtures
- ⚙️ Configuración centralizada de Playwright

---

## 📂 Project Structure

```bash
📦 project-root/
├── 📁 tests/                 # E2E test cases
├── 📁 pages/                 # Page Object Model
├── 📁 utils/                 # Helpers & utilities
├── 📁 fixtures/              # Test data & configs
├── 📁 reports/               # Execution reports
├── ⚙️ playwright.config.js
├── 📦 package.json