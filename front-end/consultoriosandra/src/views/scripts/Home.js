import en from "../lenguages/English.js";
import es from "../lenguages/Español.js";
import EspecialistaCom from '@/components/consultorio/Especialistas.vue';
import ServicioCom from '@/components/consultorio/Servicios.vue';
import PostsCom from '@/components/consultorio/Posts.vue';
import Map from '@/components/consultorio/Mapa.vue';
import LogComp from '@/components/logs/LogComp.vue';

export default {
  mixins: [en, es],
  name: "Home",
  components: {EspecialistaCom, ServicioCom, PostsCom, Map, LogComp},
  data() {
    return {
      lang: "es",
      //Web
      Ccontact: false,
      CdataPS: false,
      Cloader: false,
      Cmessage: false,
      messageMM: '',
      Topic: 'Bienvenido',
      // Select Dates
      showSelectDate: false,
      showDates: true,
      Hoy: new Date(),
      date: '',
      showTimes: false,
      hours: [],
      selectedHour: '',
      selectRadioCite: '',
      showDataU: false,
      dataU: {name:'', email:'', messa:''},
      // Campaigns
      images: [{ id: 0, src: "consultorio", alt: "Campaña 1"},
        { id: 1, src: "comunidad", alt: "Campaña 2"},
        { id: 2, src: "imagenPP", alt: "Campaña 4"}],
      currentIndex: 0,
      timeTranstion: 2,
      // Especialistas
      especialistas: [{ id: 0, image: 'Jennifer'},{ id: 1, image: 'Jennifer'}, { id: 2, image: 'JuanDavid'},
        { id: 3, image: 'Hugo'}, { id: 4, image: 'Valentina'}, { id: 5, image: 'Yeny'}],
      RecorreEspec: 0,
      upEsp: true,
      // Servicios
      Servicios: [],
      RecorreServ: 0,
      upServ: true,
      // Posts
      Posts:[],
      RecorrePost: 0,
      upPost: true,
      // Contacto
      OContact: {name:'', email:'', tel:'', messa:''},
      ContenDataPS: {},
    };
  },
  methods: {
    translate(prop) {
      return this[this.lang][prop];
    },
    translateListObject(prop,i){
      return this[this.lang][prop][i];
    },
    getImgUrlPNGUpd(pet){
      var images = require.context("@/assets/intro/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    getImgUrlPNGConsultorio(pet){
      var images = require.context("@/assets/consultorio/", false, /\.png$/);
      return images("./" + pet + ".png");
    },
    //Web
    updtCampan(){
      setInterval(()=>{
        if(this.currentIndex == 2){
          this.currentIndex = 0;
          this.timeTranstion = 0;
        }
        else{
          this.currentIndex += 1;
          this.timeTranstion = 2;
        }
      }, 9000);
    },
    updtEspecs(){
      setInterval(()=>{
        (this.RecorreEspec <= -400) ? this.upEsp = false : (this.RecorreEspec >= 0) ? this.upEsp = true : this.upEsp = this.upEsp;
        (this.upEsp) ? this.RecorreEspec -= 100 : this.RecorreEspec += 100;
      }, 8000);
    },
    updtServs(){
      setInterval(()=>{
        (this.RecorreServ <= 0) ? this.upServ = false : (this.RecorreServ >= 200) ? this.upServ = true : this.upServ = this.upServ;
        (this.upServ) ? this.RecorreServ -= 100 : this.RecorreServ += 100;
      }, 6000);
    },
    updtPost(){
      setInterval(()=>{
        (this.RecorrePost <= 0) ? this.upPost = false : (this.RecorrePost >= 200) ? this.upPost = true : this.upPost = this.upPost;
        (this.upPost) ? this.RecorrePost -= 100 : this.RecorrePost += 100;
      }, 5000);
    },
    MoveIZQ(recorre){
      (recorre < 0) ? recorre += 100 : recorre = recorre;
      return recorre;
    },
    MoveDER(recorre){
      (recorre > -400) ? recorre -= 100 : recorre = recorre;
      return recorre;
    },
    MostrarDataPS(datas){
      this.ContenDataPS = JSON.parse(JSON.stringify(datas));
      for(var i= 0; i < this.ContenDataPS.content.length; i++){
        if(this.ContenDataPS.content[i].tipo === "li"){
          this.ContenDataPS.content[i].value = [this.ContenDataPS.content[i].value];
          var j= i+1;
          while(j < this.ContenDataPS.content.length){
            if(this.ContenDataPS.content[j].tipo === "li"){
              this.ContenDataPS.content[i].value.push(this.ContenDataPS.content[j].value);
              this.ContenDataPS.content.splice(j, 1)
            }else{
              break;
            }
          }
        }
      }
      this.CdataPS = true;
      this.Topic = this.ContenDataPS.title;
    },
    //Select Date
    formatearDate(fechaActual){
      fechaActual.setDate(fechaActual.getDate());
      var dia = fechaActual.getDate();
      var mes = fechaActual.getMonth() + 1; // Nota: ¡getMonth() devuelve valores de 0 a 11!
      var año = fechaActual.getFullYear();
      var fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia;
      return fechaFormateada;
    },
    AssignDateIni(){
      let datePrueba = new Date();
      if(datePrueba.getDay() === 0 || datePrueba.getDay() === 6){
        var diasHastaLunes = (datePrueba.getDay() === 6 ? 2 : 1);
        datePrueba.setDate(datePrueba.getDate() + diasHastaLunes);
      }
      return datePrueba;
    },
    allowedDates(date){
      if (date === undefined) {
        return false;
      }
      const day = date.getDay();
      return day !== 0 && day !== 6;
    },
    async validUUser(){
      try {
        var opciones = { method: 'POST', headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email:this.dataU.email, datte:this.formatearDate(this.date)})};
        const res = await fetch('http://localhost:3000/ucita', opciones);
        const result = await res.json();
        return result.data;
      } catch (error) {
        console.log(error)
      }
    },
    async SentDT(){
      try {
        this.Cloader = true;
        var fomt = Number(this.selectedHour.split(':')[0]) + 1;
        (fomt < 10) ? fomt = '0'+String(fomt) : fomt = String(fomt);
        const data = {
          title: this.dataU.name,
          email: this.dataU.email,
          modalidad: this.selectRadioCite,
          description: this.dataU.messa,
          start: (this.formatearDate(this.date) + 'T' + this.selectedHour),
          end: (this.formatearDate(this.date) + 'T' + fomt + ':00')
        }
        var opciones = { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)};
        await fetch('http://localhost:3000/citaup', opciones);     

        this.dataU = {name:'', email:'', messa:''};
        this.selectRadioCite = '';
        this.selectedHour = '';
        this.hours = [];
        this.Cloader = false;
        this.showDates = true;
        this.showTimes = false;
        this.showSelectDate = false;
        this.messageMM = '¡Cita creada con éxito! Puede gestionar sus citas a través de su cuenta.';
        this.Cmessage = true;
      } catch (error) {
        console.log(error)
      }
    },
    async selecTime(){
      try {
        if(this.showDates){
          this.showDates = false;
          this.showDataU = true;
        }
        else if(this.showDataU){
          const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(this.dataU.email === '' || this.dataU.name === '' || this.dataU.messa === ''){
            alert('Por favor complete todos los datos.')
          }else if(!correoRegex.test(this.dataU.email)){
            alert('Por favor, ingresa un correo electrónico válido.')
          }else{
            this.Cloader = true;
            const dattta = await this.validUUser();
            if(dattta === 'n'){
              alert('Correo de usuario no encontrado, por favor cree una cuenta.')
            }
            else if(dattta === 'nd'){
              alert('No hay citas disponibles para ese dia.')
            }
            else{
              this.hours = dattta;
              this.showTimes = true;
              this.showDataU = false;
            }
            this.Cloader = false;
          }
        }else if(this.showTimes){
          if(this.selectedHour === '' || this.selectRadioCite === ''){
            alert('Por favor seleccione una modalidad y una hora para la cita.')
          }
          else{
            await this.SentDT();
          }
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    RegDates(){
      if(this.showTimes){
        this.showDataU = true;
        this.showTimes = false;
      }
      else if(this.showDataU){
        this.showDates = true;
        this.showDataU = false;
      }
      
    },
    // Contacto
    validarFormularioContacto(){
      var correoValido = /\S+@\S+\.\S+/;
      if (this.OContact.name === '' || this.OContact.email === '' || this.OContact.tel === '' || this.OContact.messa === '') {
          alert("Por favor, llena todos los campos del formulario.");
          return false;
      }
      if (!correoValido.test(this.OContact.email)) {
          alert("Ingresa un correo electrónico válido.");
          return false;
      }
      this.MessaggeOut();
      return true;
    },
    async MessaggeOut(){ //async
      try {
        const opciones = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(this.OContact)}
        await fetch('http://localhost:3000/contact', opciones)
        this.Ccontact = false;
        this.messageMM = 'Mensaje Enviado con Éxito.';
        this.Cmessage = true;
      } catch (error) {
        console.log(error)
      }
    },
    async getPosts(){
      this.Cloader = true;
      const res = await fetch('http://localhost:3000/posts?amen=HAYALGUIENQUETODOLOVE', {method: 'GET', headers: {'Content-Type': 'application/json'}});
      const result = await res.json();
      this.Posts = result.data;
      this.Cloader = false;
      
    },
    async getServices(){
      this.Cloader = true;
      const res = await fetch('http://localhost:3000/services?amen=HAYALGUIENQUETODOLOVE', {method: 'GET', headers: {'Content-Type': 'application/json'}});
      const result = await res.json();
      this.Servicios = result.data;
      this.Cloader = false;
    }
  },
  mounted() {//document.body.style.overflow = 'hidden';
  },
  created() {
    //Deslizan
    this.updtCampan();
    this.updtEspecs();
    this.updtServs();
    this.updtPost();
    // Date Ref
    this.Hoy = this.formatearDate(this.Hoy);
    this.date = this.AssignDateIni();
    // Posts and Services
    this.getPosts();
    this.getServices();
  },
};