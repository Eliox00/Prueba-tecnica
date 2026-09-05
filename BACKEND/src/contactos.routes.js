import { Router } from 'express';
import { getPool, sql } from './db.js';

const router = Router();

function mapContacto(body) {
  return {
    tipoIdentificacion: String(body.tipoIdentificacion || '').trim().toUpperCase(),
    identificacion: String(body.identificacion || '').trim(),
    nombres: String(body.nombres || '').trim(),
    apellido: String(body.apellido || '').trim(),
    telefono: String(body.telefono || '').trim(),
    direccion: String(body.direccion || '').trim(),
    correoElectronico: String(body.correoElectronico || '').trim(),
    cliente: body.cliente === true || body.cliente === 1 || body.cliente === '1' || body.cliente === 'true'
  };
}

function bindContacto(request, data) {
  return request
    .input('TipoIdentificacion', sql.Char(3), data.tipoIdentificacion)
    .input('Identificacion', sql.VarChar(20), data.identificacion)
    .input('Nombres', sql.VarChar(50), data.nombres)
    .input('Apellido', sql.VarChar(50), data.apellido)
    .input('Telefono', sql.VarChar(10), data.telefono)
    .input('Direccion', sql.VarChar(120), data.direccion)
    .input('CorreoElectronico', sql.VarChar(120), data.correoElectronico)
    .input('Cliente', sql.Bit, data.cliente);
}

router.get('/', async (_req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().execute('sp_Contactos_Consultar');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = mapContacto(req.body);
    const pool = await getPool();
    await bindContacto(pool.request(), data).execute('sp_Contactos_Insertar');
    res.status(201).json({ message: 'Contacto guardado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = mapContacto(req.body);
    const pool = await getPool();
    await bindContacto(pool.request().input('Id', sql.Int, id), data).execute('sp_Contactos_Editar');
    res.json({ message: 'Contacto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pool = await getPool();
    await pool.request().input('Id', sql.Int, id).execute('sp_Contactos_Eliminar');
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
