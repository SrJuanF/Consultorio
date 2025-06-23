<template>
    <div class="contenedor" @click="evento()">
      <div class="cc d-flex flex-column align-items-center justify-content-center">
        <div class="iniPost">Titulo Tour</div>
        <p class="descripcion">Intro Tour</p>
        <img src="~@/assets/carmen/tu2.png"/>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Tours',
  props: {
    tour: {type: Object},
    imagen:{type: String},
  },
  methods: {
    evento(){
      this.$emit('unClick',this.tour)
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
  height: 50vh;
  border: 5px outset rgb(1, 194, 117);
  transition: all .4s ease;
  margin-bottom: 5vh;
  box-shadow: 20px 18px 10px black;
  border-radius: 8px;
  background-image: url(~@/assets/intro/imagenPP.png);
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.cc:hover{
  transform: perspective(150px) rotateX(10deg) translateY(-10px) translateZ(-10px);
  box-shadow: 0 0 0 black;
  cursor: pointer;
}
.cc::before{
  content: '';
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 50%, rgba(0,0,0) 100%);
  opacity: 0;
  transition: all .4s ease;
}
.cc:hover::before{
  opacity: 1;
}
.cc img:last-child{
  width: 18vw;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  transition: all .3s ease;
  transform: translateY(50%);
  opacity: 0;
}
.cc:hover img:last-child{
    opacity: 1;
    transform: translateY(-20%);
}
.iniPost{
    width: 100%;
    margin: 0;
    border-top: 13px solid rgb(17, 215, 136);
    border-bottom: 13px solid rgb(17, 215, 136);
    background-color: white;
    font-size: 1.5vw;
    font-weight: bold;
    text-align: center;
    text-wrap: balance;
    color: black;
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
  background-color: white;
  border-radius: 7px;
}
@media screen and (max-width: 900px){
  .contenedor{
    flex: 0 0 25vw;
  }
  .cc{
    height: 33vh;
  }
  .iniPost{
    font-size: 2vw;
  }
  .descripcion{
    font-size: 1.57vw;
    padding: 1.55vw 2.5vw;
  }
}
@media screen and (max-width: 550px){
  .contenedor{
    flex: 0 0 30vw;
  }
  .cc{
    height: 27vh;
  }
  .iniPost{
    font-size: 2.4vw;
  }
  .descripcion{
    font-size: 1.87vw;
    padding: 1.85vw 2.5vw;
  }
}

</style>