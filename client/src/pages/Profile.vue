<script setup lang="ts">
import { ref } from "vue";
import { useToasterStore } from "../stores/toaster";
import axios from "axios";
import { useRouter } from "vue-router";

const useToaster = useToasterStore()
const router = useRouter()
const user = ref<any>(null)
const loading = ref(false)

const getUser = async () => {
    try {
        loading.value = true;
        axios.defaults.withCredentials = true;
        const response = await axios.get(import.meta.env.VITE_SERVER_URL + "/profile")
        console.log(response.data)
        user.value = response.data.user;
        loading.value = false;
    } catch (err) {
        useToaster.showErrorToast("You are not authenticated");
        loading.value = false;
        router.push("/login");
    }
}

getUser();

const logout = async () => {
    try {
        axios.defaults.withCredentials = true;
        await axios.get(import.meta.env.VITE_SERVER_URL + "/logout")
        user.value = null;
        useToaster.showSuccessToast("You are logged out");
        router.push("/login");
    } catch (err) {
        useToaster.showErrorToast("You are not authenticated");
        router.push("/login");
    }
}

</script>

<template>
    <div class="container" v-if="!loading">
        <i style="--clr:#00ff0a;"></i>
        <i style="--clr:#ff0057;"></i>
        <i style="--clr:#fffc44;"></i>
        <div class="login">
            <h2>Profile</h2>
            <div class="inputBx">
                <input type="email" placeholder="email" :value="user?.email" readonly />
            </div>
            <div class="inputBx">
                <input type="text" placeholder="name" :value="user?.name" readonly />
            </div>
            <div class="inputBx">
                <button @click="logout">Logout</button>
            </div>
        </div>
    </div>
    <div v-else class="loading-container">
        <h1>Loading...</h1>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white
}
</style>