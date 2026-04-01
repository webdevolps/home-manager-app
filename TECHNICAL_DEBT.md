# Deuda Técnica (Technical Debt)

Este documento centraliza las áreas del código que, aunque funcionales o justificadas por contexto, violan algunos principios de diseño limpio o requerirán un refactor posterior.

## 📝 Lista de Pendientes (Wishlist)

### 1. Desacoplar Infraestructura del Estado de React (`src/infrastructure/Api.ts`)
- **Descripción**: La clase `ApiImpl` (Capa de Infraestructura) requiere accesos directos al Store de Redux global mediante `injectStore` o llamadas directas a `store.getState()`. Además, despacha acciones como `logout()` directamente ante un HTTP 401. Esto rompe parcialmente la inversión de dependencias y contamina la capa de infraestructura con lógica de estado exclusiva de React/Redux.
- **Acción a futuro**: Refactorizar la abstracción de `ApiImpl`. Usar *closures* en el interceptor, callbacks inyectados desde el contexto de la aplicación, o instanciar la API de manera local pasándole el token y un manejador `onUnauthorized` definido por el consumidor que sea quien despache `logout()`.

### 2. Generalizar Componentes y Hooks Atómicos y Reusables
- **Descripción**: Mantener vigilancia continua sobre nuevos flujos. Verificar la generalización y correcto uso del Atomic Design (limitar lógicas pesadas o estado asíncrono profundo en moléculas o átomos si pueden levantarse a Páginas u Organismos orquestadores, tal como se hizo en `EmployeesPage` y `EmployeesTable`).

*(Agrega nuevos hallazgos aquí bajo demanda)*



Para el caso de agnes-legacy, vamos a crear una pieza de logica en el MF que permita que el usuario navegue hasta el, pero que si no viene con el tenaantId, lo redirija a la pagina de login. Hay que añadir un mecanismo de seguridad sofisticado para dejarlo navegar con token y tenan-id si el usuario decide hacer launch que se lleve toda es info a la pestaña correspondiente y tambien ofrecer un link de ingreso rapido a clientes, si no tienen tenan-id tendriamos que redirigirlos al login.