'use strict';

$(function() {
	
	// LISTAR DATOS AL CARGAR LA PAGINA.
	LISTADO();


	// EVENTO SUBMIT | SE EJECUTA AL ENVIAR EL FORMULARIO.
	$('#frm').submit(function(event) {

		// EVITA QUE SE REFRESQUE LA PANTALLA.
		event.preventDefault();

		var ACCION = $("#modal_titulo").text();

		var VERBO;

		if (ACCION == 'CREAR') {
			VERBO = 'POST';
			URL   = 'http://localhost:3006/api/posts';
		}else if (ACCION == 'EDITAR') {
			// VERBO = 'PUT';
			VERBO = 'PATCH';
			URL   = 'http://localhost:3006/api/posts/'+$("#frm_id").val();
		}
		else if (ACCION == 'ELIMINAR') {
			VERBO = 'DELETE';
			URL   = 'http://localhost:3006/api/posts/'+$("#frm_id").val();
		}

		$.ajax({
			url      : URL,
			method   : VERBO,
			data     : $(this).serialize(),
			dataType : 'JSON',
			success  : function(data){

				$('#frm')[0].reset();

				$('#modal').modal('hide');

				LISTADO();

			}
		});

	});


	// EVENTO CLICK BTN CREAR
	$(document).on('click', 'button.btnCrear', function(){

		$('#modal').modal('show');
		
		$("#modal_titulo").html('CREAR');

		$('#frm')[0].reset();

		$("#frm_title").attr('disabled', false);
		$("#frm_description").attr('disabled', false);

		$("#frm_btn").removeClass().addClass('btn btn-sm btn-success').html('Crear');

	});


	// EVENTO CLICK BTN EDITAR
	$(document).on('click', 'button.btnEditar', function(){

		$('#modal').modal('show');

		$("#modal_titulo").html('EDITAR');

		$("#frm_id").val($(this).attr('data-id')).attr('disabled', false);
		$("#frm_title").val($(this).attr('title')).attr('disabled', false);
		$("#frm_description").val($(this).attr('description')).attr('disabled', false);

		$("#frm_btn").removeClass().addClass('btn btn-sm btn-primary').html('Editar');


	});
	
	// EVENTO CLICK BTN ELIMINAR
	$(document).on('click', 'button.btnEliminar', function(){

		$('#modal').modal('show');

		$("#modal_titulo").html('ELIMINAR');

		$("#frm_id").val($(this).attr('data-id')).attr('disabled', true);
		$("#frm_title").val($(this).attr('title')).attr('disabled', true);
		$("#frm_description").val($(this).attr('description')).attr('disabled', true);

		$("#frm_btn").removeClass().addClass('btn btn-sm btn-danger').html('Eliminar');

	});

});


// FUNCION QUE PIDE LOS DATOS Y LOS LISTA.
function LISTADO () {
	
	$.ajax({
		url      : 'http://localhost:3006/api/posts',
		dataType : 'JSON',
		success  : function(data){

			var html = '';

			data.forEach( function(element, index) {

				html += `
						  <tr>
							  <td>${element.id}</td>
							  <td>${element.title}</td>
							  <td>${element.description}</td>
							  <td>
							  	<button type="button" class="btn btn-sm btn-info btnEditar" title="${element.title}" description="${element.description}" data-id="${element.id}">Editar</button>
							  </td>
							  <td>
	      						<button type="button" class="btn btn-sm btn-danger btnEliminar" title="${element.title}" description="${element.description}" data-id="${element.id}">Eliminar</button>
							  </td>
						  </tr>
						`;

			});

			$('#listado').html(html);

		}
	});

}