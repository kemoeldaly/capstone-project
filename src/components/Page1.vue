<template>
 
    <div class="landing-page">
      <!-- Welcome section -->
      <section class="welcome-section">
        <h1>Welcome to the History Portal</h1>
        <p>Explore the timeline of technological advancements and historical events that shaped the world.</p>
      </section>
  
      <!-- Interactive history timeline -->
      <div class="timeline">
        <h2>History Timeline</h2>
        <div class="event" v-for="event in historyTimeline" :key="event.id" @click="showEventDetails(event)">
          {{ event.year }} - {{ event.title }}
        </div>
      </div>
  
      <!-- Featured content section -->
      <section class="featured-content">
        <h2>Featured Content</h2>
        <!-- Add more content here, such as images, text, or links -->
        <p>Check out our featured articles and stories about key moments in history.</p>
        <router-link to="/featured-article-1">Featured Article 1</router-link>
        <router-link to="/featured-article-2">Featured Article 2</router-link>
      </section>
  
      <!-- Event details modal -->
      <div class="event-details-modal" v-if="selectedEvent">
        <div class="modal-content">
          <span class="close-btn" @click="closeEventDetails">&times;</span>
          <h3>{{ selectedEvent.title }}</h3>
          <p>{{ selectedEvent.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
    data() {
      return {
        historyTimeline: [
          { id: 1, year: 1943, title: 'Colossus, the world\'s first programmable digital electronic computer', description: 'Developed during World War II for codebreaking.' },
          { id: 2, year: 1973, title: 'Development of C programming language by Dennis Ritchie', description: 'The birth of a language that influenced many others.' },
          { id: 3, year: 1991, title: 'The creation of the World Wide Web by Tim Berners-Lee', description: 'Enabling the explosion of information and communication online.' },
          { id: 4, year: 1995, title: 'JavaScript introduced by Netscape', description: 'Becomes a fundamental language for web development.' },
          { id: 5, year: 2004, title: 'Facebook founded by Mark Zuckerberg', description: 'Revolutionizing social networking and web applications.' },
          // Add more events as needed
        ],
        selectedEvent: null,
      };
    },
    methods: {
      showEventDetails(event) {
        this.selectedEvent = event;
      },
      closeEventDetails() {
        this.selectedEvent = null;
      },
   
    },
    beforeCreate() {
      console.log('Component is about to be created');
    },
    created() {
      console.log('Component has been created');
    },
    beforeMount() {
      console.log('Component is about to be mounted');
    },
    mounted() {
      console.log('Component has been mounted');
    },
    beforeUpdate() {
      console.log('Component is about to be updated');
    },
    updated() {
      console.log('Component has been updated');
    },
    beforeDestroy() {
      console.log('Component is about to be destroyed');
    },
    destroyed() {
      console.log('Component has been destroyed');
    },
  };
  </script>
  
  <style scoped>
  /* Add component-specific styles here */
  .landing-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    color: #e4dada;
  }
  
  .welcome-section,
  .featured-content {
    margin-bottom: 30px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  .timeline {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  
  .event {
    cursor: pointer;
    padding: 10px;
    border: 1px solid #3498db;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
  }
  
  .event:hover {
    background-color: #3498db;
    color: #ffffff69;
  }
  
  .event-details-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.801);
  }
  
  .modal-content {
    background-color: rgba(36, 33, 33, 0.651);
    padding: 20px;
    border-radius: 5px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    color: #555;
  }
  </style>
  