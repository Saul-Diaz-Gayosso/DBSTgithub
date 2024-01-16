<template>
  <div class="signup-container">
    <header>
      <div class="logo-container">
        <img src="@/assets/imsscom-logo-full.png" alt="Logo de la App" />
      </div>
    </header>

    <!-- Formulario de creación de cuenta -->
    <transition name="signup-form">
      <div v-if="showSignUpForm" key="signup-form" class="signup-form">
        <h2>Crear Cuenta</h2>
        <form @submit.prevent="createAccount">
          <label for="fullName">Nombre completo:</label>
          <input type="text" id="fullName" v-model="fullName" required />
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" v-model="email" required />
          <label for="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @input="updatePasswordStrength"
            required
          />
          <button type="submit">Crear Cuenta</button>
          <button type="button" @click="goToLogin">Iniciar Sesión</button>
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
  name: 'SignUpComponent',
  data() {
    return {
      showSignUpForm: true,
      fullName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    createAccount() {
      // Validar el formulario antes de proceder
      if (this.validateForm()) {
        this.showSignUpForm = false;
      }
    },
    goToLogin() {
      // Cambiar a la pantalla de inicio de sesión
      this.$router.push('/');
    },
    validateForm() {
      // HTML5 validará automáticamente los campos requeridos
      // y mostrará mensajes de error si es necesario
      return true; // Puedes personalizar esta lógica si es necesario
    },
  },
};
</script>

<style scoped>
@import '@/styles/styles-signup.css';

</style>
