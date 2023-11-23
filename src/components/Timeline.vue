

<template>
  <div class="timeline bg-red-500 ">testing</div>
 <div class="timeline bg-red-500 min-h-screen">
    <!-- Include the Navbar component -->
    <Navbar />

    <div class="search-container max-w-md mx-auto mt-8 relative">
      <input
        v-model="searchQuery"
        placeholder="Search events"
        @input="onSearchInput"
        @focus="fetchSearchSuggestions"
        @blur="hideSearchSuggestions"
        @keyup.enter="handleEnter"
        @keyup.down.prevent="selectNextSuggestion"
        @keyup.up.prevent="selectPreviousSuggestion"
        class="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
      />
      <button
        @click="fetchEvents"
        class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
      >
        <span
          v-if="loading"
          class="animate-pulse inline-flex h-4 w-4 rounded-full bg-white border border-gray-300"
        ></span>
        <span v-else>Search</span>
      </button>
      <ul
        v-if="searchSuggestions.length > 0"
        class="search-suggestions absolute top-full left-0 z-10 bg-white border rounded-md shadow-md max-h-48 overflow-y-auto"
      >
        <li
          v-for="(suggestion, index) in searchSuggestions"
          :key="index"
          @click="selectSearchSuggestion(suggestion)"
          @mouseenter="highlightSuggestion(index)"
          :class="{ 'selected': index === selectedSuggestion }"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          {{ suggestion.title }}
        </li>
      </ul>
    </div>

    <div v-if="loading" class="text-center mt-8">
      <p class="text-blue-500">Loading...</p>
    </div>
    <div v-else-if="events.length > 0" class="max-w-md mx-auto mt-8">
      <div :key="events[0].pageid" class="event-card bg-white p-6 mb-8 rounded-md shadow-md transition-shadow hover:shadow-lg">
        <a :href="'https://en.wikipedia.org/wiki/' + events[0].title" target="_blank" class="text-xl font-bold text-blue-500 hover:underline">
          {{ eventys[0].title }}
        </a>
        <p class="event-text text-gray-700" v-html="!showMore ? events[0].text : events[0].fullText"></p>
        <button v-if="events[0].text.length > 500" @click="toggleShowMore" class="toggle-button mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
          {{ showMore ? 'Show Less' : 'Show More' }}
        </button>
        <p class="source-link text-sm mt-4">
          <a :href="'https://en.wikipedia.org/wiki/' + events[0].title" target="_blank" class="text-gray-500 hover:underline">Source</a>
        </p>
      </div>
    </div>
    <div v-else class="text-center mt-8">
      <p class="error-message text-red-500">{{ error || 'No events found' }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import axios from 'axios';

const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';
const WIKIPEDIA_API_PARAMS = {
  action: 'query',
  origin: '*',
  format: 'json',
  generator: 'search',
  gsrnamespace: 0,
  gsrlimit: 5,
  prop: 'extracts',
  exintro: true,
};

export default {
  name: 'Timeline',
  components: {
    Navbar, // Register the Navbar component
  },
  data() {
    return {
      events: [],
      loading: false,
      searchQuery: '',
      showMore: false,
      error: null,
      searchSuggestions: [],
      selectedSuggestion: -1,
    };
  },
  methods: {
    async fetchEvents() {
      try {
        this.loading = true;
        const response = await axios.get(WIKIPEDIA_API_URL, {
          params: { ...WIKIPEDIA_API_PARAMS, gsrsearch: this.searchQuery },
        });

        const searchArray = response.data.query?.pages ? Object.values(response.data.query.pages) : [];

        if (searchArray.length > 0) {
          const firstResult = searchArray[0];
          const extract = firstResult?.extract || '';

          this.events = [{
            pageid: firstResult.pageid,
            title: firstResult.title,
            text: extract.length > 500 ? extract.substring(0, 500) + '...' : extract,
            fullText: extract,
          }];
        } else {
          this.events = [];
        }
      } catch (error) {
        console.error('Error fetching events:', error.message);
        this.error = 'An error occurred while fetching events. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    onSearchInput() {
      if (this.searchQuery.trim() !== '') {
        this.fetchSearchSuggestions();
      } else {
        this.searchSuggestions = [];
      }
    },
    async fetchSearchSuggestions() {
      try {
        const response = await axios.get(WIKIPEDIA_API_URL, {
          params: {
            ...WIKIPEDIA_API_PARAMS,
            gsrsearch: this.searchQuery,
          },
        });

        const searchArray = response.data.query?.pages ? Object.values(response.data.query.pages) : [];

        this.searchSuggestions = searchArray.map((result) => ({
          title: result.title,
        }));
      } catch (error) {
        console.error('Error fetching search suggestions:', error.message);
      }
    },
    selectSearchSuggestion(suggestion) {
      this.searchQuery = suggestion.title;
      this.fetchEvents();
      this.searchSuggestions = [];
      this.selectedSuggestion = -1;
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    hideSearchSuggestions() {
      this.searchSuggestions = [];
      this.selectedSuggestion = -1;
    },
    handleEnter() {
      if (this.selectedSuggestion !== -1 && this.searchSuggestions.length > 0) {
        this.selectSearchSuggestion(this.searchSuggestions[this.selectedSuggestion]);
      } else {
        this.fetchEvents();
      }
    },
    selectNextSuggestion() {
      if (this.selectedSuggestion < this.searchSuggestions.length - 1) {
        this.selectedSuggestion++;
      }
    },
    selectPreviousSuggestion() {
      if (this.selectedSuggestion > 0) {
        this.selectedSuggestion--;
      }
    },
    highlightSuggestion(index) {
      this.selectedSuggestion = index;
    },
  },
};
</script>

<style>
.timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 24px;
  flex-grow: 1;
  font-size: 16px;
}

button {
  cursor: pointer;
  padding: 10px 15px;
  border: none;
  border-radius: 24px;
  background-color: #4285f4;
  color: #fff;
  font-size: 16px;
  margin-left: 10px;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  color: #333;
  background-color: #fff;
  border: 1px solid #b80a0a;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.search-suggestions li {
  padding: 8px;
  cursor: pointer;
}

.search-suggestions li:hover,
.search-suggestions li.selected {
  background-color: #f4f4f4;
}

.event-card {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: box-shadow 0.3s;
}

.event-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h3 {
  margin-bottom: 10px;
  color: #333;
}

.event-text {
  color: #555;
  line-height: 1.6;
}

.toggle-button {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.source-link {
  margin-top: 10px;
  font-size: 12px;
  color: #777;
}

.error-message {
  color: #ff4444;
  font-weight: bold;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
