<template>

  <ion-page v-if="!isAuthenticated">
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro de Artistas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding custom-background">
      <ion-grid>
        <ion-row class="title ion-padding-bottom">
          <ion-col>
            <ion-input
              ref="userInput"
              label-placement="floating" fill="outline" placeholder="Usuario"
              color="medium"
              v-model="form.email"
              :class="{ 'invalid-input': error.email, 'custom-input': true }"
              @input="handleInputChange"
              maxlength="30"
              clear-input="true"
              label="Usuario"
            ></ion-input>
            <ion-label :class="{ 'invalid-label': error.email }"> {{ error.email ? 'Correo electrónico incorrecto' : '' }}</ion-label>
          </ion-col>
        </ion-row>

        <ion-row class="title ion-padding-bottom">
          <ion-col>
            <ion-input
              label-placement="floating" fill="outline" placeholder="Contraseña"
              color="medium"
              v-model="form.password"
              :class="{ 'invalid-input': error.password, 'custom-input': true }"
              @input="handleInputChange"
              maxlength="30"
              clear-input="true"
              label="Contraseña"
              type="password"
            ></ion-input>
            <ion-label :class="{ 'invalid-label': error.password }"> {{ error.password ? 'Contraseña incorrecta' : '' }}</ion-label>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-button @click="login" expand="full" :disabled="disabledButton" class="custom-button">INGRESAR</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
            <ion-col class="center">
              <a href="/register">Registrar</a>
            </ion-col>
          </ion-row>
      </ion-grid>
      <ion-loading :is-open="showLoader" message="Iniciando Sesión..."></ion-loading>
    </ion-content>
  </ion-page>
</template>

<script>
import Swal from 'sweetalert2';
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonText, IonLoading } from '@ionic/vue';
import { environment } from '../../config';
import axios from 'axios';

export default defineComponent({
  email: 'AuthPage',
  components: {
    IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonLabel, IonButton, IonText, IonLoading
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: {
        email: false,
        password: false
      },
      disabledButton: true,
      rememberMeChecked: false,
      showLoader: false, // Estado para el loader
      errors: []
    };
  },
  methods: {
    handleInputChange() {
      this.disabledButton = !this.form.email || !this.form.password;
    },
    async login() {
      this.error.email = false;
      this.error.password = false;

      if (!this.form.email) {
        this.error.email = true;
      }

      if (!this.form.password) {
        this.error.password = true;
      }

      this.disabledButton = !this.form.email || !this.form.password;

      if (!this.error.email && !this.error.password) {
        this.showLoader = true; // Mostrar el loader

        try {
          const axiosInstance = axios.create({
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          });
          const response = await axiosInstance.post(`${environment.apiUrl}login`, {
            email: this.form.email,
            password: this.form.password
          });

          if (response.status === 200 && response.data.status_auth === 1) {
            this.toastMessage = response.data.message;

            if (response.data.user) {
              //localStorage.setItem('user', response.data.user);  // Almacenar el usuario en localStorage
              localStorage.setItem('user', JSON.stringify(response.data.user));
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
        } catch (error) {
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
        }
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
      return !!localStorage.getItem('user'); // Verificar si el usuario está autenticado
    }
  },
  mounted() {

  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

ion-content {
  --background:#fff; /* Ajuste para hacerlo un poco más oscuro */
  font-family: "Roboto", sans-serif;
  font-style: normal;

}
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
  --background: #000; /* Color de fondo deseado */
  color: #fff; /* Color de texto, ajusta según sea necesario */
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