<template>
  <h3 class="mb-4">{{ msg }}</h3>
</template>

<script>
export default {
    name: 'Title',
    props:{
        msg: String,
        required: true
    }
}
</script>

<style>

</style>