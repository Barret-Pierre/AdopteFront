<template>
  <div>
    <form>
      <!-- 1 er partie du formulaire -->
      <v-container id="saleSectionForm" class="grey lighten-5 mb-6">
        <h3>Infos vente</h3>
        <p>Type de vente:</p>

        <v-radio-group v-model="advertInfos.sale.typeVente" row mandatory>
          <v-radio label="Font" :value="0"></v-radio>
          <v-radio label="Font et mur" :value="1"></v-radio>
          {{ advertInfos.sale.typeVente }}
        </v-radio-group>

        <v-text-field
          v-model="advertInfos.sale.capital"
          :error-messages="capitalErrors"
          :label="labelFond"
          :type="'number'"
          required
          @input="$v.advertInfos.sale.capital.$touch()"
          @blur="$v.advertInfos.sale.capital.$touch()"
        ></v-text-field>

        <div v-if="advertInfos.sale.typeVente == 0">
          <p>Vos mur sont-ils en location ?</p>

          <v-radio-group v-model="infosSaleSup" row mandatory>
            <v-radio label="Non" :value="0"></v-radio>
            <v-radio label="Oui" :value="1"></v-radio>
            {{ infosSaleSup }}
          </v-radio-group>

          <v-text-field
            v-if="infosSaleSup == 1"
            v-model="advertInfos.sale.rent"
            label="Prix du loyer"
            :type="'number'"
          ></v-text-field>

          <div v-else>
            <p>Êtes vous ouvert à la vente de vos mur ?</p>

            <v-radio-group v-model="advertInfos.sale.openSale" row mandatory>
              <v-radio label="Non" :value="0"></v-radio>
              <v-radio label="Oui" :value="1"></v-radio>
              {{ advertInfos.sale.openSale }}
            </v-radio-group>
          </div>
        </div>

        <v-text-field
          v-model="advertInfos.sale.salesRevenue"
          :error-messages="salesRevenueErrors"
          label="Chiffre d'affaire annuel"
          :type="'number'"
          @input="$v.advertInfos.sale.salesRevenue.$touch()"
          @blur="$v.advertInfos.sale.salesRevenue.$touch()"
        ></v-text-field>

        <p>Licence:</p>

        <v-radio-group v-model="advertInfos.sale.licence" row mandatory>
          <v-radio label="Type 1" :value="0"></v-radio>
          <v-radio label="Type 3" :value="1"></v-radio>
          <v-radio label="Type 4" :value="2"></v-radio>
          <v-radio label="Non connue" :value="3"></v-radio>
          {{ advertInfos.sale.licence }}
        </v-radio-group>

        <p>Fichier client:</p>

        <v-radio-group v-model="advertInfos.sale.clientFile" row mandatory>
          <v-radio label="Non" :value="0"></v-radio>
          <v-radio label="Oui" :value="1"></v-radio>
          {{ advertInfos.sale.clientFile }}
        </v-radio-group>

        <v-text-field
          v-model="advertInfos.sale.price"
          :error-messages="priceErrors"
          label="Prix de vente"
          :type="'number'"
          required
          @input="$v.advertInfos.sale.price.$touch()"
          @blur="$v.advertInfos.sale.price.$touch()"
        ></v-text-field>
        <v-btn id="nextSale" class="mr-4" :href="storeLink" @click="nextTo"
          >Next</v-btn
        >
        <v-btn @click="clearSaleSection"> Clear </v-btn>
      </v-container>

      <!-- 2 nd partie du formulaire -->

      <v-container id="restoSectionForm" class="grey lighten-5 mb-6">
        <h3>Infos resto</h3>
        <v-text-field
          v-model="advertInfos.resto.restoSits"
          :error-messages="restoSitsErrors"
          label="Nombre de place en salle"
          :type="'number'"
          required
          @input="$v.advertInfos.resto.restoSits.$touch()"
          @blur="$v.advertInfos.resto.restoSits.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="advertInfos.resto.restoSurface"
          :error-messages="restoSurfaceErrors"
          label="Surface en salle"
          :type="'number'"
          required
          @input="$v.advertInfos.resto.restoSurface.$touch()"
          @blur="$v.advertInfos.resto.restoSurface.$touch()"
        ></v-text-field>

        <p>Avez vous une terrasse ?</p>

        <v-radio-group v-model="advertInfos.resto.terrace" row mandatory>
          <v-radio label="Non" :value="0"></v-radio>
          <v-radio label="Oui" :value="1"></v-radio>
          {{ advertInfos.resto.terrace }}
        </v-radio-group>

        <div v-if="advertInfos.resto.terrace === 1">
          <v-text-field
            v-model="advertInfos.resto.terraceSits"
            label="Nombre de place en terrasse"
            :type="'number'"
          ></v-text-field>
          <v-text-field
            v-model="advertInfos.resto.terraceSurface"
            label="Surface de la terrasse"
            :type="'number'"
          ></v-text-field>
        </div>

        <p>Type de cuisine:</p>

        <v-radio-group
          v-model="advertInfos.resto.kitchenFurnitures"
          row
          mandatory
        >
          <v-radio label="Amménagée" :value="0"></v-radio>
          <v-radio label="Non-amménagée" :value="1"></v-radio>
          <v-radio label="Partiellement amménagée" :value="2"></v-radio>
          {{ advertInfos.resto.kitchenFurnitures }}
        </v-radio-group>

        <v-btn id="nextResto" class="mr-4" :href="storeLink" @click="nextTo"
          >Next</v-btn
        >
        <v-btn @click="clearRestoSection"> Clear </v-btn>
      </v-container>

      <!-- 3 eme partie du formulaire -->
      <v-container id="locationSectionForm" class="grey lighten-5 mb-6">
        <h3>Infos de localisation:</h3>

        <v-text-field
          v-model="advertInfos.location.address"
          :error-messages="addressErrors"
          label="Adresse du restaurant"
          required
          @input="$v.advertInfos.location.address.$touch()"
          @blur="$v.advertInfos.location.address.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="advertInfos.location.city"
          :error-messages="cityErrors"
          label="Ville"
          required
          @input="$v.advertInfos.location.city.$touch()"
          @blur="$v.advertInfos.location.city.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="advertInfos.location.zipCode"
          :error-messages="zipCodeErrors"
          label="Code Postal"
          required
          @input="$v.advertInfos.location.zipCode.$touch()"
          @blur="$v.advertInfos.location.zipCode.$touch()"
        ></v-text-field>
        <v-select
          v-model="advertInfos.location.departement"
          :items="dropdownList"
          :error-messages="departementErrors"
          item-text="name"
          item-value="id"
          label="Departements"
          persistent-hint
          return-object
          single-line
          @input="$v.advertInfos.location.zipCode.$touch()"
          @blur="$v.advertInfos.location.zipCode.$touch()"
        ></v-select>

        <v-btn id="nextLocation" class="mr-4" :href="storeLink" @click="nextTo"
          >Next</v-btn
        >
        <v-btn @click="clearLocationSection"> Clear </v-btn>
      </v-container>

      <!-- 4 eme partie du formulaire -->
      <v-container id="advertSectionForm" class="grey lighten-5 mb-6">
        <h3>Infos sur l'annonce:</h3>

        <v-textarea
          v-model="advertInfos.advert.description"
          :error-messages="descriptionErrors"
          label="Écrivez la déscription de votre annonce"
          required
          maxlength="1000"
          @input="$v.advertInfos.advert.description.$touch()"
          @blur="$v.advertInfos.advert.description.$touch()"
        ></v-textarea>

        <p>Publication:</p>

        <v-radio-group v-model="advertInfos.advert.state" row mandatory>
          <v-radio label="Ne pas publier" :value="0"></v-radio>
          <v-radio label="Publier l'annonce" :value="1"></v-radio>
          {{ advertInfos.advert.state }}
        </v-radio-group>
        <v-btn class="mr-4" :href="storeLink" @click="submit">Submit</v-btn>
        <v-btn @click="clearAdvertSection"> Clear </v-btn>
      </v-container>
    </form>
  </div>
