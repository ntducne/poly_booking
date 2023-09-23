<template>
    <div class="flex justify-center items-center" style="height: 100vh;">
        <button v-on:click="loginGoogle"  class="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo">
            <span>Login with Google</span>
        </button>
    </div>
</template>
<script lang="ts" setup>
    definePageMeta({
        layout: "",
    });
    useHead({
        title: 'PolyBooking - Login',
    })
    function loginGoogle(){
        window.location.href = "http://localhost:8000/auth/admin/login/google";
    }
</script>