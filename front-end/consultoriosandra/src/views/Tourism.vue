<template>
    <section style="font-family: serif; overflow-x: hidden;">
        <select name="lang" v-model="lang" class="selectIni">
            <option style="background-color: black" value="es">{{ translate("selectSp") }}</option>
            <option style="background-color: black" value="en">{{ translate("selectEn") }}</option>
        </select>

        <header class="bloque1 d-flex align-items-center">
            <div class="bloque1b d-flex align-items-center">
                <div style="height: 6vh;background-color: rgb(69, 245, 174, 0.6);" class="d-flex align-items-center justify-content-center col-12">
                  <div class="ilus d-flex justify-content-center align-items-center">
                    <img src="../assets/logoIco.png" alt="Logo" class="logoWeb"/>
                  </div>
                </div>
                <img src="../assets/carmen/CONTACTOS.png" class="ContactoIMG" alt="contacto">
            </div>
        </header>
        <div class="carousel">
            <div class="slides">
                <div v-for="image in images" :key="image">
                    <img :src="getImgUrlPNGUpd(image.src)" :alt="image.alt" class="imgInic" :style="{ transform: `translateX(${-100 * currentIndex}%)`,
                    transition: `transform ${timeTranstion}s ease`}">
                </div>
            </div>
            <div class="indicators">
                <div v-for="image in images" :key="image" :class="{ active: image.id == currentIndex }" @click="currentIndex = image.id"></div>
            </div>
        </div>
        <section class="bloque2 d-flex flex-column align-items-center">
            <!--
            <div class="collage">
              <img v-for="(turis, index) in turismo" :key="index" :class="turis.size" :src="getImgUrlPNGUpd(turis.src)" class="collageIMG"/>
            </div>
            -->
          <div class="quote">
            <span class="quotation-mark">“</span>
            Frase que Identifique a la Empresa.
            <span class="quotation-mark">”</span>
          </div>
          <div class="cuadro" style="padding: 10vh 5vw 7vh 5vw;">
            <h2 class="sectionTitulo">Posts</h2>
            <img src="../assets/consultorio/izq.png" class="deslice" style="left:1.18vw;transform: translateY(-50%);" @click="RecorrePost = MoveIZQ(RecorrePost)">
            <img src="../assets/consultorio/der.png" class="deslice" style="right:1.18vw;transform: translateY(-50%);" @click="RecorrePost = MoveDER(RecorrePost)">
            <div class="espectas">
              <PostsCom :see="translate('seePost')" @unClick="MostrarPost"/>
            </div>
          </div> 
          <div class="cuadro" style="padding: 7vh 5vw 7vh 5vw;">
            <h2 class="sectionTitulo">Tours</h2>
            <img src="../assets/consultorio/izq.png" class="deslice" style="left:1.18vw;transform: translateY(-50%);" @click="RecorreTour = MoveIZQ(RecorreTour)">
            <img src="../assets/consultorio/der.png" class="deslice" style="right:1.18vw;transform: translateY(-50%);" @click="RecorreTour = MoveDER(RecorreTour)">
            <div class="espectas">
              <ToursCom @unClick="MostrarTour" />
            </div>
          </div> 
          <div class="mapa">
            <Map/>
          </div>
          <div class="d-flex justify-content-center" style="padding:0 0 7vh 0;">
            <button class="boton-agenda">{{translate('BtnCita')}}</button>
          </div>
          <footer class="footer d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img src="../assets/logo.png" alt="logoFooter" class="footerImg">
              <div class="d-flex flex-column justify-content-around align-items-center" style="height:8vh;">
                <p class="dataFoter">Correo Electronico</p>
                <p class="dataFoter">(+57) 302 869 8103</p>
              </div>
              <p class="dataFoter">{{translate('Address')}}</p>
            </div>
            <div class="dataFoter PoltData">{{translate('DataPersonal')}}</div>
            <div class="redesSocial">
              <a href=""><img class="instagram" src="../assets/instagram.png"></a>
            </div>
          </footer>

        </section>

    </section>
</template>

<script>
import en from "./lenguages/English.js";
import es from "./lenguages/Español.js";
import PostsCom from '@/components/turismo/Posts.vue';
import ToursCom from '@/components/turismo/Tours.vue';
import Map from '@/components/turismo/Mapa.vue';

export default {
  mixins: [en, es],
  name: "Carmen",
  components: {PostsCom, ToursCom, Map},
  data() {
    return{
        lang: "es",
        //Web
        images: [{ id: 0, src: "consultorio", alt: "Campaña 1"},
        { id: 1, src: "comunidad", alt: "Campaña 2"},
        { id: 2, src: "turismo", alt: "Campaña 3"},
        { id: 3, src: "imagenPP", alt: "Campaña 4"}],
        currentIndex: 0,
        timeTranstion: 2,
        turismo: [{ src: 'imagenPP', size: 'large' },
        { src: 'imagenPP', size: 'medium' },
        { src: 'imagenPP', size: 'small' },
        { src: 'imagenPP', size: 'large' },
        { src: 'imagenPP', size: 'medium' },
        { src: 'imagenPP', size: 'small' },
        { src: 'imagenPP', size: 'large' },
        { src: 'imagenPP', size: 'medium' },
        { src: 'imagenPP', size: 'small' },
        { src: 'imagenPP', size: 'large' },],
        RecorrePost: 0,
        upPost: true,
    }
  },
  methods: {
    translate(prop) {
      return this[this.lang][prop];
    },
    getImgUrlPNGUpd(pet){
      var images = require.context("../assets/intro/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    getImgUrlPNGCarmen(pet){
      var images = require.context("../assets/carmen/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    updtCampan(){
      setInterval(()=>{
        if(this.currentIndex == 3){
          this.currentIndex = 0;
          this.timeTranstion = 0;
        }
        else{
          this.currentIndex += 1;
          this.timeTranstion = 2;
        }
      }, 8000);
    },
    updtPost(){
      setInterval(()=>{
        (this.RecorrePost <= -400) ? this.upPost = false : (this.RecorrePost >= 0) ? this.upPost = true : this.upPost = this.upPost;
        (this.upPost) ? this.RecorrePost -= 100 : this.RecorrePost += 100;
      }, 5000);
    },
    MoveIZQ(recorre){
      (recorre < 0) ? recorre += 100 : recorre = recorre;
      return recorre;
    },
    MoveDER(recorre){
      (recorre > -400) ? recorre -= 100 : recorre = recorre;
      return recorre;
    },
    MostrarTour(tour){

    }
  },
  mounted() {

  },
  created() {
    this.updtCampan();
    //this.updtPost();
  },
}
</script>

<style scoped src="./estilos/carmen.css"></style>
<style scoped src="./estilos/movil/movilCarmen.css"></style>