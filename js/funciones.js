

		//FUNCIÓN  Constructora de objetos (Pacientes Literales)-->	
	
	class PacienteLiteral {
		constructor(apellidoPacienteObj, nombrePacienteObj, obraSocialObj, numeroAfiliadoObj, dniObj, emailObj, motivoObj, turnoObj,especialidadTurnoObj) {
			this.apellidoPacienteObj = apellidoPacienteObj;
			this.nombrePacienteObj = nombrePacienteObj;
			this.obraSocialObj = obraSocialObj;
			this.numeroAfiliadoObj = numeroAfiliadoObj;
			this.dniObj = dniObj;
			this.emailObj = emailObj;
			this.motivoObj = motivoObj;
			this.turnoObj= turnoObj;
			this.especialidadTurnoObj = especialidadTurnoObj;

		}
	}			


		//FUNCIÓN Constructora de objetos (Pacientes)-->		


	class Paciente {
		constructor(apellidoPacienteObj, nombrePacienteObj, obraSocialObj, numeroAfiliadoObj, dniObj, emailObj, motivoObj, turnoObj, especialidadTurnoObj) {
			this.apellidoPacienteObj = apellidoPacienteObj;
			this.nombrePacienteObj = nombrePacienteObj;
			this.obraSocialObj = obraSocialObj;
			this.numeroAfiliadoObj = numeroAfiliadoObj;
			this.dniObj = dniObj;
			this.emailObj = emailObj;
			this.motivoObj = motivoObj;
			this.turnoObj= turnoObj;
			this.especialidadTurnoObj = especialidadTurnoObj;

		}
	}			

		//FUNCION Constructora de objetos (Turno)--> 
	

	class Turno {

		constructor(horarioTurnoObj) {
			this.horarioTurnoObj = horarioTurnoObj;
			
		}

		
		
	}

	class TurnoLiteral {

		constructor(horarioTurnoObj) {
			this.horarioTurnoObj = horarioTurnoObj;
			
		}
		
	}

function acumuladorPacientes(){
								pacientesLiterales = JSON.parse (localStorage.getItem("acumuladorPacientes"))  || [];
								pacientesLiterales.push(new PacienteLiteral (apellidoform, nombreform, obraSocial , numeroAfiliado, dni, email, motivo, horario, especialidad));
								localStorage.setItem ("acumuladorPacientes", JSON.stringify(pacientesLiterales)); 
								for (const literal of pacientesLiterales) {
									pacientes.push(new Paciente (literal.apellidoPacienteObj, literal.nombrePacienteObj, literal.obraSocialObj , literal.numeroAfiliadoObj, literal.dniObj, literal.emailObj, literal.motivoObj, literal.turnoObj, literal.especialidadTurnoObj));
									
								}

								
						}

function listadoPacientes(pacientes, id){
  				$(id).empty();
				for (const paciente of pacientes){
					$(id).append(`
					<tr>
						<td>
						    <p><strong>${paciente.apellidoPacienteObj}, ${paciente.nombrePacienteObj}</strong></p>
						</td>
						<td>
                            <p><strong style="color:#21D100">${paciente.turnoObj}</strong><br>
							${paciente.especialidadTurnoObj}</p>
                        </td>
						<td>
						    <p>${paciente.dniObj}</p>
						</td>
						<td>
						    <p>${paciente.emailObj}</p>
						</td>
						<td>
						    <p>${paciente.obraSocialObj}</p>
						</td>
						<td>
						    <p>${paciente.numeroAfiliadoObj}<p>
						</td>
					</tr>`
						
					)
				}

			
  
			}

function refresh(){
    window.location.reload();
} 

function filtrarPorOS (e) { 
					e.preventDefault();
					$("#filterOS").show();
					$("#botonFiltroOS").hide();
					$("#busquedaTexto").hide();
					$("#botonFiltroBusqueda").show();
							
				}

function filtrarPorTxt (e) { 
					e.preventDefault();
					$("#filterOS").hide();
					$("#botonFiltroOS").show();
					$("#busquedaTexto").show();
					$("#botonFiltroBusqueda").hide();
							
				}
            
function select(lista, selector){
  //VACIAR OPCIONES EXISTENTES
  $(selector).empty();
  //RECORRER LISTA Y AÑADIR UNA OPCION POR CADA ELEMENTO
  lista.forEach(element => {
      $(selector).append(`<option value='${element}'>${element}</option>`);
  });
  $(selector).prepend(`<option value='TODAS' selected>TODAS</option>`);
}         