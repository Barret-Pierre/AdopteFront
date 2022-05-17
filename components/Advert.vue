<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-img height="250" :src="mainPicturePath"></v-img>

      <v-card-title>{{ slug }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ms-4">{{ departementName }}</div>
          <div class="grey--text ms-4">{{ departementCode }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">{{ price }}€</div>
        <div v-if="typeSale == 0 && openSale == 1" class="my-4 text-subtitle-1">
          Ouvert à la vente des murs
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Information importantes</v-card-title>

      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-if="typeSale == 0"
              >Vente: font</v-list-item-title
            >
            <v-list-item-title v-else>Vente: font et mur</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Places: {{ restoSits }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>Surface: {{ restoSuface }}M²</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>

      <v-card-actions>
        <v-btn
          :href="'http://localhost:3000/restaurant/' + slug"
          color="deep-purple lighten-2"
          text
        >
          Voir l'annonce
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AdvertComponent',
  props: {
    mainPicturePath: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    departementName: {
      type: String,
      default: '',
    },
    departementCode: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    typeSale: {
      type: Number,
      default: 0,
    },
    openSale: {
      type: Boolean,
      default: false,
    },
    restoSits: {
      type: Number,
      default: 0,
    },
    restoSuface: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      baseUrl: this.$config.API_BASE_URL,
      imageDefaultPath: this.baseUrl + this.$config.IMAGE_FOLDER + this.$config.IMAGE_DEFAULT,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>