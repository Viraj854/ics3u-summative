<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '../stores';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const store = useStore();
const isHomePage = ref(false);
const route = useRoute();
const router = useRouter();

onMounted(() => {
    if (route.path === '/') {
        isHomePage.value = true;
    }
});
const logout = () => {
  store.user = null;
  signOut(auth);
  router.push("/");
}
</script>

<template>
  <div class="header-buttons">

    <div v-if="isHomePage">
      <RouterLink to="/register" class="button register">Register</RouterLink>
      <RouterLink to="/login" class="button login">Login</RouterLink>
    </div>

    <div v-if="!isHomePage">
      <p class="welcome-message">Welcome, {{ store.user?.displayName || 'Guest' }}</p>
      <RouterLink to="/cart" class="button cart">Cart</RouterLink>
      <RouterLink to="/settings" class="button settings">Settings</RouterLink>
      <button @click="logout" class="button">Logout</button>
    </div>

    <h1>VFlix</h1>
  </div>
</template>

<style scoped>
h1 {
  margin-left: auto;
  padding: 1%;
  color: #4073ad;
}

.header-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.button {
  margin-right: 10px;
}

.header-buttons .button {
  display: inline-block;
  background-color: #4073ad;
  color: #ffffff;
  padding: 10px 30px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  border: none;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-buttons .button:hover {
  background-color: #305a8a;
}

.welcome-message {
  margin-right: 20px;
  font-size: 30px;
  color: #305a8a;
}
</style>
