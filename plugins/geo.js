import Vue from 'vue'
import Geohash from 'latlon-geohash'
import VueGeolocation from 'vue-browser-geolocation'
Vue.use(VueGeolocation)
Vue.use(Geohash)


getGeoHash = async function(x) {
    const coords = await this.$getLocation({
        enableHighAccuracy: false, //defaults to false
        timeout: 30, //defaults to Infinity
        maximumAge: 10 //defaults to 0
    })
          .then(coordinates => {
            console.log(coordinates)
            /*
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            accuracy: position.coords.accuracy
          })*/
          const geohash = Geohash.encode(coordinates.lat, coordinates.lng, 6);

          console.log(geohash)
            return geohash
          });
    };

Vue.use(getGeoHash)
