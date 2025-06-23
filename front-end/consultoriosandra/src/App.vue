<template>
  <router-view/>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions(['leerToken'])
  },
  created() {
    this.leerToken()
  },
}
</script>
<style lang="scss">
</style>
