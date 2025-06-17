<template>
    <div class="app">
      <nav class="sidebar" v-if="isAuthenticated">
        <div class="logo">
          <img src="@/assets/logo-equipe.png" alt="L'Équipe" />
        </div>
        <div class="sports-menu">
          <router-link 
            v-for="sport in sports" 
            :key="sport.id"
            :to="{ name: 'sport', params: { sport: sport.id }}"
            class="sport-link"
            :class="{ active: currentSport === sport.id }"
          >
            {{ sport.name }}
          </router-link>
        </div>
        <div class="user-menu">
          <router-link to="/admin" v-if="isAdmin" class="admin-link">
            Administration
          </router-link>
          <button @click="logout" class="logout-btn">Déconnexion</button>
        </div>
      </nav>
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'App',
    setup() {
      const store = useStore()
      const router = useRouter()
  
      const sports = [
        { id: 'rugby', name: 'Rugby' },
        { id: 'football', name: 'Football' },
        { id: 'tennis', name: 'Tennis' },
        { id: 'volley', name: 'Volley' },
        { id: 'cyclisme', name: 'Cyclisme' }
      ]
  
      const isAuthenticated = computed(() => store.state.auth.isAuthenticated)
      const isAdmin = computed(() => store.state.auth.user?.role === 'admin')
      const currentSport = computed(() => router.currentRoute.value.params.sport)
  
      const logout = () => {
        store.dispatch('auth/logout')
        router.push('/login')
      }
  
      return {
        sports,
        isAuthenticated,
        isAdmin,
        currentSport,
        logout
      }
    }
  }
  </script>
  
  <style lang="scss">
  .app {
    display: flex;
    height: 100vh;
    background-color: #f5f5f5;
    font-family: 'Poppins', Arial, sans-serif;
  }
  
  .sidebar {
    width: 250px;
    background-color: #1a1a1a;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
  
    .logo {
      margin-bottom: 30px;
      img {
        max-width: 100%;
      }
    }
  
    .sports-menu {
      flex: 1;
      
      .sport-link {
        display: block;
        padding: 12px 15px;
        color: white;
        text-decoration: none;
        margin-bottom: 5px;
        border-radius: 4px;
        transition: background-color 0.3s;
  
        &:hover, &.active {
          background-color: #333;
        }
      }
    }
  
    .user-menu {
      margin-top: auto;
      
      .admin-link {
        display: block;
        padding: 12px 15px;
        color: white;
        text-decoration: none;
        margin-bottom: 10px;
        border-radius: 4px;
        background-color: #2c3e50;
      }
  
      .logout-btn {
        width: 100%;
        padding: 12px;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
  
        &:hover {
          background-color: #c0392b;
        }
      }
    }
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  </style>