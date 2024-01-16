<template>
  <div class="doctor-dashboard">
    <header class="header-doctor">
      <div class="logo-container-doctor">
        <img src="@/assets/imsscom-logo-full.png" alt="Logo de la App" />
      </div>
      <div class="user-info">
        <span>{{ patientName }}</span>
        <button @click="logout">Cerrar sesión</button>
      </div>
    </header>

    <main>

      <!-- Sección de Historial Clínico -->
      <section class="medical-history-section">
  <h2>Historial Clínico</h2>
  <button @click="showHistoryForm">Crear Historial</button>
  <button @click="showHistoryTable">Ver Historial</button>

  <form v-if="showHistoryFormFlag" @submit.prevent="confirmHistory">
    <!-- Campos del formulario de historial clínico -->
    <label for="historyID">ID Bitácora:</label>
    <input type="text" id="historyID" v-model="historyID" required />

    <label for="historyDate">Fecha Movimiento:</label>
    <input type="date" id="historyDate" v-model="historyDate" required />

    <label for="historyUser">Usuario:</label>
    <input type="text" id="historyUser" v-model="historyUser" required />

    <label for="historyPatientName">Nombre del Paciente:</label>
    <input type="text" id="historyPatientName" v-model="historyPatientName" required />

    <label for="historyDiagnosis">Diagnóstico:</label>
    <textarea id="historyDiagnosis" v-model="historyDiagnosis" required></textarea>

    <label for="historyConsultorio">Consultorio:</label>
    <input type="text" id="historyConsultorio" v-model="historyConsultorio" required />

    <label for="historyTotalPayment">Total a Pagar:</label>
    <input type="text" id="historyTotalPayment" v-model="historyTotalPayment" required />

    <button type="submit">Confirmar Historial</button>
  </form>

  <table v-if="showHistoryTableFlag" class="medical-history-table">
    <!-- Encabezados de la tabla -->
    <thead>
      <tr>
        <th>ID Bitácora</th>
        <th>Fecha Movimiento</th>
        <th>Usuario</th>
        <th>Nombre Paciente</th>
        <th>Diagnóstico</th>
        <th>Consultorio</th>
        <th>Total a Pagar</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(history, index) in medicalHistory" :key="index">
        <!-- Renderizar datos del historial -->
        <td>{{ history.id }}</td>
        <td>{{ history.date }}</td>
        <td>{{ history.user }}</td>
        <td>{{ history.patientName }}</td>
        <td>{{ history.diagnosis }}</td>
        <td>{{ history.consultorio }}</td>
        <td>{{ history.totalPayment }}</td>
        <td>
          <button @click="modifyHistory(history)">Modificar</button>
        </td>
      </tr>
    </tbody>
  </table>
