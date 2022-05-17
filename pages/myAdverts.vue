<template>
  <div>
    <h1>Mes annonces</h1>

    <v-progress-circular
      v-if="!loaded"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-else>
      <!-- Annonces -->
      <div v-for="resto in restos" :key="resto.slug">
        <v-img
          v-if="resto.restaurant_picture != null"
          height="250"
          :src="imageFolderPath + resto.restaurant_picture.url"
        ></v-img>
        <v-img
          v-else
          height="250"
          :src="imageFolderPath + '/default/default.jpg'"
        ></v-img>

        <v-btn text :href="'/restaurant/' + resto.slug"
          >{{ resto.slug }}
        </v-btn>
        <p v-if="resto.state">Publié</p>
        <p v-else>Non publié</p>
        <v-btn
          class="ma-2"
          icon
          :href="'http://localhost:3000/myAdvert/' + resto.slug"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="400">
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"> mdi-delete </v-icon>
          </template>
          <v-card>
            <v-card-title class="text-h5">
              Vousle-vous vraiment supprimer cette annonce?
            </v-card-title>
            <v-card-text>Toute suppression est définitive !</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Disagree
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="deleteResto(resto.slug)"
              >
                Agree
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>

    <v-btn color="blue" text to="/addAdvert"> Ajouter une annonce </v-btn>
  </div>
</template>

<script>
export default {
  name: 'MyAdvertPage',
  middleware: 'auth',
  data() {
    return {
      dialog: false,
      restos: null,
      loaded: false,
      baseUrl: this.$config.API_BASE_URL,
      imageFolderPath: this.$config.API_BASE_URL + this.$config.IMAGE_FOLDER,
      res: null,
    }
  },
  async mounted() {
    console.log(this.$auth.user)
    this.loaded = false
    console.log(this.loaded)
    await this.fetchMyRestaurants()
    console.log(this.restos)
    this.loaded = true
    console.log(this.loaded)
  },
  methods: {
    async fetchMyRestaurants() {
      try {
        await this.$axios
          .$get(this.baseUrl + '/api/me/restaurants')
          .then((reponse) => (this.restos = reponse.restaurants))
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log('ok my restaurant')
      console.log(this.restos)
    },
    async deleteResto(restoSlug) {
      console.log('resto' + restoSlug + 'supprimé')
      this.dialog = false
      try {
        await this.$axios
          .$delete(this.baseUrl + '/api/me/restaurants/delete/' + restoSlug)
          .then((reponse) => (this.res = reponse))
        if (this.res.success) {
          this.loaded = false
          await this.fetchMyRestaurants()
          this.loaded = true
        }
      } catch (err) {
        console.log('no restaurant found !')
      }
      console.log('ok delete restaurant')
      console.log(this.res)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>