<template>
    <div class="Post d-flex align-items-center justify-content-center" :data-content="see"
    :style="{ 'background-image': `url(http://localhost:3000/${imagen})`}">
        <div class="iniPost">{{title}}</div>
    </div>
</template>

<script>
export default {
  name: 'Posts',
  props: {
    see: {type:String},
    imagen: {type: String},
    title: {type: String}
  },
  methods: {
    evento(){
        this.$emit('unClick',this.Post);
    }
  }
}
</script>

<style scoped lang="scss">
.Post{
    flex: 0 0 20vw;
    height: 53vh;
    margin: 0 auto;
    margin-bottom: 20px;
    background-position: center;
    background-size: cover;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: box-shadow .3s;
}
.Post:hover{
    box-shadow: -6px 6px 6px rgb(212, 175, 55);
}

.Post:hover::after{
    transform: translateY(0);
}
.Post::after{
    content: attr(data-content);
    font-size: 1.3vw;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.585);
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    transform: translateY(100%);
    transition: transform .3s;
    cursor: pointer;
}

.iniPost{
    width: 100%;
    margin: 0;
    border-top: 13px solid rgba(212, 175, 55, 0.622);
    border-bottom: 13px solid rgba(212, 175, 55, 0.622);
    background-color: white;
    font-size: 1.5vw;
    font-weight: bold;
    text-align: center;
    text-wrap: balance;
    color: black;
}
@media screen and (max-width: 900px) {
    .Post{
        flex: 0 0 25vw;
        height: 33vh;
    }
    .Post::after{
        font-size: 1.8vw;
    }
    .iniPost{
        font-size: 2vw;
    }
}
@media screen and (max-width: 550px) {
    .Post{
        flex: 0 0 30vw;
        height: 27vh;
    }
    .Post::after{
        font-size: 2.3vw;
    }
    .iniPost{
        font-size: 2.5vw;
    }
}
</style>