



		
//Evento READY

$(document).ready (function() {
	console.log ("DOM CARGADO")	
	$("#bienvenida").fadeIn(2000) //Muestra carteles de bienvenida
					.delay(2000)
					.fadeOut(2000)
					$("#reserve").delay(4000)
					.fadeIn(2000);
	
	//PETICIONES JQUERY, se adquiere información de la "base de datos"

	const URLGET = ("../data/turnos.json");
	$.get(URLGET, function(data, estado){
		if(estado == "success"){
			for (const literal of data){
				pacientes.push(new Paciente (literal.apellidoPacienteObj.toUpperCase(), literal.nombrePacienteObj.toUpperCase(), literal.obraSocialObj.toUpperCase() , literal.numeroAfiliadoObj, literal.dniObj, literal.emailObj, literal.motivoObj, literal.turnoObj,literal.especialidadTurnoObj));
			}

			for (const turno of data) {
				historialTurnosLiterales.push(new TurnoLiteral (turno.turnoObj));
			}	
		}

		pacientesLista = pacientes;
		console.log(pacientes)
		
		//FILTROS (En interfaz de "CONTROL")

			//FILTRO POR OBRA SOCIAL. Creación de SELECT, a partir de obras sociales

		select(obrasSociales,"#filterOS");		


			//Obtención VALOR del SELECT

		$('#filterOS').change(function (e) { 	
			const value = this.value;

			//ESCONDER listado inicial

			$('#control1').fadeOut(700,function(){

				//APLICACIÓN del FILTRO

				if(value == 'TODAS'){

				listadoPacientes(pacientesLista, '#control1');

				}else{
				const filtrados = pacientesLista.filter(paciente => paciente.obraSocialObj == value);

				listadoPacientes(filtrados, '#control1');
				}

				//FILTRO por obra social APLICADO, se MUESTRA el listado actual

				$('#control1').fadeIn();
			});
		});

		//FILTRO por BÚSQUEDA de TEXTO

		$("#buscarPaciente").keyup(function (e) { 
			
			const criterio = this.value.toUpperCase();
			console.log(criterio);
			if(criterio != ""){
				const encontrados = pacientesLista.filter(p =>     
					 p.nombrePacienteObj.includes(criterio.toUpperCase()) 
					|| p.apellidoPacienteObj.includes(criterio.toUpperCase())
					||p.dniObj.includes(criterio)
				);
				listadoPacientes(encontrados, '#control1');
				$("#filterOS").hide();
				$("#botonFiltroOS").show();
			}
		});
			
		//Inserción de BOTONES, para FILTRAR según usuario desee

		$("#botonFiltroOS").click(filtrarPorOS);
		$("#botonFiltroBusqueda").click(filtrarPorTxt);


		
		console.log(historialTurnosLiterales);



		//OBTENER INFORMACIÓN de TURNOS previos, pusheando los ya existentes un un array.

			
		for (const turnolit of historialTurnosLiterales) {
				historialTurnos2.push(Object.values(turnolit));
			}
		


		historialTurnos = JSON.parse (localStorage.getItem("acumuladorTurno"))  || [];
		localStorage.setItem ("acumuladorTurno", JSON.stringify(historialTurnos)); 
			
		console.log (historialTurnos);			

		pacientes = JSON.parse (localStorage.getItem("acumuladorPacientes"))  || [];
		localStorage.setItem ("acumuladorPacientes", JSON.stringify(pacientes)); 
	
	});

	pacientes = JSON.parse (localStorage.getItem("acumuladorPacientes"))  || [];
	localStorage.setItem ("acumuladorPacientes", JSON.stringify(pacientes)); 
		
});

