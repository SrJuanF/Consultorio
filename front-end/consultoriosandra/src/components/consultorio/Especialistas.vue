<template>
  <div class="contenedor">
    <div class="cuadroInt">
      <h2 class="titulo">{{especild.nombre}}</h2>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="encabezado vocaco" style="margin-top: 4px">
          <span class="quotation-mark">“</span>
          {{especild.especialidad}}
          <span class="quotation-mark">”</span>
        </div>
        <p class="encabezado exp">{{especild.experiencia}}</p>
      </div>
      <div class="d-flex justify-content-center"><img :src="imagen" class="imagen"/></div>
      <p class="descripcion">{{especild.descripcion}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Especialistas',
  props: {
    especild: {type:Object},
    imagen: {type: String}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contenedor{
  flex: 0 0 21vw;
  padding: 3vw;
  margin: 10px 3.5vw;
  background-image: url(~@/assets/consultorio/kn.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  /*
  border: 5px ridge rgb(137, 109, 17);
  box-shadow: 0 0 11px rgb(210, 210, 0);
  animation-name: brillo;
  animation-duration: 5.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate; */
}

.cuadroInt{
  background-color: white; 
  width: 100%; 
  height: 100%; 
  padding: 1vw;
  border: 3px double rgb(175, 142, 32);
  border-radius: 8px; 
  box-sizing: border-box; 
  animation-name: brillo;
  animation-duration: 5.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes brillo {
  0%{box-shadow: 0 0 0 0 rgb(255, 217, 90);}
  28%{box-shadow: 0 0 10px 7px rgb(255, 217, 90);}
  50%{box-shadow: 0 0 5px 3px rgb(255, 217, 90);}
  78%{box-shadow: 0 0 13px 9px rgb(255, 217, 90);}
  100%{box-shadow: 0 0 3px 1px rgb(255, 217, 90);}
}

.titulo{
  margin: 0;
  padding: 0;
  font-size: 1.3vw;
  text-align: center;
  text-wrap: balance;
  font-weight: bold;
  border-radius: 8px;
  color: rgb(154, 122, 15);
  text-decoration: underline;
}
.imagen{
  width: 10vw;
  height: 10vw;
  margin: 16px 0px;
  border-radius: 7px;
}
.encabezado{
  padding: 0;
  margin: 0;
  font-weight: bold;
  text-wrap: balance;
  text-align: center;
}
.vocaco{
  font-size: 1.1vw;
  color: rgb(127, 127, 127);
}
.exp{
  font-size: 1vw;
  color: rgb(150, 150, 150);
}
.quotation-mark{
  display: inline-block; /* Para que las comillas ocupen su propio espacio en línea */
  color: rgb(164, 132, 27);
  font-weight: bold;
}
.descripcion{
  text-wrap: balance;
  text-align: center;
  font-size: 0.97vw;
  padding: 0;
  margin: 0;
  color: rgb(150, 150, 150);
}

@media screen and (max-width: 800px) {
  .contenedor{
    flex: 0 0 26vw;
  }
  @keyframes brillo {
  0%{box-shadow: 0 0 0 0 rgb(255, 255, 40);}
  28%{box-shadow: 0 0 7px 4px rgb(255, 255, 40);}
  50%{box-shadow: 0 0 3px 1px rgb(255, 255, 40);}
  78%{box-shadow: 0 0 9px 6px rgb(255, 255, 40);}
  100%{box-shadow: 0 0 3px 1px rgb(255, 255, 40);}
  }
  .titulo{
    font-size: 2vw;
  }
  .vocaco{
    font-size: 1.7vw;
  }
  .exp{
    font-size: 1.6vw;
  }
  .imagen{
    margin: 10px 0px;
  }
  .descripcion{
    font-size: 1.58vw;
  }

}
@media screen and (max-width: 600px) {
  .contenedor{
    flex: 0 0 31vw;
    padding: 3.7vw;
  }
  .cuadroInt{
    padding: 1.8vw;
  }
  @keyframes brillo {
  0%{box-shadow: 0 0 0 0 rgb(255, 255, 40);}
  28%{box-shadow: 0 0 6px 3px rgb(255, 255, 40);}
  50%{box-shadow: 0 0 2px 1px rgb(255, 255, 40);}
  78%{box-shadow: 0 0 7px 5px rgb(255, 255, 40);}
  100%{box-shadow: 0 0 2px 1px rgb(255, 255, 40);}
  }
}
</style>
