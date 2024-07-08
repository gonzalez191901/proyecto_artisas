import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginPage from '../views/login/loginPage.vue';
import TabsPage from '../views/TabsPage.vue';
import Tab1Page from '../views/tabs/Tab1Page.vue';
import Tab2Page from '../views/tabs/Tab2Page.vue';
import Tab3Page from '../views/tabs/Tab3Page.vue';
import MenuPage from '../views/MenuPage.vue';
import CreateUserPage from '../views/user/CreateNewPage.vue';
import Perfil from '../views/user/PerfilPage.vue';
import PerfilUpdate from '../views/user/PerfilUpdate.vue';
import Tab4Page from '../views/tabs/SearchPage.vue';



const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginPage,
    meta: {
      showMenu: false
    },
    beforeEnter: async (to, from, next) => {
      let res = await sesionActiva();
      if (res) {
        next('/tabs/tab1');
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    component: CreateUserPage,
    meta: {
      showMenu: false
    },
  },
  {
    path: '/user/',
    component: TabsPage,
    children: [
      {
        path: ':username',
        component: Perfil,
      }]
  },
  {
    path: '/perfil/',
    component: TabsPage,
    children: [
      {
        path: 'update',
        component: PerfilUpdate,
      }]
  },
    {
    path: '/menu',
    component: MenuPage,
    beforeEnter: async (to, from, next) => {
      let res = await sesionActiva();
      if (res) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: Tab1Page,
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva();
          if (res) {
            next();
          } else {
            next('/');
          }
        }
      },
      {
        path: 'tab2',
        component: Tab2Page,
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva();
          if (res) {
            next();
          } else {
            next('/');
          }
        }
      },
      {
        path: 'tab3',
        component: Tab3Page,
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva();
          if (res) {
            next();
          } else {
            next('/');
          }
        }
      },
      {
        path: 'tab4',
        component: Tab4Page,
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva();
          if (res) {
            next();
          } else {
            next('/');
          }
        }
      },
    ]
  }
];

async function sesionActiva() {
  try {
    let user = await window.localStorage.getItem('user');
    return user !== null && user !== '';
  } catch (error) {
    console.error('Error checking session:', error);
    return false;
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
