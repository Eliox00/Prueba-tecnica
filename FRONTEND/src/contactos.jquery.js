import $ from 'jquery';

const API_URL = '/api/contactos';

const LIMITES = {
  tipoIdentificacion: 3,
  identificacion: 20,
  nombres: 50,
  apellido: 50,
  telefono: 10,
  direccion: 120,
  correoElectronico: 120
};

function obtenerDatosFormulario() {
  return {
    id: $('#id').val(),
    tipoIdentificacion: $('#tipoIdentificacion').val(),
    identificacion: $('#identificacion').val().trim(),
    nombres: $('#nombres').val().trim(),
    apellido: $('#apellido').val().trim(),
    telefono: $('#telefono').val().trim(),
    direccion: $('#direccion').val().trim(),
    correoElectronico: $('#correoElectronico').val().trim(),
    cliente: $('#cliente').is(':checked')
  };
}

function mostrarError(campo, mensaje) {
  const $campo = $(`#${campo}`);
  $campo.addClass('is-invalid').removeClass('is-valid');
  $(`[data-error-for="${campo}"]`).text(mensaje);
}

function limpiarError(campo) {
  const $campo = $(`#${campo}`);
  $campo.removeClass('is-invalid').addClass('is-valid');
  $(`[data-error-for="${campo}"]`).text('');
}

function limpiarValidacion() {
  $('#form-contactos').find('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
  $('#form-contactos').find('[data-error-for]').text('');
}

function validarFormulario() {
  const data = obtenerDatosFormulario();
  let valido = true;

  const requeridos = [
    ['tipoIdentificacion', 'Seleccione el tipo de identificación'],
    ['identificacion', 'La identificación es obligatoria'],
    ['nombres', 'Los nombres son obligatorios'],
    ['apellido', 'El apellido es obligatorio'],
    ['telefono', 'El teléfono es obligatorio'],
    ['direccion', 'La dirección es obligatoria'],
    ['correoElectronico', 'El correo electrónico es obligatorio']
  ];

  requeridos.forEach(([campo, mensaje]) => {
    if (!data[campo]) {
      mostrarError(campo, mensaje);
      valido = false;
    } else if (String(data[campo]).length > LIMITES[campo]) {
      mostrarError(campo, `Máximo ${LIMITES[campo]} caracteres`);
      valido = false;
    } else {
      limpiarError(campo);
    }
  });

  if (data.telefono && !/^\d{10}$/.test(data.telefono)) {
    mostrarError('telefono', 'El teléfono debe tener exactamente 10 dígitos numéricos');
    valido = false;
  }

  if (data.correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) {
    mostrarError('correoElectronico', 'Ingrese un correo electrónico válido');
    valido = false;
  }

  return valido;
}

function mostrarAlerta(tipo, mensaje) {
  const $alerta = $('#alerta-formulario');
  $alerta
    .removeClass('d-none alert-success alert-danger')
    .addClass(`alert-${tipo}`)
    .text(mensaje);

  window.setTimeout(() => {
    $alerta.addClass('d-none');
  }, 4000);
}

function modoCrear() {
  $('#form-contactos')[0].reset();
  $('#id').val('');
  $('#btn-guardar').text('Guardar');
  $('#btn-cancelar').addClass('d-none');
  limpiarValidacion();
}

function modoEditar(contacto) {
  $('#id').val(contacto.Id);
  $('#tipoIdentificacion').val(contacto.TipoIdentificacion);
  $('#identificacion').val(contacto.Identificacion);
  $('#nombres').val(contacto.Nombres);
  $('#apellido').val(contacto.Apellido);
  $('#telefono').val(contacto.Telefono);
  $('#direccion').val(contacto.Direccion);
  $('#correoElectronico').val(contacto.CorreoElectronico);
  $('#cliente').prop('checked', Boolean(contacto.Cliente));
  $('#btn-guardar').text('Actualizar');
  $('#btn-cancelar').removeClass('d-none');
  limpiarValidacion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTabla(contactos) {
  const $tbody = $('#tabla-contactos tbody');
  $tbody.empty();

  if (!contactos.length) {
    $tbody.append(
      '<tr><td colspan="9" class="text-center text-muted py-4">No hay contactos registrados</td></tr>'
    );
    return;
  }

  contactos.forEach((contacto) => {
    const cliente = contacto.Cliente ? 'Sí' : 'No';
    const fila = `
      <tr>
        <td>${contacto.TipoIdentificacion}</td>
        <td>${contacto.Identificacion}</td>
        <td>${contacto.Nombres}</td>
        <td>${contacto.Apellido}</td>
        <td>${contacto.Telefono}</td>
        <td>${contacto.Direccion}</td>
        <td>${contacto.CorreoElectronico}</td>
        <td>${cliente}</td>
        <td>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-primary btn-editar">Editar</button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar">Eliminar</button>
          </div>
        </td>
      </tr>
    `;
    const $fila = $(fila);
    $fila.find('.btn-editar').data('contacto', contacto);
    $fila.find('.btn-eliminar').data('id', contacto.Id);
    $tbody.append($fila);
  });
}

function consultarContactos() {
  return $.ajax({
    url: API_URL,
    method: 'GET',
    dataType: 'json'
  })
    .done(renderTabla)
    .fail((xhr) => {
      const mensaje = xhr.responseJSON?.error || 'No fue posible consultar los contactos';
      mostrarAlerta('danger', mensaje);
    });
}

function guardarContacto(event) {
  event.preventDefault();

  if (!validarFormulario()) {
    mostrarAlerta('danger', 'Revise los campos del formulario');
    return;
  }

  const data = obtenerDatosFormulario();
  const editando = Boolean(data.id);
  const payload = { ...data };
  delete payload.id;

  $.ajax({
    url: editando ? `${API_URL}/${data.id}` : API_URL,
    method: editando ? 'PUT' : 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload)
  })
    .done(() => {
      mostrarAlerta('success', editando ? 'Contacto actualizado' : 'Contacto guardado');
      modoCrear();
      consultarContactos();
    })
    .fail((xhr) => {
      const mensaje = xhr.responseJSON?.error || 'No fue posible guardar el contacto';
      mostrarAlerta('danger', mensaje);
    });
}

function eliminarContacto(id) {
  if (!window.confirm('¿Desea eliminar este contacto?')) {
    return;
  }

  $.ajax({
    url: `${API_URL}/${id}`,
    method: 'DELETE'
  })
    .done(() => {
      mostrarAlerta('success', 'Contacto eliminado');
      modoCrear();
      consultarContactos();
    })
    .fail((xhr) => {
      const mensaje = xhr.responseJSON?.error || 'No fue posible eliminar el contacto';
      mostrarAlerta('danger', mensaje);
    });
}

export function initContactos() {
  consultarContactos();

  $('#form-contactos').on('submit', guardarContacto);
  $('#btn-cancelar').on('click', modoCrear);
  $('#telefono').on('input', function limitarTelefono() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
  });

  $('#tabla-contactos').on('click', '.btn-editar', function editar() {
    modoEditar($(this).data('contacto'));
  });

  $('#tabla-contactos').on('click', '.btn-eliminar', function eliminar() {
    eliminarContacto($(this).data('id'));
  });
}

export function destroyContactos() {
  $('#form-contactos').off('submit');
  $('#btn-cancelar').off('click');
  $('#telefono').off('input');
  $('#tabla-contactos').off('click');
}
