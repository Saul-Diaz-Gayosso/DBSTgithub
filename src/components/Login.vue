<template>
  <div class="login-container">
    <header>
      <div class="logo-container">
        <img src="@/assets/imsscom-logo-full.png" alt="Logo de la App" />
      </div>
    </header>

    <!-- Formulario de inicio de sesión -->
    <transition name="login-form">
      <div v-if="showLoginForm" key="login-form" class="login-form">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <label for="username">Usuario:</label>
          <input type="text" id="username" v-model="username" required />
          <label for="password">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
          <button type="submit">Iniciar Sesión</button>
          <button type="button" @click="showSignUpView">Crear Cuenta</button>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
      </div>
      <div v-else key="loading" class="loading-message">
        <p>Cargando...</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      showLoginForm: true,
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    showSignUpView() {
      // Cambiar al formulario de registro
      this.showLoginForm = false;
    },

    login() {
      // Validar el formulario antes de proceder
      if (this.validateForm()) {
        // Lógica para iniciar sesión
        // ...
      }
    },

    validateForm() {
      // Puedes personalizar la lógica de validación según tus necesidades
      if (!this.username || !this.password) {
        this.errorMessage = 'Por favor, complete todos los campos.';
        return false;
      }
      // Agrega otras validaciones según sea necesario
      return true;
    },
  },
};
</script>

<style scoped>
@import '@/styles/styles-login.css';
</style>
