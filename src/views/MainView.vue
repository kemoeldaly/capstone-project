<!-- src/views/MainView.vue -->
<template>
 
    <div class="main-view">
      <Timeline />
      <router-view />
    </div>
  </template>
  
  <script>
  import Timeline from '../components/Timeline.vue';

  
  export default {
    components: {
      Timeline,
    },
  };
  </script>
  
  <style scoped>
  /* Add view-specific styles here */
  .main-view {
    /* Add styling for the main view */
    padding: 20px;
  }
  </style>
  