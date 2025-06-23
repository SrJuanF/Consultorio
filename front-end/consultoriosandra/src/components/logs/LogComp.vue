<template>
<section>
        <div class="entorno" :class="{ entered: seeComm }">
            <div style="min-height: 100vh; padding: 20px 20px;" class="d-flex justify-content-center align-items-center">
                <Log v-if="!dateTkn" :lang="lang"/>
                <Logged :tokn="token" :topic="topic" v-if="dateTkn"/>
            </div>
        </div>

        <div class="seeMore d-flex justify-content-center align-items-center" :class="{ enteredBtn: seeComm }">
            <img src="@/assets/carmen/F2.png" @click="seeComm = !seeComm" :class="{ flipped: seeComm }" class="imagEnter"/>
        </div>
</section>
</template>

<script>
import {mapState} from 'vuex'
import Log from './Log.vue'
import Logged from './Logged.vue'
export default {
    name: 'Logueded',
    props: {topic: {type:String}, lang:{type:String}},
    components: {Log, Logged},
    data(){
        return{
            seeComm: false,
            Cloader: false,
        }
    },
    computed:{
        ...mapState(['token']),
        dateTkn(){
            if(this.token === null || this.token === ''){ return false; }else{ return true }
        },
    },
    methods:{
    },
    created(){}
}
</script>

<style scoped>
.entorno{
    width: 30vw; 
    height: 100vh;
    min-width: 400px;
    padding: 0 1vw; 
    box-sizing: border-box;
    overflow-y:auto;
    position: fixed;
    z-index: 8;
    top: 0;
    right: -30vw;
    background-color: rgba(0, 0, 0, 0.422);
    transition: all 1s ease;
    border-left: 4px double rgba(214, 174, 41, 0.69);
    box-shadow: 0px 5px 10px rgb(212, 175, 55);
}
.seeMore {
    position: fixed;
    top: 50vh;
    right: 1vw;
    z-index: 8;
    transform: translateY(-50%);
    border-radius: 50%;
    border: 3px solid rgb(212, 175, 55);
    /*padding: 3px;*/
    /*background-color: rgba(255, 213, 219, 0.5);*/
    cursor: pointer;
    transition: all 1s ease;
}
.seeMore:hover{
    box-shadow: 0 0 7px rgb(219, 189, 89);
}
.imagEnter{
    width: 38px;
    height: 38px;
    transition: all 0.5s ease;
    filter: drop-shadow(0 0 13px rgb(219, 189, 89));
}
.flipped {
  transform: scaleX(-1);
}
.entered{
    transform: translateX(-30vw);
}
.enteredBtn{
    transform: translateX(-28vw);
}
/* Estilos para la barra de desplazamiento */
::-webkit-scrollbar {
    width: 10px;
    /* Ancho de la barra de desplazamiento */
}

/* Botón de desplazamiento (arriba y abajo) */
::-webkit-scrollbar-button {
    display: none;
    /* Ocultar botones de desplazamiento */
}

/* Track del scroll */
::-webkit-scrollbar-track {
    background: transparent;
    /* Color de fondo del track */
}

/* Handle del scroll */
::-webkit-scrollbar-thumb {
    background: #555;
    /* Color del handle */
    border-radius: 10px;
    /* Bordes redondeados */
}

/* Handle del scroll en hover */
::-webkit-scrollbar-thumb:hover {
    background: white;
    /* Color del handle al pasar el mouse */
}
@media screen and (max-width: 1200px) {
    .entorno{
        width: 400px;
        right: -400px;
    }
    .entered{
        transform: translateX(-400px);
    }
    .enteredBtn{
        transform: translateX(-375px);
    }
}

</style>