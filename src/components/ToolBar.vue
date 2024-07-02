<template>
  <ion-header class="ion-no-border">
    <ion-toolbar class="ion-no-border">
      <ion-title style="font-size: 16px;">{{ title }}</ion-title>
      <ion-buttons slot="start">
        <ion-button class="ion-padding"  @click="modalnotificaCones">
          <ion-icon :icon="notificationsOutline"></ion-icon>
          <ion-badge color="danger">2</ion-badge>
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
          <div class="card" @click="notificaCones('Realiza el pago de tu factura puntualmente para evitar la suspensión del servicio.')">
            <div class="card-content">
              <div class="half-background"></div>
              <div class="icon-container">
                <ion-icon :icon="notificationsOutline" class="card-icon"></ion-icon>
              </div>
              <div class="menu-title-container">
                <span class="menu-title"> !Pagar tu factura a tiempo¡  </span>
              </div>
            </div>
          </div>
    
          <div class="card" @click="notificaCones('Acceso a Banda Ancha (Aba), Fibra e Internet LAN El servicio de acceso a Internet de Cantv, te ofrece una experiencia de navegación con una conexión de alta velocidad.')">
            <div class="card-content">
              <div class="half-background"></div>
              <div class="icon-container">
                <ion-icon :icon="notificationsOutline" class="card-icon"></ion-icon>
              </div>
              <div class="menu-title-container">
                <span class="menu-title"> Cantv Aba </span>
              </div>
            </div>
          </div>

          <div class="card" @click="notificaCones('Hola.')">
            <div class="card-content">
              <div class="half-background"></div>
              <div class="icon-container">
                <ion-icon :icon="notificationsOutline" class="card-icon"></ion-icon>
              </div>
              <div class="menu-title-container">
                <span class="menu-title"> Hola </span>
              </div>
            </div>
          </div>
    
       
    
    
    
        </ion-content>
      </ion-modal>
  
    </ion-content>
  </ion-header>

 
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonBadge,
  IonModal,
} from '@ionic/vue';
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
    };
  },
  methods: {
    async loadEventos() {
      axios.post(`${environment.apiUrl}pruebassss`,{
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
  },
  ionViewWillEnter() {
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

</style>
