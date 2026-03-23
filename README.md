# 🏠 Home Manager App

> Un proyecto robusto basado en el arquetipo de **sysec-front**, diseñado para la escalabilidad, seguridad y calidad de código bajo el enfoque **Shift Left**.

---

## 🏗️ Arquitectura y Diseño

Este proyecto implementa una arquitectura **N-Tier** combinada con **Atomic Design** para garantizar una separación de responsabilidades clara y modular.

### Capas del Sistema
- **`src/ui/`**: Capa de presentación que utiliza **Atomic Design** (Atoms, Molecules, Organisms) y **Pages**.
- **`src/infrastructure/`**: Capa de servicios y repositorios. Contiene la clase base `Api.ts` para comunicaciones estandarizadas vía Axios.
- **`src/store/`**: Gestión de estado global utilizando **Redux Toolkit**.
- **`src/context/`**: Proveedores de contexto para estados transversales (ej. Modales).
- **`src/hooks/`**: Ganchos personalizados reutilizables.

---

## 🛡️ Shift Left & Seguridad

La seguridad no es el último paso, es el primero. Hemos integrado protecciones automáticas en cada commit:

### Comandos de Calidad
- **`npm run security-check`**: Ejecuta `npm audit` para vulnerabilidades de red y `eslint` con plugins de **Security** y **SonarJS** para detectar "code smells" y fallos lógicos.
- **`npm run test:coverage`**: Ejecuta la suite de pruebas con **Vitest**. El proyecto exige un **mínimo de 90% de cobertura** (actualmente al 100%).

### Automatización con Husky
- **`pre-commit`**: Valida automáticamente la seguridad y la cobertura antes de permitir un commit.
- **`commit-msg`**: Valida que los mensajes de commit sigan el estándar de **Conventional Commits**.

---

## 🚀 Scripts del Proyecto

| Script | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo (Vite). |
| `npm run build` | Compila el proyecto para producción con TypeScript. |
| `npm run security-check` | Valida vulnerabilidades y calidad de código. |
| `npm run check-updates` | Muestra qué dependencias tienen versiones nuevas (Manual). |
| `npm run test:run` | Ejecuta todos los tests unitarios. |
| `npm run test:coverage` | Genera el reporte de cobertura de código. |

---

## 🛠️ Stack Tecnológico

- **React 19 + TypeScript 5.9** (Modo estricto)
- **Vite** (Build Tool ultra-rápido)
- **Redux Toolkit** (Estado Global)
- **Tailwind CSS** (Estilos modernos y responsivos)
- **Vitest + Testing Library** (Estrategia de pruebas)
- **Husky + Commitlint** (Gobernanza de Git)

---

## 🏁 Inicio Rápido

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Levantar proyecto**:
   ```bash
   npm run dev
   ```

3. **Verificar calidad**:
   ```bash
   npm run security-check
   ```
