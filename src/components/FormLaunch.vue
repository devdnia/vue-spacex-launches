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
          :value="launch.mission_name"
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
          :value="launch.launch_year"
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
          :value="launch.mission_patch_small"
        />
      </div>
      <!-- Botones de formulario -->
      <button
        type="submit"
        class="btn btn-primary mt-3 me-3"
      >
        Guardar
      </button>

      <button @click="goHome" class="btn btn-secondary mt-3">Salir</button>
    </form>
  </div>

  <!-- Si no hay lanzamiento -->
  <div class="container w-25" v-else>
    <title-launch msg="CREAR MISIÓN" />

    <form @submit.prevent="addElement">
      <!-- Número de misión -->
      <div class="form-group p-2">
        <label for="missionId">Número de misión:</label>
        <input
          id="missionId"
          type="text"
          class="form-control"
          placeholder="Número de misión"
          v-model="newLaunch.mission_id"
        />
      </div>

      <!-- Nombre misión -->
      <div class="form-group p-2">
        <label for="missionName">Nombre de la misión:</label>
        <input
          id="missionName"
          type="text"
          class="form-control"
          placeholder="Nombre de la misión"
          v-model="newLaunch.mission_name"
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
          v-model="newLaunch.launch_year"
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
          v-model="newLaunch.mission_patch_small"
        />
      </div>
      <!-- Botones de formulario -->
      <button type="submit" class="btn btn-primary mt-3 me-3">Guardar</button>

      <button class="btn btn-secondary mt-3" @click="goHome">Salir</button>

      <!-- <div class="alert alert-success" role="alert">Lanzamiento modificado</div> -->
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import TitleLaunch from "./TitleLaunch.vue";
import { getLaunch, updateLaunch, createLaunch } from "../api/api";

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
        const updatedLaunch = await updateLaunch(this.launch.id, this.launch);
        console.log("Lanzamiento actualizado:", updatedLaunch);
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

    async addElement() {
      let id = crypto.randomUUID();
      this.newLaunch.id = id;

      try {
        // Creo el lanzamiento en la BD
        if (this.newLaunch.mission_patch_small === null) {
          this.newLaunch.mission_patch_small =
            "https://placehold.co/600x400?text=NO%20+%20IMAGE";
        }
        await createLaunch(this.newLaunch);
        // limpio el formulario
        this.newLaunch = {
          mission_id: null,
          mission_name: null,
          launch_year: null,
          mission_patch_small: null,
        };
        Swal.fire("Lanzamiento creado 🚀 ");
        this.goHome();
      } catch (error) {
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