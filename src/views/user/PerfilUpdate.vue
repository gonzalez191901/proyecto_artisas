<template>
    <ion-page style="background-color: #f0f2f5;">
      <ion-header class="ion-no-border">
        <ToolBar :title="username"></ToolBar>
      </ion-header>
  
      <ion-content class="menu-content"> 
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
              <ion-label v-if="errors && errors.nombre" style="margin-top: 10px; font-size: 13px; color: red;" class="error-message ion-padding">
                {{ errors.nombre[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Apellido"
                color="medium"
                v-model="form.apellido"
                maxlength="30"
                clear-input="true"
                label="Apellido"
              ></ion-input>
              <ion-label v-if="errors && errors.apellido" style="margin-top: 10px; font-size: 13px; color: red;" class="error-message ion-padding">
                {{ errors.apellido[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Username"
                color="medium"
                v-model="form.username"
                maxlength="30"
                clear-input="true"
                label="Username"
              ></ion-input>
              <ion-label v-if="errors && errors.username" style="margin-top: 10px; font-size: 13px; color: red;" class="error-message ion-padding">
                {{ errors.username[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <input type="checkbox" v-model="form.view_password" value="1"><label for="">Cambiar Contraseña</label>
          <div v-if="form.view_password == 1">
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
                <ion-label v-if="errors && errors.password" style="margin-top: 10px; font-size: 13px; color: red;" class="error-message ion-padding">
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
                <ion-label v-if="errors && errors.password2" style="margin-top: 10px; font-size: 13px; color: red;" class="error-message ion-padding">
                  {{ errors.password2[0] }}
                </ion-label>
              </ion-col>
            </ion-row>
          </div>
          <ion-row>
            <ion-col>
              <ion-button @click="update" expand="full" class="custom-button">Actualizar</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>

    <ion-alert
        :is-open="showAlert"
        @didDismiss="showAlert = false"
        :header="alertTitle"
        :message="alertMessage"
        buttons="OK"
      ></ion-alert>
      <ion-loading :is-open="showLoader" message="Cargando..."></ion-loading>

      
  </template>
  
  <script>
  import axios from 'axios';
  import ToolBar from '../../components/ToolBar.vue';
  import { environment } from '../../config';
  import {
    IonPage, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonLoading
  } from '@ionic/vue';
  import { personCircle, eye, create, trash, closeCircle, checkmark, callOutline, personCircleOutline, key, 
    maleOutline, maleFemaleOutline, mailOutline, homeOutline, mapOutline, arrowRedoOutline, personOutline, 
    manOutline, calendarOutline } from 'ionicons/icons';
  
  export default {
    name: 'Student',
    components: {
      IonPage, IonHeader, IonContent, IonGrid, IonRow, IonCol, IonInput, IonLabel, ToolBar, IonLoading
    },
    data() {
      return {
        eye, create, trash, closeCircle, mapOutline, arrowRedoOutline, maleOutline, maleFemaleOutline, homeOutline, personOutline, checkmark, callOutline, mailOutline, key, calendarOutline, manOutline,
        usuario: {},
        user: JSON.parse(localStorage.getItem('user')),
        loading: true,
        responseData: null,
        expandedItems: [],
        modalComentario: false,
        comentario: '',
        urlServ: '',
        arrayComentarios: [],
        var_publi_comen: '',
        username: this.$route.params.username,
        previewUrl: null,
        data_perfil: [],
        find_perfil: 0,
        fallbackImage: '/usuarios.png',
        descripcion: '',
        edit_desc: false,
        form: {
          nombre: '',
          apellido: '',
          username: '',
          password: '',
          password2: '',
          view_password: '',
        },
        view_password: 0,
        errors: {},
        showLoader: false,
        showAlert: false,
        alertMessage: '',
        alertTitle: '',
      };
    },
    methods: {
      async loadData() {
        try {
          const response = await axios.post(`${environment.apiUrl}user/mis_datos`, {
            id_user: this.user.id
          });
          console.log("Response data:", response.data); // Depuración
          this.form.nombre = response.data.name;
          this.form.apellido = response.data.apellidos;
          this.form.username = response.data.username;
          

          console.log("Form data:", this.form); // Depuración
        } catch (error) {
          if (error.response) {
            this.errors = error.response.data.errors;
          }
          console.log(error);
        }
      },
      update(){
        this.showLoader = true;
        const formData = new FormData();
        formData.append('nombre', this.form.nombre);
        formData.append('apellido', this.form.apellido);
        formData.append('username', this.form.username);
        formData.append('password', this.form.password);
        formData.append('password2', this.form.password2);
        formData.append('view_password', this.form.view_password);
        formData.append('id_user', this.user.id);

        axios.post(`${environment.apiUrl}user/update`, formData)
          .then(response => {
            
            console.log(response.data);
            this.alertMessage = 'Datos Actualizados';
            this.alertTitle = 'Exito';
            this.showAlert = true;
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('Usuario almacenado en localStorage:', localStorage.getItem('user'));
             
          })
          .catch(error => {
      
              if (error.response) {
                this.errors = error.response.data.errors;
               
              }
              console.log(error);
            });

            this.showLoader = false;
      },
    },
    created() {
      this.loadData();
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  ion-content {
    --background:#fff;
    font-family: "Roboto", sans-serif;
    font-style: normal;
  }
  .header-perfil {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .header-perfil img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 0.5px solid #f4f5f8;
  }
  .file-upload-wrapper img {
    width: 20px;
  }
  .file-upload-wrapper {
    position: relative;
  }
  .file-upload-label img {
    cursor: pointer;
  }
  .upload-form {
    padding: 10px;
  }
  .form-comentario {
    display: flex;
    border-bottom: .5px solid #d7d8da;
    align-items: center;
    padding: 0px 10px;
  }
  .form-comentario img {
    width: 30px;
  }
  .sobre-mi {
    padding: 0px 10px;
  }
  .sobre-mi a {
    color: #d7d8da;
    text-decoration: none;
  }
  .view-more {
    color: #9c9c9c;
    cursor: pointer;
    text-decoration: none;
  }
  .content-publicacion {
    box-sizing: border-box;
  }
  .descripcion-publicacion {
    padding: 10px;
  }
  .foto-perfil-user {
    padding: 10px;
    display: flex;
    align-items: center;
    color: #000;
  }
  .router-link-text {
    text-decoration: none !important;
  }
  .foto-perfil-user img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
  }
  .foto-publicacion, .foto-publicacion img {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
  .comentarios-publicacion {
    color: #9c9c9c;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 10px;
  }
  .custom-button {
    min-height: 50px;
    --background: #000; /* Color de fondo deseado */
  color: #fff; /* Color de texto, ajusta según sea necesario */
  }
  </style>
  