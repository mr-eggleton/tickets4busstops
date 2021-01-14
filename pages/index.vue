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
  async asyncData({ $http }) {
  

    //const geohash = await getGeoHash()

    //const stops = await $http.$get('https://kkh91b05a8.execute-api.eu-west-2.amazonaws.com/staging/stops/'+geohash)
    //console.log(stops)
    const acto = 370027059;//stops[0].acto_code

    const bustimes = await $http.$get('https://bustimes.org/stops/'+acto+'/times.json')
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
