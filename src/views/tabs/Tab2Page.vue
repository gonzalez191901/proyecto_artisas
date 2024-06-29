<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Historias"></ToolBar>
    </ion-header>
 
    <ion-content class="menu-content" > 
      
     
      <form @submit.prevent="uploadFile" class="upload-form">
        <div class="preview-container" v-if="previewUrl">
          <img :src="previewUrl" alt="Preview" class="preview-image">
        </div>
        <div class="form-group">
          <div class="file-upload-wrapper">
            <label for="file-upload" class="file-upload-label">
              Selecciona una Imagen
            </label>
            <input type="file" id="file-upload" @change="onFileSelected" accept="image/*">
          </div>
          <ion-textarea
            v-model="description"
            placeholder="Descripción..."
            rows="4"
            class="description-textarea"
          ></ion-textarea>
        </div>
        
        <ion-button type="submit">Registrar</ion-button>
      </form>
    </ion-content>
   
  </ion-page>

</template>

<script>
//axios.post(`${environment.apiUrl}create/publicacion`
import axios from 'axios';

import ToolBar from '../../components/ToolBar.vue';
import { environment } from '../../config';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
  IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
  IonModal, IonButtons, IonButton, IonToast, IonSpinner, IonTextarea
} from '@ionic/vue';
import {
  personCircle, eye, create, trash, closeCircle, checkmark, callOutline, personCircleOutline, key
  ,maleOutline, maleFemaleOutline, mailOutline, homeOutline, mapOutline, arrowRedoOutline, personOutline,
  manOutline, calendarOutline,
} from 'ionicons/icons';

export default {
  name: 'Student',
  components: {
      
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
    IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
    IonModal, IonButtons, IonButton, IonToast, IonSpinner, ToolBar, IonTextarea
  },
  data() {
    return {
      eye, create, trash, closeCircle, mapOutline, arrowRedoOutline,
      maleOutline, maleFemaleOutline, homeOutline, personOutline,
      checkmark, callOutline, mailOutline, key, calendarOutline,
      manOutline,
      usuario: {},
      user: JSON.parse(localStorage.getItem('user')),
      loading: true,
      descripcion: '',
      foto: null,
      selectedFile: null,
      description: '',
      previewUrl: null
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log('File selected:', this.selectedFile);

      // Mostrar vista previa de la imagen seleccionada
      this.showPreview();
    },
    showPreview() {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.previewUrl = event.target.result;
      };

      // Read the image as a URL
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    },
    async uploadFile() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('description', this.description);
        formData.append('id_user', this.user.id);

        try {
          const response = await axios.post(`${environment.apiUrl}create/publicacion`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('No file selected.');
      }
    }
  }
};
</script>
<style scoped>

ion-content {
  --background:#fff; /* Ajuste para hacerlo un poco más oscuro */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.file-upload-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.file-upload-label {
  border: 2px solid #d7d8da;
  color: white;
  background-color: #d7d8da;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 300px;
}

.file-upload-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  
}

.description-textarea {
  width: 100%;
  resize: vertical;
  padding: 10px;
  border-bottom:  0.5px solid #d7d8da;
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

</style>