// Load
window.addEventListener("load",()=> {
	console.log("Contenido Cargado");
	$("#spinner").remove();
})



	// OBTENER DATOS PACIENTE
		//FORMULARIO

	const  formDatos= document.getElementById("inputsDatos");
		formDatos.onsubmit = (e) =>{
			e.preventDefault();
			let inputsDatos = e.target.children; 
			apellidoform = (inputsDatos[0].value.toUpperCase()); 
			nombreform = (inputsDatos[1].value.toUpperCase());
			dni = (inputsDatos[2].value);
			obraSocial = (inputsDatos[3].value.toUpperCase());
			numeroAfiliado = (inputsDatos[4].value);
			email = (inputsDatos[5].value);
			motivo = (inputsDatos[6].value);
			console.log(inputsDatos[1].value);

			console.log (`Nombre: ${apellidoform}, ${nombreform} DNI: ${dni} Obra Social: ${obraSocial} N° Afiliado: ${numeroAfiliado} e-mail: ${email} Motivo de consulta:${motivo}`);

			//MOSTRAR al paciente los DATOS ingresados en FORMULARIO, luego generar siguiente interfaz cuando se clickea "Continuar"

			let modificarInput = document.createElement ("div");
			modificarInput.innerHTML = `<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">Apellido</span>  ${apellidoform}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">Nombre</span> ${nombreform}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">DNI</span> ${dni}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">Obra Social</span> ${obraSocial}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">Afiliado N°</span> ${numeroAfiliado}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">E-mail</span> ${email}</p>
										<p class="form-control marginBott1 datosPte textoCentrado" ><span style="color:#B3B3B3;">Motivo de Consulta</span> ${motivo}</p>
										<button type="button" id="botonSiguiente1" class="btn btn-outline-info" style="margin-left:250px;">Siguiente</button>`;

			datosPaciente.appendChild(modificarInput);
			
			$("#botonContinuar").fadeOut();		
			$("#formulario").hide();
			$("#encabezado1").slideDown(1000);
			$("#inputsDatos").hide();

			//INTERFAZ para elegir ESPECIALIDAD 

			$("#botonSiguiente1").click(function (e) { 
					e.preventDefault();
					$(".datosPte").hide();
					$("#botonSiguiente1").hide();
					$("#encabezado1").hide();
					$("#encabezado2").slideDown(1000);
					$("#especialidad").show();
			});

		}


		// SELECCIONAR Especialidad

		const  formEspecialidad= document.getElementById("elegirEspecialidad");
		formEspecialidad.onsubmit = (e) => {
			e.preventDefault();
			let inputsEspecialidad = e.target.children; 
			console.log (inputsEspecialidad[0].value);
			especialidad = (inputsEspecialidad[0].value);
			$("#encabezado2").hide();
			$("#especialidad").hide();
			console.log ("Especialidad: " + especialidad);



			//INTERFAZ para seleccionar TURNO

			$("#elegirTurno").slideDown(1000);

		}


		// SELECCIÓN DEl TURNO (Fecha y Hora)

		const  formH= document.getElementById("fechaHora");
		formH.onsubmit = (e) => {
			e.preventDefault();
			let inputTurno = e.target.children; 
			console.log (inputTurno[0].value);
			horario = (inputTurno[0].value);
			turnos.push(new Turno (horario)); 
			console.log ("Hora Turno (datetime): " + horario);
			
			//COMPARACIÓN con turnos PREVIOS, para evitar duplicados (Ya sea incluidos en la "base de datos" o nuevos turnos asignados)					


			historialTurnosLiterales = JSON.parse (localStorage.getItem("acumuladorTurno"))  || [];
			localStorage.setItem ("acumuladorTurno", JSON.stringify(historialTurnos))

				//VERIFICADOR 1: Verifica que no exista el turno solicitado por el paciente, en  turnos asignados previamente (almacenados en localStorage). Da como resultado true ó false.

			let verificarTurno = historialTurnos.some(function (fecha){
				return fecha == horario 
			}) 

			    //VERIFICADOR 2: Verifica que no exista el turno solicitado por el paciente, en  turnos existentes previamente en la "base de datos" -turnos.json-).Da como resultado true ó false.

			let verificarTurno2 = historialTurnos2.some(function (fecha){
				return fecha == horario 
			}) 
			

			console.dir(horario)
			console.log(horario)
			console.log (verificarTurno);
			console.log (verificarTurno2);

				//Acumulador Turnos-->		

			function acumuladorTurnos(){
					var horaElegida = horario;
					historialTurnos = JSON.parse (localStorage.getItem("acumuladorTurno"))  || [];

				//Validación 

					if (((verificarTurno == false) && (verificarTurno2 == false))  && (horario!="")){
						historialTurnos.push(horaElegida);
                 		//Alerta
						Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Turno asignado con éxito',
						showConfirmButton: false,
						timer: 3000
						})


						//Generación de interfaz: Turno APROBADO

						$("#infoTurnoDisplay").append(`<span class="textoCentrado">${nombreform}, tu turno para</span>
						<span class="textoCentrado">${especialidad}</span>
						<span class="textoCentrado">fue agendado para el día</span>
					    <strong class="textoCentrado">${horario}</strong>
						<span class="textoCentrado">Te esperamos!</span><br>`);
						$("#turnoAprobado").show();
						$("#elegirTurno").hide(); //Calendario desaparece
						$("#finalizar").append (`<a href="https://emif94.github.io/alineareodontologia/"><button type="button" id="finalizar" class="btn btn-outline-info" style="margin-left:250px;">Finalizar</button></a>`)
				        acumuladorPacientes();
						console.log ("Turno Aprobado")

						

						//Generación de interfaz: Turno RECHAZADO
						
					}else if ((verificarTurno == true) || (verificarTurno2 == true)) { 
						while ((verificarTurno == true) || (verificarTurno2 == true)){
							//Alerta
							Swal.fire({
								icon: 'error',
								title: 'Lo sentimos!',
								text: 'Este turno no se encuentra disponible',							
							})
						$("#turnoRechazado").show(); //Cartel de rechazo aparece
						$("#elegirTurno").hide(); //Calendario desaparece
						$("#elegirOtroTurno").show();// "Elegir otro turno" aparece
						$("#elegirOtroTurno").click(function (e) { //al clickear "Elegir otro turno"...->
							e.preventDefault();
							$("#elegirTurno").show(500); //<--Calendario aparece
							$("#elegirOtroTurno").hide(500); // <--"Elegir otro turno" desaparece
							$("#turnoRechazado").hide(); //<--Cartel de rechazo desaparece
							
						});
						console.log ("Turno Rechazado")
						break;
							
						}				
						
						
						
					}else{
						while (verificarTurno == true){
						$("#turnoRechazado").show(); //cartel de rechazo aparece
						$("#elegirTurno").hide(); //calendario desaparece
						$("#elegirOtroTurno").show();// elegir otro turno aparece
						$("#elegirOtroTurno").click(function (e) { //al clickear "Elegir otro turno"...->
							e.preventDefault();
							$("#elegirTurno").show(500); //<--calendario aparece
							$("#elegirOtroTurno").hide(500); // <--"Elegir otro turno" desaparece
							$("#turnoRechazado").hide(); //<--cartel de rechazo desaparece
							
						});
						console.log ("Turno Rechazado")
						break;
							
						}

					}	

					localStorage.setItem ("acumuladorTurno", JSON.stringify(historialTurnos)); 
			}

					let turnero = acumuladorTurnos();
					console.log (historialTurnos)

		}
		 // Control
		 	//INTERFAZ LogIn

		$("#accesoControl").click(function (e) { 
			e.preventDefault();
			$("#logIn").show();
			$("#paginaInicial").hide();
			$("#logIn").prepend(`<link type="text/css" rel="stylesheet" href="../css/loginstyle.css" /> `)
			$("#accesoControl").hide();
		});
		$("#refresh").click(refresh);

			//VALIDACIÓN PARA INGRESAR: usuario y contraseña.

				let user = {};
				let password = {};

				$("#signin").click(function (e) { 
					e.preventDefault();

					user = $("#user").val();
					password = $("#pass").val();
				console.log(user)
				console.log (password)

				//Validar

				if (((user == "emiliano")|| (user == "melisa") ||(user == "angeles")||(user == "magali"))  && (password=="dientes1234")){
					$("#logIn").hide();


			const URLGET = ("../data/turnos.json");
					$.get(URLGET, function(data,estado){
						if(estado == "success"){
							for (const literal of data){
								pacientes.push(new Paciente (literal.apellidoPacienteObj.toUpperCase(), literal.nombrePacienteObj.toUpperCase(), literal.obraSocialObj.toUpperCase() , literal.numeroAfiliadoObj, literal.dniObj, literal.emailObj, literal.motivoObj, literal.turnoObj, literal.especialidadTurnoObj));
							}

							for (const turno of data) {
								historialTurnosLiterales.push(new TurnoLiteral (turno.turnoObj));
							}
						}	
				

		 	// GENERACION INTERFAZ Control
		  let	pacientesLista = pacientes;	
		 listadoPacientes(pacientesLista, '#control1');

						

		})

			$("#listaControl").show();
			$("#footer").hide();
			$("#listaControl").prepend(`<!--  CSS Control  -->
								<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
									integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
								
								<link type="text/css" rel="stylesheet" href="../css/controlstyle.css" /> `
			)
					
					pacientes = JSON.parse (localStorage.getItem("acumuladorPacientes"))  || [];
					localStorage.setItem ("acumuladorPacientes", JSON.stringify(pacientes)); 

					
					
					
				}else{
					console.log("Usuario o contraseña incorrectos")
					//Alerta
					Swal.fire({
								icon: 'error',
								title: 'Usuario o contraseña incorrectos',
								text: 'Ingresa los datos correctamente',							
							})

					
				}
					
				});
				






