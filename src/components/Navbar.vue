<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/page1" class="nav-link">Page 1</router-link>
      <router-link to="/page2" class="nav-link">Page 2</router-link>
    </nav>
  </template>
  
  <style scoped>
    /* Add component-specific styles here */
    .navbar {
      position: fixed;
      top: 0;
      padding: 0;
      width: 100%;
      background-color: #f7f2f2; /* Add your preferred background color */
      padding-top: 15px;
     
    }
  
    .nav-link {
      margin-right: 10px; /* Adjust the value to set the desired space between items */
    }
  
    /* To remove the margin from the last element */
    .nav-link:last-child {
      margin-right: 0;
    }
  </style>
  