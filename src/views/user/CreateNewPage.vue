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
          
                maxlength="30"
                clear-input="true"
                label="Nombre"
              ></ion-input>
              <ion-label v-if="errors && errors.nombre" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.nombre[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Apellidos"
                color="medium"
                v-model="form.apellidos"
       
                maxlength="30"
                clear-input="true"
                label="Apellidos"
              ></ion-input>
              <ion-label v-if="errors && errors.apellidos" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.apellidos[0] }}
              </ion-label>
            </ion-col>
          </ion-row>

          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Nombre de Usuario"
                color="medium"
                v-model="form.username"
               
                maxlength="30"
                clear-input="true"
                label="Nombre de Usuario"
              ></ion-input>
              <ion-label v-if="errors && errors.username" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.username[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Correo"
                color="medium"
                v-model="form.email"
            
                maxlength="30"
                clear-input="true"
                label="Email"
              ></ion-input>
              <ion-label v-if="errors && errors.email" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.email[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Fecha de Nacimiento"
                color="medium"
                v-model="form.fechaNacimiento"
              
                maxlength="30"
                clear-input="true"
                type="date"
                label="Fecha de Nacimiento"
              ></ion-input>
              <ion-label v-if="errors && errors.fechaNacimiento" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.fechaNacimiento[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-select
                label-placement="floating" fill="outline" placeholder="Sexo"
                color="medium"
                v-model="form.sexo"
            
                label="Sexo"
              >
                <ion-select-option value="M">Masculino</ion-select-option>
                <ion-select-option value="F">Femenino</ion-select-option>
                
              </ion-select>
              <ion-label v-if="errors && errors.sexo" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.sexo[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <!--<ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Cédula"
                color="medium"
                v-model="form.cedula"
              
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
            
                maxlength="30"
                clear-input="true"
                label="Contraseña"
              ></ion-input>
              <ion-label v-if="errors && errors.password" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.password[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Repetir Contraseña"
                 type="password"
                color="medium"
                v-model="form.password2"
             
                maxlength="30"
                clear-input="true"
                label="Repetir Contraseña"
              ></ion-input>
              <ion-label v-if="errors && errors.password2" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.password2[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
  
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-select
                label-placement="floating" fill="outline" placeholder="Tipo de Usuario"
                color="medium"
                v-model="form.tipoUsuario"
              
                label="Tipo de Usuario"
              >
                <ion-select-option value="2">Artista</ion-select-option>
                <ion-select-option value="1">Usuario</ion-select-option>
              </ion-select>
              <ion-label v-if="errors && errors.tipoUsuario" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.tipoUsuario[0] }}
              </ion-label>
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
        /*errors: {
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
        },*/
        disabledButton: true,
        rememberMeChecked: false,
        showLoader: false,
        errors: [],
      };
    },
    methods: {
      /*async create() {
        // Reset error states
        for (let key in this.error) {
          this.error[key] = false;
        }
    
        this.showLoader = true;
    
        try {
      
          const response = await axios.post(`${environment.apiUrl}create_user`, this.form);
    
          if (response.status === 200) {
            this.toastMessage = response.data.message;
    
            if (response.data.user) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
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
        } catch (errors) {
          console.log('Error completo:', errors);
    
          let alertMessage = 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.';
          if (errors.response && errors.response.status === 401) {
            alertMessage = errors.response.data.errors;
          } else if (errors.message === 'Network Error') {
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
      },*/
      create() {
          
          axios.post(`${environment.apiUrl}create_user`, this.form)
          .then(response => {
            
         
              //this.toastMessage = response.data.message;
    
              if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                console.log('Usuario almacenado en localStorage:', localStorage.getItem('user'));
      
                setTimeout(() => {
                  //this.showLoader = false;
                  this.$router.push('/tabs/tab1');
                }, 1000);
      
              }

             
          })
          .catch(error => {
      
              if (error.response) {
                this.errors = error.response.data.errors;
               
              }
              console.log(error);
            });
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
  