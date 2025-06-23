<template>
    <div class="contenedor">
      <div class="cc d-flex flex-column align-items-center">
        <h2 class="titulo">{{title}}</h2>
        <div class="imagenP" :style="{ 'background-image': `url(http://localhost:3000/${imagen})`}"></div>
        <p class="descripcion">{{description}}</p>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Servicios',
  props: {
    title: {type: String},
    imagen:{type: String},
    description:{type: String}
  },
  methods: {
    evento(){
      this.$emit('unClick',this.servi)
    }
  }
}
</script>

<style scoped lang="scss">
.contenedor{
  flex: 0 0 20vw;
  margin: 0 3.5vw 0 3.5vw;
}
.cc{
  width: 100%;
  background: linear-gradient(to top, rgba(245, 245, 245, 0.25), rgb(244, 212, 108));
  border: 5px outset rgb(172, 139, 32);
  transition: all .5s ease;
  padding: 1.3vw 0 0 0;
  margin-bottom: 5vh;
  box-shadow: 20px 18px 10px black;
  border-radius: 8px;
}
.cc:hover{
  transform: perspective(150px) rotateX(10deg) translateY(-10px) translateZ(-10px);
  box-shadow: 0 0 0 black;
  background: linear-gradient(to top, rgb(255, 236, 174), rgb(238, 200, 75));
  cursor: pointer;
}
.titulo{
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0.23vw 2.5vw;
  font-size: 1.3vw;
  text-align: center;
  text-wrap: balance;
  font-weight: bold;
  border-radius: 8px;
  color: rgba(211, 181, 85, 0.95);
  background-color: rgb(253, 239, 241);
}
.imagenP{
  width: 100%;
  height: 10vw;
  margin: 1.18vw 0;
  border-radius: 7px;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.cc:hover .imagenP::after{
  transform: translateY(0);
}
.imagenP::after{
  content: '';
  /*font-size: 1.3vw;
  color: white;
  font-weight: bold;*/
  background-image: url(~@/assets/consultorio/vistaserD.png);
  background-position: center;
  background-size: cover;
  
  background-color: rgba(0, 0, 0, 0.58);
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  transform: translateY(100%);
  transition: transform .3s;
}
.descripcion{
  width: 100%;
  box-sizing: border-box;
  text-wrap: balance;
  text-align: center;
  font-size: 0.97vw;
  padding: 0.23vw 2.5vw 0.95vw 2.5vw;
  margin: 0;
  color: black;
  background-color: rgb(243, 215, 125, 0.73);
  border-radius: 7px;
}
@media screen and (max-width: 800px) {
  .contenedor{
    flex: 0 0 25vw;
  }
  .cc{
    padding-top: 1.9vw;
  }
  .titulo{
    padding: 0.83vw 2.5vw;
    font-size: 1.9vw;
  }
  .imagenP{
    margin: 1.78vw 0;
  }
  .descripcion{
    font-size: 1.57vw;
    padding: 1.55vw 2.5vw;
  }
}
@media screen and (max-width: 550px) {
  .contenedor{
    flex: 0 0 30vw;
  }
  .cc{
    padding-top: 2.2vw;
  }
  .titulo{
    padding: 1.13vw 2.5vw;
    font-size: 2.2vw;
  }
  .imagenP{
    margin: 2vw 0;
  }
  .descripcion{
    font-size: 1.87vw;
    padding: 1.85vw 2.5vw;
  }
}
/*
Tecnologías y Equipos Utilizados:
Muestra la tecnología y equipos de vanguardia que utilizas en tu clínica para transmitir confianza en la calidad de tus servicios.

Procedimientos y Protocolos:
Explica los procedimientos específicos para cada servicio.
Información sobre los protocolos de seguridad y medidas de higiene implementadas en la clínica.

Testimonios y Reseñas:
Comentarios positivos de pacientes anteriores para generar confianza.
Incluye testimonios que se centren en la satisfacción del paciente, resultados exitosos y atención al cliente.
*/
</style>

