<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from 'vue-router';
import { useStore } from '../stores';

const store = useStore();
const router = useRouter();

const password = ref('');
const reEnterPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');

async function registerByEmail() {
  if (password.value === reEnterPassword.value) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      store.firstName = firstName.value;
      store.lastName = lastName.value;
      store.email = email.value;
      store.password = password.value;

      await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

      store.user = user;

      router.push("/movies");
    } catch (error) {
      alert("There was an error creating a user with email!");
    }
  } else {
    window.alert("The passwords are not the same!");
  }
}

async function registerByGoogle() {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    store.user = result.user;

    router.push("/movies");
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
    alert("There was an error creating a user with Google!");
  }
}
</script>

<template>
    <h1 class="hero">VFlix</h1>
    <RouterLink to="/Login" class="button register">Login</RouterLink>
    <RouterLink to="/" class="button home">Back to Home</RouterLink>

    <div class="form-container">
        <h2>Register Account</h2>
        <form @submit.prevent="registerByEmail()">
            <input v-model="firstName" type="text" placeholder="First Name" class="input-field" required />
            <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
            <input v-model="email" type="email" placeholder="Email" class="input-field" required />
            <input v-model="password" type="password" placeholder="Password" class="input-field" required />
            <input v-model="reEnterPassword" type="password" placeholder="Re-enter Password" class="input-field"
                required />
            <button type="submit" class="button login">Register</button>
            <button @click="registerByGoogle()" class="button register">Register by Google</button>
        </form>
    </div>
</template>

<style scoped>
body {
    background-color: #e9f1f7;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px 0 70px;
}

.hero {
    background-color: #d0e7f9;
    color: #10375c;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 20px;
}

.hero h1 {
    font-size: 60px;
    color: #10375c;
    margin-bottom: 10px;
}

.hero p {
    font-size: 20px;
    margin-bottom: 20px;
}

.form-container {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 40px 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0 auto;
}

.form-container h2 {
    color: #305a8a;
    text-align: center;
    font-size: 28px;
    margin-bottom: 30px;
}

.input-field {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #d0e7f9;
    border-radius: 5px;
    font-size: 16px;
    color: #10375c;
}

.input-field:focus {
    border-color: #4073ad;
    outline: none;
}

.button {
    background-color: #4073ad;
    color: #ffffff;
    padding: 12px 30px;
    font-size: 18px;
    border: none;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

.button:hover {
    background-color: #305a8a;
}

footer {
    background-color: #d0e7f9;
    color: #10375c;
    text-align: center;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
</style>