</template>

<script>
// import useVuelidate from '@vuelidate/core'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'FormAdvertComponent',

  mixins: [validationMixin],

  props: {
    buttonSubmitName: {
      type: String,
      default: 'Submit',
    },
    dropdownList: {
      type: Function,
      default: () => {
        return []
      },
    },
    restoInfos: {
      type: Function,
      default: () => {
        return {
            type_sale: 0,
            capital: null,
            rent: null,
            open_sale: 0,
            sales_revenue: null,
            licence: 0,
            client_file: 0,
            price: null,
            restaurant_surface: null,
            resto_sits: null,
            terrace: 0,
            terrace_surface: null,
            terrace_sits: null,
            kitchen_furnitures: 0,
            adress1: null,
            zip_code: null,
            city: null,
            departement_id: null,
            description: null,
            state: 1,
        }
      },
    },
  },

  validations: {
    advertInfos: {
      sale: {
        typeVente: { required },
        capital: { required },
        rent: {},
        openSale: {},
        salesRevenue: { required },
        licence: { required },
        clientFile: { required },
        price: { required },
      },
      resto: {
        restoSurface: { required },
        restoSits: { required },
        terrace: { required },
        terraceSurface: {},
        terraceSits: {},
        kitchenFurnitures: { required },
      },
      location: {
        address: { required },
        zipCode: { required }, // regex de validation
        city: { required },
        departement: { required },
      },
      advert: {
        description: { required, maxLength: maxLength(1000) },
        state: { required },
      },
    },
  },

  data: () => ({
    show: false,
    infosSaleSup: 0,
    advertInfos: null,
  }),

  computed: {
    storeLink() {
      let link
      if (!this.$v.advertInfos.sale.$invalid) {
        if (!this.$v.advertInfos.resto.$invalid) {
          if (!this.$v.advertInfos.location.$invalid) {
            link = '#advertSectionForm'
          } else {
            link = '#locationSectionForm'
          }
        } else {
          link = '#restoSectionForm'
        }
      } else {
        link = '#saleSectionForm'
      }
      return link
    },
    
    // -------------------- Sales Error --------------------

    labelFond() {
      if (this.advertInfos.sale.typeVente === 0) {
        return 'Prix du fond'
      } else {
        return 'Prix du fond et des murs'
      }
    },
    capitalErrors() {
      const errors = []
      if (!this.$v.advertInfos.sale.capital.$dirty) return errors
      !this.$v.advertInfos.sale.capital.required &&
        errors.push('Capital is required.')
      return errors
    },
    rentErrors() {
      const errors = []
      if (!this.$v.advertInfos.sale.rent.$dirty) return errors
      !this.$v.advertInfos.sale.rent.required &&
        errors.push('Rent is required.')
      return errors
    },
    priceErrors() {
      const errors = []
      if (!this.$v.advertInfos.sale.price.$dirty) return errors
      !this.$v.advertInfos.sale.price.required &&
        errors.push('Price is required')
      return errors
    },
    salesRevenueErrors() {
      const errors = []
      if (!this.$v.advertInfos.sale.salesRevenue.$dirty) return errors
      !this.$v.advertInfos.sale.salesRevenue.required &&
        errors.push('Sales revenue are required')
      return errors
    },

    // -------------------- Resto Error --------------------

    restoSitsErrors() {
      const errors = []
      if (!this.$v.advertInfos.resto.restoSits.$dirty) return errors
      !this.$v.advertInfos.resto.restoSits.required &&
        errors.push('Resto sits is required.')
      return errors
    },
    restoSurfaceErrors() {
      const errors = []
      if (!this.$v.advertInfos.resto.restoSurface.$dirty) return errors
      !this.$v.advertInfos.resto.restoSurface.required &&
        errors.push('Resto surface is required.')
      return errors
    },

    // -------------------- Location Error --------------------

    addressErrors() {
      const errors = []
      if (!this.$v.advertInfos.location.address.$dirty) return errors
      !this.$v.advertInfos.location.address.required &&
        errors.push('Address is required.')
      return errors
    },
    cityErrors() {
      const errors = []
      if (!this.$v.advertInfos.location.city.$dirty) return errors
      !this.$v.advertInfos.location.city.required &&
        errors.push('City is required.')
      return errors
    },
    zipCodeErrors() {
      const errors = []
      if (!this.$v.advertInfos.location.zipCode.$dirty) return errors
      !this.$v.advertInfos.location.zipCode.required &&
        errors.push('Zip-code is required.')
      return errors
    },
    departementErrors() {
      const errors = []
      if (!this.$v.advertInfos.location.departement.$dirty) return errors
      !this.$v.advertInfos.location.departement.required &&
        errors.push('Departement is required.')
      return errors
    },

    // -------------------- Advert Error --------------------

    descriptionErrors() {
      const errors = []
      if (!this.$v.advertInfos.advert.description.$dirty) return errors
      !this.$v.advertInfos.advert.description.required &&
        errors.push('Description is required.')
      !this.$v.advertInfos.advert.description.maxLength &&
        errors.push('Description is lo long !')
      return errors
    },
  },

  created() {
    this.initInfos()
  },
  methods: {
    initInfos() {
      console.log(this.restoInfos)
        this.advertInfos = {
          sale: {
            typeVente: this.restoInfos.type_sale,
            capital: this.restoInfos.capital,
            rent: this.restoInfos.rent,
            openSale: this.restoInfos.open_sale,
            salesRevenue: this.restoInfos.sales_revenue,
            licence: this.restoInfos.licence,
            clientFile: this.restoInfos.client_file,
            price: this.restoInfos.price,
          },
          resto: {
            restoSurface: this.restoInfos.restaurant_surface,
            restoSits: this.restoInfos.restaurant_sits,
            terrace: this.restoInfos.terrace,
            terraceSurface: this.restoInfos.terrace_surface,
            terraceSits: this.restoInfos.terrace_sits,
            kitchenFurnitures: this.restoInfos.kitchen_furnitures,
          },
          location: {
            address: this.restoInfos.adress1,
            zipCode: this.restoInfos.zip_code,
            city: this.restoInfos.city,
            departement: this.restoInfos.departement_id,
          },
          advert: {
            description: this.restoInfos.description,
            state: this.restoInfos.state,
          },
        }
        console.log(this.advertInfos)
    },
    parseObject() {
      const advertInfosEmit = {
        description: this.advertInfos.advert.description,
        price: parseInt(this.advertInfos.sale.price, 10),
        adress1: this.advertInfos.location.address,
        fulladress:
          this.advertInfos.location.address +
          ' ' +
          this.advertInfos.location.zipCode +
          ' ' +
          this.advertInfos.location.city,
        zip_code: this.advertInfos.location.zipCode,
        city: this.advertInfos.location.city,
        state: this.advertInfos.advert.state,
        departement_id: this.advertInfos.location.departement.id,
        type_sale: this.advertInfos.sale.typeVente,
        open_sale: this.advertInfos.sale.openSale,
        capital: parseInt(this.advertInfos.sale.capital, 10),
        rent: parseInt(this.advertInfos.sale.rent, 10),
        sales_revenue: parseInt(this.advertInfos.sale.salesRevenue, 10),
        licence: this.advertInfos.sale.licence,
        client_file: this.advertInfos.sale.clientFile,
        restaurant_surface: parseInt(this.advertInfos.resto.restoSurface, 10),
        restaurant_sits: parseInt(this.advertInfos.resto.restoSits, 10),
        terrace: this.advertInfos.resto.terrace,
        terrace_surface: parseInt(this.advertInfos.resto.terraceSurface, 10),
        terrace_sits: parseInt(this.advertInfos.resto.terraceSits, 10),
        kitchen_furnitures: this.advertInfos.resto.kitchenFurnitures,
      }
      return advertInfosEmit
    },
    verificationMissClic() {
      // miss clic first section
      if (this.advertInfos.sale.typeVente === 0) {
        if (this.infosSaleSup === 0) {
          this.advertInfos.sale.rent = null
        } else {
          this.advertInfos.sale.openSale = 0
        }
      } else {
        this.infosSaleSup = 0
        this.advertInfos.sale.openSale = 0
        this.advertInfos.sale.rent = null
      }

      // miss clic second section
      if (this.advertInfos.resto.terrace === 0) {
        this.advertInfos.resto.terraceSits = null
        this.advertInfos.resto.terraceSurface = null
      }
    },

    // buton event all section

    nextTo() {
      this.$v.$touch()
      this.verificationMissClic()
      if (!this.$v.advertInfos.sale.$invalid) {
        console.log('Sale ok')
        console.log(this.advertInfos)
      } else {
        console.log('Sale not ok')
        console.log(this.advertInfos)
      }
      if (!this.$v.advertInfos.resto.$invalid) {
        console.log('Resto ok')
        console.log(this.advertInfos)
      } else {
        console.log('Resto not ok')
        console.log(this.advertInfos)
      }
      if (!this.$v.advertInfos.location.$invalid) {
        console.log('Location ok')
        console.log(this.advertInfos)
      } else {
        console.log('Location not ok')
        console.log(this.advertInfos)
      }
      if (!this.$v.advertInfos.advert.$invalid) {
        console.log('Advert ok')
        console.log(this.advertInfos)
      } else {
        console.log('Advert not ok')
        console.log(this.advertInfos)
      }
    },

    // buton event advert section
    submit() {
      this.$v.$touch()
      this.verificationMissClic()
      if (
        !this.$v.advertInfos.sale.$invalid &&
        !this.$v.advertInfos.resto.$invalid &&
        !this.$v.advertInfos.location.$invalid &&
        !this.$v.advertInfos.advert.$invalid
      ) {
        console.log('emit')
        console.log(this.parseObject())
        this.$emit('advertInfos', this.parseObject())
      } else {
        console.log('not emit')
      }
    },

    clearAdvertSection() {
      this.$v.advertInfos.advert.$reset()
      this.advertInfos.advert = {
        description: null,
        state: 1,
      }
    },

    // buton event sale section

    clearSaleSection() {
      this.$v.advertInfos.sale.$reset()
      this.infosSaleSup = 0
      this.advertInfos.sale = {
        typeVente: 0,
        capital: null,
        rent: null,
        openSale: 0,
        salesRevenue: null,
        licence: 0,
        clientFile: 0,
        price: null,
      }
    },

    // buton event resto section
    clearRestoSection() {
      this.$v.advertInfos.resto.$reset()
      this.advertInfos.resto = {
        restoSurface: null,
        restoSits: null,
        terrace: 0,
        terraceSurface: null,
        terraceSits: null,
        kitchenFurnitures: 0,
      }
    },

    // buton event location section

    clearLocationSection() {
      this.$v.advertInfos.location.$reset()
      this.advertInfos.location = {
        address: null,
        zipCode: null,
        city: null,
        departement: null,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>