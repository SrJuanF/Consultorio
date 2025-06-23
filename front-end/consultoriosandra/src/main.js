import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { LMap, LTileLayer, LMarker } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import colors from 'vuetify/util/colors'
import store from './store/index.js'
import { VCalendar } from 'vuetify/labs/VCalendar'

const app = createApp(App);

app.use(router);
app.use(store);

app.component('l-map', LMap);
app.component('l-tile-layer', LTileLayer);
app.component('l-marker', LMarker);

/*Configuracion Vuitify */
app.use(createVuetify({
    components: {...components, VCalendar},
    theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              primary: colors.blueGrey.lighten2, //
              secondary: colors.blueGrey.darken2, //
            },
          },
        },
    },
})
);

app.mount('#app')
