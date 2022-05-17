<template>
  <div>
    <h1>Modifiez votre annonce {{ reference }}</h1>

    <v-progress-circular
      v-if="!loaded"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <formAdvertComponent
      v-else
      :dropdown-list="departements"
      :resto-infos="resto"
      @advertInfos="submitForm"
    />
    <p>les infos sont:</p>
    <p>{{ rep }}</p>
    <p>la requête retourne</p>
    <p>{{ res }}</p>
  </div>
</template>

<script>
import formAdvertComponent from '@/components/FormAdvert.vue'

export default {
  components: {
    formAdvertComponent,
  },
  data() {
    return {
      resto: null,
      departements: null,
      reference: null,
      loaded: false,
      baseUrl: this.$config.API_BASE_URL,
      imageFolderPath: this.$config.API_BASE_URL + this.$config.IMAGE_FOLDER,
      rep: 'null',
      res: 'null',
    }
  },
  // A la création recherche des departements
  async created() {
    await this.fetchDepartements()
  },
  async mounted() {
    console.log(this.$route)
    this.loaded = false
    this.reference = this.$route.params.reference
    await this.fetchMyRestaurant()
    this.loaded = true
    console.log(this.resto)
    console.log(this.reference)
  },
  methods: {
    async fetchMyRestaurant() {
      try {
        await this.$axios
          .$get(this.baseUrl + '/api/me/restaurants/view/' + this.reference)
          .then((reponse) => (this.resto = reponse.restaurant))
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log('ok my restaurant')
      console.log(this.resto)
    },

    // Récupère tous les départements dans la base de données
    async fetchDepartements() {
      try {
        await this.$axios
          .$get(this.baseUrl + '/api/departements')
          .then((reponse) => (this.departements = reponse.departements))
      } catch (err) {
        console.log('no departements found !')
      }
      console.log('ok departement')
    },

    async submitForm(advertInfos) {
      this.rep = advertInfos
      try {
        await this.$axios
          .$patch(this.baseUrl + '/api/me/restaurants/edit/' + this.reference, advertInfos)
          .then((reponse) => (this.res = reponse))

        if (this.res.success) {
          this.$router.push('/myAdverts')
        }
      } catch (err) {
        console.log('restaurant not add')
      }
      console.log('Ok add restaurant')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>