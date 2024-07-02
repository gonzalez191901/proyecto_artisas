<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Registrar Evento"></ToolBar>
    </ion-header>

    <ion-content class="menu-content">
      <form @submit.prevent="submitForm" class="event-form">
        <div class="preview-container" v-if="previewUrl">
          <img :src="previewUrl" alt="Preview" class="preview-image" />
        </div>
        <ion-item>
          <ion-label>Seleccionar Foto</ion-label>
          <input type="file" @change="onFileSelected" accept="image/*" />
        </ion-item>
        <ion-item>
          <ion-label position="floating">Título</ion-label>
          <ion-input v-model="title"
          required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Descripción</ion-label>
          <ion-textarea v-model="description" required></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label>Fecha de Inicio</ion-label>
          <ion-input type="date" v-model="startDate" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Fecha de Fin</ion-label>
          <ion-input type="date" v-model="endDate" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Hora de Inicio</ion-label>
          <ion-input type="time" v-model="startTime" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Hora de Fin</ion-label>
          <ion-input type="time" v-model="endTime" required></ion-input>
        </ion-item>

        

        

        <ion-button type="submit" expand="block" class="btn-black">Registrar</ion-button>
      </form>

      <ion-alert
        :is-open="showAlert"
        @didDismiss="showAlert = false"
        header="Error"
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
      user: JSON.parse(localStorage.getItem('user')),
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
          const response = await axios.post(`${environment.apiUrl}create/event`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Event registered successfully:', response.data);
          this.alertMessage = 'Evento Creado';
          this.showAlert = true;
          //this.$router.push('/');
        } catch (error) {
          this.alertMessage = 'Error registering event: ' + error.message;
          this.showAlert = true;
        }
      } else {
        this.alertMessage = 'Please select a file to upload.';
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
  margin: auto;
  padding: 20px;
}

.preview-container {
  margin-top: 20px;
  width: 100%;
  text-align: center;
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

</style>