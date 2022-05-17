<template>
  <div>
    <form>
      <v-container fluid>
        <v-form>
          <v-row align="center">
            <v-col cols="5">
              <v-range-slider
                v-model="range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
              >
                <template #prepend>
                  <v-text-field
                    :value="range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 90px"
                    @change="$set(range, 0, $event)"
                  ></v-text-field>
                </template>
                <template #append>
                  <v-text-field
                    :value="range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 90px"
                    @change="$set(range, 1, $event)"
                  ></v-text-field>
                </template>
              </v-range-slider>
            </v-col>

            <v-col cols="3">
              <v-select
                v-model="select"
                :items="dropdownList"
                item-text="name"
                item-value="id"
                label="Departements"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>

            <v-col cols="2">
              <v-btn class="mr-4" @click="submit"> submit </v-btn>
            </v-col>

            <v-col cols="2">
              <v-btn @click="clear"> clear </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchComponent',
  props: {
    dropdownList: {
      type: Function,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      select: { id: undefined },
      min: 0,
      max: 1000000,
      range: [],
      filters: [],
    }
  },
  mounted() {
    this.updateByUrl()
  },
  methods: {
    // Mise à jour par changement de l'url
    updateByUrl() {
      const qp = new URLSearchParams(window.location.search)

      // Regexp verifiant que les valeur des query sont bien des chaîne de caractère contenant seulement des chiffres
      const regexp = /\d/

      // Mise à default du range
      this.range = [this.min, this.max]

      // vérifie les valeur des query et remplace les variables du formulaires par celles-ci
      const fmin = qp.get('min')
      if (fmin != null && regexp.test(fmin))
        this.range[0] = parseInt(qp.get('min'))
      const fmax = qp.get('max')
      if (fmax != null && regexp.test(fmax))
        this.range[1] = parseInt(qp.get('max'))
      const fselect = qp.get('departement_id')
      if (fselect != null) this.select.id = parseInt(qp.get('departement_id'))
    },

    // Clean le formulaire
    clear() {
      this.range = [this.min, this.max]
      this.select = { id: undefined }
      this.filters = []
    },

    // Soumet le formulaire et créé un tableau contenant tout les filtres
    submit() {
      this.filters.push(
        {
          name: 'departement_id',
          value: this.select.id,
        },
        {
          name: 'min',
          value: this.range[0],
        },
        {
          name: 'max',
          value: this.range[1],
        }
      )

      // Emet le tableau contenant les filtres
      this.$emit('filter', this.filters)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>