</section>

      <!-- Sección de Generar Receta Médica -->
      <section class="generate-prescription-section">
        <h2>Generar Receta Médica</h2>
        <button @click="showPrescriptionForm">Generar Receta</button>
        <button @click="showReviewPrescription">Revisar Recetas</button>

      <!-- Tarjeta de Revisar Recetas -->
      <div v-if="showReviewPrescriptionFlag" class="review-prescription-card">
        <h3>Detalles de la Receta</h3>
        <p>Número de Receta: {{ recipeNumber }}</p>
        <p>Fecha: {{ recipeDate }}</p>
        <p>Nombre del Paciente: {{ recipePatientName }}</p>
        <p>Nombre del Médico: {{ recipeDoctorName }}</p>
        <p>Diagnóstico: {{ recipeDiagnosis }}</p>
        <p>Medicamentos: {{ recipeMedications }}</p>
        <p>Tratamiento: {{ recipeTreatment }}</p>
        <p>Duración: {{ recipeDuration }}</p>
        <button @click="modifyPrescription">Modificar</button>
      </div>
      <form v-if=" showReviewPrescriptionFlag" @submit.prevent="confirmPrescription">
          <label for="recipeNumber">Número de Receta:</label>
          <input type="text" id="recipeNumber" v-model="recipeNumber" required />

          <label for="recipeDate">Fecha:</label>
          <input type="date" id="recipeDate" v-model="recipeDate" required />

          <label for="recipePatientName">Nombre del Paciente:</label>
          <input type="text" id="recipePatientName" v-model="recipePatientName" required />

          <label for="recipeDoctorName">Nombre del Médico:</label>
          <input type="text" id="recipeDoctorName" v-model="recipeDoctorName" required />

          <label for="recipeDiagnosis">Diagnóstico:</label>
          <textarea id="recipeDiagnosis" v-model="recipeDiagnosis" required></textarea>

          <label for="recipeMedications">Medicamentos:</label>
          <textarea id="recipeMedications" v-model="recipeMedications" required></textarea>

          <label for="recipeTreatment">Tratamiento:</label>
          <textarea id="recipeTreatment" v-model="recipeTreatment" required></textarea>

          <label for="recipeDuration">Duración:</label>
          <input type="text" id="recipeDuration" v-model="recipeDuration" required />

          <button type="submit">{{ showModifyRecipeForm ? 'Modificar Receta' : 'Confirmar Receta' }}</button>
        </form>
      </section>

      <!-- Otros elementos y secciones según sea necesario -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'DoctorDashboard',
  data() {
    return {
      // Propiedades para la sección de Generar/Modificar Receta
      showRecipeForm: false,
      showModifyRecipeForm: false,
      recipeNumber: '',
      recipeDate: '',
      recipePatientName: '',
      recipeDoctorName: '',
      recipeDiagnosis: '',
      recipeMedications: '',
      recipeTreatment: '',
      recipeDuration: '',

      // Propiedades para la sección de Historial Clínico
      showHistoryFormFlag: false,
      showHistoryTableFlag: false,
      showPrescriptionFormFlag: false,
      showReviewPrescriptionFlag: false,

      medicalHistory: [
        // Datos de ejemplo
        {
          id: 1,
          // ... (otros campos)
        },
        // ... (otros datos)
      ],

      // Propiedades para la sección de Generar Receta Médica
      prescriptionDetails: '',
    };
  },
  methods: {
    toggleHistoryForm() {
      this.showHistoryFormFlag = !this.showHistoryFormFlag;
      this.hideOtherSections();
    },
    toggleHistoryTable() {
      this.showHistoryTableFlag = !this.showHistoryTableFlag;
      this.hideOtherSections();
    },
    togglePrescriptionForm() {
      this.showPrescriptionFormFlag = !this.showPrescriptionFormFlag;
      this.hideOtherSections();
    },
    hideOtherSections() {
      this.showRecipeFormFlag = false;
      this.showModifyRecipeFormFlag = false;
      // ... (ocultar otras secciones según sea necesario)
    },
    showHistoryForm() {
      this.showHistoryFormFlag = !this.showHistoryFormFlag;
      this.showRecipeFormFlag = false;
      this.showModifyRecipeFormFlag = false;
      this.showPrescriptionFormFlag = false;
      this.showHistoryTableFlag = false;
    },
    showHistoryTable() {
      this.showHistoryTableFlag = !this.showHistoryTableFlag;
      this.showRecipeFormFlag = false;
      this.showModifyRecipeFormFlag = false;
      this.showPrescriptionFormFlag = false;
      this.showHistoryFormFlag = false;
    },
    confirmHistory() {
      // Lógica para confirmar historial clínico
      // ...
    },
    modifyHistory() {
      // Lógica para modificar historial clínico
      // ...
      // Después de modificar, mostrar formulario de historial clínico con datos llenos
      this.showHistoryFormFlag = true;
      this.showRecipeFormFlag = false;
      this.showModifyRecipeFormFlag = false;
      this.showPrescriptionFormFlag = false;
      this.showHistoryTableFlag = false;
    },
    showPrescriptionForm() {
      this.showPrescriptionFormFlag = !this.showPrescriptionFormFlag;
      this.showRecipeFormFlag = true;
      this.showModifyRecipeFormFlag = false;
      this.showHistoryFormFlag = false;
      this.showHistoryTableFlag = false;
    },

    
    showReviewPrescription() {
      this.showPrescriptionFormFlag = false;
      this.showReviewPrescriptionFlag = !this.showReviewPrescriptionFlag;

      // Si se está mostrando la tarjeta, copia los datos del formulario a la tarjeta
      if (this.showReviewPrescriptionFlag) {
        this.copyFormDataToReviewCard();
      }
    },
    copyFormDataToReviewCard() {
      // Copia los datos del formulario a la tarjeta de revisión
      this.reviewPrescriptionDetails = {
        recipeNumber: this.recipeNumber,
        recipeDate: this.recipeDate,
        recipePatientName: this.recipePatientName,
        recipeDoctorName: this.recipeDoctorName,
        recipeDiagnosis: this.recipeDiagnosis,
        recipeMedications: this.recipeMedications,
        recipeTreatment: this.recipeTreatment,
        recipeDuration: this.recipeDuration,
      };
    },
  modifyPrescription() {
    // Lógica para abrir el formulario de receta con los datos de revisión
    this.showReviewPrescriptionFlag = false;
    this.showPrescriptionFormFlag = true;
    // ... (otras lógicas según sea necesario)
  },

    confirmPrescription() {
      // Verificar si algún campo está vacío
      if (this.checkEmptyFieldsInPrescriptionForm()) {
        // Muestra un mensaje de error o realiza otra acción según sea necesario
        console.log("Por favor, completa todos los campos de la receta médica.");
        return;
      }

      // Lógica para confirmar receta médica
      // ...

      // Restablecer campos después de confirmar
      this.prescriptionDetails = '';

      // ... (código adicional según sea necesario)
    },
    checkEmptyFieldsInPrescriptionForm() {
      return !this.prescriptionDetails;
      // Agrega más condiciones según sea necesario
    },
  },
};
</script>

<style scoped>
@import '@/styles/styles-doctor.css';
/* Agrega estilos adicionales según sea necesario */
</style>
