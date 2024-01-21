<template>
    <form-launch></form-launch>

</template>

<script>
import FormLaunch from './FormLaunch.vue';


export default {
  components: { FormLaunch },
    name: 'CreateLaunch',
    data(){
        return{
            msg: 'Crear lanzamiento',
            launch: {
                mission_id: "",
                mission_name:"",
                launch_year:"",
                mission_patch_small:""
            }
        }
    }
};
</script>

<style>
</style>