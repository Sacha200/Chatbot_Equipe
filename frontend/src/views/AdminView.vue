<template>
    <div class="admin-container">
      <h1>Administration</h1>
      
      <div class="stats-container">
        <div class="stats-header">
          <h2>Statistiques des utilisateurs</h2>
          <button @click="refreshStats" :disabled="isLoading">
            {{ isLoading ? 'Actualisation...' : 'Actualiser' }}
          </button>
        </div>
  
        <div class="stats-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom d'utilisateur</th>
                <th>Nombre de questions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.questionsCount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  export default {
    name: 'AdminView',
    setup() {
      const users = ref([])
      const isLoading = ref(false)
      const error = ref('')
  
      const fetchStats = async () => {
        isLoading.value = true
        error.value = ''
  
        try {
          const response = await axios.get('http://localhost:3000/api/stats')
          users.value = response.data.users
        } catch (err) {
          error.value = 'Erreur lors du chargement des statistiques'
          console.error('Erreur:', err)
        } finally {
          isLoading.value = false
        }
      }
  
      const refreshStats = () => {
        fetchStats()
      }
  
      onMounted(() => {
        fetchStats()
      })
  
      return {
        users,
        isLoading,
        error,
        refreshStats
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .admin-container {
    padding: 20px;
  
    h1 {
      margin-bottom: 30px;
      color: #1a1a1a;
    }
  }
  
  .stats-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  
    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
  
      h2 {
        margin: 0;
        color: #1a1a1a;
      }
  
      button {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
  
        &:hover:not(:disabled) {
          background-color: #0056b3;
        }
  
        &:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
  
  .stats-table {
    overflow-x: auto;
  
    table {
      width: 100%;
      border-collapse: collapse;
  
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #eee;
      }
  
      th {
        background-color: #f8f9fa;
        font-weight: 600;
        color: #1a1a1a;
      }
  
      tr:hover {
        background-color: #f8f9fa;
      }
    }
  }
  
  .error-message {
    margin-top: 20px;
    padding: 12px;
    background-color: #dc3545;
    color: white;
    border-radius: 4px;
    text-align: center;
  }
  </style>