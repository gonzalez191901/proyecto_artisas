<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="homeSharp" class="menu-icon"></ion-icon>
         <!-- <ion-label></ion-label> -->
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="addCircle"></ion-icon>
           
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon aria-hidden="true" :icon="search" />
          <!-- <ion-label>Estados</ion-label> -->
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/tabs/tab3" v-if="user.id_rol == 2">
          <ion-icon aria-hidden="true" :icon="airplane" />
          <!-- <ion-label>Estados</ion-label> -->
        </ion-tab-button>

        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, homeSharp, addCircle, airplane, search } from 'ionicons/icons';

const user = JSON.parse(localStorage.getItem('user') || '{}');
</script>


<style scoped>
#icono{
  
  width: 35px;
}
</style>
