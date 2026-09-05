import { useEffect } from 'react';
import { destroyContactos, initContactos } from './contactos.jquery.js';

export default function App() {
  useEffect(() => {
    initContactos();
    return () => destroyContactos();
  }, []);

  return (
    <div className="page">
      <div className="container py-4 py-md-5">
        <div className="card shadow-sm form-card">
          <div className="card-body p-4 p-md-5">
            <h1 className="form-title text-center mb-4">CONTACTOS</h1>

            <form id="form-contactos" noValidate>
              <input type="hidden" id="id" name="id" value="" />

              <div className="row g-3">
                <div className="col-md-4">
                  <label htmlFor="tipoIdentificacion" className="form-label">
                    Tipo de identificación
                  </label>
                  <select
                    id="tipoIdentificacion"
                    name="tipoIdentificacion"
                    className="form-select"
                    maxLength={3}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="CC">CC</option>
                    <option value="TI">TI</option>
                    <option value="NIT">NIT</option>
                  </select>
                  <div className="invalid-feedback" data-error-for="tipoIdentificacion"></div>
                </div>

                <div className="col-md-8">
                  <label htmlFor="identificacion" className="form-label">
                    Identificación
                  </label>
                  <input
                    type="text"
                    id="identificacion"
                    name="identificacion"
                    className="form-control"
                    maxLength={20}
                    required
                  />
                  <div className="invalid-feedback" data-error-for="identificacion"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="nombres" className="form-label">
                    Nombres
                  </label>
                  <input type="text" id="nombres" name="nombres" className="form-control" maxLength={50} required />
                  <div className="invalid-feedback" data-error-for="nombres"></div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input type="text" id="apellido" name="apellido" className="form-control" maxLength={50} required />
                  <div className="invalid-feedback" data-error-for="apellido"></div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    className="form-control"
                    inputMode="numeric"
                    maxLength={10}
                    required
                  />
                  <div className="invalid-feedback" data-error-for="telefono"></div>
                </div>

                <div className="col-md-8">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input type="text" id="direccion" name="direccion" className="form-control" maxLength={120} required />
                  <div className="invalid-feedback" data-error-for="direccion"></div>
                </div>

                <div className="col-md-8">
                  <label htmlFor="correoElectronico" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correoElectronico"
                    name="correoElectronico"
                    className="form-control"
                    maxLength={120}
                    required
                  />
                  <div className="invalid-feedback" data-error-for="correoElectronico"></div>
                </div>

                <div className="col-md-4 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input type="checkbox" id="cliente" name="cliente" className="form-check-input" value="1" />
                    <label htmlFor="cliente" className="form-check-label">
                      Cliente
                    </label>
                  </div>
                </div>
              </div>

              <div id="alerta-formulario" className="alert mt-3 d-none" role="alert"></div>

              <div className="d-flex gap-2 mt-4">
                <button type="submit" id="btn-guardar" className="btn btn-primary">
                  Guardar
                </button>
                <button type="button" id="btn-cancelar" className="btn btn-outline-secondary d-none">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card shadow-sm mt-4 table-card">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Listado de contactos</h2>
            <div className="table-responsive">
              <table className="table table-hover align-middle" id="tabla-contactos">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Identificación</th>
                    <th>Nombres</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Correo</th>
                    <th>Cliente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
