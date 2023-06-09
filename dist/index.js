"use strict";
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btnGuardar');
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhY2lvbiI6MTAyMjM0ODc3NCwiY29ycmVvIjoiZXNhbmNoZXoxOTg4QGdtYWlsLmNvbSIsImlhdCI6MTY4MTYwODM4MCwiZXhwIjoxNjgyMjEzMTgwfQ.q5KH3EX0r_x9nBfPw_Sdlo5Qve9SKNqBq52XFxxsXnQ');
let requestOptionsGet = {
    method: 'GET',
    headers: myHeaders,
};
fetch("https://apiestudiantes.maosystems.dev/estudiantes", requestOptionsGet)
    .then(response => response.json())
    .then(result => {
    const studentsDataDiv = document.getElementById('students-data');
    const estudiantes = result.data;
    const table = document.createElement('table');
    table.classList.add("table", "table-striped", "table-bordered");
    const header = document.createElement('tr');
    header.classList.add("thead-dark");
    header.innerHTML = `
    <th scope="col">Id</th>
    <th scope="col">Tipo de identificación</th>
    <th scope="col">Número de Documento</th>
    <th scope="col">Nombre</th>
    <th scope="col">Apellido</th>
    <th scope="col">Celular</th>
    <th scope="col">Email</th>
    <th scope="col">LinkedIn</th>
    <th scope="col">GitHub</th>
    <th scope="col">Opciones</th>`;
    table.appendChild(header);
    estudiantes.forEach(estudiante => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <tbody >
      <tr>
        <td scope="row">${estudiante.estudiante_id}</td>
        <td>${estudiante.estudiante_tipoIdentificacion}<td/>
        <td>${estudiante.estudiante_numeroIdentificacion}</td>
        <td>${estudiante.estudiante_nombres}</td>
        <td>${estudiante.estudiante_apellidos}</td>
        <td>${estudiante.estudiante_celular}</td>
        <td>${estudiante.estudiante_correo}</td>
        <td><a href="https://www.linkedin.com/">${estudiante.estudiante_linkedin}</a></td>
        <td><a href="https://github.com/">${estudiante.estudiante_github}</a></td>
        <td>
          <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
            <button type="button" class="btn btn-outline-primary">Actualizar</button>
            <button type="button" class="btn btn-outline-primary">Estado</button>
          </div>
        </td>
      </tr>
    </tbody>`;
        table.appendChild(row);
    });
    studentsDataDiv.appendChild(table);
})
    .catch(error => console.log('error', error));
btnGuardar.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Ingreso a la validación del formulario');
    //Obtener los valores de los inputs
    const tipoDocumento = document.getElementById('tipoDocumento');
    const numeroIdentificacion = document.getElementById('numeroIdentificacion');
    const nombres = document.getElementById('nombres');
    const apellidos = document.getElementById('apellidos');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const linkedin = document.getElementById('linkedin');
    const github = document.getElementById('github');
    const tipoDocumentoNumber = Number(tipoDocumento.value);
    const numeroIdentificacionNumber = Number(numeroIdentificacion.value);
    const telefonoNumber = Number(telefono.value);
    let raw = JSON.stringify({
        'tipoDocumento': tipoDocumentoNumber,
        'numeroIdentificacion': numeroIdentificacionNumber,
        'nombres': nombres.value,
        'apellidos': apellidos.value,
        'telefono': telefonoNumber,
        'correo': correo.value,
        'linkedin': linkedin.value,
        'github': github.value,
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    fetch("https://apiestudiantes.maosystems.dev/estudiantes", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
});
