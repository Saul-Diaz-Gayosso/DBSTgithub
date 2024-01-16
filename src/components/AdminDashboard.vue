<template>
    <div class="admin-dashboard">
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
        <!-- Sección de Pacientes -->
        <section class="patients-section">
          <h2>Administrar Pacientes</h2>
          <button @click="showPatientTable">Ver Pacientes</button>
  
          <!-- Tabla de Pacientes -->
          <table v-if="showPatientTableFlag" class="patient-table">
            <!-- Encabezados de la tabla -->
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>ID Bitácora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(patient, index) in patientList" :key="index">
                <td>{{ patient.name }}</td>
                <td>{{ patient.email }}</td>
                <td>{{ patient.historyId }}</td>
                <td>
                  <button @click="modifyPatient(patient)">Modificar</button>
                  <button @click="confirmDeletePatient(patient)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Formulario para Modificar/Dar de Baja Paciente -->
          <form v-if="showModifyPatientFormFlag" @submit.prevent="confirmModifyPatient">
            <!-- Campos del formulario -->
            <label for="patientName">Nombre:</label>
            <input type="text" id="patientName" v-model="selectedPatient.name" required />
  
            <label for="patientEmail">Correo:</label>
            <input type="email" id="patientEmail" v-model="selectedPatient.email" required />
  
            <button type="submit">Confirmar Modificación</button>
          </form>
  
        </section>
  
        <!-- Sección de Doctores -->
        <section class="doctors-section">
          <h2>Administrar Doctores</h2>
          <button @click="showDoctorTable">Ver Doctores</button>
          <button @click="showDoctorForm">Dar de Alta Doctor</button>
  
          <!-- Tabla de Doctores -->
          <table v-if="showDoctorTableFlag" class="doctor-table">
            <!-- Encabezados de la tabla -->
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Contraseña</th>
                <th>Especialidad</th>
                <th>ID Doctor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(doctor, index) in doctorList" :key="index">
                <!-- Renderizar datos del doctor -->
                <td>{{ doctor.name }}</td>
                <td>{{ doctor.lastName }}</td>
                <td>{{ doctor.phone }}</td>
                <td>{{ doctor.email }}</td>
                <td>{{ doctor.password }}</td>
                <td>{{ doctor.specialty }}</td>
                <td>{{ doctor.idDoctor }}</td>
                <td>
                  <button @click="modifyDoctor(doctor)">Modificar</button>
                  <button @click="confirmDeleteDoctor(doctor)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <!-- Formulario para Dar de Alta Doctor -->
        <!-- Formulario para Dar de Alta Doctor -->
        <form v-if="showDoctorFormFlag" @submit.prevent="validateDoctorForm">
        <!-- Campos del formulario -->
            <label for="doctorName">Nombre:</label>
            <input type="text" id="doctorName" v-model="newDoctor.name" required />

            <label for="doctorLastName">Apellidos:</label>
            <input type="text" id="doctorLastName" v-model="newDoctor.lastName" required />

            <label for="doctorPhone">Teléfono:</label>
            <input type="number" id="doctorPhone" v-model="newDoctor.phone" required pattern="[0-9]{10}" />

            <label for="doctorEmail">Correo:</label>
            <input type="email" id="doctorEmail" v-model="newDoctor.email" required />

            <label for="doctorPassword">Contraseña:</label>
            <input type="password" id="doctorPassword" v-model="newDoctor.password" required />

            <label for="doctorSpecialty">Especialidad:</label>
            <select id="doctorSpecialty" v-model="newDoctor.specialty" required>
                <option value="" disabled selected>Selecciona una especialidad</option>
                <!-- Aquí puedes agregar opciones específicas desde tu catálogo -->
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Neurología">Neurología</option>
                <!-- ... -->
            </select>

            <label for="doctorId">ID Doctor:</label>
            <input type="text" id="doctorId" v-model="newDoctor.idDoctor" required />

            <button type="submit">Confirmar Alta</button>
        </form>
        </section>
  
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
    data() {
      return {
        // Propiedades para la sección de Pacientes
        showPatientTableFlag: false,
        showModifyPatientFormFlag: false,
        patientList: [
          // Datos de ejemplo
          { name: 'John Doe', email: 'john@example.com', historyId: '12345' },
          // ... (otros datos)
        ],
        selectedPatient: {},
  
        // Propiedades para la sección de Doctores
        showDoctorTableFlag: false,
        showDoctorFormFlag: false,
        showModifyDoctorFormFlag: false,
        doctorList: [
          // Datos de ejemplo
          { name: 'Dr. Smith', lastName: 'Jones', phone: '123-456-7890', email: 'drsmith@example.com', password: 'securepass', specialty: 'Cardiologist', idDoctor: 'DOC123' },
          // ... (otros datos)
        ],
        newDoctor: {},
        selectedDoctor: {},
      };
    },
    methods: {
      // Métodos para la sección de Pacientes
      showPatientTable() {
        this.showPatientTableFlag = !this.showPatientTableFlag;
        this.showModifyPatientFormFlag = false;
        this.showDoctorTableFlag = false;
        this.showDoctorFormFlag = false;
        this.showModifyDoctorFormFlag = false;
      },
      modifyPatient(patient) {
        this.selectedPatient = { ...patient };
        this.showModifyPatientFormFlag = !this.showModifyPatientFormFlag;
        this.showPatientTableFlag = false;
        this.showDoctorTableFlag = false;
        this.showDoctorFormFlag = false;
      },
      confirmModifyPatient() {
        // Lógica para confirmar modificación de paciente
        // ...
  
        // Restablecer campos después de confirmar
        this.selectedPatient = {};
        this.showModifyPatientFormFlag = false;
  
        // ... (código adicional según sea necesario)
      },
      confirmDeletePatient(patient) {
        // Lógica para confirmar eliminación de paciente
        // ...
  
        // Actualizar la lista de pacientes después de la eliminación
        this.patientList = this.patientList.filter((p) => p !== patient);
      },
  
      // Métodos para la sección de Doctores
      showDoctorTable() {
        this.showPatientTableFlag = false;
        this.showModifyPatientFormFlag = false;
        this.showDoctorTableFlag = !this.showDoctorTableFlag;
        this.showDoctorFormFlag = false;
        this.showModifyDoctorFormFlag = false;
      },
      showDoctorForm() {
        this.showDoctorFormFlag = !this.showDoctorFormFlag;
        this.showDoctorTableFlag = false;
        this.showModifyDoctorFormFlag = false;
      },
      modifyDoctor(doctor) {
        this.newDoctor = { ...doctor };
        this.showDoctorFormFlag = true;
        this.showDoctorTableFlag = false;
      },

      validateDoctorForm() {
    if (!this.isValidPhone()) {
      alert('Por favor, ingresa un número de teléfono válido de 10 dígitos.');
      return;
    }

    if (!this.isValidEmail()) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!this.isValidSpecialty()) {
      alert('Por favor, selecciona una especialidad.');
      return;
    }

    // Aquí puedes mostrar un mensaje de confirmación más elaborado, por ejemplo, un modal
    const isConfirmed = window.confirm('¿Confirmar los datos ingresados?');

    if (isConfirmed) {
      // Lógica para confirmar el alta del doctor
      this.confirmDoctorForm();
    }
    },
    isValidPhone() {
        // Validar si el teléfono tiene 10 dígitos
        return /^\d{10}$/.test(this.newDoctor.phone);
    },
    isValidEmail() {
        // Validar si el correo tiene un formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.newDoctor.email);
    },
    isValidSpecialty() {
        // Validar si se ha seleccionado una especialidad
        return !!this.newDoctor.specialty;
    },
      confirmDoctorForm() {
        // Lógica para confirmar formulario de nuevo doctor
        // ...
  
        // Restablecer campos después de confirmar
        this.newDoctor = {};
        this.showDoctorFormFlag = false;
  
        // ... (código adicional según sea necesario)
      },
      confirmModifyDoctor() {
        // Lógica para confirmar modificación de doctor
        // ...
  
        // Restablecer campos después de confirmar
        this.selectedDoctor = {};
        this.showModifyDoctorFormFlag = false;
  
        // ... (código adicional según sea necesario)
      },
      confirmDeleteDoctor(doctor) {
        // Lógica para confirmar eliminación de doctor
        // ...
  
        // Actualizar la lista de doctores después de la eliminación
        this.doctorList = this.doctorList.filter((d) => d !== doctor);
      },
    },
  };
  </script>
  
  <style scoped>
  @import '@/styles/styles-admin.css';
  </style>
  