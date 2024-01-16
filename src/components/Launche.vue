<template>
<div class="card d-flex" style="width: 18rem;">
  <img src="https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png" class="card-img-top p-3" alt="Small Image">
  <div class="card-body">
    <h5 class="card-title">{{ launche.mission_id }}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary me-3">Editar</a>
    <a href="#" class="btn btn-danger">Borrar</a>
  </div>
</div>

</template>

<script>
export default {
  name: "Launche",
  data() {
    return {
      msg: "Lanzamiento ",
      mission_id: 1,
      launche: {
        "mission_id": "EE86F75",
        "flight_number": 2,
        "mission_name": "DemoSat",
        "launch_year": "2007",
        "is_tentative": false,
        "mission_patch_small": "https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png",
      },
    };
  },
  methods: {
    async getLaunche() {
      try {
        const res = await fetch(
          `http://localhost:3000/launches?mission_id=${this.mission_id}}`
        );
        this.launche = await res.json()
        console.log( this.launche )
      } catch (err) {
        //TODO: componente error
        console.log(err);
      }
    },
  },
  async mounted() {
    this.mission_id = this.$route.params.mission_id;
    this.getLaunche();
  },
};
</script>

<style>
</style>