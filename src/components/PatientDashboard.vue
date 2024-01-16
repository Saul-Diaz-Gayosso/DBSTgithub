<template>
  <div class="patient-dashboard">
    <header class="header-patient">
      <div class="logo-container-patient">
        <img src="@/assets/imsscom-logo-full.png" alt="Logo de la App" />
      </div>
      <div class="user-info">
        <span>{{ patientName }}</span>
        <button @click="logout">Cerrar sesión</button>
      </div>
    </header>

    <main>
      <section class="platform-description">
        <p>
          Bienvenido a nuestra plataforma de gestión de citas médicas. Aquí puedes programar nuevas citas,
          modificar las existentes y consultar tus recetas médicas.
          ¡Cuidamos de tu salud!
        </p>
      </section>

      <section class="appointment-form" v-if="showAppointmentForm || showModifyAppointmentForm">
        <h2>{{ showModifyAppointmentForm ? 'Modificar Cita' : 'Generar Cita' }}</h2>
        <form @submit.prevent="confirmAppointment">
          <label for="specialty">Especialidad:</label>
          <select id="specialty" v-model="selectedSpecialty" required>
            <option value="" disabled>Seleccione una especialidad</option>
            <option value="cardiologia">Cardiología</option>
            <option value="neurologia">Neurología</option>
            <!-- ... otras especialidades ... -->
          </select>

          <label for="date">Fecha:</label>
          <input type="date" id="date" v-model="selectedDate" required />

          <label for="time">Hora:</label>
          <input type="time" id="time" v-model="selectedTime" required />

          <button type="submit">Confirmar Cita</button>
        </form>
      </section>

      <section class="new-appointment-button" v-if="!showAppointmentForm && !showModifyAppointmentForm">
        <h2>Generar nueva cita</h2>
        <button @click="showAppointmentForm = true">Generar Nueva Cita</button>
      </section>

      <section class="appointments">
        <h2>Citas Programadas</h2>
        <button @click="showModifyFormFunction">Modificar Cita</button>
        <button @click="showLastPrescriptionFunction">Última Receta</button>
        <ul v-if="!showModifyForm && !showLastPrescription" class="last-date">
          <!-- Lista de citas programadas (datos de ejemplo) -->
          <li v-for="(appointment, index) in appointments" :key="index">
            {{ appointment.folio }} - {{ appointment.patientName }} - {{ appointment.specialty }} - {{ appointment.dateTime }} - {{ appointment.consultorio }}
          </li>
        </ul>

        <!-- Nueva tabla para mostrar citas cuando se activa showModifyForm -->
        <table v-if="showModifyForm" class="modify-appointments-table">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Nombre paciente</th>
              <th>Especialidad</th>
              <th>Fecha y hora</th>
              <th>Consultorio</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <!-- Datos de ejemplo en la tabla (reemplaza con datos reales de tu base de datos) -->
            <tr v-for="(appointment, index) in appointments" :key="index">
              <td>{{ appointment.folio }}</td>
              <td>{{ appointment.patientName }}</td>
              <td>{{ appointment.specialty }}</td>
              <td>{{ appointment.dateTime }}</td>
              <td>{{ appointment.consultorio }}</td>
              <td>
                <button @click="editAppointment(appointment)">Modificar</button>
              </td>
              <td>
                <button @click="confirmDelete(appointment)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Nueva sección para mostrar la última receta -->
        <div v-if="showLastPrescription" class="last-prescription">
          <h2>Última Receta</h2>
          <ul>
            <li><strong>Número de Receta:</strong> {{ lastPrescription.number }}</li>
            <li><strong>Fecha:</strong> {{ lastPrescription.date }}</li>
            <li><strong>Nombre del Paciente:</strong> {{ lastPrescription.patientName }}</li>
            <li><strong>Nombre del Médico:</strong> {{ lastPrescription.doctorName }}</li>
            <li><strong>Diagnóstico:</strong> {{ lastPrescription.diagnosis }}</li>
            <li><strong>Medicamentos:</strong> {{ lastPrescription.medications.join(', ') }}</li>
            <li><strong>Tratamiento:</strong> {{ lastPrescription.treatment }}</li>
            <li><strong>Duración:</strong> {{ lastPrescription.duration }}</li>
            <li v-if="lastPrescription.total"><strong>Total:</strong> {{ lastPrescription.total }}</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PatientDashboard',
  data() {
    return {
      patientName: '', // Reemplaza con la lógica real para obtener el nombre del paciente
      appointments: [  // Datos de ejemplo
        {
          folio: 1,
          patientName: 'John Doe',
          specialty: 'Cardiología',
          dateTime: '2023-12-15 10:00',
          consultorio: 'C1',
        },
        // ... (otros datos según sea necesario) ...
      ],
      showAppointmentForm: false,
      showModifyForm: false,
      showLastPrescription: false, // Nueva propiedad para controlar la visibilidad de la última receta
      selectedAppointment: null, // Nueva propiedad para almacenar la cita seleccionada
      selectedSpecialty: '',
      selectedDate: '',
      selectedTime: '',
      lastPrescription: {  // Datos de ejemplo para la última receta
        number: '123',
        date: '2023-12-15',
        patientName: 'Jair Salas',
        doctorName: 'Dr. Smith',
        diagnosis: 'Covid 19.',
        medications: ['Medicamento A', 'Medicamento B'],
        treatment: 'Reposo y confinamiento',
        duration: '3 semanas',
        total: '$50.00',
      },
      // ... (otras propiedades según sea necesario) ...
    };
  },
  methods: {
    logout() {
      // Implementa la lógica de cierre de sesión
      // Esto es solo un ejemplo, ajusta según tu necesidad
      console.log('Cerrando sesión...');
    },

    showModifyFormFunction() {
      // Obtener la información de la cita seleccionada (puedes obtenerla de la base de datos o de tus datos simulados)
      const selectedData = /* Lógica para obtener la cita seleccionada */ null;

      // Asignar la información de la cita seleccionada
      this.selectedAppointment = selectedData;

      // Mostrar el formulario de modificación
      this.showModifyForm = true;
      this.showAppointmentForm = false;
      this.showLastPrescription = false;
       // Oculta la sección de la última receta
    },

    scheduleAppointment() {
      // Lógica para generar la cita y mostrar el formulario
      this.showAppointmentForm = true;
      this.showModifyForm = false;
      this.showLastPrescription = false; // Oculta la sección de la última receta
    },

    showLastPrescriptionFunction() {
      // Muestra la sección de la última receta
      this.showAppointmentForm = false;
      this.showModifyForm = false;
      this.showLastPrescription = true;
    },

    confirmAppointment() {
      // Validación: No debe permitir una cita con fecha pasada
      const currentDate = new Date();
      const selectedDateTime = new Date(`${this.selectedDate} ${this.selectedTime}`);
      if (selectedDateTime < currentDate) {
        alert('No se puede programar una cita en una fecha pasada.');
        return;
      }

      // Validación: Máximo de anticipación de 3 meses
      const maxAnticipation = new Date();
      maxAnticipation.setMonth(currentDate.getMonth() + 3);
      if (selectedDateTime > maxAnticipation) {
        alert('La cita no puede programarse con más de 3 meses de anticipación.');
        return;
      }

      // Validación: No debe permitir una cita si el día y hora están ocupados
      const isSlotOccupied = this.appointments.some(appointment => {
        const appointmentDateTime = new Date(appointment.dateTime);
        return (
          appointmentDateTime.getFullYear() === selectedDateTime.getFullYear() &&
          appointmentDateTime.getMonth() === selectedDateTime.getMonth() &&
          appointmentDateTime.getDate() === selectedDateTime.getDate() &&
          appointmentDateTime.getHours() === selectedDateTime.getHours() &&
          appointmentDateTime.getMinutes() === selectedDateTime.getMinutes()
        );
      });

      if (isSlotOccupied) {
        alert('El día y hora seleccionados ya están ocupados. Elija otra fecha y hora.');
        return;
      }

      // Resto del código para confirmar la cita
      const confirmation = window.confirm('¿Confirmar cita?');
      if (confirmation) {
        // Resto del código para confirmar la cita
        // ...
      } else {
        // Mantener el formulario abierto
      }
    },

    editAppointment(appointment) {
      // Lógica para cargar la información de la cita seleccionada y abrir el formulario
      this.selectedAppointment = appointment;
      this.selectedSpecialty = appointment.specialty;
      this.selectedDate = appointment.dateTime.split(' ')[0];
      this.selectedTime = appointment.dateTime.split(' ')[1];
      this.showAppointmentForm = true;  // Utiliza el mismo formulario de generación
      this.showModifyForm = false;
      this.showLastPrescription = false; // Oculta la sección de la última receta
    },

    confirmDelete(appointment) {
      // Lógica para confirmar la eliminación de la cita
      const confirmation = window.confirm('¿Seguro que desea eliminar la cita?');
      if (confirmation) {
        // Lógica para eliminar la cita de la base de datos (o actualizar su estado)
        console.log('Cita eliminada:', appointment);

        // Limpia la información del formulario y vuelve a la vista principal
        this.clearFormData();
      } else {
        // Mantener el formulario abierto
      }
    },

    clearFormData() {
      this.selectedAppointment = null;
      this.selectedSpecialty = '';
      this.selectedDate = '';
      this.selectedTime = '';
      // ... (limpia otros campos según sea necesario) ...
    },
    // ... (otros métodos según sea necesario) ...
  },
};
</script>

<style scoped>
@import '@/styles/styles-patient.css';
/* Agrega estilos adicionales según sea necesario */
</style>
