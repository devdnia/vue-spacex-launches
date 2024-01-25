<template>
  <!-- Si hay lanzamiento -->
  <div class="container w-25" v-if="launch">
    <title-launch msg="EDITAR MISIÓN" />

    <form @submit.prevent="saveChangesLaunch">
      <!-- Número de misión -->
      <div class="form-group p-2">
        <label for="missionName">Número de misión:</label>
        <input
          id="missionName"
          type="text"
          class="form-control"
          placeholder="Número de misión"
          v-model="launch.mission_id"
        />
      </div>

      <!-- Nombre misión -->
      <div class="form-group p-2">
        <label for="mission">Nombre de la misión:</label>
        <input
          id="mission"
          type="text"
          class="form-control"
          placeholder="Nombre de la misión"
          v-model="launch.mission_name"
        />
      </div>

      <!-- Año de lanzamiento -->
      <div class="form-group p-2">
        <label for="year">Año:</label>
        <input
          id="year"
          type="text"
          class="form-control"
          placeholder="Año de lanzamiento"
          v-model="launch.launch_year"
        />
      </div>

      <!-- URL imagen -->
      <div class="form-group mb-5 p-2">
        <label for="img">Imagen:</label>
        <input
          id="img"
          type="text"
          class="form-control"
          placeholder="Url de la imagen"
          v-model="launch.mission_patch_small"
        />
      </div>
      <!-- Botones de formulario -->
      <button type="submit" class="btn btn-primary mt-3 me-3">Guardar</button>

      <button @click="goHome" class="btn btn-secondary mt-3">Salir</button>
    </form>
  </div>

  <!-- YUP -->

</template>

<script>
import Swal from "sweetalert2";
import TitleLaunch from "./TitleLaunch.vue";
import { getLaunch, updateLaunch } from "../api/api";

export default {
  name: "FormLaunch",
  components: { TitleLaunch },
  data() {
    return {
      launch: null,
      newLaunch: {
        mission_id: null,
        mission_name: null,
        launch_year: null,
        mission_patch_small: null,
      },
    };
  },
  methods: {
    async fetchLaunch() {
      const missionId = this.$route.params.id;
      if (missionId) {
        try {
          this.launch = await getLaunch(missionId);
        } catch (error) {
          console.log(`Error al obtener la misión: ${missionId}`);
        }
      }
    },

    //Formulario
    async saveChangesLaunch() {
      try {
        await updateLaunch(this.launch.id, this.launch);
        Swal.fire("!Lanzamiento actualizado 🚀 !");
        this.goHome();
      } catch (error) {
        console.error("Error al actualizar el lanzamiento:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Algo no funcionó 💣 `,
        });
      }
    },
    // Navegación
    goHome() {
      this.$router.push("/");
    },
  },
  async mounted() {
    this.fetchLaunch();
  },
};
</script>

<style>
</style>