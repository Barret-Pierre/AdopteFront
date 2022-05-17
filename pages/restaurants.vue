<template>
  <div>
    <h1>Restaurants</h1>

    <!-- Search -->
    <searchComponent :dropdown-list="departements" @filter="search" />

    <v-progress-circular
      v-if="!loaded"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-else>
      <!-- Annonces -->
      <advertComponent
        v-for="resto in restos"
        :key="resto.slug"
        :main-picture-path="imageUrl(resto)"
        :slug="resto.slug"
        :departement-name="resto.departement.name"
        :departement-code="resto.departement.code"
        :price="resto.price"
        :type-sale="resto.type_sale"
        :open-sale="resto.open_sale"
        :resto-sits="resto.restaurant_sits"
        :resto-suface="resto.restaurant_surface"
      />
    </div>
  </div>
</template>

<script>
import advertComponent from '@/components/Advert.vue'
import searchComponent from '@/components/Search.vue'

export default {
  name: 'RestaurantsPage',
  components: {
    advertComponent,
    searchComponent,
  },

  data() {
    return {
      filterPath: '',
      queryParamsUrl: this.$route.query,
      departements: null,
      restos: null,
      loaded: false,
      baseUrl: this.$config.API_BASE_URL,
      imageFolderPath: this.$config.API_BASE_URL + this.$config.IMAGE_FOLDER,
    }
  },

  // A la création recherche des departements
  async created() {
    await this.fetchDepartements()
  },

  mounted() {
    this.search()
  },

  methods: {

    imageUrl(resto) {
      if(resto.restaurant_picture != null){
        return this.imageFolderPath + resto.restaurant_picture.url
      } else {
        return 'https://api.tcds-devsite2.fr/webroot/upload/photos/default/default.jpg'
      }
    },

    // Mise à jour de l'url
    updateUrl(filtersRestaurant) {
      const qp = new URLSearchParams()
      if (filtersRestaurant.length !== 0) {
        filtersRestaurant.forEach((filterRestaurant) => {
          qp.set(filterRestaurant.name, filterRestaurant.value)
        })
        history.replaceState(null, null, '?' + qp.toString())
      } 
      this.filterPath = window.location.search
      console.log('ok update url')
    },

    // Recherche avec ou sans filtre
    async search(filtersRestaurant = []) {
      this.loaded = false
      this.updateUrl(filtersRestaurant)
      await this.fetchRestaurants()
      this.loaded = true
    },

    // Récupère tous les restaurants dans la base de données en fonction du filterPath
    async fetchRestaurants() {
      try {
        await this.$axios
          .$get(this.baseUrl + '/api/restaurants' + this.filterPath)
          .then((reponse) => (this.restos = reponse.restaurants))
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log('ok restaurant')
      console.log(this.restos)
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