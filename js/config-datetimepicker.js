//CONFIGURACION DATETIMEPICKER
    // Mas información sobre configuracion --> 
                     //https://plugins.jquery.com/datetimepicker/
                     //https://xdsoft.net/jqplugins/datetimepicker/
                     //https://www.youtube.com/watch?v=LHzqNLaVhYw


 //Establecer idioma a Español -->
 $.datetimepicker.setLocale('es');

 //Cambiar formato por defecto de fechas de datetimepicker al formato de Moment.js-->

           $.datetimepicker.setDateFormatter({
              parseDate: function (date, format) {
                var d = moment(date, format);
                return d.isValid() ? d.toDate() : false;
              },

              formatDate: function (date, format) {
                return moment(date).format(format);
              },


            });
            
           
           
           $("#datetime").datetimepicker({

            
             
               format: 'DD.MM.YYYY h:mm a',
               formatTime: 'h:mm a',
               formatDate: 'DD.MM.YYYY',

// Horarios de turnos
                allowTimes: [
               '14:00', '14:45', '15:30',
               '16:15', '17:00', '17:45', '18:30', '19:15'
             ],

             
                disabledDates: ['15.08.2021 14:00'], formatDate:'DD.MM.YYYY hh:mm',
               
//Tipo de calendario: Inline
             inline:true, 
              
            });

//Desactivar Fines de Semana
          $('#datetime').datetimepicker({
                  onGenerate:function( ct ){
                  jQuery(this).find('.xdsoft_date.xdsoft_weekend')
                  .addClass('xdsoft_disabled');
                  },
          });

            console.log (moment());
            