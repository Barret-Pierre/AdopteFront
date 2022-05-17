<template>
  <div>
    <v-progress-circular
      v-if="!loaded"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-else>
      <div>
        <ul>
          <li v-for="picture in resto.restaurant_pictures" :key="picture.url">
            <img :src="imageFolderPath + picture.url" alt="" />
          </li>
        </ul>

        <p>{{ resto.slug }}</p>
        <p v-if="resto.type_sale == 0">Vente: font</p>
        <p v-else>Vente: font et mur</p>
        <p v-if="resto.type_sale == 0 && resto.open_sale == 1">
          Ouvert à la vente des murs
        </p>

        <p>{{ resto.description }}</p>
        <p>Prix: {{ resto.price }}€</p>
        <p v-if="resto.rent != null">
          Charges locatives: {{ resto.rent }}€/mois
        </p>
        <p>{{ resto.departement.name }}</p>
        <p>{{ resto.departement.code }}</p>

        <p>Places en salle: {{ resto.restaurant_sits }}</p>
        <p>Surface: {{ resto.restaurant_surface }}M²</p>
        <div v-if="resto.terrace == true">
          <p>Place en terrasse: {{ resto.terrace_sits }}</p>
          <p>surface terrasse: {{ resto.terrace_surface }}M²</p>
        </div>
        <div v-switch="resto.kitchen_furnitures">
          <p v-case="0">Cuisine aménagé</p>
          <p v-case="1">Cuisne non aménagé</p>
          <p v-case="2">Cuisine partiellement aménagé</p>
        </div>
        <p>Capitale: {{ resto.capital }}</p>
        <p>CA: {{ resto.sales_revenue }}</p>
        <div v-switch="resto.licence">
          <p v-case="0">Licence type 1</p>
          <p v-case="1">Licence type 3</p>
          <p v-case="2">Licence type 4</p>
          <p v-case="3">Licence non connue</p>
        </div>
        <p v-if="resto.client_file == true">Fichier client disponible</p>
      </div>

      <div>
        <h2>Restaurants similaires</h2>
        <advertComponent
          v-for="resto in restosSimilar"
          :key="resto"
          :mainPicturePath="imageFolderPath + resto.restaurant_picture.url"
          :slug="resto.slug"
          :departementName="resto.departement.name"
          :departementCode="resto.departement.code"
          :price="resto.price"
          :typeSale="resto.type_sale"
          :openSale="resto.open_sale"
          :restoSits="resto.restaurant_sits"
          :restoSuface="resto.restaurant_surface"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VSwitch from 'v-switch-case'

// Imports des composants
import advertComponent from '@/components/Advert.vue'

Vue.use(VSwitch)

export default {
  // Composants
  components: {
    advertComponent,
  },

  // Données
  data() {
    return {
      resto: null,
      restosSimilar: null,
      reference: null,
      loaded: false,
      baseUrl: this.$config.API_BASE_URL,
      imageFolderPath: this.$config.API_BASE_URL + this.$config.IMAGE_FOLDER,
    }
  },

  // Initialisation
  mounted() {
    console.log(this.$route)
    this.reference = this.$route.params.reference
    this.fetchAll()
  },

  // Méthodes utilisée
  methods: {
    // Récupère les information du restaurant en question
    async fetchRestaurant() {
      try {
        await this.$axios
          .$get(this.baseUrl + '/api/restaurants/view/' + this.reference)
          .then((reponse) => (this.resto = reponse.restaurant))
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log(this.resto)
    },

    // Récupère les restaurant similaire sans le restaurant actuellement affiché
    async fetchRestaurantsSimilar() {
      try {
        await this.$axios
          .$get(
            this.baseUrl +
              '/api/restaurants?departement_id=' +
              this.resto.departement.id +
              '&limite=3&slug=' +
              this.reference
          )
          .then((reponse) => (this.restosSimilar = reponse.restaurants))
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log(this.restosSimilar)
    },

    // Execute les deux requêtes pour récupérer l'ensemble des informations de la page
    async fetchAll() {
      await this.fetchRestaurant()
      await this.fetchRestaurantsSimilar()
      this.loaded = true
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 500px;
  height: 250px;
}
</style>