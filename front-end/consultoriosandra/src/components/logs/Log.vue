<template>

        <div class="d-flex flex-column align-items-center campoLog">
            <div id="loader" v-if="Cloader"></div>
            <div class="d-flex justify-content-around" style="width:90%">
                <div class="navPerfil" @click="selectLog('login')" :class="{ navPerfilClick: seeLogInLog === true }">{{translate('login')}}</div>
                <div class="navPerfil" @click="selectLog('signin')" :class="{ navPerfilClick: seeSignInLog === true }">{{translate('sigin')}}</div>
            </div>

            <div style="padding:2vh; width:95%; margin-top:12px;">
                <div class="d-flex flex-column align-items-center" v-if="seeLogInLog">
                    <div class="d-flex justify-content-center align-items-center CubimgLogPro">
                        <img src="@/assets/consultorio/logprofile2.png" alt="LogProfile" class="imgLogPerfil">
                    </div>
                    <h3 class="NombrePerfil">{{translate('login')}}</h3>
                    <form @submit.prevent="validarFormInLog" class="formSS d-flex flex-column align-items-center">
                        <label for="correo" class="labelForm">{{translate('inteEmail')}}</label>
                        <input type="text" id="correo" name="correo" required class="inputForm" v-model="logUser.correoIn" :placeholder="translate('wrEmail')">
                        <span class="errorIn">{{ errores.correo }}</span>
                        <div v-if="saps">
                            <label for="password" class="labelForm">Contraseña</label>
                            <input type="password" id="password" name="password" required class="inputForm" v-model="logUser.jtgd" placeholder="Ingresa tu contraseña...">
                            <span class="errorIn">{{ errores.jtgd }}</span>
                        </div>
                        <button type="submit" class="buttonForm">{{translate('login')}}</button>
                    </form>
                </div>
                
                <div class="d-flex flex-column align-items-center" v-if="seeSignInLog">
                    <div class="d-flex justify-content-center align-items-center CubimgLogPro">
                        <img src="@/assets/consultorio/logprofile2.png" alt="LogProfile" class="imgLogPerfil">
                    </div>
                    <h3 class="NombrePerfil">{{translate('sigin')}}</h3>
                    <form @submit.prevent="validarFormSign"  class="formSS d-flex flex-column align-items-center">
                        <label for="nombre" class="labelForm">{{translate('inteName')}}</label>
                        <input type="text" id="nombre" name="nombre" required class="inputForm" v-model="user.nameUser" :placeholder="translate('wrName')">
                        <span class="errorIn">{{ errores.name }}</span>
                        <label for="correo" class="labelForm">{{translate('inteEmail')}}</label>
                        <input type="text" id="correo" name="correo" required class="inputForm" v-model="user.correoIn" :placeholder="translate('wrEmail')">
                        <span class="errorIn">{{ errores.correo }}</span>
                        <label for="imagen" class="labelForm">{{translate('inteImage')}}</label>
                        <input type="file" id="imagen" name="imagen" required class="inputForm" accept=".jpg,.jpeg,.png" @change="handleImagen">
                        <span class="errorIn">{{ errores.imagen }}</span>
                        <button type="submit" class="buttonForm">{{translate('sigin')}}</button>
                    </form>
                </div>
            </div>
            
        </div>

</template>
<script>
import {mapActions} from 'vuex';
import es from '../../views/lenguages/Español.js'
import en from '../../views/lenguages/English.js'
export default {
    mixins: [en, es],
    name: 'Logue',
    props: {lang:{type:String}},
    data(){
        return{

            seeLogInLog: true,
            seeSignInLog: false,
            Cloader: false,
            logUser: {correoIn: '', jtgd: ''},
            user: {correoIn: '', nameUser: '', imagenIn: null},
            errores: {name:'', correo:'', imagen:'', jtgd: ''},
        }
    },
    computed:{
        saps(){
            if(this.logUser.correoIn === "sandrabermudez@gmail.com" && this.seeLogInLog == true){ return true; }else{ return false; }
        }
    },
    methods:{
        ...mapActions(['login']),
        translate(prop) {
            return this[this.lang][prop];
        },
        selectLog(pet){
            if(pet === 'login'){
                this.seeLogInLog = true;
                this.seeSignInLog = false;
            }
            else{
                this.seeLogInLog = false;
                this.seeSignInLog = true;
            }
            this.user = {correoIn: '', nameUser: '', imagen: null}
            this.logUser = {correoIn: '', jtgd: ''}
            this.errores = {name:'', correo:'', imagen:'', jtgd: ''}
        },
        async validarFormInLog(){
            try {
                this.Cloader = true;
                const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                this.errores.correo = (this.logUser.correoIn.length > 170) ? 'Por favor, ingresa un correo electrónico válido.' : correoRegex.test(this.logUser.correoIn) ? '' : 'Por favor, ingresa un correo electrónico válido.';
                this.errores.jtgd = (this.logUser.jtgd.length > 60) ? "Tienes un Problema con la Contraseña." : '';
                if(this.errores.correo || this.errores.jtgd){
                    this.Cloader = false;
                    return false;
                }
                await this.login(this.logUser);
                this.Cloader = false;
                return true;
            } catch (error) {
                console.log(error)
            }
        },
        validarFormSign(){
            const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const allowedExtensions = /\.(jpg|jpeg|png)$/i;
            this.errores.name = (this.user.nameUser === '' || this.user.nameUser === undefined || this.user.nameUser.length) > 100 ? 'Por favor, ingresa tu nombre.' : '';
            this.errores.correo = (this.user.correoIn.length > 170) ? 'Por favor, ingresa un correo electrónico válido.' : correoRegex.test(this.user.correoIn) ? '' : 'Por favor, ingresa un correo electrónico válido.';
            this.errores.imagen = (this.user.imagen && allowedExtensions.test(this.user.imagen.name)) ? '' : 'Por favor, selecciona una imagen con formato JPEG, JPG o PNG.';

            if (this.errores.name || this.errores.correo || this.errores.imagen) {
                return false;
            }
            this.createUser();
            return true;
        },
        handleImagen(event) {
            this.user.imagen = event.target.files[0];
        },
        async createUser(){
            this.Cloader = true;
            let formData = new FormData();
            formData.append('name', this.user.nameUser);
            formData.append('email', this.user.correoIn);
            formData.append('image', this.user.imagen);

            const res = await fetch('http://localhost:3000/userup', {method: 'POST', body: formData});
            const result = await res.json();
            if(result.user === null){
                alert('Errores en los datos.')
            }
            else if(result.user === 'exis'){
                alert('El correo del usuario ya existe.')
            }
            else{
                const usser = {correoIn: result.user, jtgd: ''}
                await this.login(usser);
            }
            this.Cloader = false;
        }
    }

}
</script>

<style scoped src="@/views/estilos/logs.css"></style>