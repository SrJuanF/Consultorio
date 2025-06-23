<template>
        <div class="comment" v-for="(comment, index) in Commenttss" :key="index">
            <div class="d-flex" style="width:100%;">
                <img :src="`http://localhost:3000/${comment.imagen}`" alt="Comentario" class="imgComm">
                <div style="flex:1; padding-left: 10px; box-sizing:border-box;">
                    <div style="background-color: whitesmoke; border-radius: 20px; padding:5px 10px;position:relative; z-index:4;">
                        <div class="cerrar" v-if="comment.iduser === user._id" @click="deleteComment(index)">✖️</div>
                        <div class="d-flex justify-content-between align-items-start">
                            <p class="name">{{comment.nombre}}</p>
                            <p class="PPComm" style="color:gray">{{formatFecha(comment.createdAt)}}</p>
                        </div>
                        <p class="PPComm">{{comment.comment}}</p>
                    </div>

                    <div class="d-flex justify-content-between" v-if="verfLvl">
                        <div class="d-flex align-items-center" style="margin: 2px 0;">
                            <p class="linkReviews" @click="pRespon = !pRespon">Responder</p>
                            <div class="d-flex align-items-center" v-if="comment.reviews.length" @click="review = !review;">
                                <img src="~@/assets/continue.png" width="13px" height="13px" style="margin-left: 7px;cursor:pointer;">
                                <p class="linkReviews">{{changeTextReview}}</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <v-btn class="ma-2 reaction" variant="text" color="#64B5F6">
                                <v-icon size="20" class="icon" @click="GLike(index)">mdi-thumb-up</v-icon>
                                <span class="like" style="color:#64B5F6;">{{comment.likes.length}}</span>
                                <div class="showLk">
                                    <div style="width:100%" class="d-flex flex-column align-items-center" v-for="(likes, index) in comment.likes" :key="index">
                                        <div style="width:100%" class="d-flex align-items-center justify-content-start">
                                            <img :src="`http://localhost:3000/${likes.imagen}`" alt="userLike" width="25px" height="25px" style="border-radius:50%">
                                            <p class="nameUserLik">{{likes.nombre}}</p>
                                        </div>
                                    </div>
                    
                                </div>
                            </v-btn>
                            
                            <v-btn class="ma-2 reaction" variant="text" color="#E57373">
                                <v-icon size="20" class="icon" @click="GDisLike(index)">mdi-thumb-down</v-icon>
                                <span class="like" style="color:#E57373;">{{comment.dislikes.length}}</span>
                                <div class="showLk">
                                    <div style="width:100%" class="d-flex flex-column align-items-center" v-for="(dislikes, index) in comment.dislikes" :key="index">
                                        <div style="width:100%" class="d-flex align-items-center justify-content-start">
                                            <img :src="`http://localhost:3000/${dislikes.imagen}`" alt="userLike" width="25px" height="25px" style="border-radius:50%">
                                            <p class="nameUserLik">{{dislikes.nombre}}</p>
                                        </div>
                                    </div>                   
                                </div>
                            </v-btn>
                            
                        </div>
                    </div>

                      
                </div>
            </div>
            <div class="subLvl">
                <div v-if="review" class="reviews">
                    <Comentarios :token="token" :lvl="lvl-1" :commentts="comment.reviews" :user="user" :indexAnt="index"/>
                </div>
            </div>
            <div v-if="pRespon" class="d-flex justify-content-around align-items-center">
                <input type="text" id="comment" name="comment" class="inputComm" v-model="commeRev" @keyup.enter="sentComment(index)">
                <button class="btnEnv" @click="sentComment(index)">Enviar</button>
            </div>
        </div>

</template>

