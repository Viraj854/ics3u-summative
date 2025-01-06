<script setup>
import { useStore } from '../stores';
import { RouterLink, useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

function logoutAndSignOut(event) {
  event.preventDefault();
  router.push('/').then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <div class="header-buttons">

    <div v-if="!store.email">
      <RouterLink to="/register" class="button register">Register</RouterLink>
      <RouterLink to="/login" class="button login">Login</RouterLink>
    </div>

    <div v-if="store.email">
      <p class="welcome-message">Hello {{ store.firstName }}!</p>
      <RouterLink to="/cart" class="button cart">Cart</RouterLink>
      <RouterLink to="/settings" class="button settings">Settings</RouterLink>
      <RouterLink to="/" class="button settings" @click="logoutAndSignOut">Logout</RouterLink>
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
