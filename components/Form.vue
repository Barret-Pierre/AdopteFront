<template>
  <div>
    <form>
      <v-text-field
        v-if="formLogin === false"
        v-model="userInfos.firstname"
        :error-messages="firstnameErrors"
        label="Firstname"
        required
        @input="$v.userInfos.firstname.$touch()"
        @blur="$v.userInfos.firstname.$touch()"
      ></v-text-field>
      <v-text-field
        v-if="formLogin === false"
        v-model="userInfos.lastname"
        :error-messages="lastnameErrors"
        label="Lastname"
        required
        @input="$v.userInfos.lastname.$touch()"
        @blur="$v.userInfos.lastname.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="userInfos.email"
        :error-messages="emailErrors"
        label="E-mail"
        :type="'email'"
        required
        @input="$v.userInfos.email.$touch()"
        @blur="$v.userInfos.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="userInfos.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="passwordErrors"
        :type="show ? 'text' : 'password'"
        label="Password"
        required
        hint="At least 8 characters"
        counter
        @input="$v.userInfos.password.$touch()"
        @blur="$v.userInfos.password.$touch()"
        @click:append="show = !show"
      ></v-text-field>
      <v-checkbox
        v-if="formLogin == false"
        v-model="userInfos.cgu"
        :error-messages="cguErrors"
        label="Accepter les CGU"
        required
        @change="$v.userInfos.cgu.$touch()"
        @blur="$v.userInfos.cgu.$touch()"
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> {{ buttonSubmitName }} </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </div>
</template>

<script>
// import useVuelidate from '@vuelidate/core'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'FormComponent',

  mixins: [validationMixin],

  props: {
    buttonSubmitName: {
      type: String,
      default: 'Submit',
    },
    formLogin: {
      type: Boolean,
      default: false,
    },
  },

  validations: {
    userInfos: {
      firstname: { required },
      lastname: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      cgu: {
        checked(val) {
          return val
        },
      },
    },
  },

  data: () => ({
    show: false,
    userInfos: {
      email: 'pierrealexandrebarret.pro@gmail.com',
      password: 'SecretSecret',
      firstname: '',
      lastname: '',
      cgu: false,
    },
  }),

  computed: {
    cguErrors() {
      const errors = []
      if (!this.$v.userInfos.cgu.$dirty) return errors
      !this.$v.userInfos.cgu.checked &&
        errors.push('You must agree to continue!')
      return errors
    },
    firstnameErrors() {
      const errors = []
      if (!this.$v.userInfos.firstname.$dirty) return errors
      !this.$v.userInfos.firstname.required &&
        errors.push('Firstname is required.')
      return errors
    },
    lastnameErrors() {
      const errors = []
      if (!this.$v.userInfos.lastname.$dirty) return errors
      !this.$v.userInfos.lastname.required &&
        errors.push('Lastname is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.userInfos.email.$dirty) return errors
      !this.$v.userInfos.email.email && errors.push('Must be valid e-mail')
      !this.$v.userInfos.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.userInfos.password.$dirty) return errors
      !this.$v.userInfos.password.minLength &&
        errors.push('Password is required')
      !this.$v.userInfos.password.required &&
        errors.push('Password is required')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (
        this.formLogin === true &&
        !this.$v.userInfos.email.$invalid &&
        !this.$v.userInfos.password.$invalid
      ) {
        this.$emit('userInfos', this.userInfos)
        console.log('emit')
      } else if (this.formLogin === false && !this.$v.$invalid) {
        this.$emit('userInfos', this.userInfos)
        console.log('emit')
      } else {
        console.log('not emit')
      }
    },
    clear() {
      this.$v.$reset()
      this.userInfos = {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        cgu: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>