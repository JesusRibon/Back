📘 README – Prueba Técnica Fullstack (Backend)

Este proyecto es un MVP para la gestión de deudas entre amigos, desarrollado en Node.js + Express + PostgreSQL + JWT + Cache en memoria (tipo Redis).

📂 Estructura del proyecto
backend/
  src/
    config/
      db.js            # Conexión a PostgreSQL
      redisCache.js    # Cache simulado en memoria
    controllers/
      authController.js
      debtController.js
    middleware/
      authMiddleware.js
    models/
      User.js          # Clase para usuarios
      Debt.js          # Clase para deudas
    routes/
      authRoutes.js
      debtRoutes.js
    index.js           # Arranque del servidor
  .env                 # Variables de entorno
  package.json
  README.md