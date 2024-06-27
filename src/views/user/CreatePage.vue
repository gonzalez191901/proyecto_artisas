<template>
    <ion-page v-if="!isAuthenticated">
      <ion-header>
      <ion-toolbar>
        <ion-title>Crear Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
      <ion-content class="ion-padding custom-background">
        <ion-grid>
        
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Nombre"
                color="medium"
                v-model="form.nombre"
                :class="{ 'invalid-input': error.nombre, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Nombre"
              ></ion-input>
              <!--<ion-label :class="{ 'invalid-label': error.email }"> {{ error.nombre ? 'Correo electrónico incorrecto' : '' }}</ion-label>-->
            </ion-col>
          </ion-row>

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Correo"
                color="medium"
                v-model="form.email"
                :class="{ 'invalid-input': error.email, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Email"
              ></ion-input>
              <!--<ion-label :class="{ 'invalid-label': error.email }"> {{ error.nombre ? 'Correo electrónico incorrecto' : '' }}</ion-label>-->
            </ion-col>
          </ion-row>

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Contraseña"
                color="medium"
                v-model="form.password"
                :class="{ 'invalid-input': error.password, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Contraseña"
              ></ion-input>
              <!--<ion-label :class="{ 'invalid-label': error.email }"> {{ error.nombre ? 'Correo electrónico incorrecto' : '' }}</ion-label>-->
            </ion-col>
          </ion-row>

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Repetir Contraseña"
                color="medium"
                v-model="form.password2"
                :class="{ 'invalid-input': error.password2, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Repetir Contraseña"
              ></ion-input>
              <!--<ion-label :class="{ 'invalid-label': error.email }"> {{ error.nombre ? 'Correo electrónico incorrecto' : '' }}</ion-label>-->
            </ion-col>
          </ion-row>
  
         
  
          <ion-row>
            <ion-col>
              <ion-button @click="create" expand="full" color="primary" class="custom-button">Registrar</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
      <!--<div class="footer-if">
        <div class="footer-content">
          <div class="center">
            Gerencia Tecnología de Información
          </div>
          <div> Gerencia General de Sistemas © CANTV 2024</div>
        </div>
      </div>-->
    </ion-page>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonText, IonLoading, IonTabButton } from '@ionic/vue';
  import axios from 'axios';
  import { environment } from '../../config';
  
  export default defineComponent({
    email: 'AuthPage',
    components: {
      IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonText, IonLoading
    },
    data() {
      return {
        form: {
            nombre: '',
            email: '',
            password: '',
            password2: '',
        },
        error: {
            nombre: false,
            email: false,
            password: false,
            password2: false,
        },
        disabledButton: true,
        rememberMeChecked: false,
        showLoader: false, // Estado para el loader
        errors: []
      };
    },
    methods: {
      async create() {
        this.error.nombre = false;
        this.error.email = false;
        this.error.password = false;
        this.error.password2 = false;
  
          this.showLoader = true; // Mostrar el loader
  
         // try {
            const axiosInstance = axios.create({
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            });
            const response = await axiosInstance.post(`${environment.apiUrl}create_user`, {
                nombre: this.form.nombre,
                email: this.form.email,
                password: this.form.password,
                password2: this.form.password2,
            });
  
            if (response.status === 200) {
              this.toastMessage = response.data.message;
  
              if (response.data.user) {
                localStorage.setItem('user', response.data.user);  // Almacenar el usuario en localStorage
                console.log('Usuario almacenado en localStorage:', localStorage.getItem('user'));  // Imprimir el usuario almacenado en la consola
  
                // Añadir un retraso antes de ocultar el loader y redirigir al usuario
                setTimeout(() => {
                  this.showLoader = false;
                  this.$router.push('/tabs/tab1');
                }, 1000); // Ajusta el tiempo según sea necesario
  
              } else {
                this.errors = response.data.errors;
                console.log('Error: Propiedad "user" no encontrada en la respuesta.', this.errors);
                this.showLoader = false;
              }
            } else {
              this.errors = response.data.errors;
              console.log(this.errors);
              this.showLoader = false;
            }
         /* } catch (error) {
            console.log('Error completo:', error);
  
            let alertMessage = 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.';
            if (error.response && error.response.status === 401) {
              alertMessage = error.response.data.error; // Establecer el mensaje de error del servidor
            } else if (error.message === 'Network Error') {
              alertMessage = 'Sin conexión a Internet';
            }
  
            this.showLoader = false;
            Swal.fire({
              title: 'Información',
              text: alertMessage,
              icon: 'error',
              heightAuto: false,
              width: '300px', // Ajustar el ancho de la alerta
              customClass: {
                popup: 'custom-swal-popup',
                confirmButton: 'custom-confirm-button',
              },
              confirmButtonColor: "#54618d",
              confirmButtonText: "Aceptar"
            });
          }*/
        
      },
      saveCredentials() {
        if (this.rememberMeChecked) {
          localStorage.setItem('savedCredentials', JSON.stringify(this.form));
        } else {
          localStorage.removeItem('savedCredentials');
        }
      },
      retrieveCredentials() {
        const savedCredentials = localStorage.getItem('savedCredentials');
        if (savedCredentials) {
          const { email, password } = JSON.parse(savedCredentials);
          this.form.email = email;
          this.form.password = password;
          this.disabledButton = !email || !password;
        }
      }
    },
    ionViewWillEnter() {
      this.retrieveCredentials();
    },
    computed: {
      isAuthenticated() {
        return !!localStorage.getItem('user'); // Verificar si el usuario está autenticado
      }
    },
    mounted() {
  
    }
  });
  </script>
  
  <style scoped>
  .custom-background {
    --background:  #fff ; /* Fondo oscuro personalizado */
    --ion-text-color: #000; /* Texto blanco */
  }
  
  .center {
    text-align: center;
  }
  
  .left {
    text-align: left;
  }
  
  .titulo {
    padding-bottom: 70px;
    font-size: 35px;
    color: #ffffff; /* Texto blanco */
  }
  
  .cuenta {
    margin-top: 60px;
    font-size: 16px;
  }
  
  .checkbox {
    margin-top: 25px;
    font-size: 14px;
    color: #54618d; /* Color personalizado para "Recuérdame" */
  }
  
  .forgot-password-text {
    color: #54618d; /* Color personalizado para "¿Olvidaste tu contraseña?" */
  }
  
  .footer-if {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17234d; /* Color de fondo personalizado */
    color: #54618d; /* Color del texto */
    font-size: 11px;
    padding: 35px; /* Ajusta el padding según sea necesario */
  }
  
  .custom-button {
    padding-top: 15px;
    padding-bottom: 20px; /* Ajusta el padding vertical del botón según sea necesario */
    min-height: 50px;
  }
  
  /* Estilos personalizados para la alerta SweetAlert2 */
  .custom-swal-popup {
    padding: 1rem !important; /* Ajustar el padding vertical */
    height: 100px !important; /* Ajustar la altura de la alerta */
  }
  
  /* Nueva clase para el ancho del borde de los inputs */
  .custom-input {
    --border-width: 2px; /* Ajusta el valor para hacer el borde más ancho */

  }
  
  .invalid-input {
    --border-width: 2px;
    --border-color: red;
  }
  
  .invalid-label {
    color: red;
  }
  </style>
  