<template>
    <ion-page style="background-color: #f0f2f5;">
      <ion-header class="ion-no-border">
        <ToolBar :title="username"></ToolBar>
      </ion-header>
   
      <ion-content class=" menu-content" > 
        
        <div v-if="find_perfil == 1">
          <div class="header-perfil">
            <div class="imagen-perfil">
              
              <img :alt="data_perfil.username" :src="urlServ+'/uploads/profile/'+data_perfil.photo" @error="onImageError"/>
            </div>
          </div>
          <div v-if="data_perfil.id == user.id">
            <form  class="upload-form">
              <div class="form-group">
                <div class="file-upload-wrapper">
                  <label for="file-upload" class="file-upload-label">
                    <img src="/boton-circular-plus.png" @click="triggerFileInput"> Cambiar Foto de Perfil
                  </label>
                  <input type="file" id="file-upload" ref="fileInput" @change="onFileSelected" accept="image/*" style="display: none;">
                  
                </div>
              </div>
              
              
            </form>
          </div>

          <div class="sobre-mi" v-if="data_perfil.id == user.id">
            <span v-if="!edit_desc">{{ data_perfil.descripcion }} <a href="#" v-if="data_perfil.descripcion == ''" @click.prevent="editar_descripcion()">Agregar Descripción</a><a href="#" v-else @click.prevent="editar_descripcion()">Editar</a> </span>
            <div class="form-comentario" v-if="edit_desc">
              <ion-textarea  v-model="descripcion" placeholder="Añade una descripción"
                  maxlength="100000000"
                  clear-input="true"
              >
              </ion-textarea>
              <div  v-if="descripcion.trim().length > 0" class="btn-form-comen" @click="create_descripcion()">
                <img src="/paper-plane.svg" alt="">
              </div>
            </div>
          </div>
          <div class="sobre-mi" v-else>
            <span>{{ data_perfil.descripcion }}</span>
          </div>

          <div class="gallery-perfil">

          </div>
        </div>
        <div v-else-if="find_perfil == 2">
          Perfil no encontrado
        </div>
        <div v-else>

        </div>
        
        
        
      </ion-content>
     
    </ion-page>
    
  
  </template>
  
  <script>
  import axios from 'axios';
  import { Storage } from '@ionic/storage';
  
  import ToolBar from '../../components/ToolBar.vue';
  import { environment } from '../../config';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
    IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
    IonModal, IonButtons, IonButton, IonToast, IonSpinner, IonFooter, IonTextarea
  } from '@ionic/vue';
  import {
    personCircle, eye, create, trash, closeCircle, checkmark, callOutline, personCircleOutline, key
    ,maleOutline, maleFemaleOutline, mailOutline, homeOutline, mapOutline, arrowRedoOutline, 
    personOutline, manOutline, calendarOutline
  } from 'ionicons/icons';
  
  
  
  export default {
    name: 'Student',
    components: {
        
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
      IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
      IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
      IonModal, IonButtons, IonButton, IonToast, IonSpinner, ToolBar, IonFooter, IonTextarea
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
        responseData: null,
        expandedItems: [],
        modalComentario: false,
        comentario: '',
        urlServ: '',
        arrayComentarios: [],
        var_publi_comen: '',
        username: this.$route.params.username,
        previewUrl: null,
        user: JSON.parse(localStorage.getItem('user')),
        data_perfil: [],
        find_perfil: 0,
        urlServ: '',
        fallbackImage: '/usuarios.png',
        descripcion: '',
        edit_desc: false,
      };
    },
    computed: {
      truncatedDescriptions() {
        return this.responseData.reduce((acc, item) => {
          acc[item.id] = this.expandedItems.includes(item.id) ? item.descripcion : this.truncateText(item.descripcion);
          return acc;
        }, {});
      },
      
    },
    methods: {
  
    async loadData() {
        try {
          
          const response = await axios.post(`${environment.apiUrl}user/profile`, {
            username: this.username
          });

          this.data_perfil = response.data.perfil;
          console.log(this.data_perfil);
          this.find_perfil = 1;
          this.urlServ = response.data.rutaImagen;
          this.descripcion = response.data.perfil.descripcion || '';
          this.edit_desc = false;

        } catch (error) {
          console.error('Error');
          this.find_perfil = 2;
        }
    },
    triggerFileInput() {
        this.$refs.fileInput.click();
      },
      async onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id_user', this.user.id);

        try {
          const response = await axios.post(`${environment.apiUrl}user/foto`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.loadData();
          console.log('Imagen subida exitosamente', response.data);
        } catch (error) {
          console.error('Error al subir la imagen', error);
        }
      }
    },
    
    toggleText(id) {
        if (this.expandedItems.includes(id)) {
          this.expandedItems = this.expandedItems.filter(itemId => itemId !== id);
        } else {
          this.expandedItems.push(id);
        }
    },
    onImageError(event) {
      event.target.src = this.fallbackImage;
    },
    create_descripcion(){
   
      axios.post(`${environment.apiUrl}create/descripcion`,{
            id_user : this.user.id, 
            descripcion : this.descripcion})
      .then(response => {
        this.loadData();
      })
      .catch(error => {
        console.error('Error details:', error);
        this.errorMessage.global = 'Ha ocurrido un error: ' + error.message;
        setTimeout(() => {
          this.errorMessage.global = '';
        }, 2000);
      });
    },
    editar_descripcion(){
      if(this.edit_desc){
        this.edit_desc = false;
      }else{
        this.edit_desc = true;
      }
    }
  
  },
  
    ionViewWillEnter() {
      this.loadData();
    },
  };
  </script>
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  
  ion-content {
    --background:#fff; /* Ajuste para hacerlo un poco más oscuro */
    font-family: "Roboto", sans-serif;
    font-style: normal;
  
  }
  .header-perfil{
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .header-perfil img{
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 0.5px solid #f4f5f8;
  }
  .file-upload-wrapper img{
    width: 20px;
  }
  .file-upload-wrapper {
  position: relative;
}

.file-upload-label img {
  cursor: pointer;
}
.upload-form{
  padding: 10px;
}
.form-comentario{
    display:flex;
    border-bottom: .5px solid #d7d8da;
    align-items: center;
    padding: 0px 10px;
  }
.form-comentario img{
  width:30px;
}
.sobre-mi{
  padding: 0px 10px;
}
.sobre-mi a{
  color: #d7d8da;
  text-decoration: none;
}
  
  </style>
  