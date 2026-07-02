import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vampire.charactercreator',
  appName: 'Vampire V5 Character Creator',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    // To enable Live Reload:
    // 1. Find your local IP address
    // 2. Uncomment the line below and replace with your IP
    // url: 'http://192.168.x.x:3000',
  }
};

export default config;
