<template>
  <ion-page style="background-color: #f0f2f5;">
    <ion-header class="ion-no-border">
      <ToolBar title="Inicio"></ToolBar>
    </ion-header>
 
    <ion-content class="menu-content">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <div class="content-publicacion" v-for="(item, index) in responseData">
        <router-link :to="'/user/' + item.user.username" class="router-link-text">
          <div class="foto-perfil-user">
            <img :alt="item.user.username" :src="urlServ+'/uploads/profile/'+item.user.photo" @error="onImageError"/>
            <b>{{ item.user.username }}</b>
          </div>
        </router-link>
        <div class="foto-publicacion">
          <img :alt="item.user.username" :src="urlServ+'/uploads/'+item.user.id+'/'+item.photo" @error="onImageErrorPublicacion"/>
        </div>
        <div class="like-publicacion">
          <ion-icon :icon="heart"
            :class="{'icono-like': true, 'like-active': item.isLiked, 'like-inactive': !item.isLiked}"
            @click="toggleLike(index, item.id)"/>
          <span>{{ item.likes.length }}</span>
        </div>
        <div class="descripcion-publicacion">
          <p>
            <b>{{ item.user.username }} </b>
            {{ truncatedDescriptions[item.id] }}
            <span v-if="item.descripcion.length > 40" @click="toggleText(item.id)" class="view-more">
              {{ expandedItems.includes(item.id) ? 'Ver menos' : 'Ver más' }}
            </span>
          </p>

          <div class="comentarios-publicacion">
            <p @click="show_modal(item.id)">
              {{ item.comentarios.length > 0 ? (item.comentarios.length == 1 ? 'Ver el comentario' : 'Ver los ' + item.comentarios.length + ' comentarios') : 'Comentar' }}
            </p>
          </div>
        </div>
      </div>
      
      <!--Modal-->
      <ion-modal
        :is-open="modalComentario"
        @didDismiss="modalComentario = false"
        :initial-breakpoint="0.60"
        :breakpoints="[0, 0.25, 0.5, 0.75]"
        handle-behavior="cycle"
      >
        <ion-content class="ion-padding magin-buttom">
          <div class="ion-margin-top">
            <ion-label>Comentarios</ion-label>
          </div>
          <div class="form-comentario">
            <ion-textarea v-model="comentario" placeholder="Añade un comentario..."
              maxlength="100000000"
              clear-input="true"
            ></ion-textarea>
            <div v-if="comentario.trim().length > 0" class="btn-form-comen" @click="comentar()">
              <img src="/paper-plane.svg" alt="">
            </div>
          </div>
          <ion-list>
            <ion-item v-if="arrayComentarios.length" v-for="come in arrayComentarios">
              
                <ion-avatar slot="start">
                  
                    <img :src="urlServ+'/uploads/profile/'+come.user.photo" @error="onImageError" />
                  
                </ion-avatar>
              
              
              <ion-label>
                <router-link :to="'/user/' + come.user.username" class="router-link-text" @click="comen_view_perfil(this.modalComentario = false)">
                  <h2>{{ come.user.username }}</h2>
                </router-link>
                <p>{{ come.comentario }}</p>
              </ion-label>
              </ion-item>
              <p v-else="">Sin comentarios.</p>
            </ion-list>
        </ion-content>
      </ion-modal>
      <!--Fin modal-->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import axios from 'axios';
import { Storage } from '@ionic/storage';
import ToolBar from '../../components/ToolBar.vue';
import { environment } from '../../config';
import { defineComponent } from 'vue';
import {
  IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,
  IonPage, IonModal, IonTextarea, IonLabel, IonList, IonItem, IonAvatar, IonIcon
} from '@ionic/vue';
import { heart } from 'ionicons/icons';

export default defineComponent({
  name: 'Student',
  components: {
    IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar,
    ToolBar, IonPage, IonModal, IonTextarea, IonLabel, IonList, IonItem, IonAvatar, IonIcon
  },
  data() {
    return {
      heart,
      user: JSON.parse(localStorage.getItem('user')),
      responseData: [],
      expandedItems: [],
      modalComentario: false,
      comentario: '',
      urlServ: '',
      arrayComentarios: [],
      var_publi_comen: '',
      fallbackImage: '/usuarios.png',
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
      axios.post(`${environment.apiUrl}inicio`, {
        id_user: this.user.id
      })
      .then(response => {
        this.responseData = response.data.publicaciones.map(item => {
          return {
            ...item,
            isLiked: response.data.mis_likes.some(like => like.id_publicacion === item.id)
          };
        });
        this.urlServ = response.data.rutaImagen;
      })
      .catch(error => {
        console.error('Error:', error);
      });
    },
    handleRefresh(event) {
      this.loadData();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    },
    show_modal(id) {
      this.var_publi_comen = id;
      this.arrayComentarios = [];
      axios.post(`${environment.apiUrl}comentarios`, {
        id_publicacion: this.var_publi_comen
      })
      .then(response => {
        this.arrayComentarios = response.data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
      this.modalComentario = true;
    },
    comentar() {
      axios.post(`${environment.apiUrl}create/comentario`, {
        id_publicacion: this.var_publi_comen,
        id_user: this.user.id,
        comentario: this.comentario
      })
      .then(response => {
        this.show_modal(this.var_publi_comen);
        this.comentario = '';
      })
      .catch(error => {
        console.error('Error:', error);
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
    },
    onImageErrorPublicacion(event) {
      event.target.src = '/cargando.png';
    },
    toggleLike(index, itemId) {
      this.responseData[index].isLiked = !this.responseData[index].isLiked;
      const data = {
        isLiked: this.responseData[index].isLiked,
        id_publicacion: itemId,
        id_user: this.user.id,
      };
      axios.post(`${environment.apiUrl}like_publicacion`, data)
        .then(response => {
          this.responseData[index].likes = response.data.likes;
        })
        .catch(error => {
          console.error(error);
          this.responseData[index].isLiked = !this.responseData[index].isLiked;
        });
    },
  },
  ionViewWillEnter() {
    this.loadData();
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

ion-content {
  --background: #fff;
  font-family: "Roboto", sans-serif;
}

.view-more {
  color: #9c9c9c;
  cursor: pointer;
}

.content-publicacion {
  margin-bottom: 10px;
}

.descripcion-publicacion {
  padding: 10px;
}

.foto-perfil-user {
  padding: 10px;
  display: flex;
  align-items: center;
  color: #000;
}

.router-link-text {
  text-decoration: none;
  color: #000;
}

.foto-perfil-user img {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
}

.foto-publicacion, .foto-publicacion img {
  width: 100%;
}

.comentarios-publicacion {
  color: #9c9c9c;
}

.ion-margin-top {
  text-align: center;
  border-bottom: 1px solid #d7d8da;
  padding-bottom: 5px;
}

.footer-modal {
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 56px;
}

.form-comentario {
  display: flex;
  border-bottom: .5px solid #d7d8da;
  align-items: center;
}

.form-comentario img {
  width: 30px;
}

.btn-form-comen {
  cursor: pointer;
}

.like-publicacion {
  font-size: 25px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}



.like-publicacion span {
  font-size: 12px;
}

.like-active {
  color: red;
}

.like-inactive {
  color: grey;
}
</style>
