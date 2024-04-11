
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import {loginSchema} from '../schema/user'

const {errors,defineField,handleSubmit,resetForm} = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema:loginSchema
})

const [email,emailAttrs]=defineField('email')
const [password,passAttrs]=defineField('password')

const onSubmit = handleSubmit((values) => {
  console.log(values)
  resetForm()

})

</script>

<template>
   <div class="container">
        <i style="--clr:#00ff0a;"></i>
        <i style="--clr:#ff0057;"></i>
        <i style="--clr:#fffc44;"></i>
      <div class="login">
        <h2>Login</h2>
        <div class="inputBx">
          <input type="email" placeholder="email" v-model="email" v-bind="emailAttrs" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="inputBx">
          <input type="password" placeholder="Password" v-model="password" v-bind="passAttrs" />
            <span v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="inputBx">
          <input type="submit" value="Sign in" @click="onSubmit" />
        </div>
        <div class="links">
          <span>Don't have an account?
          <RouterLink to="/sign">Sign up</RouterLink></span>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>