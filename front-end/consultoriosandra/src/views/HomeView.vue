<template>
  <section style="font-family: serif; overflow-x: hidden;">
    <select name="lang" v-model="lang" class="selectIni">
      <option style="background-color: black" value="es">{{ translate("selectSp") }}</option>
      <option style="background-color: black" value="en">{{ translate("selectEn") }}</option>
    </select>
    <LogComp :topic="Topic" :lang="lang"/>
    <div v-if="Cloader" id="loader"></div>
    <div v-if="Cmessage" class="d-flex flex-column align-items-center messageC">
      <div class="messaCerrar" @click="Cmessage = false">✖️</div>
      <div style="width:100%; padding: 13px; background-color: whitesmoke; border-radius: 7px">
        <p style="margin:0; padding:0; font-size: 15px; text-align: center;">{{messageMM}}</p>
      </div>
    </div>
    <section style="overflow-x: hidden;">
      <div class="containerDate d-flex flex-column align-items-center" v-if="showSelectDate">
        <div style="box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3); padding-top: 1vh;" v-if="showDates">
            <v-date-picker color="primary" :min="Hoy" v-model="date" :allowed-dates="allowedDates" width="350px"></v-date-picker>
        </div>
        <div v-if="showDataU" class="times d-flex flex-column justify-content-around">
          <img src="../assets/intro/izquir.png" class="imgRegDate" @click="RegDates()">
          <h3 class="selectHourTitle">{{translate('selectData')}}</h3>
          <div class="d-flex flex-column align-items-center" style="width:100%; margin-bottom:20px">
            <label for="name" class="lblData">{{translate('inteName')}}</label>
            <input type="text" id="name" name="name" v-model="dataU.name" class="inputData">
            <label for="name" class="lblData">{{translate('inteEmail')}}</label>
            <input type="text" id="name" name="name" v-model="dataU.email" class="inputData">
            <label for="detalles" class="lblData">{{translate('inteProps')}}</label>
            <textarea id="detalles" name="detalles" rows="2" :placeholder="translate('wrHere')" v-model="dataU.messa" class="inputData"></textarea>
          </div>
        </div>
        <div v-if="showTimes" class="times d-flex flex-column justify-content-around">
          <img src="../assets/intro/izquir.png" class="imgRegDate" @click="RegDates()">
          <h3 class="selectHourTitle">{{translate('selecHour')}}</h3>
          <div  class="conteinerChips">
            <v-chip-group v-model="selectedHour" mandatory selected-class="text-primary" class="chipGrup">
              <v-chip v-for="hour in hours" :key="hour" :value="hour" class="chips"> {{ hour }} </v-chip>
            </v-chip-group>
          </div>
          <div style="padding: 0px 2vw; width:100%; box-sizing:border-box;" class="d-flex justify-content-center">
              <div>
                <v-radio-group inline v-model="selectRadioCite">
                  <v-radio :label="translate('ModeCiteOnline')" value="online" class="btnRadioDate"></v-radio>
                  <v-radio :label="translate('ModeCitePresent')" value="presencial" class="btnRadioDate"></v-radio>
                </v-radio-group>
              </div>
          </div>                
        </div>
        
        <div style="padding: 2vh 0 1vh 0;"><v-btn class="ma-2" color="primary" @click="selecTime()">  {{translate('btnAcept')}} <v-icon end icon="mdi-checkbox-marked-circle" ></v-icon></v-btn>
        </div>
      </div>

      <header class="bloque1 d-flex align-items-center">
        <div class="vissP">
          <div class="bloque1b d-flex align-items-center justify-content-around">
            
            <div class="d-flex align-items-center justify-content-around col-12 content-header">
              <div class="col-1 d-flex justify-content-center align-items-center espaciDate">
                <div class="d-flex justify-content-center align-items-center StartDate">
                  <img src="../assets/consultorio/datec2.png" alt="dateCita" class="dateCita" @click="showSelectDate = !showSelectDate">
                </div>
              </div>
              <nav class="col-9" style="padding:0 3vw">
                <ul style=" list-style: none; margin:0; padding:0" 
                class="d-flex align-items-center justify-content-between">
                  <li @click="Ccontact = true"><b><a href="#">{{translate("EncabContact")}}</a></b></li>
                  <li><b><a href="#">{{translate("EncabAboutUs")}}</a></b></li>
                  <li><b><a href="#">{{translate("EncabHome")}}</a></b></li>
                </ul>
              </nav>
              <div class="col-2 d-flex justify-content-center align-items-center espaciLogo">
                <div class="ilus d-flex justify-content-center align-items-center"><img src="../assets/logoIco.png" alt="Logo" class="logoWeb" /></div>
              </div>
            </div>
            
          </div>
        </div>
        
      </header>

      <div class="carousel">
        <div class="slides">
            <div v-for="(image, index) in images" :key="index">
              <img :src="getImgUrlPNGUpd(image.src)" :alt="image.alt" class="imgInic" :style="{ transform: `translateX(${-100 * currentIndex}%)`,
              transition: `transform ${timeTranstion}s ease`}">
            </div>
        </div>
        <div class="indicators">
          <div v-for="image in images" :key="image" :class="{ active: image.id == currentIndex }" @click="currentIndex = image.id"></div>
        </div>
      </div>

      <section class="bloque2 d-flex flex-column align-items-center">
        <div class="vissP">
          <div class="cuadro">
            <img src="../assets/consultorio/izq.png" class="deslice" style="left:1.18vw;" @click="RecorreEspec = MoveIZQ(RecorreEspec)">
            <img src="../assets/consultorio/der.png" class="deslice" style="right:1.18vw;" @click="RecorreEspec = MoveDER(RecorreEspec)">
            <div class="espectas">
              <EspecialistaCom v-for="(especialista, index) in especialistas" :key="index" :especild="translateListObject('especialists', especialista.id)"
              :imagen="getImgUrlPNGConsultorio(especialista.image)" :style="{ transform: `translateX(${RecorreEspec}%)`,transition: 'transform 1s ease'}"/>
            </div>
          </div> 
          <div class="quote">
            <span class="quotation-mark">“</span>
            {{translate("slogan")}}
            <span class="quotation-mark">”</span>
          </div>
          <div class="cuadro" style="padding: 10vh 5vw 7vh 5vw;">
            <h2 class="sectionTitulo">{{translate("titlePost")}}</h2>
            <img src="../assets/consultorio/izq.png" class="deslice" style="left:1.18vw;transform: translateY(-50%);" @click="RecorrePost = MoveIZQ(RecorrePost)">
            <img src="../assets/consultorio/der.png" class="deslice" style="right:1.18vw;transform: translateY(-50%);" @click="RecorrePost = MoveDER(RecorrePost)">
            <div class="espectas">
              <PostsCom v-for="(post, index) in Posts" :key="index" @click="MostrarDataPS(post)"
              :see="translate('seePost')" :imagen="post.presentation" :title="post.title"
              :style="{ transform: `translateX(${RecorrePost}%)`,transition: 'transform 1s ease'}"/>
              <!--:see="translate('seePost')" @unClick="MostrarPost"-->
            </div>
          </div> 
          <div class="cuadro" style="padding: 8vh 5vw 5vh 5vw;">
            <h2 class="sectionTitulo">{{translate("titleServ")}}</h2>
            <img src="../assets/consultorio/izq.png" class="deslice" style="left:1.18vw;transform: translateY(-50%);" @click="RecorreServ = MoveIZQ(RecorreServ)">
            <img src="../assets/consultorio/der.png" class="deslice" style="right:1.18vw;transform: translateY(-50%);" @click="RecorreServ = MoveDER(RecorreServ)">
            <div class="espectas">
              <ServicioCom v-for="(servicio, index) in Servicios" :key="index" @click="MostrarDataPS(servicio)"
              :imagen="servicio.presentation" :title="servicio.title" :description="servicio.description"
              :style="{ transform: `translateX(${RecorreServ}%)`,transition: 'transform 1s ease'}"/>
            </div>
          </div>

          <div class="mapa">
            <Map/>
          </div>
          <div class="d-flex justify-content-center" style="padding:0 0 7vh 0;">
            <button class="boton-agenda" @click="showSelectDate = true">{{translate('BtnCita')}}</button>
          </div>

        </div>
      </section>

      <footer class="footer d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="../assets/logo.png" alt="logoFooter" class="footerImg">
          <div class="d-flex flex-column justify-content-center align-items-center" style="height:8vh;">
            <p class="dataFoter">Email: Sandra</p>
            <p class="dataFoter">{{translate('inteCel')}} (+57) 302 869 8103</p>
          </div>
          <p class="dataFoter">{{translate('Address')}}</p>
        </div>
        <div class="dataFoter PoltData">{{translate('DataPersonal')}}</div>
        <div class="redesSocial">
          <a href="https://www.instagram.com/odontologasandrabermudez/" target="_blank"><img class="instagram" src="../assets/instagram.png"></a>
        </div>
      </footer>

      <div class="Generalfondo d-flex justify-content-center align-items-center" v-if="Ccontact" style="z-index:9">
        <div class="contacto-container d-flex flex-column align-items-center">
          <div class="contacto-header d-flex justify-content-center">
            <h1 class="contacto-header-title">{{translate('tContact')}}</h1>
            <div class="contacto-header-button" @click="Ccontact = false">✖️</div>
          </div>
          <div class="contacto-contentt d-flex flex-column align-items-center">
            <div class="formIPContac">
                <label for="name">{{translate('inteName')}}</label>
                <input type="text" id="name" name="name" v-model="OContact.name">
            </div>
            <div class="formIPContac">
                <label for="correoElec">{{translate('inteEmail')}}</label>
                <input type="text" id="correoElec" name="correoElec" v-model="OContact.email">
            </div>
            <div class="formIPContac">
                <label for="numContact">{{translate('inteCel')}}</label>
                <input type="text" id="numContact" name="numContact" v-model="OContact.tel">
            </div>
            <div class="formIPContac">
                <label for="mensaje">{{translate('inteMessa')}}</label>
                <textarea id="mensaje" name="mensaje" rows="3" :placeholder="translate('wrHere')" v-model="OContact.messa"></textarea>
            </div>
            <button class="btnOKContac" @click="validarFormularioContacto()">OK</button> 
          </div>
        </div>
      </div>
      <div class="Generalfondo d-flex justify-content-center align-items-center" v-if="CdataPS">
        <div class="Publicaciones d-flex flex-column align-items-center">
          <div class="btnFormClose" @click="CdataPS = false">✖️</div>
          <h1 class="titlePS">{{ContenDataPS.title}}</h1>
          <div v-for="(data, item) in ContenDataPS.content" :key="item" class="d-flex justify-content-center" style="width:100%">
            <p v-if="data.tipo === 'textarea'" class="parrafoPS">{{data.value}}</p>
            <div v-else-if="data.tipo === 'h2'" style="width:90%" class="d-flex justify-content-start">
              <h2 class="subtitlePS">{{data.value}}</h2>
            </div>
            <div v-else-if="data.tipo === 'li'" style="width:80%" class="d-flex justify-content-start">
              <ul class="guionPS">
                <li v-for="(guion, item) in data.value" :key="item">{{guion}}</li>
              </ul>
            </div>
            <img v-else-if="data.tipo === 'image'" :src="`http://localhost:3000/${data.value}`" :class="`imgPS ${data.valuef}${data.valuet}`">
          </div>
          
        </div>
      </div>
    </section>
  </section>
</template>

<script src="./scripts/Home.js"></script>

<style scoped src="./estilos/principal.css"></style>
<style scoped src="./estilos/movil/movilPP.css"></style>
