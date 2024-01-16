<template>
    <div class="container d-flex flex-column align-items-center">
      <h1 class="p-4">{{ msg }}</h1>
      <div v-if="launch" class="card" style="width: 18rem">
        <img :src="launch[0].mission_patch_small" class="card-img-top p-4" alt="Mission Image" />
        <div class="card-body">
          <h5 class="card-title">{{ launch[0].mission_name }}</h5>
          <p class="card-text">
            Año Lanzamiento: {{ launch[0].launch_year  }}
          </p>
          <p class="card-text">
            Resultado lanzamiento: {{ launch[0].launch_result  }}
          </p>
          <a href="#" class="btn btn-success me-4">Editar</a>
          <a href="#" class="btn btn-danger">Eliminar</a>
        </div>
      </div>
      <div v-else>
        <p>Selecciona una misión</p>
      </div>
    </div>
</template>

<script>
import { getLaunch } from "../api/api";

export default {
  name: "Launch",
  data() {
    return {
      msg: "Detalles de la misión",
      launch: null,
    };
  },
  methods: {
    async fetchLaunch() {
      const missionId = this.$route.params.mission_id;
      if (missionId) {
        try {
          this.launch = await getLaunch(missionId);
        } catch (error) {
          console.log(`Error al obtener la misión: ${missionId}`);
        }
      }
    },
  },
  async mounted() {
    this.fetchLaunch();
  },
};
</script>

<style>
</style>