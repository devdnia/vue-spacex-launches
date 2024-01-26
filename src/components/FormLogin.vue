<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card m-3 w-50">
      <h5 class="card-header">
        <title-launch msg="LOGIN" class="mt-3" />
      </h5>
      <div class="card-body d-flex flex-column align-items-center">
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
          class="w-50 d-flex flex-column"
        >
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

          <div class="form-group mt-5">
            <button type="submit" class="btn btn-success me-3">
              Acceder &nbsp; 🚀
            </button>
            <button @click="goRegister" class="btn btn-secondary">
              Registrarse &nbsp; 😟
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

import TitleLaunch from "./TitleLaunch.vue";
import { authService } from '@/services/auth';

export default {
  components: {
    Form,
    Field,
    TitleLaunch,
  },
  data() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required("Email es obligatorio")
        .email("Formato email incorrecto"),
      password: Yup.string().required("La constraseña es obligatoria"),
    });
    const email = ''
    const password = ''
    return {
      schema,
      email,
      password
    };
  },
  methods:{
    async onSubmit( values ){

      this.email = values.email
      this.password = values.password

        try {
          await authService.login( this.email, this.password )
          console.log( this.email, this.password );
          this.$router.push('/launches')
        } catch (error) {
          console.log('Error al iniciar sesión: ', error.message );
        }
    },
    goRegister(){
      this.$router.push("/register");
    }
  },
};
</script>

<style>
</style>