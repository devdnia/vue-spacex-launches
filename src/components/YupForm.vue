<template>
  <!-- SI NO HAY DATOS -->
  <div class="d-flex justify-content-center align-items-center">
    <div class="card m-3 w-50">
      <h5 class="card-header">
        <title-launch msg="CREAR MISIÓN" class="mt-3" />
      </h5>
      <div class="card-body d-flex flex-column align-items-center">
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
          class="w-50 d-flex flex-column"
        >
          <!-- Número de misión -->
          <div class="form-group">
            <label>Número de Misión</label>
            <Field
              name="missionId"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.missionId }"
            />
            <div class="invalid-feedback">{{ errors.missionId }}</div>
          </div>

          <!-- Nombre de la misión -->
          <div class="form-group">
            <label>Nombre de la misión</label>
            <Field
              name="missionName"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.missionName }"
            />
            <div class="invalid-feedback">{{ errors.missionName }}</div>
          </div>

          <!-- Fecha de lanzamiento -->
          <div class="form-group">
            <label>Fecha de lanzamiento</label>
            <Field
              name="missionDate"
              type="date"
              class="form-control"
              :class="{ 'is-invalid': errors.missionDate }"
            />
            <div class="invalid-feedback">{{ errors.missionDate }}</div>
          </div>

          <!-- Url imagen -->
          <div class="form-group">
            <label>Url imagen</label>
            <Field name="missionImg" type="text" class="form-control" />
          </div>

          <div class="form-group mt-5">
            <button type="submit" class="btn btn-success me-3">
              Guardar &nbsp; 🚀
            </button>
            <button @click="goHome" class="btn btn-secondary">
              Cancelar &nbsp; 😟
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
  
  

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";

import TitleLaunch from "./TitleLaunch.vue";
import { createLaunch } from "../api/api";

export default {
  components: {
    Form,
    Field,
    TitleLaunch,
  },
  data() {
    const schema = Yup.object().shape({
      missionId: Yup.string().required("El número de misión es requerido"),
      missionName: Yup.string().required("El nombre de misión es requerido"),
      missionDate: Yup.string()
        .required("La fecha de lanzamiento es obligatoria")
        .matches(
          /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
          "La fecha debe ser YYYY-MM-DD"
        ),
      missionUrl: Yup.string(),
    });

    return {
      newLaunch: {
        id: null,
        mission_id: null,
        mission_name: null,
        launch_year: null,
        mission_patch_small: null,
      },
      schema,
    };
  },
  methods: {
    async onSubmit(values) {

      let id = crypto.randomUUID();
      this.newLaunch.mission_id = values.missionId;
      this.newLaunch.mission_name = values.missionName;
      this.newLaunch.launch_year = values.missionDate;
      this.newLaunch.mission_patch_small = values.missionUrl;
      this.newLaunch.id = id;

      // Si la url imagen viene vacía
      if (!this.newLaunch.mission_patch_small) {
        this.newLaunch.mission_patch_small =
          "https://placehold.co/600x400?text=NO%20+%20IMAGE";
      }

      try {
        await createLaunch(this.newLaunch);

        Swal.fire("Lanzamiento creado 🚀 ");
        this.goHome();
      } catch (error) {{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Algo no funcionó 💣 `,
        });
      }
        
      }
    },
    // Navegación
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>