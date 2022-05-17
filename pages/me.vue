<template>
  <div>
    <h1>Mon profil</h1>
    <div>Bienvenue {{ $auth.user.firstname }} {{ $auth.user.lastname }} !</div>

    {{$auth.user}}
  </div>
</template>

<script>
export default {
  name: 'MePage',
  middleware: 'auth',
  // methods: {
  //   async user() {
  //     try {
  //       await this.$axios
  //         .$get(this.baseUrl + '/api/me' + this.filterPath)
  //         .then((reponse) => (this.restos = reponse.restaurants))
  //     } catch (err) {
  //       console.log('no restaurant found !')
  //     }
  //     console.log('ok restaurant')
  //     console.log(this.restos)
  //   },
  // },
  mounted() {
    console.log(this.$auth.user)
  },
}
</script>

<style lang="scss" scoped>
</style>