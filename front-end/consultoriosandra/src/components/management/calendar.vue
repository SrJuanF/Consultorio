<template>
    <div>
        <v-sheet class="d-flex" height="54" tile style="margin-bottom: 10px;">
            <v-select color="primary" v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" dense hide-details></v-select>
            <v-select color="primary" v-model="weekday" :items="weekdays" class="ma-2" label="weekdays" variant="outlined" dense hide-details></v-select>
        </v-sheet>
        
        <v-sheet>
            <v-calendar ref="calendar" v-model="value" :events="getDEvent" :view-mode="type" :weekdays="weekday" color="#E0E0E0">
                
            </v-calendar>
        </v-sheet>
    </div>
</template>

<script>
//import { useDate } from 'vuetify'
export default {
    name: 'Calendar',
    props: {snap: {type:Array}},
    components: {},
    data: () =>({
      type: 'week',
      types: ['month', 'week', 'day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [new Date()],
      colors: ['#EF5350', '#69F0AE', '#7CB342', '#0288D1', '#651FFF', '#F50057', '#B71C1C', '#BA68C8', '#7986CB', '#DCE775', '#FFB300'],
    }),
    mounted () {
      //const adapter = useDate()
      // start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date()))

    },
    methods:{
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      /*getEvents (ref) {
        events = [];
        this.ref.forEach(snapp => {
          this.events.push({
            title: snapp.title,
            start: new Date(snapp.start), //Convertir en valid date
            end: new Date(snapp.end),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            //allDay: !allDay,
          })
        });
      },*/
    },
    created(){},
    computed:{
      getDEvent(){
        var events = [];
        if(this.snap){
          this.snap.forEach(snapp => {
            events.push({
              title: snapp.title,
              start: new Date(snapp.start), //Convertir en valid date
              end: new Date(snapp.end),
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              //allDay: !allDay,
            })
          });
        }
        return events
      }
    },
}
</script>

<style scoped>

</style>