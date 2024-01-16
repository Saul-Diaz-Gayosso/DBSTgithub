new Vue({
    el: '#app',
    data: {
      dataFromServer: [],
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch('http://localhost:3000/api/data');
          const data = await response.json();
          this.dataFromServer = data;
        } catch (error) {
          console.error('Error al obtener datos del servidor:', error);
        }
      },
    },
    template: `
      <div>
        <h1>Vue SQL Server App</h1>
        <ul>
          <li v-for="item in dataFromServer" :key="item.id">{{ item.nombre }}</li>
        </ul>
      </div>
    `,
  });
  