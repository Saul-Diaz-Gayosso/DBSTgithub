<template>
  <div id="app" style="border-bottom: 0;">
    <header>
      <!-- Contenido del encabezado -->
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <!-- Contenido del pie de página -->
    </footer>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      this.updateActiveComponent();
    },
  },
  created() {
    this.updateActiveComponent();
  },
  methods: {
    updateActiveComponent() {
      const { name } = this.$route;
      this.activeComponent = name;
    },
  },
  data() {
    return {
      activeComponent: null,
    };
  },
};
</script>
