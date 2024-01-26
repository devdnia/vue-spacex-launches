<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card m-3 w-50">
      <h5 class="card-header">
        <title-launch msg="REGISTRO USUARIO" class="mt-3" />
      </h5>
      <div class="card-body d-flex flex-column align-items-center">
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          class="w-50 d-flex flex-column"
          v-slot="{ errors }"
        >
          <!-- NAME-->
          <div class="form-group">
            <label>Nombre</label>
            <Field
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
            />
          </div>

          <!-- LASTNAME-->
          <div class="form-group">
            <label>Apellidos</label>
            <Field
              name="lastName"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.lastName }"
            />
            <div class="invalid-feedback">{{ errors.lastName }}</div>
          </div>

          <!-- Email-->
          <div class="form-group">
            <label>Email</label>
            <Field
              name="email"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
            />
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>

          <!-- Contraseña -->
          <div class="form-group">
            <label>Contraseña</label>
            <Field
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
            />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>

          <!-- CONFIRMAR CONTRASEÑA -->
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <Field
              name="passwordConfirm"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.passwordConfirm }"
            />
            <div class="invalid-feedback">{{ errors.passwordConfirm }}</div>
          </div>

          <div class="form-group mt-5">
            <button type="submit" class="btn btn-success me-3">
              Registrarse &nbsp; 🚀
            </button>
            <button @click="goHome" class="btn btn-secondary">Salir &nbsp; 😟</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from "yup";
import { Form, Field } from "vee-validate";

import TitleLaunch from "./TitleLaunch.vue";
import { authService } from "@/services/auth";

export default {
  components: {
    TitleLaunch,
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string()
        .required("Email es obligatorio")
        .email("Formato email incorrecto"),
      password: Yup.string().required("La constraseña es obligatoria"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Contraseña no coincide")
        .required("Confirme la contraseña"),
    });
    const name = null;
    const lastname = null;
    const email = null;
    const password = null;

    return { schema, name, lastname, email, password };
  },
  methods: {
    async onSubmit(values) {
      if (values.name === undefined) {
        this.name = "No name";
      } else {
        this.name = values.name;
      }

      if (values.lastname == null) {
        this.lastname = "No lastname";
      } else {
        this.lastname = values.lastname;
      }

      this.email = values.email;
      this.password = values.password;

      try {
        await authService.register( this.name, this.lastname, this.email, this.password);
        this.$router.push("/launches");
      } catch (error) {
        console.log(error);
      }
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>