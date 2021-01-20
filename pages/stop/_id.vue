<template>
  <div>
    <section class="section">
      <div class="columns is-multiline">
        <ticket-button v-for="ticket in tickets" :key="ticket.uuid" :ticket="ticket" />
      </div>
    </section>

    <section class="section">
      <div class="columns is-multiline">
        <card  v-for="time in times" :key="time.service.aimed_departure_time" icon="bus" :title="time.service.line_name">
          {{ time.destination.name}} 
          <br />
          {{ time.aimed_departure_time | timeRelative }}
         :
          {{ time.aimed_departure_time | formatDate }}
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '~/components/Card'
import ResourceRenderer from '~/components/ResourceRenderer.vue'
import TicketButton from '~/components/TicketButton'
import TicketCard from '~/components/TicketCard'


export default {
  name: 'HomePage',
  methods: {
    log: function(x) {
        console.log(x);
        return {};
    },


  }, 
  async asyncData({ params, $http }) {
  

    //const geohash = await getGeoHash()

    
    const atco = params.id //370027059;//stops[0].acto_code
    console.log("atco", atco)
    const bustimes = await $http.$get('https://bustimes.org/stops/'+atco+'/times.json')
    const times = bustimes.times;

    const tickets = await $http.$get('https://api.ticketr.toms-home.co.uk/ticketr/tickets')
    
    //setTimeout(Window.location.reload, 10000, true);

    return { times, tickets };
  },
 
  components: {
    Card,
    TicketButton,
    TicketCard,
    ResourceRenderer,
  }
}
</script>
