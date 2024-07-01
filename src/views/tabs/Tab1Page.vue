<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Perfil"></ToolBar>
    </ion-header>
 
    <ion-content class=" menu-content" > 
      
      <div class="content-publicacion" v-for="item in responseData">
        <router-link :to="/user/+item.user.username" class="router-link-text">
          <div class="foto-perfil-user">
            <img :alt="item.user.username" :src="urlServ+'/uploads/profile/'+item.user.photo" @error="onImageError"/>
            
            <b>{{ item.user.username }}</b>
          </div>
        </router-link>
        <div class="foto-publicacion">
          <!--<img :alt="item.user.username" :src="urlServ+'/'+item.id+'/'+item.photo" />-->
          <img :alt="item.user.username" :src="urlServ+'/uploads/'+item.user.id+'/'+item.photo" />
        </div>
        <div class="descripcion-publicacion"> 
          <p>
            <b>{{ item.user.username }} </b>
           {{ truncatedDescriptions[item.id] }} 
          <span v-if="item.descripcion.length > 40" @click="toggleText(item.id)" class="view-more">
              {{ expandedItems.includes(item.id) ? 'Ver menos' : 'Ver más' }}
            </span>
          </p>

          <div class="comentarios-publicacion" >
          <p @click="show_modal(item.id)">{{ item.comentarios.length > 0 ? item.comentarios.length ==  1 ? 'Ver los comentarios' : 'Ver los '+item.comentarios.length+' comentarios' : 'Comentar' }}</p>
         
        </div>
          
        </div>
        
      </div>
        
     <!--Modal-->
      <ion-modal
      :is-open="modalComentario"
      @didDismiss="modalComentario=false"
      :initial-breakpoint="0.50"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle"
    >
  
      <ion-content class="ion-padding magin-buttom">
        <div class="ion-margin-top">
          <ion-label>Comentarios</ion-label>
        </div>
        <div class="form-comentario">
          <ion-textarea  v-model="comentario" placeholder="Añade un comentario..."
              maxlength="100000000"
              clear-input="true"
          >
          </ion-textarea>
          <div  v-if="comentario.trim().length > 0" class="btn-form-comen" @click="comentar()">
            <img src="/paper-plane.svg" alt="">
          </div>
        </div>
        <ion-list>
          <ion-item v-if="arrayComentarios.length" v-for="come in arrayComentarios">
            <ion-avatar slot="start">
              <ion-img :src="urlServ+'/uploads/profile/'+come.user.photo" @ionError="onImageError"></ion-img>
            </ion-avatar>
            <ion-label>
              <h2>{{ come.user.username }}</h2>
              <p>{{ come.comentario }}</p>
            </ion-label>
          </ion-item>
          <p v-else="" >Sin comentarios.</p>
          
        </ion-list>

        

      </ion-content>

      
    </ion-modal>
     <!--Fin modal-->
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
      fallbackImage: '/usuarios.png'
    };
  },
  computed: {
    truncatedDescriptions() {
      return this.responseData.reduce((acc, item) => {
        acc[item.id] = this.expandedItems.includes(item.id) ? item.descripcion : this.truncateText(item.descripcion);
        return acc;
      }, {});
    }
  },
  methods: {

    async loadData() {
  /*const axiosInstance = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });*/
      /*try {
        this.user  ?? null;
      } catch (error) {
        console.error('Error al obtener usuario desde el storage:', error);
      }*/

  axios.post(`${environment.apiUrl}inicio`,{
          id_user: this.user.id})
    .then(response => {
      console.log(response.data);
      this.responseData = response.data.publicaciones;
      this.urlServ = response.data.rutaImagen;
    })
    .catch(error => {
      console.error('Error details:', error);
      this.errorMessage.global = 'Ha ocurrido un error: ' + error.message;
      setTimeout(() => {
        this.errorMessage.global = '';
      }, 2000);
    });
  },
  show_modal(id){
    this.var_publi_comen = id;
    this.arrayComentarios = [];
    axios.post(`${environment.apiUrl}comentarios`,{
          id_publicacion: this.var_publi_comen})
    .then(response => {
      console.log(response.data);
      this.arrayComentarios = response.data;
    })
    .catch(error => {
      console.error('Error details:', error);
      this.errorMessage.global = 'Ha ocurrido un error: ' + error.message;
      setTimeout(() => {
        this.errorMessage.global = '';
      }, 2000);
    });

    this.modalComentario = true;
  },
  comentar(){
   
    axios.post(`${environment.apiUrl}create/comentario`,{
          id_publicacion: this.var_publi_comen,
          id_user : this.user.id, 
          comentario : this.comentario})
    .then(response => {
      console.log(response.data);
      this.show_modal(this.var_publi_comen);
      this.comentario = '';
    })
    .catch(error => {
      console.error('Error details:', error);
      this.errorMessage.global = 'Ha ocurrido un error: ' + error.message;
      setTimeout(() => {
        this.errorMessage.global = '';
      }, 2000);
    });
  },
  truncateText(text) {
      return text.length > 40 ? text.substring(0, 40) + '...' : text;
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
.view-more {
  color: #9c9c9c;
  cursor: pointer;
  text-decoration: none;
}
.content-publicacion{
  margin-bottom: 20px;
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
}
.comentarios-publicacion{
  color: #9c9c9c;
}
.ion-margin-top{
  text-align:center;
  border-bottom: 1px solid #d7d8da;
  padding-bottom: 5px;
}
.hader-modal{
  text-align:center;
}
--ion-modal{
  border-radius: 10px 10px 0px 0px;
}
.footer-modal {
    position: fixed;
    bottom: 0;
    width: 100%;
    min-height: 56px;
  }
  .form-comentario{
    display:flex;
    border-bottom: .5px solid #d7d8da;
    align-items: center;
  }
.form-comentario img{
  width:30px;
}
.btn-form-comen{
  cursor: pointer;
}

</style>
