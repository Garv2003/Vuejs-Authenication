
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import {signSchema} from '../schema/user';

const {errors,defineField,handleSubmit,resetForm} = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  },
  validationSchema:signSchema
})

const [name,nameAttrs]=defineField('name')
const [email,emailAttrs]=defineField('email')
const [password,passAttrs]=defineField('password')
const [confirmPassword,confirmPassAttrs]=defineField('confirmpassword')

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
        <h2>Sign in</h2>
        <div class="inputBx">
          <input type="text" placeholder="Name" v-model="name" v-bind="nameAttrs" />
          <span v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="inputBx">
          <input type="email" placeholder="Email" v-model="email" v-bind="emailAttrs" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="inputBx">
          <input type="password" placeholder="Password" v-model="password" v-bind="passAttrs" />
            <span v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="inputBx">
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword" v-bind="confirmPassAttrs" />
            <span v-if="errors.confirmpassword">{{ errors.confirmpassword }}</span>
        </div>
        <div class="inputBx">
          <input type="submit" value="Sign up" @click="onSubmit" />
        </div>
        <div class="links">
          <span>
            Already have an account?
            <RouterLink to="/login">Sign in</RouterLink>
          </span>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>