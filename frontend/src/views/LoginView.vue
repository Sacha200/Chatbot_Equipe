<template>
    <div class="login-container">
      <div class="login-box">
        <div class="logo">
          <img src="@/assets/logo-equipe.png" alt="L'Équipe" />
        </div>
        <h1>Connexion</h1>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              required
              placeholder="Entrez votre nom d'utilisateur"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
  
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
  
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  
  export default {
    name: 'LoginView',
    setup() {
      const store = useStore()
      const router = useRouter()
      const username = ref('')
      const password = ref('')
      const error = ref('')
      const isLoading = ref(false)
  
      const handleLogin = async () => {
        isLoading.value = true
        error.value = ''
  
        try {
          await store.dispatch('auth/login', {
            username: username.value,
            password: password.value
          })
          router.push('/')
        } catch (err) {
          error.value = 'Identifiants incorrects'
        } finally {
          isLoading.value = false
        }
      }
  
      return {
        username,
        password,
        error,
        isLoading,
        handleLogin
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
  }
  
  .login-box {
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  
    .logo {
      text-align: center;
      margin-bottom: 30px;
  
      img {
        max-width: 200px;
      }
    }
  
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #1a1a1a;
    }
  }
  
  .login-form {
    .form-group {
      margin-bottom: 20px;
  
      label {
        display: block;
        margin-bottom: 8px;
        color: #666;
      }
  
      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
  
        &:focus {
          outline: none;
          border-color: #007bff;
        }
      }
    }
  
    .error-message {
      color: #dc3545;
      margin-bottom: 20px;
      text-align: center;
    }
  
    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
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
  </style>