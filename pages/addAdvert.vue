<template>
  <div>
    <h1>Ajouter une annonce</h1>

    <formAdvertComponent
      :dropdown-list="departements"
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
  name: 'AddAdvertPage',
  components: {
    formAdvertComponent,
  },
  middleware: 'auth',
  data() {
    return {
      departements: null,
      baseUrl: this.$config.API_BASE_URL,
      rep: 'null',
      res: 'null',
    }
  },
  // A la création recherche des departements
  async created() {
    await this.fetchDepartements()
  },
  methods: {
    async submitForm(advertInfos) {
      this.rep = advertInfos
      try {
        await this.$axios
          .$post(this.baseUrl + '/api/me/restaurants/add', advertInfos)
          .then((reponse) => (this.res = reponse))

        if (this.res.success) {
          this.$router.push('/myAdverts')
        }
      } catch (err) {
        console.log('restaurant not add')
      }
      console.log('Ok add restaurant')
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
  },
}
</script>

<style lang="scss" scoped>
</style>