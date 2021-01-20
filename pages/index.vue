<template>
  <div>
    <section class="section">
      <div class="columns is-multiline">
        <card v-for="stop in stops.stops" :key="stop.atco_code" :title="stop.name" icon="bus">
          <NuxtLink :to="`stop/${stop.atco_code}`">
            {{ stop.landmark_name }}
          </NuxtLink>
                  
        </card>
      </div>
    </section>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  async asyncData({ app, $http }) {
    const location = await app.$getGeoLocation()
    const geohash = await app.$getGeoHash(location, 6)
    const stops = await $http.$get('https://kkh91b05a8.execute-api.eu-west-2.amazonaws.com/staging/stops/'+geohash)
    return { stops }
  },
  methods:{

  },
  components: {
    Card
  }
}
</script>
