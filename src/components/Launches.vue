<template>
  <div>
    <title-launch msg="LANZAMIENTOS DE SPACEX" />
  </div>
  <div class="container">
    <br />
    <table class="table table-striped mb-5">
      <thead>
        <tr>
          <th>NÚMERO MISIÓN</th>
          <th>NOMBRE MISIÓN</th>
          <th>AÑO</th>
          <th>IMÁGEN MISIÓN</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="launche in launches"
          :key="launche.mission_id"
          @click="showLaunche(launche.id)"
        >
          <td>{{ launche.mission_id }}</td>
          <td>{{ launche.mission_name }}</td>
          <td>{{ launche.launch_year }}</td>
          <td>
            <img :src="launche.mission_patch_small" alt="Mission Image" />
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button class="btn btn-success fw-bold" @click="createLaunch">CREAR LANZAMIENTO</button> -->
    <router-link to="/newlaunch" class="btn btn-success fw-bold">CREAR LANZAMIENTO</router-link>
  </div>
</template>

<script>

import { getLaunches } from '../api/api'
import TitleLaunch from './TitleLaunch.vue'

export default {
  components: { TitleLaunch },
  name: "Launches",
  data() {
    return{
      launches: Array,
    }
  },
  methods: {
    async fetchLaunches(){
      this.launches = await getLaunches()
    },
    showLaunche( id ){
      this.$router.push({ name: 'launch', params: { id }})
    },
    createLaunch() {
      console.log("Create");
    }
  },
  mounted(){
    this.fetchLaunches()
  }
  }
</script>

<style scoped>
img {
  width: 90px;
  height: 90px;
}
</style>