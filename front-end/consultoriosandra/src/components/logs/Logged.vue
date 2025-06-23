<template>
        <div class="d-flex flex-column align-items-center campoLogged">
            <div v-if="Cloader" id="loader"></div>
            <img :src="`http://localhost:3000/${User.imagen}`" alt="Perfil" class="imgCommPerfil">
            <h3 class="NombrePerfil">{{User.nombre}}</h3>
            <div class="d-flex justify-content-center" style="width:100%">
                <div class="navPerfil" style="margin-left: 5px" @click="selectProfile('profile')" :class="{ navPerfilClick: seeProfile === true }">Perfil</div>
                <div class="navPerfil" style="margin-left: 5px" @click="selectProfile('dates')" :class="{ navPerfilClick: seeDates === true }">Mis Citas</div>
            </div>
            <div class="conf">
                <div class="setProfile" v-if="seeProfile">
                    <div class="d-flex flex-column align-items-center" v-if="editProfile">
                        <p class="txtProf" style="font-weight: bold;">Nombre</p>
                        <input type="text" class="inputProf" v-model="userEdit.nombre">
                        <p class="txtProf" style="font-weight: bold;">Correo</p>
                        <input type="text" class="inputProf" v-model="userEdit.correo">
                        <p class="txtProf" style="font-weight: bold;">Foto de Perfil</p>
                        <input type="file" class="inputProf" accept=".jpg,.jpeg,.png" @change="handleImagen">
                        <div style="margin-top: 8px;">
                            <button class="btnEdit" @click="ValidEditUser">Save</button>
                            <button class="btnEdit" @click="cancelEdit" style="background-color: rgb(186, 0, 0);margin-left:7px">Cancel</button>
                        </div>                      
                    </div>
                    <div class="d-flex flex-column align-items-center" v-if="!editProfile">
                        <p class="txtProf" style="font-weight: bold;">Foto de Perfil</p>
                        <img :src="`http://localhost:3000/${User.imagen}`" alt="Perfil" class="imgCommPerfil">
                        <div class="d-flex justify-content-between" style="width: 95%">
                            <div class="d-flex flex-column align-items-center">
                                <p class="txtProf" style="font-weight: bold;">Nombre</p>
                                <p class="txtProf" style="text-align: center">{{User.nombre}}</p>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <p class="txtProf" style="font-weight: bold;">Correo</p>
                                <p class="txtProf" style="text-align: center">{{User.correo}}</p>
                            </div>
                        </div>                       
                        <button class="btnEdit" @click="editProfile = !editProfile" style="padding: 5px 20px;">Edit</button>
                    </div>                 
                </div>
                <div class="setProfile" v-if="seeDates">
                    <div v-for="(cita, index) in datesUser" :key="index">
                        <div class="d-flex flex-column align-items-center contenDates">
                            <div class="d-flex justify-content-around align-items-start"
                            style="width:100%; border-bottom: 2px dashed rgb(131, 101, 3)">
                                <div class="d-flex flex-column align-items-center">
                                    <p class="txtProf" style="font-weight: bold;">Modalidad</p>
                                    <p class="txtProf" style="text-align: center">{{cita.modalidad}}</p>
                                </div>
                                <div class="d-flex flex-column align-items-center">
                                    <p class="txtProf" style="font-weight: bold;">Fecha</p>
                                    <p class="txtProf" style="text-align: center">{{cita.start}} a {{cita.end}}</p>
                                </div>
                            </div>
                            <button class="btnEdit"
                            style="background-color: rgb(186, 0, 0); margin-top: 7px; margin-bottom:4px">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="ttTema">¡ {{topic}} !</h3>
            <div style="height: 45vh; overflow-x:hidden; overflow-y: auto; border-radius:10px; width:95%;">
                <Comentarios v-if="Ccomms" :token="tokn" :lvl="3" :topic="topic" :user="User" :commentts="Comments"/>
            </div>
            <div v-if="CrespOk" class="d-flex justify-content-around align-items-center" style="width:90%; margin-bottom: 10px;">
                <input type="text" class="inputProf" v-model="commeRevP" @keyup.enter="SentComment">
                <button class="btnEdit" style="background-color: black; margin:0" @click="SentComment">Enviar</button>
            </div>
            
            <button @click="logOut" class="btnEdit" style="background-color: black;">Log Out</button>
        </div>
        
</template>

