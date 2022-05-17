<template>
  <div>
    <h1>Login</h1>

    <b-notification v-if="error" type="is-warning">
      {{ error }}
    </b-notification>

    <formComponent :form-login="true" @userInfos="userLogin" />
  </div>
</template>

<script>
import formComponent from '@/components/Form.vue'

export default {
  name: 'LogginPage',
  components: {
    formComponent,
  },
  data() {
    return {
      error: '',
    }
  },
  methods: {
    async userLogin(userInfos) {
      console.log(userInfos)
      try {
        await this.$auth.loginWith('local', {
          data: userInfos,
        })
        this.$router.push('/myAdverts')
      } catch (err) {
        console.log(err)
        this.error = err.response.data.message
        console.log(this.error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>