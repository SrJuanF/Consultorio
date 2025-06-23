/*
    <!--
      <transition name="introduccion">
      <section v-if="introduction">
      <img v-bind:src="imagenFuente" class="imgIntro" alt="imgIntro" />
      <div class="intro">
        <div class="Presentacion"><img src="../assets/logo.png" alt="logoPresentacion" class="imgPresentacion"/></div>
        <div class="d-flex col-12 justify-content-center align-items-center" style="height: 65vh">
          <div class="tema col-6">
            <button @click="prepInfo('consultorio','consultorio','introDescConsult')" v-on:mouseover="getImgUrlPNGIPP('consultorio')"
              v-on:mouseout="getImgUrlPNGIPP(imagenFuenteOut)" class="enla" :class="{temaClickeado: temaClicked === 'consultorio'}"
              style="background-color: rgb(1, 163, 192);" id="introBtnConsl">🦷 {{ translate("introConsult") }}
            </button>
            <button @click="prepInfo('comunidad', 'comunidad','introDescCommunt')" v-on:mouseover="getImgUrlPNGIPP('comunidad')"
              v-on:mouseout="getImgUrlPNGIPP(imagenFuenteOut)" class="enla" :class="{temaClickeado: temaClicked === 'comunidad'}"
              style="background-color: rgb(0, 85, 197);" id="introBtnCommn">👥 {{ translate("introCommunt") }}
            </button>
            <button @click="prepInfo('turismo', 'turismo','introDescEvents')" v-on:mouseover="getImgUrlPNGIPP('turismo')"
              v-on:mouseout="getImgUrlPNGIPP(imagenFuenteOut)" class="enla" :class="{temaClickeado: temaClicked === 'turismo'}"
              style="background-color: rgb(1, 194, 117);" id="introBtnEvent">🌄 {{ translate("introEvents") }}
            </button>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center" style="padding: 4vh; box-sizing: border-box">
            <transition name="descripcTemaTrans">
              <div class="d-flex flex-column justify-content-around descripcionTema" v-if="VerDescTema">
                <img src="../assets/intro/izquierda.png" width="30px" height="30px" style="cursor:pointer" @click="OutprepInfo()">
                <div style="height: 65%; width:100%" class="d-flex align-items-center">
                  <p class="introDescTema">{{translate(infoTema)}}</p>
                </div>
                <div class="d-flex justify-content-end"><button class="btnGo">{{ translate("enlaIntro") }}</button></div>
              </div>
            </transition>
          </div>
        </div>

        <div class="seeMore">
          <img src="../assets/intro/arriba.png" alt="iconAbajo" width="30px" height="30px" @click="SeeMoreEnla()"/>
          <p style="margin: 0">{{ translate("seeMore") }}</p>
        </div>
      </div>
    </section>
    </transition>
    -->

    //Intro
      introduction: false,
      imagenFuente: "",
      imagenFuenteOut: "imagenPP",
      VerDescTema: false,
      temaClicked: '',
      infoTema: '',


          //Intro
        getImgUrlPNGIPP(pet) {
      var images = require.context("@/assets/intro/", false, /\.png$/);
      this.imagenFuente = images("./" + pet + ".png");
    },
    prepInfo(imagen, btnClicke, introtem){
      document.body.style.overflow = 'hidden';
      this.VerDescTema = true;
      this.imagenFuenteOut = imagen;
      this.temaClicked = btnClicke;
      this.infoTema = introtem;
    },
    OutprepInfo(){
      this.VerDescTema = false;
      this.imagenFuenteOut = 'imagenPP';
      this.getImgUrlPNGIPP("imagenPP");
      this.temaClicked = '';
    },
    SeeMoreEnla(){
      this.introduction = false;
      document.body.style.overflow = 'auto';
    },
    mounted() {
    //document.body.style.overflow = 'hidden';
    this.getImgUrlPNGIPP("imagenPP");
  }

    /*Intro

.introduccion-leave-active {
  transition: all 1s ease;
}

.introduccion-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}

.intro {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 5vh;
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.911));
  z-index: 14;
  position: relative;
  display: flex;
  flex-direction: column;
}

.imgIntro {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 13;
}

.seeMore {
  width: 100%;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 5vh;
  left: 0;
  cursor: pointer;
  color: white;
  z-index: 15;
}

.Presentacion {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
}

.imgPresentacion {
  width: 20vw;
  height: 20vh;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 white;
}

.tema {
  padding: 4vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
}

.enla {
  width: 28vw;
  font-size: 1.6vw;
  margin: 0;
  padding: 4px;
  border-width: 2px;
  border-style: inset;
  border-color: cyan;
  border-radius: 8px;
  font-weight: bold;
  color: white;
}

.temaClickeado {
  box-shadow: 0 0 10px 0 white;
  color: rgb(218, 218, 218);
}

.enla:hover {
  box-shadow: 0 0 10px 0 white;
  color: rgb(218, 218, 218);
}

.descripcionTema {
  background-color: rgba(0, 0, 0, 0.53);
  box-shadow: 0 0 10px 0 white;
  width: 32.5vw;
  height: 50vh;
  border-radius: 8px;
  padding: 1.5vh;
  box-sizing: border-box;
}

.introDescTema {
  width: 100%;
  margin: 0;
  padding: 1vh;
  box-sizing: border-box;
  text-align: center;
  text-wrap: balance;
  color: white;
  font-size: 23px;
}

.descripcTemaTrans-enter-active,
.descripcTemaTrans-leave-active {
  transition: all 0.5s ease;
}

.descripcTemaTrans-enter-from,
.descripcTemaTrans-leave-to {
  opacity: 0;
  transform: translateX(90%);
}

.btnGo {
  font-size: 18px;
  width: 80px;
  margin-right: 22px;
  padding: 4px;
  border-radius: 8px;
  background-color: blueviolet;
  font-weight: bold;
  border-color: white;
}

.btnGo:hover {
  background-color: rgb(99, 13, 179);
  color: white;
}

INGLES
seeMore: "SEE MORE",
introConsult: "Consultation",
introCommunt: "Community",
introEvents: "Carmen Tourist Attractions",
enlaIntro: "Go",
introDescConsult: "Access different dental services with the best specialists in Pediatric Dentistry, Smile Design, Endodontics, General Dentistry and more here.",
introDescCommunt: "Visit our social website where we share experiences, recommendations or opinions... about our services, the dental sector of El Carmen and its tourist attractions.",
introDescEvents: "Discover the magic of El Carmen de Viboral through our tourism website. Here you will find different tours about the main attractions and events that make El Carmen a unique place.",
ESPAÑOL    
seeMore: "VER MÁS",
introConsult: "Consultorio",
introCommunt: "Comunidad",
introEvents: "Atracciones Turísticas del Carmen",
enlaIntro: "Ir",
introDescConsult: "Acceda a diferentes servicios odontológicos con los mejores especialistas en Odontopediatría, Diseño de sonrisa, Endodoncia, Odontología general y más aquí.",
introDescCommunt: "Visite nuestro sitio web social donde compartimos experiencias, recomendaciones u opiniones... sobre nuestros servicios, el sector odontológico de El Carmen y sus atracciones turísticas.",
introDescEvents: "Descubra la magia de El Carmen de Viboral por medio de nuestro sitio web de turismo. Aquí encontraras diferentes tours sobre las principales atracciones y eventos que hacen de El Carmen un lugar único.",
                      
*/