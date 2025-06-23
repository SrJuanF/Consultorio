<template>
<section class="d-flex col-12">
  <div id="loader" v-if="Cloader"></div>
  <div v-if="Cmessage" class="d-flex flex-column align-items-center messageC">
    <div class="cerrar" @click="Cmessage = false" style="font-size: 16px; box-sizing: border-box; padding-right: 5px; margin-top: 5px">✖️</div>
    <div style="width:100%; padding: 13px; background-color: whitesmoke; border-radius: 7px">
      <p style="margin:0; padding:0; font-size: 15px; text-align: center;">{{messageMM}}</p>
    </div>
  </div>
  <section class="col-2">
    <div class="menu d-flex flex-column align-items-center justify-content-around col-2">
      <div class="d-flex flex-column align-items-center" style="width:100%">
        <div class="encabe" @click="Cdate = !Cdate" style="margin-bottom: 25px">Crear Cita</div>
        <div class="encabe" @click="CdateEdit = !CdateEdit">Modificar Cita</div>
      </div>
      <div class="d-flex flex-column align-items-center" style="width:100%">
        <div class="encabe" @click="Cpost = !Cpost" style="margin-bottom: 25px">Crear Post</div>
        <div class="encabe" @click="CpostEdit = !CpostEdit">Modificar Post</div>
      </div>
      <div class="d-flex flex-column align-items-center" style="width:100%">
        <div class="encabe" @click="Cservice = !Cservice" style="margin-bottom: 25px">Crear Servicio</div>
        <div class="encabe" @click="CserviceEdit = !CserviceEdit">Modificar Servicio</div>
      </div>
      
      <div class="encabe" @click="Cpago = !Cpago">Generar Enlace de Pago</div>
    </div>
  </section>
  <div class="col-10">
    <Calendar :snap="dateEvent"/>
  </div>
  
  <div v-if="Cdate" class="d-flex flex-column align-items-center justify-content-between creatDate">
    <div class="cerrar" @click="Cdate = false">✖️</div>
    <h2 class="newDtTitulo">Nueva Cita</h2>
    <div style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Titulo Cita</p>
        <input type="text" class="inputProf" v-model="newDates.title" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Correo de Usuario</p>
        <input type="text" class="inputProf" v-model="newDates.email" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Modalidad</p>
        <input type="text" class="inputProf" v-model="newDates.modalidad" required list="mod" name="mod">
        <datalist id="mod">
          <option value="Virtual"></option>
          <option value="Presencial"></option>
        </datalist>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Descripción</p>
        <textarea type="text" class="inputProf" rows="2" v-model="newDates.description" required></textarea>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Fecha Inicio</p>
        <input type="datetime-local" class="inputProf" style="width: 250px" v-model="newDates.start" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Fecha Fin</p>
        <input type="datetime-local" class="inputProf" style="width: 250px;" v-model="newDates.end" required>
      </div>
    </div>
    <button class="btnCita" @click="validNewDate">Crear</button>
  </div>

  <div v-if="CdateEdit" class="d-flex flex-column align-items-center justify-content-between ModDate">
    <div class="cerrar" @click="CdateEdit = false">✖️</div>
    <h2 class="newDtTitulo">Modificar Cita</h2>
    <div v-if="!editCita" style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center" style="width: 100%">
        <p class="txtProf" style="font-weight: bold;">Titulo Cita</p>
        <div class="d-flex align-items-center" style="margin-bottom: 20px;">
          <input type="text" class="inputProf" v-model="tituloSeek" @keyup.enter="CitaSeek">
          <div style="width: 30px; height:30px; background-color: rgb(164, 200, 251); border-radius: 15px; margin-left: 5px; cursor: pointer;"
          class="d-flex justify-content-center align-items-center" @click="CitaSeek">🔍</div>
        </div>
        <div v-for="(cita, index) in citasSeek" :key="index" class="d-flex flex-column align-items-center" style="width:90%">
          <div class="d-flex justify-content-between align-items-center" style="width:100%; margin-bottom:5px;box-shadow: 0 5px 5px -5px rgb(154, 154, 154);">
            <div style="width:5%; height: 100%; min-height: 40px; background-color: gray; border-radius:4px;"></div>
            <div class="enunCita" style="font-weight: bold;">{{cita.title}}</div>
            <div class="enunCita">{{cita.start}} a {{cita.end}}</div>
            <div style="width:30%">
              <button class="btnEditar" style="margin-right: 5px;" @click="AvilEditDate(cita)">Editar</button>
              <button class="btnEliminar" @click="DeleteDate(cita._id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editCita" class="d-flex flex-column align-items-center" style="width:100%">
      <div style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
        <div class="cerrar" @click="editCita = false">✖️</div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Titulo Cita</p>
          <input type="text" class="inputProf" v-model="DateToEdit.title">
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Correo de Usuario</p>
          <input type="text" class="inputProf" v-model="DateToEdit.email" disabled >
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Modalidad</p>
          <input type="text" class="inputProf" v-model="DateToEdit.modalidad" list="mode" name="mode">
          <datalist id="mode">
            <option value="Virtual"></option>
            <option value="Presencial"></option>
          </datalist>
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Descripción</p>
          <textarea type="text" class="inputProf" rows="2" v-model="DateToEdit.description"></textarea>
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Fecha de Inicio</p>
          <input type="datetime-local" class="inputProf" style="width: 250px" v-model="DateToEdit.start">
        </div>
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Fecha Fin</p>
          <input type="datetime-local" class="inputProf" style="width: 250px" v-model="DateToEdit.end">
        </div>
      </div>
      <button class="btnCita" @click="validEditDate">Editar</button>
    </div>
    
  </div>
    

  <div v-if="Cpost" class="posts d-flex flex-column align-items-center">
    <div class="cerrar" @click="Cpost = false">✖️</div>
    <h2 class="newDtTitulo">Nuevo Post</h2>
    <div class="d-flex col-12">
      <div class="col-10 d-flex flex-column align-items-center" style="padding:15px; box-sizing: border-box; height:55vh; overflow-x: hidden; overflow-y: auto;">
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Titulo Post</p>
          <input type="text" class="inputProf" v-model="newPosts.title">
          <p class="txtProf" style="font-weight: bold;">Imagen de Presentación</p>
          <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenPrest($event)">
        </div>
         <div v-for="(item, index) in newPosts.content" :key="index">
            <div class="cierreInsert" @click="newPosts.content.splice(index, 1);" style="width:30px">✖️</div>
            <textarea v-if="item.tipo === 'textarea'" type="text" class="inputProf" rows="2" v-model="item.value" style="border: 2px dashed gray"></textarea>
            <input v-else-if="item.tipo === 'h2'" type="text" class="inputProf" v-model="item.value" style="border: 2px double gray">
            <textarea v-else-if="item.tipo === 'li'" type="text" class="inputProf" rows="1" v-model="item.value" style="border: 2px dotted gray"></textarea>
            <div v-else-if="item.tipo === 'inputFile'" style="width:100%" class="d-flex flex-column align-items-center">
              <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagen($event, index)">
              <div class="d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center" style="width:42%">
                  <label style="padding:0; margin:0; font-size:15px">Forma</label>
                  <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                  <datalist id="forma">
                    <option value="ClaseA">3 Ancho X 2 Alto</option>
                    <option value="ClaseB">Ancho = Alto</option>
                    <option value="ClaseC">3 Alto X 2 Ancho</option>
                  </datalist>
                </div>
                <div class="d-flex flex-column align-items-center" style="width:28%">
                  <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                  <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                  <datalist id="tamaño">
                    <option value="Grande"></option>
                    <option value="Mediana"></option>
                  </datalist>
                </div>
              </div>
            </div>
            
         </div>
      </div>
      <div class="col-2 d-flex flex-column align-items-center justify-content-between" style="padding:15px 0; box-sizing: border-box; height:55vh;">
          <button class="btnInsert" @click="newPosts.content.push({ tipo: 'h2'})">Insertar Subtitulo</button>
          <button class="btnInsert" @click="newPosts.content.push({ tipo: 'textarea'})">Insertar Texto</button>
          <button class="btnInsert" @click="newPosts.content.push({ tipo: 'li'})">Insertar Guion</button>
          <button class="btnInsert" @click="newPosts.content.push({ tipo: 'inputFile'})">Insertar Imagen</button>

          <button class="btnInsert" @click="savePost" style="background-color: gray">Crear Post</button>
      </div>
    </div>
  </div>
  <div v-if="CpostEdit" class="d-flex flex-column align-items-center justify-content-between posts">
    <div class="cerrar" @click="CpostEdit = false">✖️</div>
    <h2 class="newDtTitulo">Modificar Post</h2>
    <div v-if="!editPost" style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center" style="width: 100%">
        <p class="txtProf" style="font-weight: bold;">Titulo Post</p>
        <div class="d-flex align-items-center" style="margin-bottom: 20px;">
          <input type="text" class="inputProf" v-model="tituloSeekPost" @keyup.enter="PostSeek">
          <div style="width: 30px; height:30px; background-color: rgb(164, 200, 251); border-radius: 15px; margin-left: 5px; cursor: pointer;"
          class="d-flex justify-content-center align-items-center" @click="PostSeek">🔍</div>
        </div>
        <div v-for="(post, index) in postsSeek" :key="index" class="d-flex flex-column align-items-center" style="width:90%">
          <div class="d-flex justify-content-between align-items-center" style="width:100%; margin-bottom:5px;box-shadow: 0 5px 5px -5px rgb(154, 154, 154);">
            <div style="width:5%; height: 100%; min-height: 40px; background-color: gray; border-radius:4px;"></div>
            <div class="enunCita" style="font-weight: bold; width: 60%; font-size: 18px;">{{post.title}}</div>
            <div style="width:35%" class="d-flex justify-content-center">
              <button class="btnEditar" style="margin-right: 5px;" @click="AvilEditPost(post)">Editar</button>
              <button class="btnEliminar" @click="DeletePost(post._id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editPost" class="d-flex flex-column align-items-center" style="width:100%">
      <div style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;">
        <div class="cerrar" @click="regEditPost">✖️</div>
        <div class="d-flex col-12">
          <div class="d-flex flex-column align-items-center col-10" style="padding:5px; box-sizing: border-box; height:55vh; overflow-x: hidden; overflow-y: auto;">
            <div class="d-flex flex-column align-items-center">
              <p class="txtProf" style="font-weight: bold;">Titulo Post</p>
              <input type="text" class="inputProf" v-model="PostToEdit.title">
              <p class="txtProf" style="font-weight: bold;">Imagen de Presentación</p>
              <div style="position:relative" v-if="CpresentatioPost">
                <div class="cierreInsert" @click="quitPresePost" style="width:30px">✖️</div>
                <img :src="`http://localhost:3000/${PostToEdit.presentation}`" width="80px" height="80px" style="margin-bottom: 8px">
              </div>
              <input v-if="!CpresentatioPost" type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenEditPrest($event)">
            </div>
            <div v-for="(item, index) in PostToEdit.content" :key="index">
                <div class="cierreInsert" @click="eliminarRGPost(index)" style="width:30px">✖️</div>
                <textarea v-if="item.tipo === 'textarea'" type="text" class="inputProf" rows="2" v-model="item.value" style="border: 2px dashed gray"></textarea>
                <input v-else-if="item.tipo === 'h2'" type="text" class="inputProf" v-model="item.value" style="border: 2px double gray">
                <textarea v-else-if="item.tipo === 'li'" type="text" class="inputProf" rows="1" v-model="item.value" style="border: 2px dotted gray"></textarea>
                <div v-else-if="item.tipo === 'inputFile'" style="width:100%" class="d-flex flex-column align-items-center">
                  <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenEdit($event, index)">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center" style="width:42%">
                      <label style="padding:0; margin:0; font-size:15px">Forma</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                      <datalist id="forma">
                        <option value="ClaseA">3 Ancho X 2 Alto</option>
                        <option value="ClaseB">Ancho = Alto</option>
                        <option value="ClaseC">3 Alto X 2 Ancho</option>
                      </datalist>
                    </div>
                    <div class="d-flex flex-column align-items-center" style="width:28%">
                      <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                      <datalist id="tamaño">
                        <option value="Grande"></option>
                        <option value="Mediana"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.tipo === 'image'" style="width:100%" class="d-flex flex-column align-items-center">
                  <img :src="`http://localhost:3000/${item.value}`" width="90px" height="90px" style="margin-bottom: 8px">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center" style="width:42%">
                      <label style="padding:0; margin:0; font-size:15px">Forma</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                      <datalist id="forma">
                        <option value="ClaseA">3 Ancho X 2 Alto</option>
                        <option value="ClaseB">Ancho = Alto</option>
                        <option value="ClaseC">3 Alto X 2 Ancho</option>
                      </datalist>
                    </div>
                    <div class="d-flex flex-column align-items-center" style="width:28%">
                      <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                      <datalist id="tamaño">
                        <option value="Grande"></option>
                        <option value="Mediana"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                
            </div>
          </div>
          <div class="col-2 d-flex flex-column align-items-center justify-content-between" style="padding:5px 0; box-sizing: border-box; height:55vh;">
            <button class="btnInsert" @click="PostToEdit.content.push({ tipo: 'h2'})">Insertar Subtitulo</button>
            <button class="btnInsert" @click="PostToEdit.content.push({ tipo: 'textarea'})">Insertar Texto</button>
            <button class="btnInsert" @click="PostToEdit.content.push({ tipo: 'li'})">Insertar Guion</button>
            <button class="btnInsert" @click="PostToEdit.content.push({ tipo: 'inputFile'})">Insertar Imagen</button>

            <button class="btnInsert" @click="EditPost" style="background-color: gray">Editar Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="Cservice" class="posts d-flex flex-column align-items-center">
    <div class="cerrar" @click="Cservice = false">✖️</div>
    <h2 class="newDtTitulo">Nuevo Servicio</h2>
    <div class="d-flex col-12">
      <div class="col-10 d-flex flex-column align-items-center" style="padding:15px; box-sizing: border-box; height:55vh; overflow-x: hidden; overflow-y: auto;">
        <div class="d-flex flex-column align-items-center">
          <p class="txtProf" style="font-weight: bold;">Titulo Servicio</p>
          <input type="text" class="inputProf" v-model="newServices.title">
          <p class="txtProf" style="font-weight: bold;">Imagen de Presentación</p>
          <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenServicePrest($event)">
          <p class="txtProf" style="font-weight: bold;">Descripción de Oferta</p>
          <textarea type="text" class="inputProf" rows="2" v-model="newServices.description"></textarea>
        </div>
         <div v-for="(item, index) in newServices.content" :key="index">
            <div class="cierreInsert" @click="newServices.content.splice(index, 1)" style="width:30px">✖️</div>
            <textarea v-if="item.tipo === 'textarea'" type="text" class="inputProf" rows="2" v-model="item.value" style="border: 2px dashed gray"></textarea>
            <input v-else-if="item.tipo === 'h2'" type="text" class="inputProf" v-model="item.value" style="border: 2px double gray">
            <textarea v-else-if="item.tipo === 'li'" type="text" class="inputProf" rows="1" v-model="item.value" style="border: 2px dotted gray"></textarea>
            <div v-else-if="item.tipo === 'inputFile'" style="width:100%" class="d-flex flex-column align-items-center">
              <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenService($event, index)">
              <div class="d-flex justify-content-center">
                <div class="d-flex flex-column align-items-center" style="width:42%">
                  <label style="padding:0; margin:0; font-size:15px">Forma</label>
                  <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                  <datalist id="forma">
                    <option value="ClaseA">3 Ancho X 2 Alto</option>
                    <option value="ClaseB">Ancho = Alto</option>
                    <option value="ClaseC">3 Alto X 2 Ancho</option>
                  </datalist>
                </div>
                <div class="d-flex flex-column align-items-center" style="width:28%">
                  <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                  <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                  <datalist id="tamaño">
                    <option value="Grande"></option>
                    <option value="Mediana"></option>
                  </datalist>
                </div>
              </div>
            </div>
         </div>
      </div>
      <div class="col-2 d-flex flex-column align-items-center justify-content-between" style="padding:15px 0; box-sizing: border-box; height:55vh;">
          <button class="btnInsert" @click="newServices.content.push({ tipo: 'h2'})">Insertar Subtitulo</button>
          <button class="btnInsert" @click="newServices.content.push({ tipo: 'textarea'})">Insertar Texto</button>
          <button class="btnInsert" @click="newServices.content.push({ tipo: 'li'})">Insertar Guion</button>
          <button class="btnInsert" @click="newServices.content.push({ tipo: 'inputFile'})">Insertar Imagen</button>

          <button class="btnInsert" @click="saveService" style="background-color: gray">Crear Servicio</button>
      </div>
    </div>
  </div>
  <div v-if="CserviceEdit" class="d-flex flex-column align-items-center justify-content-between posts">
    <div class="cerrar" @click="CserviceEdit = false">✖️</div>
    <h2 class="newDtTitulo">Modificar Servicio</h2>
    <div v-if="!editService" style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center" style="width: 100%">
        <p class="txtProf" style="font-weight: bold;">Titulo Servicio</p>
        <div class="d-flex align-items-center" style="margin-bottom: 20px;">
          <input type="text" class="inputProf" v-model="tituloSeekService" @keyup.enter="ServiceSeek">
          <div style="width: 30px; height:30px; background-color: rgb(164, 200, 251); border-radius: 15px; margin-left: 5px; cursor: pointer;"
          class="d-flex justify-content-center align-items-center" @click="ServiceSeek">🔍</div>
        </div>
        <div v-for="(service, index) in servicesSeek" :key="index" class="d-flex flex-column align-items-center" style="width:90%">
          <div class="d-flex justify-content-between align-items-center" style="width:100%; margin-bottom:5px;box-shadow: 0 5px 5px -5px rgb(154, 154, 154);">
            <div style="width:5%; height: 100%; min-height: 40px; background-color: gray; border-radius:4px;"></div>
            <div class="enunCita" style="font-weight: bold; width: 60%; font-size: 18px;">{{service.title}}</div>
            <div style="width:35%" class="d-flex justify-content-center">
              <button class="btnEditar" style="margin-right: 5px;" @click="AvilEditService(service)">Editar</button>
              <button class="btnEliminar" @click="DeleteService(service._id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editService" class="d-flex flex-column align-items-center" style="width:100%">
      <div style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;">
        <div class="cerrar" @click="regEditService">✖️</div>
        <div class="d-flex col-12">
          <div class="d-flex flex-column align-items-center col-10" style="padding:5px; box-sizing: border-box; height:55vh; overflow-x: hidden; overflow-y: auto;">
            <div class="d-flex flex-column align-items-center">
              <p class="txtProf" style="font-weight: bold;">Titulo Servicio</p>
              <input type="text" class="inputProf" v-model="ServiceToEdit.title">
              <p class="txtProf" style="font-weight: bold;">Imagen de Presentación</p>
              <div style="position:relative" v-if="CpresentatioService">
                <div class="cierreInsert" @click="quitPreseService" style="width:30px">✖️</div>
                <img :src="`http://localhost:3000/${ServiceToEdit.presentation}`" width="80px" height="80px" style="margin-bottom: 8px">
              </div>
              <input v-if="!CpresentatioService" type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenEditServicePrest($event)">
              <p class="txtProf" style="font-weight: bold;">Descripción de Oferta</p>
              <textarea type="text" class="inputProf" rows="2" v-model="ServiceToEdit.description"></textarea>
            </div>
            <div v-for="(item, index) in ServiceToEdit.content" :key="index">
                <div class="cierreInsert" @click="eliminarRGService(index)" style="width:30px">✖️</div>
                <textarea v-if="item.tipo === 'textarea'" type="text" class="inputProf" rows="2" v-model="item.value" style="border: 2px dashed gray"></textarea>
                <input v-else-if="item.tipo === 'h2'" type="text" class="inputProf" v-model="item.value" style="border: 2px double gray">
                <textarea v-else-if="item.tipo === 'li'" type="text" class="inputProf" rows="1" v-model="item.value" style="border: 2px dotted gray"></textarea>
                <div v-else-if="item.tipo === 'inputFile'" style="width:100%" class="d-flex flex-column align-items-center">
                  <input type="file" required class="inputProf" style="width:200px" accept=".jpg,.jpeg,.png" @change="handleImagenEditService($event, index)">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center" style="width:42%">
                      <label style="padding:0; margin:0; font-size:15px">Forma</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                      <datalist id="forma">
                        <option value="ClaseA">3 Ancho X 2 Alto</option>
                        <option value="ClaseB">Ancho = Alto</option>
                        <option value="ClaseC">3 Alto X 2 Ancho</option>
                      </datalist>
                    </div>
                    <div class="d-flex flex-column align-items-center" style="width:28%">
                      <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                      <datalist id="tamaño">
                        <option value="Grande"></option>
                        <option value="Mediana"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.tipo === 'image'" style="width:100%" class="d-flex flex-column align-items-center">
                  <img :src="`http://localhost:3000/${item.value}`" width="90px" height="90px" style="margin-bottom: 8px">
                  <div class="d-flex justify-content-center">
                    <div class="d-flex flex-column align-items-center" style="width:42%">
                      <label style="padding:0; margin:0; font-size:15px">Forma</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuef" list="forma" name="forma" placeholder="Seleccione una">
                      <datalist id="forma">
                        <option value="ClaseA">3 Ancho X 2 Alto</option>
                        <option value="ClaseB">Ancho = Alto</option>
                        <option value="ClaseC">3 Alto X 2 Ancho</option>
                      </datalist>
                    </div>
                    <div class="d-flex flex-column align-items-center" style="width:28%">
                      <label style="padding:0; margin:0; font-size:15px">Tamaño</label>
                      <input type="text" class="inputProf" style="width:100%" v-model="item.valuet" list="tamaño" name="tamaño" placeholder="opción">
                      <datalist id="tamaño">
                        <option value="Grande"></option>
                        <option value="Mediana"></option>
                      </datalist>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="col-2 d-flex flex-column align-items-center justify-content-between" style="padding:5px 0; box-sizing: border-box; height:55vh;">
            <button class="btnInsert" @click="ServiceToEdit.content.push({ tipo: 'h2'})">Insertar Subtitulo</button>
            <button class="btnInsert" @click="ServiceToEdit.content.push({ tipo: 'textarea'})">Insertar Texto</button>
            <button class="btnInsert" @click="ServiceToEdit.content.push({ tipo: 'li'})">Insertar Guion</button>
            <button class="btnInsert" @click="ServiceToEdit.content.push({ tipo: 'inputFile'})">Insertar Imagen</button>

            <button class="btnInsert" @click="EditService" style="background-color: gray">Editar Servicio</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="Cpago" class="d-flex flex-column align-items-center creatDate">
    <div class="cerrar" @click="Cpago = false">✖️</div>
    <h2 class="newDtTitulo">Nueva Pago</h2>
    <div style="background-color: white; width: 90%; padding-bottom: 8px; border-radius: 7px;" class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Nombre del Cliente</p>
        <input type="text" class="inputProf" v-model="newPagos.name" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Correo Electrónico</p>
        <input type="text" class="inputProf" v-model="newPagos.email" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Celular (opcional)</p>
        <input type="number" class="inputProf" v-model="newPagos.number" required>
      </div>
      <div class="d-flex flex-column align-items-center">
        <p class="txtProf" style="font-weight: bold;">Monto a Pagar</p>
        <input type="number" min="1100" class="inputProf" v-model="newPagos.price" required>
      </div>
    </div>
    <button class="btnCita" @click="createNewPago">Crear</button>
  </div>

</section>
</template>

<script src="./scripts/Manage.js"></script>
<style scoped src="./estilos/manage.css"></style>
