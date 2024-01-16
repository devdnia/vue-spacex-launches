<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
  <div class="container">
    <br />
    <table class="table table-striped">
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
          @click="ShowLaunche(launche.mission_id)"
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
  </div>
</template>

<script>

import { getLaunches } from '../api/api'

export default {
  name: "Launches",
  data() {
    return{
      msg: 'Lanzamientos de SpaceX',
      launches: Array,
    }
  },
  methods: {
    async fetchLaunches(){
      this.launches = await getLaunches()
    },
    ShowLaunche( mission_id ){
      this.$router.push({ name: 'launch', params: { mission_id }})
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