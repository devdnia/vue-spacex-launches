<template>
  <nav>
    <router-link to="/">Inicio</router-link>
    <span> 🌎 </span>
    <router-link to="/launches">Lanzamientos</router-link>
  </nav>
  <hr />
</template>

<script>
export default {};
</script>

<style scoped>
nav{
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
</style>