import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'proyecto_artistas',
  webDir: 'dist',
  server: {
    androidScheme: 'https', // Cambia de 'https' a 'http' para permitir solicitudes no seguras
    cleartext: true, // Permite conexiones no seguras
  },
  android: {
    allowMixedContent: true, // Permite contenido mixto (HTTP en un entorno HTTPS)
  },
};

export default config;