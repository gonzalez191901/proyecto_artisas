<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Buscar"></ToolBar>
    </ion-header>
 
    <ion-content class="menu-content">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <ion-searchbar
        v-model="searchQuery"
        @ionInput="onSearch"
        debounce="500"
        placeholder="Buscar..."
      ></ion-searchbar>

      <ion-list>
        <ion-item v-for="item in results">
              
              <ion-avatar slot="start">
                
                  <img :src="urlServ+'/uploads/profile/'+item.photo" @error="onImageError" />
                
              </ion-avatar>
            
            
            <ion-label>
              <router-link :to="'/user/' + item.username" class="router-link-text">
                <h2>{{ item.username }}</h2>
              </router-link>
            </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
import ToolBar from '../../components/ToolBar.vue';
import { environment } from '../../config';
import { defineComponent } from 'vue';
import {
  IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,
  IonPage, IonLabel, IonList, IonItem, IonSearchbar 
} from '@ionic/vue';

export default defineComponent({
  name: 'Student',
  components: {
    IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,
    ToolBar, IonPage, IonLabel, IonList, IonItem, IonSearchbar 
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      searchQuery: '',
      results: [],
      urlServ: '',
    };
  },
  
  methods: {
    handleRefresh(event) {
      this.loadData();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    },
    async onSearch(event) {
      const query = event.target.value;

      if (query) {
        try {
          const response = await axios.post(`${environment.apiUrl}user/search`, {
            username: query,
          });
          this.results = response.data.users;
          this.urlServ = response.data.rutaImagen;
        } catch (error) {
          console.error('Error al realizar la búsqueda:', error);
        }
      } else {
        this.results = [];
      }
    },
    onImageError(event) {
      event.target.src = '/usuarios.png';
    },
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

ion-content {
  --background: #fff;
  font-family: "Roboto", sans-serif;
}
.router-link-text {
  text-decoration: none;
  color: #000;
}
</style>
