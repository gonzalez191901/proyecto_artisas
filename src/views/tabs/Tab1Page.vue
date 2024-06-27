<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Perfil"></ToolBar>
    </ion-header>
 
    <ion-content class=" menu-content" > 
      
      <div class="content-publicacion" v-for="item in responseData">
        <div class="foto-perfil-user">
          <img alt="Silhouette of mountains" src="https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA" />
          
          <b>{{ item.user.username }}</b>
        </div>
        <div class="foto-publicacion">
          <img alt="{{ item.user.username }}" src="https://ionicframework.com/docs/img/demos/card-media.png" />
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
          <p>Ver los 20 comentarios</p>
        </div>
          
        </div>
        
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
  IonModal, IonButtons, IonButton, IonToast, IonSpinner,
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
    IonModal, IonButtons, IonButton, IonToast, IonSpinner, ToolBar,
  },
  data() {
    return {
      eye, create, trash, closeCircle, mapOutline, arrowRedoOutline,
      maleOutline, maleFemaleOutline, homeOutline, personOutline,
      checkmark, callOutline, mailOutline, key, calendarOutline,
      manOutline,
      usuario: {},
      user: null,
      loading: true,
      responseData: null,
      expandedItems: []
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
      try {
        this.user = (await this.$storage.get('user')) ?? null;
      } catch (error) {
        console.error('Error al obtener usuario desde el storage:', error);
      }

    const id_user = this.user;

  axios.post(`${environment.apiUrl}inicio`,{
          id_user: id_user})
    .then(response => {
      console.log(response.data);
      this.responseData = response.data;
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
}
.foto-perfil-user img{
  width: 40px;
  border-radius: 100%;
  margin-right: 10px;
}
.foto-publicacion, .foto-publicacion img{
  width: 100%;
}
.comentarios-publicacion{
  color: #9c9c9c;
}


</style>