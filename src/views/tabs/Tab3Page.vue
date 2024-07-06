<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Registrar Evento"></ToolBar>
    </ion-header>

    <ion-content class="menu-content">

      <form @submit.prevent="submitForm" class="event-form">
      <ion-grid>
        
        <ion-row>
          <div class="preview-container" v-if="previewUrl">
          <img :src="previewUrl" alt="Preview" class="preview-image" />
        </div>
        </ion-row>
        <ion-row>
          <ion-label>Seleccionar Foto</ion-label>
          <input type="file" @change="onFileSelected" accept="image/*" />
        </ion-row>
        <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Titulo"
                color="medium"
                v-model="title"
               
                maxlength="30"
                clear-input="true"
                label="Titulo"
              ></ion-input>
              <ion-label v-if="errors && errors.title" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.title[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-label position="floating">Descripción</ion-label>
              <ion-textarea 
                v-model="description"
                required
                color="medium"
         
                maxlength="30"
                clear-input="true">
              </ion-textarea>
              <ion-label v-if="errors && errors.description" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.description[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Fecha de Inicio"
                color="medium"
                v-model="startDate"
          
                maxlength="30"
                clear-input="true"
                type="date"
                label="Fecha de Inicio"
              ></ion-input>
              <ion-label v-if="errors && errors.startDate" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.startDate[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating"
                fill="outline"
                placeholder="Hora de Inicio"
                color="medium"
                v-model="startTime"
    
                maxlength="30"
                clear-input="true"
                type="time"
                label="Hora de Inicio"
              ></ion-input>
              <ion-label v-if="errors && errors.startTime" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.startTime[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating" fill="outline" placeholder="Fecha de Fin"
                color="medium"
                v-model="endDate"
             
                maxlength="30"
                clear-input="true"
                type="date"
                label="Fecha de Fin"
              ></ion-input>
              <ion-label v-if="errors && errors.endDate" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.endDate[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
          <ion-row class="title ion-padding-bottom">
            <ion-col>
              <ion-input
                label-placement="floating"
                fill="outline"
                placeholder="Hora de Fin"
                color="medium"
                v-model="endTime"
             
                maxlength="30"
                clear-input="true"
                type="time"
                label="Hora de Fin"
              ></ion-input>
              <ion-label v-if="errors && errors.endTime" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.endTime[0] }}
              </ion-label>
            </ion-col>
          </ion-row>
      </ion-grid>

        <ion-button type="submit" expand="block" class="btn-black">Registrar</ion-button>
      </form>

      <ion-alert
        :is-open="showAlert"
        @didDismiss="showAlert = false"
        :header="alertTitle"
        :message="alertMessage"
        buttons="OK"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>


<script>
import axios from 'axios';
import ToolBar from '../../components/ToolBar.vue';
import { environment } from '../../config';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonAlert 
} from '@ionic/vue';

export default {
  name: 'RegisterEvent',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonAlert, ToolBar
  },
  data() {
    return {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      selectedFile: null,
      previewUrl: null,
      showAlert: false,
      alertMessage: '',
      alertTitle: '',
      user: JSON.parse(localStorage.getItem('user')),
      errors: [],
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.showPreview();
    },
    showPreview() {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.previewUrl = event.target.result;
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    },
    async submitForm() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('startDate', this.startDate);
        formData.append('endDate', this.endDate);
        formData.append('startTime', this.startTime);
        formData.append('endTime', this.endTime);
        formData.append('file', this.selectedFile);
        formData.append('id_user', this.user.id);

        try {
          axios.post(`${environment.apiUrl}create/event`, formData)
          .then(response => {

            console.log('Event registered successfully:', response.data);
            this.alertMessage = 'Evento Creado';
            this.alertTitle = 'Exito';
            this.showAlert = true;
            //this.$router.push('/');
            this.title = '';
            this.description = '';
            this.startDate = '';
            this.endDate = '';
            this.startTime = '';
            this.endTime = '';
            this.selectedFile = '';
            this.previewUrl = null;
             
          })
          .catch(error => {
      
              if (error.response) {
                this.errors = error.response.data.errors;
               
              }
              console.log(error);
            });
         
          
        } catch (error) {
          this.alertMessage = 'Error registering event: ' + error.message;
          this.alertTitle = 'Error';
          this.showAlert = true;
        }
      } else {
        this.alertMessage = 'Seleccione un Imagen.';
        this.alertTitle = 'Error';
        this.showAlert = true;
      }
    }
  }
};
</script>

<style scoped>
ion-content {
  --background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto; /* Center the form horizontally */
  padding: 30px; /* Increase padding for better spacing */
  border-radius: 5px; /* Add rounded corners */
}

.preview-container {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  margin-bottom: 20px; /* Add space between preview and form */
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  margin: auto;
  display: block;
}

.btn-black {
  --background: #000;
  --color: #fff;
}

ion-item {
  --border-color: rgba(0, 0, 0, 0.1); /* Add a thin border to inputs */
}

ion-input,
ion-textarea {
  --background: rgba(255, 255, 255, 0.8); /* Slight background color for inputs */
}

ion-input:focus,
ion-textarea:focus {
  --background: #fff; /* Change background on focus for better feedback */
}

</style>