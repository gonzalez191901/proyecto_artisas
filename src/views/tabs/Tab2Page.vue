<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Historias"></ToolBar>
    </ion-header>
 
    <ion-content class="menu-content"> 
      <form @submit.prevent="uploadFile" class="upload-form">
        <div class="preview-container" v-if="previewUrl">
          <div class="trash" @click="delete_photo()">
            <ion-icon :icon="trash" class="icono-like"/>
          </div>
          <img :src="previewUrl" alt="Preview" class="preview-image">
        </div>
        <div class="form-group">
          <div class="file-upload-wrapper" v-if="!previewUrl">
            <label for="file-upload" class="file-upload-label">
              Selecciona una Imagen
            </label>
            <input type="file" id="file-upload" ref="fileInput" @change="onFileSelected" accept="image/*">
          </div>
          <ion-textarea
            v-model="description"
            placeholder="Descripción..."
            rows="4"
            class="description-textarea"
          ></ion-textarea>
          <ion-label v-if="errors && errors.description" style="margin-top: 10px;
                  font-size: 13px; color: red;"
                  class="error-message ion-padding">
                    {{ errors.description[0] }}
              </ion-label>
        </div>
        
        <ion-button type="submit" class="btn-black">Registrar</ion-button>
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
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
  IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
  IonModal, IonButtons, IonButton, IonToast, IonSpinner, IonTextarea, IonAlert 
} from '@ionic/vue';
import {
  personCircle, eye, create, trash, closeCircle, checkmark, callOutline, personCircleOutline, key,
  maleOutline, maleFemaleOutline, mailOutline, homeOutline, mapOutline, arrowRedoOutline, personOutline,
  manOutline, calendarOutline
} from 'ionicons/icons';

export default {
  name: 'Student',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
    IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
    IonModal, IonButtons, IonButton, IonToast, IonSpinner, ToolBar, IonTextarea, IonAlert
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
      previewUrl: null,
      showAlert: false,
      alertMessage: '',
      errors: [],
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log('File selected:', this.selectedFile);
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
          
          // Clear the file input and preview
          this.selectedFile = null;
          this.previewUrl = null;
          this.description = '';
          if (this.$refs.fileInput) {
            this.$refs.fileInput.value = null;
          }
          
          this.$router.push('/');
        } catch (error) {
          if (error.response) {
                this.errors = error.response.data.errors;
               
              }
              console.log(error);
          //this.alertMessage = 'Error uploading file: ' + error.message;
          //this.showAlert = true;
        }
      } else {
        this.alertMessage = 'Please select a file to upload.';
        this.showAlert = true;
      }
    },
    delete_photo(){
      this.previewUrl = false;
    }
  }
};
</script>

<style scoped>
ion-content {
  --background:#fff;
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
  border-bottom: 0.5px solid #d7d8da;
}

.preview-container {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  position: relative;
  display: inline-block;
}

.preview-image {
  width: 100%;
  max-height: 300px;
  margin: auto;
  display: block;
  height: auto;
}
.btn-black{
  --background: #000; /* Color de fondo negro */
  --color: #fff;      /* Color del texto blanco */
}
.trash {
  position: absolute;
  top: 10px; /* Ajusta el valor según sea necesario */
  right: 10px; /* Ajusta el valor según sea necesario */
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  color: white; /* Color del icono */
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}

.trash ion-icon {
  font-size: 20px; /* Ajusta el tamaño del icono según sea necesario */
}

</style>
