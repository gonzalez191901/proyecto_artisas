<template>
    <ion-page style="background-color: #f0f2f5;">
      <ion-header class="ion-no-border">
        <ToolBar title="Perfil"></ToolBar>
      </ion-header>
   
      <ion-content class=" menu-content" > 
        
        <div class="imagen-perfil">
            <img src="" :alt="username">
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
        username: this.$route.params.username
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
      //this.loadData();
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
  
  </style>
  