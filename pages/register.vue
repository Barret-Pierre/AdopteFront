<template>
  <div>
    <h1>Register</h1>

    <v-alert v-if="error" type="warning"> {{ error }} </v-alert>
      
    <formComponent :button-submit-name="'register'" @userInfos="userRegister" />
  </div>
</template>

<script>
import formComponent from '@/components/Form.vue'

export default {
  name: 'RegisterPage',
  components: {
    formComponent,
  },
  data() {
    return {
      baseUrl: this.$config.API_BASE_URL,
      res: null,
      error: '',
    }
  },
  methods: {
    async userRegister(userInfos) {
      this.error = ''
      try {
        // Enregistrement du user
        await this.$axios
          .$post(this.baseUrl + '/api/subscribe', {
            firstname: userInfos.firstname,
            lastname: userInfos.lastname,
            email: userInfos.email,
            password: userInfos.password,
            cgu: userInfos.checkbox,
          })
          .then((reponse) => (this.res = reponse))
        console.log(this.res)

        if (this.res.success === true) {
          // Connexion immédiate
          await this.$auth.loginWith('local', {
            data: {
              email: userInfos.email,
              password: userInfos.password,
            },
          })
          this.$router.push('/myAdvert')
        } else {
          this.error = this.res.errors.email._isUnique
          console.log(this.error)
        }
      } catch (err) {
        console.log(err)
      }
      console.log('ok userRegister')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>