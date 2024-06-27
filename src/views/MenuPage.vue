<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ToolBar title="Menú"></ToolBar>
    </ion-header>
    <ion-content class="menu-content ion-padding">
      <ion-loading :is-open="showLoader"  message="Cerrando Sesión..." duration="1000"></ion-loading>

      <router-link to="/tabs/tab1" class="menu-item">
        <div class="menu-item-content">
          <ion-icon :icon="homeOutline" class="menu-icon"></ion-icon>
          <span class="menu-title">Ir a Inicio</span>
        </div>
      </router-link>

      <div class="menu-item-content" @click="logout" style="cursor: pointer;">
        <ion-icon :icon="logOutOutline" class="menu-icon"></ion-icon>
        <span class="menu-title">Cerrar Sesión</span>
      </div>

     

      
    </ion-content>
  </ion-page>
</template>

<script>
import ToolBar from '../components/ToolBar.vue';
import { IonPage, IonHeader, IonContent, IonIcon, IonLoading, IonModal, IonGrid, IonRow, IonCol, IonLabel, IonButtons, IonButton, IonToolbar, IonTitle } from '@ionic/vue';
import { airplane, wifi, bluetooth, callOutline, personCircle, receiptOutline, settingsOutline, logOutOutline, homeOutline, cardOutline, createOutline, closeCircle } from 'ionicons/icons';

export default {
  components: {
    IonPage, IonHeader, IonContent, IonIcon, ToolBar, IonLoading, IonModal, IonGrid, IonRow, IonCol, IonLabel, IonButtons, IonButton, IonToolbar, IonTitle
  },
  data() {
    return {
      createOutline,
      homeOutline,
      cardOutline,
      airplane,
      wifi,
      bluetooth,
      callOutline,
      personCircle,
      receiptOutline,
      settingsOutline,
      logOutOutline,
      showLoader: false,
      closeCircle,
      modalState: false,
      modalShow: false,
      codificador: {},
      errors: {}
    };
  },
  methods: {
    modal() {
      this.modalState = true;
    },
    modal1() {
      this.modalShow = true;
    },
    toggleLoader(show) {
      this.showLoader = show;
    },
    async logout() {
      try {
        this.toggleLoader(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simular un retraso para mostrar el loader
        localStorage.removeItem('user');
        this.$router.push('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      } finally {
        this.toggleLoader(false);
      }
    },
    cambiarDeco() {
      console.log('Cambiar Decodificador');
    },
  }
};
</script>

<style scoped>
.menu-content {
  --background: #f0f2f5;
  padding: 10px;
}
.menu-item {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: block;
  text-decoration: none;
}
.menu-item-content {
  display: flex;
  align-items: center;
  padding: 10px;
}
.menu-icon {
  color: #17234d;
  font-size: 24px;
  margin-right: 10px;
}
.menu-title {
  font-size: 16px;
  font-weight: normal;
  color: #333;
}
</style>
