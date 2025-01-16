<script setup>
import { ref } from 'vue';
import { useStore } from '../stores';
import { useRouter } from 'vue-router';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const store = useStore();
const router = useRouter();

const user = store.user;
const firstName = ref(user?.displayName?.split(' ')[0] || '');
const lastName = ref(user?.displayName?.split(' ')[1] || '');
const email = ref(user?.email || '');

const handleSubmit = async () => {
    try {
        await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
        router.push("/movies");
    } catch (error) {
        alert("There was an error updating your profile!");
    }
};
</script>

<template>
    <Header />
    <RouterLink to="/movies" class="back-button">Back</RouterLink>
    <div class="settings-container">
        <h2>Settings</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input v-model="firstName" type="text" id="firstName" required />
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input v-model="lastName" type="text" id="lastName" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="email" type="text" id="email" readonly required />
            </div>
            <button type="submit" class="button-save">Save Changes</button>
        </form>
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

form {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
}

.button-save {
  padding: 12px 30px;
  background-color: #4073ad;
  font-size: 16px;
  color: white;
  margin-top: 20px;
  border-radius: 5px;
}

.button-save:hover {
  background-color: #305a8a;
}
</style>
