
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { IonicVue } from '@ionic/vue';
import ionicNative from './plugins/ionic-native';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './theme/variables.css';

const app = createApp(App).use(IonicVue).use(router);

// Configuración global de la instancia de Storage
async function initializeStorage() {
  try {
    if (await window.localStorage.getItem('user') === null) {
      await window.localStorage.setItem('user', ''); // Inicializar el usuario como vacío si no existe
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

router.isReady().then(async () => {
  await initializeStorage();
  app.mount('#app');
});