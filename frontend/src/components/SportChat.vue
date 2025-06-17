<template>
    <div class="sport-chat">
      <div class="chat-header">
        <h1>{{ sportName }}</h1>
      </div>
      
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.type]">
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
      </div>
  
      <div class="chat-input">
        <input 
          type="text" 
          v-model="newMessage" 
          @keyup.enter="sendMessage"
          placeholder="Posez votre question..."
          :disabled="isLoading"
        />
        <button @click="sendMessage" :disabled="isLoading">
          {{ isLoading ? 'Envoi...' : 'Envoyer' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, nextTick, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  export default {
    name: 'SportChat',
    setup() {
      const route = useRoute()
      const messages = ref([])
      const newMessage = ref('')
      const isLoading = ref(false)
      const messagesContainer = ref(null)
  
      // Surveiller les changements de route pour réinitialiser les messages
      watch(() => route.params.sport, () => {
        messages.value = []
      })
  
      const sportName = computed(() => {
        const sport = route.params.sport
        return sport.charAt(0).toUpperCase() + sport.slice(1)
      })
  
      const scrollToBottom = async () => {
        await nextTick()
        if (messagesContainer.value) {
          messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        }
      }
  
      const sendMessage = async () => {
        if (!newMessage.value.trim() || isLoading.value) return
  
        const userMessage = newMessage.value
        messages.value.push({
          type: 'user',
          content: userMessage
        })
        newMessage.value = ''
        await scrollToBottom()
  
        isLoading.value = true
        try {
          const response = await axios.post(
            `http://localhost:3000/api/chat/${route.params.sport}`,
            { message: userMessage }
          )
          messages.value.push({
            type: 'bot',
            content: response.data.response
          })
          await scrollToBottom()
        } catch (error) {
          console.error('Erreur lors de l\'envoi du message:', error)
          messages.value.push({
            type: 'error',
            content: 'Une erreur est survenue. Veuillez réessayer.'
          })
        } finally {
          isLoading.value = false
        }
      }
  
      onMounted(() => {
        scrollToBottom()
      })
  
      return {
        messages,
        newMessage,
        isLoading,
        sportName,
        sendMessage,
        messagesContainer
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .sport-chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
    .chat-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
      
      h1 {
        margin: 0;
        color: #1a1a1a;
        font-size: 24px;
      }
    }
  
    .chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
  
      .message {
        margin-bottom: 15px;
        max-width: 80%;
  
        &.user {
          margin-left: auto;
          .message-content {
            background-color: #007bff;
            color: white;
            border-radius: 15px 15px 0 15px;
          }
        }
  
        &.bot {
          margin-right: auto;
          .message-content {
            background-color: #f0f0f0;
            color: #1a1a1a;
            border-radius: 15px 15px 15px 0;
          }
        }
  
        &.error {
          margin-right: auto;
          .message-content {
            background-color: #dc3545;
            color: white;
            border-radius: 15px;
          }
        }
  
        .message-content {
          padding: 12px 16px;
          display: inline-block;
        }
      }
    }
  
    .chat-input {
      padding: 20px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
  
      input {
        flex: 1;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
  
        &:focus {
          outline: none;
          border-color: #007bff;
        }
  
        &:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
      }
  
      button {
        padding: 12px 24px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
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
  </style>