<template>
  <l-map :center="mapCenter" :zoom="mapZoom">
    <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
    <l-marker :lat-lng="markerPosition"></l-marker>
  </l-map>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const mapCenter = ref([6.2442, -75.5812]); // Coordenadas de Medellín
    const mapZoom = ref(15);
    const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const markerPosition = ref([6.2442, -75.5812]); // Coordenadas de Medellín

    return {
      mapCenter,
      mapZoom,
      tileLayerUrl,
      markerPosition,
    };
  },
};
</script>