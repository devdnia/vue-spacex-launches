<template>
  <div class="container d-flex flex-column align-items-center">
    <title-launch msg="DETALLES DE LA MISIÓN"/>
    <div v-if="launch" class="card" style="width: 18rem">
      <img
        :src="launch.mission_patch_small"
        class="card-img-top p-4"
        alt="Mission Image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ launch.mission_name }}</h5>
        <p class="card-text">Año Lanzamiento: {{ launch.launch_year }}</p>
        <p class="card-text">
          Misión número: {{ launch.mission_id }}
        </p>
        <p class="card-text">
          Resultado lanzamiento: {{ launch.launch_result }}
        </p>

        <button @click="editLaunch( launch.id )" class="btn btn-success me-4">Editar</button>
        <button @click="deleteMision" class="btn btn-danger">Eliminar</button>
      </div>
    </div>
    <div v-else>
      <p>Error al cargar</p>
    </div>
  </div>
</template>

<script>
import { getLaunch, deleteLaunch } from "../api/api"
import Swal from "sweetalert2"
import TitleLaunch from './TitleLaunch.vue';

export default {
  components: { TitleLaunch },
  name: "Launch",
  data() {
    return {
      msg: "Detalles de la misión",
      launch: null,
    }
  },
  methods: {
    async fetchLaunch() {
      const missionId = this.$route.params.id
      if (missionId) {
        try {
          this.launch = await getLaunch(missionId)
        } catch (error) {
          console.log(`Error al obtener la misión: ${missionId}`)
        }
      }
    },
    async deleteMision() {
      Swal.fire({
        title: "¿Esta seguro de eliminar la misión?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Salir",
        denyButtonText: `Borrar`,
      }).then(async (result) => {
        if (result.isDenied) {
          const missionId = this.$route.params.id;
          await deleteLaunch(missionId);
          Swal.fire("Misión borrada", "", "info");
          //Navegar al home después del borrado
          this.$router.replace({ name: "home" });
        }
      });
    },
    editLaunch( id ) {
      this.$router.push({ name: 'formlaunch', params: { id }})
    },
  },
  async mounted() {
    this.fetchLaunch()
  },
};
</script>

<style>
</style>