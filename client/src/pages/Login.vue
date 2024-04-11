<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { loginSchema } from '../schema/user'
import { useToasterStore } from '../stores/toaster'
import axios from 'axios';

const { errors, defineField, handleSubmit, resetForm } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: loginSchema
})

const toaster = useToasterStore()
const router = useRouter()
const loading = ref(false)

const [email, emailAttrs] = defineField('email')
const [password, passAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  axios.defaults.withCredentials = true
  try {
    loading.value = true
    const data = {
      username: values.email,
      password: values.password
    }
    await axios.post(import.meta.env.VITE_SERVER_URL + '/login', data)
    loading.value = false
    resetForm()
    toaster.showSuccessToast("Logged in successfully")
    router.push({ path: '/' })
  }
  catch (err) {
    loading.value = false
    toaster.showErrorToast("Invalid credentials")
  }
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
        <button @click="onSubmit" :disabled="loading">
          <span v-if="loading">Loading...</span>
          <span v-else>Log in</span>
        </button>
      </div>
      <div class="links">
        <span>Don't have an account?
          <RouterLink to="/sign">Sign up</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>