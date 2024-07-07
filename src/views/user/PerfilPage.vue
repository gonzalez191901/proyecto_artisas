<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar :title="username"></ToolBar>
    </ion-header>

    <ion-content class="menu-content">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <div v-if="find_perfil == 1">
        <div class="header-perfil">
          <div class="imagen-perfil">
            <img :alt="data_perfil.username" :src="urlServ+'/uploads/profile/'+data_perfil.photo" @error="onImageError"/>
          </div>
        </div>
        <div class="perfil-nombre">
          {{ data_perfil.name }} {{ data_perfil.apellidos }}
        </div>
        <div v-if="data_perfil.id == user.id">
          <form class="upload-form">
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
            <ion-textarea v-model="descripcion" placeholder="Añade una descripción" maxlength="100000000" clear-input="true"></ion-textarea>
            <div v-if="descripcion.trim().length > 0" class="btn-form-comen" @click="create_descripcion()">
              <img src="/paper-plane.svg" alt="">
            </div>
          </div>
        </div>
        <div class="sobre-mi" v-else>
          <span>{{ data_perfil.descripcion }}</span>
        </div>

        <div class="gallery-perfil"></div>
      </div>
      <div v-else-if="find_perfil == 2">
        Perfil no encontrado
      </div>
      <div v-else></div>

      <div class="gallery">
        <div class="content-publicacion" v-for="item in data_perfil.publicaciones">
          <div class="foto-publicacion">
            <img :alt="item.user.username" :src="urlServ+'/uploads/'+item.user.id+'/'+item.photo" @click="show_modal(item)"/>
          </div>
        </div>
      </div>

      <!--Modal-->
      <ion-modal
      :is-open="modalEvento"
      @didDismiss="modalEvento=false"
      :initial-breakpoint="0.80"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle"
    >
  
      <ion-content class="ion-padding magin-buttom" v-if="modalEvento=true">
      
        <div class="foto-publicacion">
            <img  :alt="datafoto.user.username" :src="urlServ+'/uploads/'+datafoto.user.id+'/'+datafoto.photo"/>
          </div>
          <div>
            {{ datafoto.descripcion }}
          </div>
          <div class="trash" @click="delete_photo(datafoto.id)" v-if="data_perfil.id == user.id">
            <ion-icon :icon="trash" class="icono-like"/> Eliminar
          </div>
      </ion-content>

      
    </ion-modal>
     <!--Fin modal-->
     <ion-alert
        :is-open="showAlert"
        @didDismiss="showAlert = false"
        header="Alerta"
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
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonTextarea, IonRefresher, IonRefresherContent, IonModal
} from '@ionic/vue';
import {
  trash
} from 'ionicons/icons';

export default {
  name: 'Student',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ToolBar, IonTextarea, IonRefresher, IonRefresherContent, IonModal
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      username: this.$route.params.username,
      data_perfil: [],
      find_perfil: 0,
      urlServ: '',
      fallbackImage: '/usuarios.png',
      descripcion: '',
      edit_desc: false,
      modalEvento: false,
      datafoto: [],
      trash,
      showAlert: false,
      alertMessage: '',
    };
  },
  methods: {
    async loadData() {
      try {
        const response = await axios.post(`${environment.apiUrl}user/profile`, { username: this.username });
        this.data_perfil = response.data.perfil;
        this.find_perfil = 1;
        this.urlServ = response.data.rutaImagen;
        this.descripcion = response.data.perfil.descripcion || '';
        this.edit_desc = false;
      } catch (error) {
        console.error('Error');
        this.find_perfil = 2;
      }
    },
    handleRefresh(event) {
      this.loadData().then(() => {
        event.target.complete();
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    show_modal(data){
        /*this.dataEvento = data;
        */
       if(data){
        this.modalEvento = true;
        this.datafoto = data;
        console.log(data);
       }
        
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
    delete_photo(id){
      
      axios.post(`${environment.apiUrl}publicacion/delete`, { publicacion: id });
      this.alertMessage = 'Publicación Eliminada';
        this.showAlert = true;
      this.loadData();
      //this.modalEvento = false;
    },
    create_descripcion() {
      axios.post(`${environment.apiUrl}create/descripcion`, {
        id_user: this.user.id,
        descripcion: this.descripcion
      })
      .then(response => {
        this.loadData();
      })
      .catch(error => {
        console.error('Error details:', error);
      });
    },
    editar_descripcion() {
      this.edit_desc = !this.edit_desc;
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
.view-more {
  color: #9c9c9c;
  cursor: pointer;
  text-decoration: none;
}
.content-publicacion{
  box-sizing: border-box;
}
.descripcion-publicacion{
  padding: 10px;
}
.foto-perfil-user{
  padding: 10px;
  display: flex;
  align-items:center;
  color: #000;

}
.router-link-text {
  text-decoration: none !important; /* Elimina el subrayado */
}

.foto-perfil-user img{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
}
.foto-publicacion, .foto-publicacion img{
  width: 100%;
  aspect-ratio: 1 / 1;
}
.comentarios-publicacion{
  color: #9c9c9c;
}
.gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 10px;
  }
.perfil-nombre{
  width: 100%;
  text-align: center;
}
.trash{
  font-size: 15px;
  margin-top: 20px;
  cursor: pointer;
}
  </style>
  