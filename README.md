# Prueba técnica — Contactos (Compañía X)

Mini aplicativo web para gestionar contactos: formulario, listado, edición y eliminación.

## Entrega

Carpetas:

- `FRONTEND` — React + Bootstrap + jQuery
- `BACKEND` — Node.js (Express) + SQL Server
- `BASEDATOS` — scripts de SQL Server

## Requisitos

- Node.js 18 o superior
- SQL Server (Express, Developer o LocalDB)

## 1. Base de datos

En SQL Server Management Studio ejecuta, en este orden:

1. `BASEDATOS/01_crear_base_datos.sql`
2. `BASEDATOS/02_tabla_contactos.sql`
3. `BASEDATOS/03_procedimientos_almacenados.sql`

Queda la base `TEST_FORM`, la tabla `Contactos` y los procedimientos:

- `sp_Contactos_Consultar`
- `sp_Contactos_Insertar`
- `sp_Contactos_Editar`
- `sp_Contactos_Eliminar`

Desde la carpeta raíz del proyecto también puedes usar:

```bash
npm start      # backend
npm run dev    # frontend
```

## 2. Backend

```bash
cd BACKEND
copy .env.example .env
```

Edita `.env` con tu usuario y contraseña de SQL Server. Luego:

```bash
npm install
npm start
```

API en http://localhost:3000

## 3. Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Interfaz en http://localhost:5173

## Campos del formulario

| Campo | Tipo | Máximo |
| --- | --- | --- |
| Tipo de identificación (CC, TI, NIT) | Selección | 3 |
| Identificación | Texto | 20 |
| Nombres | Texto | 50 |
| Apellido | Texto | 50 |
| Teléfono | Numérico | 10 |
| Dirección | Texto | 120 |
| Correo electrónico | Texto | 120 |
| Cliente | Booleano | 1 |
