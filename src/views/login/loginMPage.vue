<template>
    <ion-content>
      <div class="form-container">
        <ion-card class="form-card">
          <ion-card-header>
            <ion-card-title>Sign Up</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Nombre</ion-label>
                <ion-input v-model="nombre"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Correo Electrónico</ion-label>
                <ion-input type="email" v-model="email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Contraseña</ion-label>
                <ion-input type="password" v-model="password"></ion-input>
              </ion-item>
            </ion-list>
            <ion-button expand="block" @click="submitForm">Sign Up</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </template>
  
  <script>
  import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  
  export default {
    name: 'Formulario',
    components: {
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonList,
      IonItem,
      IonLabel,
      IonInput,
      IonButton
    },
    data() {
      return {
        nombre: '',
        email: '',
        password: ''
      };
    },
    methods: {
      submitForm() {
        console.log('Formulario enviado:', this.nombre, this.email, this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #fafafa;
  }
  
  .form-card {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    padding: 20px;
  }
  
  ion-card-header {
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  
  ion-card-title {
    font-size: 24px;
    color: #262626;
  }
  
  ion-item {
    --background: transparent;
    --min-height: 45px;
    margin-bottom: 15px;
  }
  
  ion-label {
    color: #8e8e8e;
    font-size: 14px;
  }
  
  ion-input {
    --padding-start: 0;
    --padding-end: 0;
    font-size: 16px;
  }
  
  ion-button {
    --background: #3897f0;
    --border-radius: 5px;
    --box-shadow: none;
    margin-top: 20px;
  }
  
  ion-button:hover {
    --background: #3182ce;
  }
  </style>
  