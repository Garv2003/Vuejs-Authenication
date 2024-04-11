<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { signSchema } from '../schema/user';
import axios from 'axios'
import { useToasterStore } from '../stores/toaster'

const router = useRouter()
const toaster = useToasterStore()
const loading = ref(false)

const { errors, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  },
  validationSchema: signSchema
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passAttrs] = defineField('password')
const [confirmPassword, confirmPassAttrs] = defineField('confirmpassword')

const onSubmit = handleSubmit(async (values) => {
  axios.defaults.withCredentials = true;
  try {
    loading.value = true
    const response = await axios.post(import.meta.env.VITE_SERVER_URL + '/signup', values)
    if (response.data.status) {
      resetForm()
      toaster.showSuccessToast("Account created successfully")
      router.push({ path: '/login' })
    }
    else {
      toaster.showErrorToast(response.data.msg)
    }
    loading.value = false
  }
  catch (err) {
    loading.value = false
    toaster.showErrorToast("Something went wrong")
  }
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
        <button @click="onSubmit" :disabled="loading">{{ loading ? 'Loading...' : 'Sign up' }}</button>
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
