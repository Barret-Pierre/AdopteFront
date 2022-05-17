<template>
  <div>
    <v-app-bar fixed app>
      <v-btn text to="/">Accueil</v-btn>
      <v-btn text to="/restaurants">Acheter</v-btn>
      <div v-if="isAuthenticated">
        <v-btn text to="/myAdverts">Mes annonces</v-btn>
      </div>

      <v-spacer />
      <div v-if="isAuthenticated">
        <a href="/me">{{ $auth.user.email }}</a>
        <v-btn text @click="logout">Déconexion</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Se connecter</v-btn>
        <v-btn text to="/register">S'inscrire</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 

export default {
  name: 'MenuComponent',
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fixed: false,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      // this.$router.push('/')
      // this.$router.push('loggin');
    },
  },
}
</script>

<style lang="scss" scoped>
</style>