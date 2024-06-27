<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Estados"></ToolBar>
    </ion-header>
 
    <ion-content class=" menu-content ion-padding" > 
      
     
       <div class="center-card">
 
    
        
      </div>
    </ion-content>
   
  </ion-page>

</template>

<script>
import axios from 'axios';

import ToolBar from '../../components/ToolBar.vue';
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
    };
  },
  methods: {
    }
};
</script>
<style scoped>

ion-content {
  --background:#f0f2f5; /* Ajuste para hacerlo un poco más oscuro */
}

</style>