<script>
export default {
    name: 'Comentarios',
    props: {
        lvl: {type: Number},
        token:{type: String},
        commentts:{type: Array},
        user: {type: Object},
        topic: {type: String},
        indexAnt: {type: Number}
    },
    data(){
        return{
            verfLvl: true,
            pRespon: false,
            review: false,
            Creact: true,
            //
            Commenttss: [],
            likeCount: 0,
            dislikeCount: 0,
            commeRev: '',
        }
    },
    computed:{
        changeTextReview(){
            if(this.review == true){
                return 'hidden...';
            }
            return 'reviews...';
        }
    },
    methods:{
        VReviews(){
            this.Commenttss = this.commentts;
            (this.lvl <= 1) ? this.verfLvl = false : this.verfLvl = true;
        },
        formatFecha(fecha){
            return fecha.split('T')[0];
        },
        async sentComment(indice){
            try {
                if(this.commeRev != ''){
                    var data = {_id: this.Commenttss[indice]._id, iduser: this.user._id, nombre: this.user.nombre, imagen:this.user.imagen,
                    comment: this.commeRev, reviews:[], likes:[], dislikes:[], createdAt: new Date().toISOString()}

                    const opciones = {method: 'PUT', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(data)}
                    await fetch(`http://localhost:3000/updatecomment?action=C&lvl=${this.lvl}&index=${indice}`, opciones)
                    this.Commenttss[indice].reviews.push(data);
                    this.commeRev = '';
                    this.review = true;
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteComment(indice){
            try {
                const idPP = this.Commenttss[indice]._id;
                this.Commenttss.splice(indice, 1);
                var opciones = {method: 'DELETE', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.Commenttss)};
                var ruta = '';

                (this.lvl <= 1) ? ruta = `http://localhost:3000/deletecomment?action=C&lvl=${this.lvl}&idcomm=${idPP}&indexP=${this.indexAnt}` :
                ruta = `http://localhost:3000/deletecomment?action=C&lvl=${this.lvl}&idcomm=${idPP}`;
                (this.lvl === 3) ? opciones = {method: 'DELETE', headers:{'Content-Type': 'application/json', 'authorization': this.token}} : '';              
                await fetch(ruta, opciones)
            } catch (error) {
                console.log(error)
            }
        },
        async GLike(indice){
            try {
                var data = {_id: this.Commenttss[indice]._id, iduser: this.user._id, nombre: this.user.nombre, imagen: this.user.imagen};
                var band = true;
                var indCoin = '';
                for(var i=0; i < this.Commenttss[indice].likes.length; i++){
                    if(this.user._id === this.Commenttss[indice].likes[i].iduser){
                        band = false;
                        indCoin = i;
                        break;
                    }
                }

                if(band){
                    const opciones = {method: 'PUT', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(data)}
                    await fetch(`http://localhost:3000/updatecomment?action=L&lvl=${this.lvl}&index=${indice}`, opciones)
                    this.Commenttss[indice].likes.push(data);
                }else{
                    const idPP = this.Commenttss[indice]._id;
                    this.Commenttss[indice].likes.splice(indCoin, 1);
                    var opciones = {method: 'DELETE', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.Commenttss[indice].likes)};
                    var ruta = '';
                    (this.lvl === 3) ? ruta = `http://localhost:3000/deletecomment?action=L&lvl=${this.lvl}&idcomm=${idPP}` :
                    ruta = `http://localhost:3000/deletecomment?action=L&lvl=${this.lvl}&idcomm=${idPP}&indexP=${indice}`;
                    await fetch(ruta, opciones)
                }              
            } catch (error) {
                console.log(error)
            }
        },
        async GDisLike(indice){
            try {
                var data = {_id: this.Commenttss[indice]._id, iduser: this.user._id, nombre: this.user.nombre, imagen: this.user.imagen};
                var band = true;
                var indCoin = '';

                for(var i=0; i < this.Commenttss[indice].dislikes.length; i++){
                    if(this.user._id === this.Commenttss[indice].dislikes[i].iduser){
                        band = false;
                        indCoin = i;
                        break;
                    }
                }

                if(band){
                    const opciones = {method: 'PUT', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(data)}
                    await fetch(`http://localhost:3000/updatecomment?action=D&lvl=${this.lvl}&index=${indice}`, opciones)
                    this.Commenttss[indice].dislikes.push(data);
                }else{
                    const idPP = this.Commenttss[indice]._id;
                    this.Commenttss[indice].dislikes.splice(indCoin, 1);
                    var opciones = {method: 'DELETE', headers:{'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.Commenttss[indice].dislikes)};
                    var ruta = '';
                    (this.lvl === 3) ? ruta = `http://localhost:3000/deletecomment?action=D&lvl=${this.lvl}&idcomm=${idPP}` :
                    ruta = `http://localhost:3000/deletecomment?action=D&lvl=${this.lvl}&idcomm=${idPP}&indexP=${indice}`;
                    await fetch(ruta, opciones)
                }  
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.VReviews();
    },
}
</script>

<style scoped src="@/views/estilos/comments.css"></style>