<!-- app.vue -->

<template>
  <div class="bg-blue-100 min-h-screen" id="app">
   
    <Navbar />
    <router-view />
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';


export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Add global styles here */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%; /* Ensure full height of the body */
}

#app {
  text-align: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
