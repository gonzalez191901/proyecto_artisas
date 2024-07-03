<template>
  <ion-header class="ion-no-border">
    <ion-toolbar class="ion-no-border">
      <ion-title style="font-size: 16px;">{{ title }}</ion-title>
      <ion-buttons slot="start">
        <ion-button class="ion-padding"  @click="modalnotificaCones">
          <ion-icon :icon="notificationsOutline"></ion-icon>
          <ion-badge color="danger">{{responseData.length}}</ion-badge>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
         <!-- Mostrar el botón de retroceso si la ruta es diferente de '/menu' -->
        <ion-button v-if="$route.path !== '/menu'" @click="navigateToMenu" style="font-size: 20px;">
          <ion-icon :icon="menuOutline"></ion-icon>
        </ion-button>

        <!-- Mostrar el botón de retroceso si la ruta es '/menu' -->
        <ion-button v-else @click="goBack" style="font-size: 20px;">
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

    <ion-content>
      <ion-modal :is-open="modalState" @didDismiss="modalState=false" >
        <!-- Contenido del modal -->
        <!-- Puedes personalizar el contenido del modal según tus necesidades -->
        <ion-header class="ion-no-border">
          <ion-toolbar>
            <ion-title>
              Eventos Disponibles
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalState=false">
                <ion-icon slot="icon-only"  :icon="closeCircle"></ion-icon>
              </ion-button>
          </ion-buttons>
          </ion-toolbar>
          
        </ion-header>
        <ion-content class="ion-padding" style=" --background: #f0f2f5;">

          <div class="card" v-for="item in responseData" @click="show_modal(item)">
            <div class="card-content">
              <div class="half-background"></div>
              <div class="icon-container">
                <ion-icon :icon="notificationsOutline" class="card-icon"></ion-icon>
              </div>
              <div class="menu-title-container">
                <span class="menu-title"> {{item.titulo}}  </span>
              </div>
            </div>
          </div>

          <!--Modal-->
      <ion-modal
      :is-open="modalEvento"
      @didDismiss="modalEvento=false"
      :initial-breakpoint="0.50"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle"
    >
  
      <ion-content class="ion-padding magin-buttom">
        <div class="ion-margin-top">
          <ion-label>{{dataEvento.titulo}}</ion-label>
        </div>
        <div class="img-evento">
          <img :alt="dataEvento.photo" :src="urlServ+'/uploads/eventos/'+dataEvento.user.id+'/'+dataEvento.photo" @error=""/>
        </div><br>
        <div class="cuerpo-evento">
          <div>{{dataEvento.descripcion}}</div> <br>
          <div><b>Desde:</b> {{dataEvento.hora_inicio}} {{dataEvento.fecha_inicio}} </div>
          <div><b>Hasta:</b> {{dataEvento.hora_fin}} {{dataEvento.fecha_fin}} </div>
        </div> <br>
        <div>
          <b>Creado Por: <router-link :to="/user/+dataEvento.user.username" class="router-link-text">
          <div class="foto-perfil-user">
            <img :alt="dataEvento.user.username" :src="urlServ+'/uploads/profile/'+dataEvento.user.photo" @error="onImageError"/>
            
            <b>{{dataEvento.user.username}}</b>
          </div>
        </router-link></b>
        </div>

        

      </ion-content>

      
    </ion-modal>
     <!--Fin modal-->
    
         
    
       
    
    
    
        </ion-content>
      </ion-modal>
  
    </ion-content>
  </ion-header>

 
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonBadge,
  IonModal
} from '@ionic/vue';
import axios from 'axios';
import { environment } from '../config';
import { logOutOutline, menuOutline, arrowBackOutline, closeCircle, notificationsCircleOutline, notificationsOutline } from 'ionicons/icons';
import { alertController } from '@ionic/vue';
export default {
  name: 'ToolBar',
  components: {
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,   IonModal, IonContent, IonBadge

  },
  props: {
    title: String
  },
  data() {
    return {
      closeCircle,
      notificationsOutline,
      logOutOutline,
      menuOutline,
      arrowBackOutline
      ,
      modalState: false,
      modalEvento: false,
      dataEvento: [],
      urlServ: '',
      responseData: [],
    };
  },
  methods: {
    loadEventos() {
      axios.post(`${environment.apiUrl}cantidad/eventos`)
    .then(response => {
      console.log(response.data);
      this.responseData = response.data.eventos;
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

    modal() {
        this.modalState = true;
    },

    navigateToMenu() {
      this.$router.push('/menu');
    },
    modalnotificaCones() {
        this.modalState = true;
    },
    goBack() {
      this.$router.go(-1); // Retroceder en la pila de historial
    },
    async notificaCones(message) {
      const alert = await alertController.create({
        header: 'Notificación',
        message: `${message}`,
        buttons: ['Ok'],
      });

      await alert.present();
    },
    show_modal(data){
        this.dataEvento = data;
        this.modalEvento = true;
      },
    onImageError(event) {
      event.target.src = '/usuarios.png';
    },
  },
  mounted() {
    this.loadEventos();
  },
};
</script>

<style scoped>
.txt {
  color: #fff;
}
ion-icon{
  font-size: 22px;
}




.card {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
  text-decoration: none;
}

.card-content {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
}

.card-icon {
  color: #17234d;
  font-size: 24px;
}

.half-background {
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background: linear-gradient(to right, #ccc 50%, transparent 50%);
}

.icon-container {
  flex-shrink: 0;
  width: 24px;
}

.menu-title-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  font-size: 12px;
}
.img-evento{
  margin-top:10px;
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

</style>
