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
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Apellidos"
                color="medium"
                v-model="form.apellidos"
                :class="{ 'invalid-input': error.apellidos, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Apellidos"
              ></ion-input>
            </ion-col>
          </ion-row>

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Nombre de Usuario"
                color="medium"
                v-model="form.username"
                :class="{ 'invalid-input': error.username, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Nombre de Usuario"
              ></ion-input>
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
            </ion-col>
          </ion-row>
  
          
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Fecha de Nacimiento"
                color="medium"
                v-model="form.fechaNacimiento"
                :class="{ 'invalid-input': error.fechaNacimiento, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                type="date"
                label="Fecha de Nacimiento"
              ></ion-input>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-select
                label-placement="floating" fill="outline" placeholder="Sexo"
                color="medium"
                v-model="form.sexo"
                :class="{ 'invalid-input': error.sexo, 'custom-input': true }"
                label="Sexo"
              >
                <ion-select-option value="M">Masculino</ion-select-option>
                <ion-select-option value="F">Femenino</ion-select-option>
                
              </ion-select>
            </ion-col>
          </ion-row>
  
          <!--<ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Cédula"
                color="medium"
                v-model="form.cedula"
                :class="{ 'invalid-input': error.cedula, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Cédula"
              ></ion-input>
            </ion-col>
          </ion-row>-->

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Contraseña"
                 type="password"
                color="medium"
                v-model="form.password"
                :class="{ 'invalid-input': error.password, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Contraseña"
              ></ion-input>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Repetir Contraseña"
                 type="password"
                color="medium"
                v-model="form.password2"
                :class="{ 'invalid-input': error.password2, 'custom-input': true }"
                maxlength="30"
                clear-input="true"
                label="Repetir Contraseña"
              ></ion-input>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-select
                label-placement="floating" fill="outline" placeholder="Tipo de Usuario"
                color="medium"
                v-model="form.tipoUsuario"
                :class="{ 'invalid-input': error.tipoUsuario, 'custom-input': true }"
                label="Tipo de Usuario"
              >
                <ion-select-option value="artista">Artista</ion-select-option>
                <ion-select-option value="usuario">Usuario</ion-select-option>
              </ion-select>
            </ion-col>
          </ion-row>
  
          <ion-row>
            <ion-col>
              <ion-button @click="create" expand="full" class="custom-button">Registrar</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import { defineComponent } from 'vue';
  import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
  import axios from 'axios';
  import { environment } from '../../config';
  
  export default defineComponent({
    name: 'AuthPage',
    components: {
      IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonSelect, IonSelectOption
    },
    data() {
      return {
        form: {
          nombre: '',
          apellidos: '',
          email: '',
          password: '',
          password2: '',
          fechaNacimiento: '',
          sexo: '',
          cedula: '',
          tipoUsuario: '',
          username: ''
        },
        error: {
          nombre: false,
          apellidos: false,
          email: false,
          password: false,
          password2: false,
          fechaNacimiento: false,
          sexo: false,
          cedula: false,
          tipoUsuario: false,
          username: false
        },
        disabledButton: true,
        rememberMeChecked: false,
        showLoader: false,
        errors: []
      };
    },
    methods: {
      async create() {
        // Reset error states
        for (let key in this.error) {
          this.error[key] = false;
        }
    
        this.showLoader = true;
    
        try {
          /*const axiosInstance = axios.create({
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          });*/
          const response = await axios.post(`${environment.apiUrl}create_user`, this.form);
    
          if (response.status === 200) {
            this.toastMessage = response.data.message;
    
            if (response.data.user) {
              localStorage.setItem('user', response.data.user);
              console.log('Usuario almacenado en localStorage:', localStorage.getItem('user'));
    
              setTimeout(() => {
                this.showLoader = false;
                this.$router.push('/tabs/tab1');
              }, 1000);
    
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
        } catch (error) {
          console.log('Error completo:', error);
    
          let alertMessage = 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.';
          if (error.response && error.response.status === 401) {
            alertMessage = error.response.data.error;
          } else if (error.message === 'Network Error') {
            alertMessage = 'Sin conexión a Internet';
          }
    
          this.showLoader = false;
          Swal.fire({
            title: 'Información',
            text: alertMessage,
            icon: 'error',
            heightAuto: false,
            width: '300px',
            customClass: {
              popup: 'custom-swal-popup',
              confirmButton: 'custom-confirm-button',
            },
            confirmButtonColor: "#54618d",
            confirmButtonText: "Aceptar"
          });
        }
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
        return !!localStorage.getItem('user');
      }
    }
  });
  </script>
  
  <style scoped>
  .custom-background {
    --background: #fff;
    --ion-text-color: #000;
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
    color: #ffffff;
  }
  
  .cuenta {
    margin-top: 60px;
    font-size: 16px;
  }
  
  .checkbox {
    margin-top: 25px;
    font-size: 14px;
    color: #54618d;
  }
  
  .forgot-password-text {
    color: #54618d;
  }
  
  .footer-if {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #17234d;
    color: #54618d;
    font-size: 11px;
    padding: 35px;
  }
  
  .custom-button {
    padding-top: 15px;
    padding-bottom: 20px;
    min-height: 50px;
    --background: #000; /* Color de fondo deseado */
  color: #fff; /* Color de texto, ajusta según sea necesario */
  }
  
  .custom-swal-popup {
    padding: 1rem !important;
    height: 100px !important;
  }
  
  .custom-input {
    --border-width: 2px;
  }
  
  .invalid-input {
    --border-width: 2px;
    --border-color: red;
  }
  
  .invalid-label {
    color: red;
  }
  </style>
  