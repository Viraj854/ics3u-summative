<script setup>
import Header from '../components/Header.vue';
import { useStore } from '../stores';

const store = useStore(); 
</script>

<template>
    <Header />
    <RouterLink to="/movies" class="back-button">Back</RouterLink>
    <div class="settings-container">
        <h2>Settings</h2>
        <p>
            <strong>First Name:</strong>
            <input v-model="store.firstName" type="text" placeholder="Enter first name" />
        </p>
        <p>
            <strong>Last Name:</strong>
            <input v-model="store.lastName" type="text" placeholder="Enter last name" />
        </p>
        <p><strong>Email:</strong> {{ store.email }}</p>
    </div>
</template>

<style scoped>
.settings-container {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 20px auto;
}

h2 {
    color: #305a8a;
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    color: #10375c;
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #d0e7f9;
    margin-top: 5px;
}

input:focus {
    outline: none;
    border-color: #4073ad;
}

.back-button {
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

.back-button:hover {
    background-color: #305a8a;
}
</style>
