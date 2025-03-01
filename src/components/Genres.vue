<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores";

const props = defineProps(["genres"]);
const router = useRouter();
const selectedGenre = ref(28);
const response = ref(null);
const store = useStore();

const getMovieByGenre = async () => {
    response.value = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`
    );
};

onMounted(getMovieByGenre);

function addToCart(movie) {
    store.cart.set(String(movie.id), { title: movie.title || item.name, url: movie.poster_path })
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
    <div class="movie-gallery">
        <select v-model="selectedGenre" @change="getMovieByGenre">
            <option v-for="genre of genres" :value="genre.id" :key="genre.id">{{ genre.genreName }}</option>
        </select>
        <div v-if="response" class="movie-list">
            <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
                <div @click="router.push(`/movies/${movie.id}`)">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster"
                        class="movie-poster" />
                    <p class="movie-title">{{ movie.title }}</p>
                </div>
                <button v-if="!store.cart.has(String(movie.id))" @click="addToCart(movie)" class="buy-button">
                    Buy
                </button>
                <button v-else class="buy-button">
                    Added
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.movie-gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

.movie-gallery select {
    padding: 10px 20px;
    font-size: 18px;
    border: 1px solid #d0e7f9;
    border-radius: 5px;
    background-color: #fff;
    color: #305a8a;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s;
}

.movie-gallery select:hover {
    background-color: #d0e7f9;
}

.movie-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
}

.movie-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 220px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.movie-poster {
    width: 100%;
    height: auto;
    display: block;
    border-bottom: 2px solid #d0e7f9;
}

.movie-title {
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: #10375c;
    font-weight: 600;
    background-color: #f7fafd;
    border-top: 2px solid #d0e7f9;
}

.buy-button {
    display: inline-block;
    font-size: 18px;
    color: #4073ad;
    text-decoration: none;
    margin-top: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 5px solid #4073ad;
    transition: background-color 0.3s, color 0.3s;
    width: 100%;
}

.buy-button:hover {
    background-color: #4073ad;
    color: #fff;
}
</style>