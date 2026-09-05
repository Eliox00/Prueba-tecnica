# Backend - Contactos

API en Node.js (Express) que consume los procedimientos almacenados de SQL Server.

## Configuración

1. Copiar `.env.example` a `.env`
2. Ajustar usuario, contraseña y servidor de SQL Server
3. Instalar dependencias y arrancar:

```bash
npm install
npm start
```

## Endpoints

| Método | Ruta | Procedimiento |
| --- | --- | --- |
| GET | `/api/contactos` | `sp_Contactos_Consultar` |
| POST | `/api/contactos` | `sp_Contactos_Insertar` |
| PUT | `/api/contactos/:id` | `sp_Contactos_Editar` |
| DELETE | `/api/contactos/:id` | `sp_Contactos_Eliminar` |