<script>
import {mapActions} from 'vuex'
import Comentarios from './Comentarios.vue'
export default {
    name: 'Logued',
    props: {tokn: {type:String}, topic:{type:String}},
    components: {Comentarios},
    data(){
        return{
            seeProfile: false,
            seeDates: false,
            editProfile: false,
            Cloader: false,
            User: {},
            userEdit: {imagen:null},
            datesUser: [],
            Comments: [],
            Ccomms: false,
            CrespOk: false,
            commeRevP: '',
        }
    },
    computed:{},
    methods:{
        ...mapActions(['logOut']),
        selectProfile(pet){
            if(pet === 'profile'){
                this.seeProfile = !this.seeProfile;
                this.seeDates = false;
            }
            else{
                this.seeDates = !this.seeDates;
                this.seeProfile = false;
            }
        },
        handleImagen(event) {
            this.userEdit.imagen = event.target.files[0];
        },
        cancelEdit(){
            this.editProfile = false;
            this.userEdit = JSON.parse(JSON.stringify(this.User));
        },
        ValidEditUser(){
            const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(this.userEdit.nombre === '' || this.userEdit.nombre === undefined || this.userEdit.correo === ''){
                alert('Por favor complete todos los datos.')
                return false;
            }
            if(!correoRegex.test(this.userEdit.correo)){
                alert('Por favor ingrese un correo válido.')
                return false;
            }
            if(this.userEdit.nombre.length > 55){
                alert('Por favor ingrese un nombre válido.')
                return false;
            }
            (this.userEdit.imagen === null) ? this.userEdit.imagen = this.User.imagen : '';
            
            this.editDataUser()
            return true;
        
        },
        async editDataUser(){
            try {
                this.Cloader = true;
                let formData = new FormData();
                formData.append('nombre', this.userEdit.nombre);
                formData.append('correo', this.userEdit.correo);
                formData.append('image', this.userEdit.imagen);

                const opciones = {method: 'PUT', headers: {'authorization': this.tokn}, body: formData};
                const res = await fetch(`http://localhost:3000/updateuser?id=${this.userEdit._id}`, opciones);
                const result = await res.json();
                this.User = result.data;
                this.userEdit = JSON.parse(JSON.stringify(this.User));
                this.editProfile = false;
                this.Cloader = false;
            } catch (error) {
                console.log(error)
            }
        },
        async dataProtected(){
            try {
                this.Cloader = true;
                const Us = await fetch('http://localhost:3000/users',
                {method: 'GET', headers:{'Content-Type': 'application/json', 'authorization': this.tokn}})
                const usser = await Us.json()
                
                if(Object.keys(usser.data).length === 0){
                    alert('Usuario no encontrado.')
                }else{
                    this.User = usser.data;
                    this.userEdit = JSON.parse(JSON.stringify(this.User));

                    const Ci = await fetch(`http://localhost:3000/cita?id=${this.User._id}`,
                    {method: 'GET', headers:{'Content-Type': 'application/json', 'authorization': this.tokn}})
                    const cita = await Ci.json();
                    this.datesUser = cita.data;

                    await this.getComments();
                    this.CrespOk = true;
                }
                this.Cloader = false;
            } catch (error) {
                console.log(error)
            }
        },
        async getComments(){
            try {
                this.Ccomms = false;
                const Cm = await fetch(`http://localhost:3000/comments?topic=${this.topic}`,
                {method: 'GET', headers:{'Content-Type': 'application/json', 'authorization': this.tokn}})
                const comments = await Cm.json()
                this.Comments = comments.data;
                this.Ccomms = true;
            } catch (error) {
                console.log(error)
            }
        },
        async SentComment(){
            try {
                if(this.commeRevP != ''){
                    this.Cloader = true;
                    const data = {iduser: this.User._id, topic: this.topic, nombre: this.User.nombre, imagen:this.User.imagen, comment:this.commeRevP}
                    const opciones = {method: 'POST', headers:{'Content-Type': 'application/json', 'authorization': this.tokn}, body: JSON.stringify(data)}
                    const NCm = await fetch("http://localhost:3000/commentup", opciones)
                    const newComme = await NCm.json()
                    this.Comments.push(newComme.data);
                    this.commeRevP = '';
                    this.Cloader = false;
                }          
            } catch (error) {
                console.log(error)
            }
        }
    },
    created(){
        this.dataProtected();
    },
    watch: {
        // Observador para detectar cambios en la propiedad 'topic'
        topic: function(newTema, oldTema) {
            // Llamar al método para cargar los comentarios cuando cambie el topic
            this.getComments();
        }
    },
}
</script>

<style scoped src="@/views/estilos/profile.css"></style>

