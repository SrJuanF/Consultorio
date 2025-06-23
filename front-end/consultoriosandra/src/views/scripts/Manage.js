import Calendar from '../../components/management/calendar.vue'
import {mapState} from 'vuex'
export default {
    name: 'Manage',
    props: {},
    components: {Calendar},
    data(){
      return{
        Cloader: false,
        Cmessage: false,
        messageMM: '',
        //Citas
        Citas: [],
        newDates: {title:'', email:'', modalidad: '', description:'', start:'', end:''},
        Cdate: false,
        CdateEdit: false,
        editCita: false,
        citasSeek: [],
        tituloSeek: '',
        DateToEdit: {},
        //Posts
        Posts: [],
        newPosts: {title: '', presentation:null, content: []},
        Cpost: false,
        CpostEdit: false,
        editPost: false,
        CpresentatioPost: true,
        postsSeek: [],
        tituloSeekPost: '',
        PostToEdit: {},
        delIndIMGPost: {id: '', ps: '', conte: []},
        //Servicios
        Services: [],
        newServices: {title: '', presentation:null, description: '', content: []},
        Cservice: false,
        CserviceEdit: false,
        editService: false,
        CpresentatioService: true,
        servicesSeek: [],
        tituloSeekService: '',
        ServiceToEdit: {},
        delIndIMGService: {id: '', ps: '', conte: []},
        //Pago
        Cpago: false,
        newPagos: {name: '', email: '', number: 0, price: 1100},
      }
    },
    computed:{
      ...mapState(['token']),
      dateEvent(){
        return this.Citas;
      }
    },
    methods:{
      //Citas
      async obtDates(){
        this.Cloader = true;
        const res = await fetch('http://localhost:3000/manage/citas', {method: 'GET',
        headers: {'Content-Type': 'application/json','authorization': this.token}});
        const result = await res.json();
        this.Citas = result.data;
        this.Cloader = false;
      },
      validFechaActual(fechaInput, fechaRef){
        var fechaActual = new Date(fechaRef);
        // Formatear la fecha actual para que coincida con el formato del input datetime-local
        var year = fechaActual.getFullYear();
        var month = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
        var day = ('0' + fechaActual.getDate()).slice(-2);
        var hour = ('0' + fechaActual.getHours()).slice(-2);
        var minute = ('0' + fechaActual.getMinutes()).slice(-2);
        var fechaActualFormateada = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
        // Comparar las fechas
        if (fechaInput < fechaActualFormateada) {
          return false;
        } else {
          return true;
        }
      },
      validNewDate(date){
        var correoValido = /\S+@\S+\.\S+/;
        if(this.newDates.title === '' || this.newDates.email === '' || this.newDates.modalidad === '' || this.newDates.start === '' || this.newDates.end === ''){
          alert("Llene todos los campos por favor.")
          return false;
        }
        if(this.newDates.modalidad.toLowerCase() != "virtual" && this.newDates.modalidad.toLowerCase() != "presencial"){
          alert("Seleccione una modalidad válida.")
          return false;
        }
        //Validar fecha start
        if(this.validFechaActual(this.newDates.start, new Date()) === false){
          alert("Ingrese un cita válida para una fecha actual o futura.")
          return false;
        }
        else if(this.validFechaActual(this.newDates.end, this.newDates.start) === false){//Validar fecha end
          alert("Ingrese una finalización de cita válida para una fecha mayor que la fecha de inicio.")
          return false;
        }
        var fech = this.newDates.start.split('T')[1];
        if(fech.split(':')[1] != '00' || Number(fech.split(':')[0]) < 6 || Number(fech.split(':')[0]) > 16){
          alert("Horario 6:00 a 17:00. La fecha de inicio debe comenzar al principio de una hora. Ejemplo: 15:00")
          return false;
        }
        var fechF = this.newDates.end.split('T')[1];
        if(fechF.split(':')[1] != '00' || Number(fechF.split(':')[0]) < 7 || Number(fechF.split(':')[0]) > 17){
          alert("Horario 6:00 a 17:00. La fecha final debe terminar al final de una hora. Ejemplo: 16:00")
          return false;
        }       
        if (!correoValido.test(this.newDates.email)) {
          alert("Ingresa un correo electrónico válido.");
          return false;
        }
        this.Cloader = true;
        this.createDates();
        return true;
      },
      async createDates(){
        try {
          var opciones = { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(this.newDates)};
          const res = await fetch('http://localhost:3000/citaup', opciones);
          const result = await res.json();
          this.Cdate = false;
          this.Cloader = false;
          this.newDates = {title:'', email:'', modalidad: '', description:'', start:'', end:''};

          if(result.cita === 'n'){
            alert('Usuario no existe, por favor cree una cuenta.');
          }
          else{
            this.Citas.push(result.cita);
            this.messageMM = 'Fecha Creada con Éxito.';
            this.Cmessage = true;
          }
        } catch (error) {
          alert('Ocurrio un Errror.')
          console.log(error);
        }
      },
      CitaSeek(){
        const dates = this.Citas.filter((cita) =>{
          if(this.tituloSeek.toLowerCase() === cita.title.toLowerCase()){
            return cita;
          }
        });
        this.citasSeek = dates;
      },
      AvilEditDate(cita){
        this.editCita = true;
        this.DateToEdit = JSON.parse(JSON.stringify(cita));
        this.citasSeek = [];
      },
      validEditDate(){
        var correoValido = /\S+@\S+\.\S+/;
        if(this.DateToEdit.title === '' || this.DateToEdit.email === '' || this.DateToEdit.modalidad === '' || this.DateToEdit.start === '' || this.DateToEdit.end === ''){
          alert("Llene todos los campos por favor.")
          return false;
        }
        if(this.DateToEdit.modalidad.toLowerCase() != "virtual" && this.DateToEdit.modalidad.toLowerCase() != "presencial"){
          alert("Seleccione una modalidad válida.")
          return false;
        }
        //Validar fecha
        if(this.validFechaActual(this.DateToEdit.start, new Date()) === false){
          alert("Ingrese un cita válida para una fecha actual o futura.")
          return false;
        }
        else if(this.validFechaActual(this.DateToEdit.end, this.DateToEdit.start) === false){//Validar fecha end
          alert("Ingrese una finalización de cita válida para una fecha mayor que la fecha de inicio.")
          return false;
        }
        var fech = this.DateToEdit.start.split('T')[1];
        if(fech.split(':')[1] != '00' || Number(fech.split(':')[0]) < 6 || Number(fech.split(':')[0]) > 16){
          alert("Horario 6:00 a 17:00. La fecha de inicio debe comenzar al principio de una hora. Ejemplo: 15:00")
          return false;
        }
        var fechF = this.DateToEdit.end.split('T')[1];
        if(fechF.split(':')[1] != '00' || Number(fechF.split(':')[0]) < 7 || Number(fechF.split(':')[0]) > 17){
          alert("Horario 6:00 a 17:00. La fecha final debe terminar al final de una hora. Ejemplo: 16:00")
          return false;
        }
        if (!correoValido.test(this.DateToEdit.email)) {
          alert("Ingresa un correo electrónico válido.");
          return false;
        }
        this.Cloader = true;
        this.EditDate();
        return true;
      },
      async EditDate(){
        try {
          var opciones = { method: 'PUT', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.DateToEdit)};
          await fetch('http://localhost:3000/manage/updatecita', opciones);
          //Buscar la cita con la id y cambiarla
          var index = this.Citas.findIndex(cita => cita._id === this.DateToEdit._id);
          this.Citas[index] = JSON.parse(JSON.stringify(this.DateToEdit));

          this.CdateEdit = false;
          this.editCita = false;
          this.Cloader = false;
          this.DateToEdit = {};
          this.messageMM = 'Fecha Actualizada con Éxito.';
          this.Cmessage = true;
        } catch (error) {
          alert('Ocurrio un Errror.')
          console.log(error)
        }
      },
      async DeleteDate(idd){
        try {
          this.Cloader = true;
          var opciones = { method: 'DELETE', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify({id: idd})};
          await fetch('http://localhost:3000/deletecita', opciones);
          //Buscar la cita con la id y eliminarla
          var indice = this.Citas.findIndex(cita => cita._id === idd);
          this.Citas.splice(indice, 1);
          this.CdateEdit = false;
          this.Cloader = false;
          this.citasSeek= [];
          this.messageMM = 'Fecha Eliminada con Éxito.';
          this.Cmessage = true;
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error);
        }
      },
      //Posts
      async obtPosts(){
        this.Cloader = true;
        const res = await fetch('http://localhost:3000/posts?amen=HAYALGUIENQUETODOLOVE', {method: 'GET', headers: {'Content-Type': 'application/json'}});
        const result = await res.json();
        this.Posts = result.data;
        this.Cloader = false;
      },
      async savePost(){
        try {
          if(this.newPosts.title === '' || this.newPosts.presentation === null || this.newPosts.content.length < 1){
            alert('Llene todos los campos por favor.');
          }else{
            this.Cloader = true;
            let formData = new FormData();
            formData.append('title', this.newPosts.title);
            formData.append('presentation', this.newPosts.presentation);
            let newName = '';
            let ext = '';
            let cont = 0;
            let valdIMG = true;

            this.newPosts.content.forEach(element => {
              if(element.tipo === 'inputFile'){
                if(element.imagen && element.valuef != '' && element.valuet != '' && element.valuef != undefined && element.valuet != undefined &&
                (element.valuef === 'ClaseA' || element.valuef === 'ClaseB' ||element.valuef === 'ClaseC') &&
                (element.valuet === 'Grande' || element.valuet === 'Mediana')){
                  element.tipo = 'image';
                  ext = element.imagen.name.split('.').pop();
                  newName = new File([element.imagen], (String('m_'+cont)+'.'+ext), { type: element.imagen.type });
                  element.imagen = newName;
                  formData.append(`${element.tipo}`, element.imagen);
                  formData.append(`forma_${(cont+1)}`, element.valuef);
                  formData.append(`tamaño_${(cont+2)}`, element.valuet);
                  cont += 2;
                }else{valdIMG = false;}
              }else{
                formData.append(`${element.tipo}_${cont}`, element.value);
              }
              cont += 1;
              newName = '';
              ext = '';
            });
            if(valdIMG){
              var opciones = { method: 'POST', headers: {'authorization': this.token}, body: formData};
              const res = await fetch('http://localhost:3000/manage/postup', opciones);
              const result = await res.json();
              this.Posts.push(result.post);
              this.messageMM = 'Post Creado con Éxito.';
              this.Cmessage = true;
            }else{
              alert('Falto algun dato al añadir una imagen, seleccione una imagen y una opción dada para su forma y tamaño.');
            }
            this.Cpost = false;
            this.Cloader = false;
            this.newPosts = {title: '', presentation: null, content: []};
          }
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error);
        }
      },
      PostSeek(){
        const postse = this.Posts.filter((post) =>{
          if(this.tituloSeekPost.toLowerCase() === post.title.toLowerCase()){
            return post;
          }
        });
        this.postsSeek = postse;
      },
      AvilEditPost(post){
        this.editPost = true;
        this.PostToEdit= JSON.parse(JSON.stringify(post));
        this.postsSeek = [];
      },
      regEditPost(){
        this.editPost = false;
        this.CpresentatioPost = true;
        this.delIndIMGPost = {id:'', ps:'', conte:[]};
      },
      quitPresePost(){
        this.CpresentatioPost = false;
        this.PostToEdit.presentation = null;
        this.delIndIMGPost.ps = 's';
        this.delIndIMGPost.id = this.PostToEdit._id;
      },
      eliminarRGPost(index){
        if(this.PostToEdit.content[index].tipo === 'image'){
          this.PostToEdit.content[index].tipo = 'inputFile';
          this.PostToEdit.content[index].imagen = null;
          this.delIndIMGPost.conte.push(index);
          this.delIndIMGPost.id = this.PostToEdit._id;
        }else{
          this.PostToEdit.content.splice(index, 1);
        }
      },
      async EditPost(){
        try {
          if(this.PostToEdit.title === '' || this.PostToEdit.presentation === null || this.PostToEdit.content.length < 1){
            alert('Llene todos los campos por favor.');
          }else{
            this.Cloader = true;
            await this.deleIMGSPost();
            let formData = new FormData();
            formData.append('title', this.PostToEdit.title);
            formData.append('presentation', this.PostToEdit.presentation);
            let cont = 0;
            let newName = '';
            let ext = '';
            let valdIMG = true;

            this.PostToEdit.content.forEach(element => {
              if(element.tipo === 'inputFile'){
                if(element.imagen && element.valuef != '' && element.valuet != '' && element.valuef != undefined && element.valuet != undefined &&
                (element.valuef === 'ClaseA' || element.valuef === 'ClaseB' ||element.valuef === 'ClaseC') &&
                (element.valuet === 'Grande' || element.valuet === 'Mediana')){
                  element.tipo = 'image';
                  ext = element.imagen.name.split('.').pop();
                  newName = new File([element.imagen], (String('m_'+cont)+'.'+ext), { type: element.imagen.type });
                  element.imagen = newName;
                  formData.append(`${element.tipo}`, element.imagen);
                  formData.append(`forma_${(cont+1)}`, element.valuef);
                  formData.append(`tamaño_${(cont+2)}`, element.valuet);
                  cont += 2;
                }else{valdIMG = false;}
              }else{
                formData.append(`${element.tipo}_${cont}`, element.value);
              }
              cont += 1;
              newName = '';
              ext = '';
            });
            if(valdIMG){
              var opciones = { method: 'PUT', headers: {'authorization': this.token}, body: formData};
              const res = await fetch(`http://localhost:3000/manage/updatepost?id=${this.PostToEdit._id}`, opciones);
              const result = await res.json();
              //Buscar el post con la id y cambiarla
              var index = this.Posts.findIndex(post => post._id === this.PostToEdit._id);
              this.Posts[index] = result.data;
              this.messageMM = 'Post Actualizado con Éxito.';
              this.Cmessage = true;
            }else{
              alert('Falto algun dato al añadir una imagen, seleccione una imagen y una opción dada para su forma y tamaño.');
            }
            this.CpostEdit = false;
            this.editPost = false;
            this.Cloader = false;
            this.CpresentatioPost = true;
            this.PostToEdit = {};
          }
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error)
        }
      },
      async deleIMGSPost(){
        try {
          if(this.delIndIMGPost.ps === 's' || this.delIndIMGPost.conte.length > 0){
            var opciones = { method: 'DELETE', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.delIndIMGPost)};
            await fetch('http://localhost:3000/manage/deleteimgpost', opciones);
          }
          this.delIndIMGPost = {id:'', ps: '', conte:[]}
        } catch (error) {
          console.log(error)
        }
      },
      async DeletePost(idd){
        try {
          this.Cloader = true;
          var opciones = { method: 'DELETE', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify({id: idd})};
          await fetch('http://localhost:3000/manage/deletepost', opciones);
          //Buscar el post con la id y eliminarla
          var indice = this.Posts.findIndex(post => post._id === idd);
          this.Posts.splice(indice, 1);
          this.postsSeek= [];
          this.CpostEdit = false;
          this.Cloader = false;
          this.messageMM = 'Post Eliminado con Éxito.';
          this.Cmessage = true;
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error);
        }
      },
      handleImagen(event, id) {
        const imagenSeleccionada = event.target.files[0];
        this.newPosts.content[id].imagen = imagenSeleccionada;
      },
      handleImagenPrest(event){
        const imagenSeleccionada = event.target.files[0];
        this.newPosts.presentation = imagenSeleccionada;
      },
      handleImagenEdit(event, id) {
        const imagenSeleccionada = event.target.files[0];
        this.PostToEdit.content[id].imagen = imagenSeleccionada;
        //this.$set(this.PostToEdit.content[id], 'imagen', imagenSeleccionada);
      },
      handleImagenEditPrest(event) {
        const imagenSeleccionada = event.target.files[0];
        this.PostToEdit.presentation= imagenSeleccionada;
      },
      //Services
      async obtServices(){
        this.Cloader = true;
        const res = await fetch('http://localhost:3000/services?amen=HAYALGUIENQUETODOLOVE', {method: 'GET', headers: {'Content-Type': 'application/json'}});
        const result = await res.json();
        this.Services = result.data;
        this.Cloader = false;
      },
      async saveService(){
        try {
          if(this.newServices.title === '' || this.newServices.presentation === null || this.newServices.description === '' || this.newServices.content.length < 1){
            alert('Llene todos los campos por favor.');
          }else{
            this.Cloader = true;
            let formData = new FormData();
            formData.append('title', this.newServices.title);
            formData.append('presentation', this.newServices.presentation);
            formData.append('description', this.newServices.description);
            let cont = 0;
            let newName = '';
            let ext = '';
            let valdIMG = true;
            this.newServices.content.forEach(element => {
              if(element.tipo === 'inputFile'){
                if(element.imagen && element.valuef != '' && element.valuet != '' && element.valuef != undefined && element.valuet != undefined &&
                (element.valuef === 'ClaseA' || element.valuef === 'ClaseB' ||element.valuef === 'ClaseC') &&
                (element.valuet === 'Grande' || element.valuet === 'Mediana')){
                  element.tipo = 'image';
                  ext = element.imagen.name.split('.').pop();
                  newName = new File([element.imagen], (String('m_'+cont)+'.'+ext), { type: element.imagen.type });
                  element.imagen = newName;
                  formData.append(`${element.tipo}`, element.imagen);
                  formData.append(`forma_${(cont+1)}`, element.valuef);
                  formData.append(`tamaño_${(cont+2)}`, element.valuet);
                  cont += 2;
                }else{valdIMG = false;}
              }else{
                formData.append(`${element.tipo}_${cont}`, element.value);
              }
              cont += 1;
              newName = '';
              ext = '';
            });
            if(valdIMG){
              var opciones = { method: 'POST', headers: {'authorization': this.token}, body: formData};
              const res = await fetch('http://localhost:3000/manage/serviceup', opciones);
              const result = await res.json();
              this.Services.push(result.service);
              this.messageMM = 'Servicio Creado con Éxito.';
              this.Cmessage = true;
            }else{
              alert('Falto algun dato al añadir una imagen, seleccione una imagen y una opción dada para su forma y tamaño.');
            }
            this.Cservice = false;
            this.Cloader = false;
            this.newServices = {title: '', presentation: null, description: '', content: []};
          }
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error);
        }
      },
      ServiceSeek(){
        const servicese = this.Services.filter((service) =>{
          if(this.tituloSeekService.toLowerCase() === service.title.toLowerCase()){
            return service;
          }
        });
        this.servicesSeek = servicese;
      },
      AvilEditService(service){
        this.editService = true;
        this.ServiceToEdit = JSON.parse(JSON.stringify(service));
        this.servicesSeek = [];
      },
      regEditService(){
        this.editService = false;
        this.CpresentatioService = true;
        this.delIndIMGService = {id:'', ps:'', conte:[]};
      },
      quitPreseService(){
        this.CpresentatioService = false;
        this.ServiceToEdit.presentation = null;
        this.delIndIMGService.ps = 's';
        this.delIndIMGService.id = this.ServiceToEdit._id;
      },
      eliminarRGService(index){
        if(this.ServiceToEdit.content[index].tipo === 'image'){
          this.ServiceToEdit.content[index].tipo = 'inputFile'
          this.ServiceToEdit.content[index].imagen = null;
          this.delIndIMGService.conte.push(index);
          this.delIndIMGService.id = this.ServiceToEdit._id;
        }else{
          this.ServiceToEdit.content.splice(index, 1);
        }
      },
      async EditService(){
        try {
          if(this.ServiceToEdit.title === '' || this.ServiceToEdit.presentation === null || this.ServiceToEdit.description === '' || this.ServiceToEdit.content.length < 1){
            alert('Llene todos los campos por favor.');
          }else{
            this.Cloader = true;
            await this.deleIMGSService();
            let formData = new FormData();
            formData.append('title', this.ServiceToEdit.title);
            formData.append('presentation', this.ServiceToEdit.presentation);
            formData.append('description', this.ServiceToEdit.description);
            let cont = 0;
            let newName = '';
            let ext = '';
            let valdIMG = true;
            this.ServiceToEdit.content.forEach(element => {
              if(element.tipo === 'inputFile'){
                if(element.imagen && element.valuef != '' && element.valuet != '' && element.valuef != undefined && element.valuet != undefined &&
                (element.valuef === 'ClaseA' || element.valuef === 'ClaseB' ||element.valuef === 'ClaseC') &&
                (element.valuet === 'Grande' || element.valuet === 'Mediana')){
                  element.tipo = 'image';
                  ext = element.imagen.name.split('.').pop();
                  newName = new File([element.imagen], (String('m_'+cont)+'.'+ext), { type: element.imagen.type });
                  element.imagen = newName;
                  formData.append(`${element.tipo}`, element.imagen);
                  formData.append(`forma_${(cont+1)}`, element.valuef);
                  formData.append(`tamaño_${(cont+2)}`, element.valuet);
                  cont += 2;
                }else{valdIMG = false;}
              }else{
                formData.append(`${element.tipo}_${cont}`, element.value);
              }
              cont += 1;
              newName = '';
              ext = '';
            });
            if(valdIMG){
              var opciones = { method: 'PUT', headers: {'authorization': this.token}, body: formData};
              const res = await fetch(`http://localhost:3000/manage/updateservice?id=${this.ServiceToEdit._id}`, opciones);
              const result = await res.json();
              //Buscar el servicio con la id y cambiarla
              var index = this.Services.findIndex(service => service._id === this.ServiceToEdit._id);
              this.Services[index] = result.data;
              this.messageMM = 'Servicio Actualizado con Éxito.';
              this.Cmessage = true;
            }else{
              alert('Falto algun dato al añadir una imagen, seleccione una imagen y una opción dada para su forma y tamaño.');
            }
            this.CserviceEdit = false;
            this.editService = false;
            this.Cloader = false;
            this.CpresentatioService = true;
            this.ServiceToEdit = {};
          }
        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error)
        }
      },
      async deleIMGSService(){
        try {
          if(this.delIndIMGService.ps === 's' || this.delIndIMGService.conte.length > 0){
            var opciones = { method: 'DELETE', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.delIndIMGService)};
            await fetch('http://localhost:3000/manage/deleteimgservice', opciones);
          }
          this.delIndIMGService = {id:'', ps: '', conte:[]}
        } catch (error) {
          console.log(error)
        }
      },
      async DeleteService(idd){
        try {
          this.Cloader = true;
          var opciones = { method: 'DELETE', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify({id: idd})};
          await fetch('http://localhost:3000/manage/deleteservice', opciones);
          //Buscar el servicio con la id y eliminarla
          var indice = this.Services.findIndex(service => service._id === idd);
          this.Services.splice(indice, 1);
          this.servicesSeek = [];
          this.CserviceEdit = false;
          this.Cloader = false;
          this.messageMM = 'Servicio Eliminado con Éxito.';
          this.Cmessage = true;

        } catch (error) {
          alert('Ocurrio un Errror.');
          console.log(error);
        }
      },
      handleImagenService(event, id) {
        const imagenSeleccionada = event.target.files[0];
        this.newServices.content[id].imagen = imagenSeleccionada;
      },
      handleImagenServicePrest(event, id) {
        const imagenSeleccionada = event.target.files[0];
        this.newServices.presentation = imagenSeleccionada;
      },
      handleImagenEditService(event, id) {
        const imagenSeleccionada = event.target.files[0];
        this.ServiceToEdit.content[id].imagen = imagenSeleccionada;
      },
      handleImagenEditServicePrest(event) {
        const imagenSeleccionada = event.target.files[0];
        this.ServiceToEdit.presentation = imagenSeleccionada;
      },
      async createNewPago(){
        try {
          var correoValido = /\S+@\S+\.\S+/;
          if(this.newPagos.name != undefined && this.newPagos.name != '' && correoValido.test(this.newPagos.email) && this.newPagos.price >= 1100){
            this.Cloader = true;
            const opciones = {method: 'POST', headers: {'Content-Type': 'application/json', 'authorization': this.token}, body: JSON.stringify(this.newPagos)}
            const res = await fetch('http://localhost:3000/manage/payment', opciones)
            const result = await res.json();
             
            this.Cloader = false;
            this.Cpago = false;
            this.newPagos = {name: '', email: '', number: 0, price: 1100}
            this.messageMM = result.data.init_point;
            this.Cmessage = true;
          }else{
            alert('Por favor digite un nombre, precio o un correo válido.')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    created(){
      this.obtDates();
      this.obtPosts();
      this.obtServices();
    }
}