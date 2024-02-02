<template>
  <nav>
    <router-link to="/">🏠 INICIO</router-link>
    <span> | </span>
    <router-link to="/login">🙍 ACCEDER</router-link>
    <span> | </span>
    <router-link to="/launches">🚀 LANZAMIENTOS</router-link>
    <span> | </span>
    <button @click="logout">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-logout"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
        />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
      LOGOUT
    </button>
  </nav>
  <hr />
</template>

<script>
import { authService } from '@/services/auth';
export default {

  methods: {
    async logout(){
       await authService.logout();
       this.$router.push('/');
    }
  }
};
</script>

<style scoped>
nav {
  padding: 1em;
}

a {
  margin: 25px;
  text-decoration: none;
  color: black;
}
a:hover {
  color: #8f8c8cee;
}

hr {
  color: #848282ee;
  -webkit-box-shadow: 0px 3px 8px 4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 3px 8px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 3px 8px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 3em;
}

button{
  background: transparent;
  border: none;
}
</style>