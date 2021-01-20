import VueGeolocation from 'vue-browser-geolocation'

export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    const getGeoLocation = async function(){   
        return await VueGeolocation.getLocation({
            enableHighAccuracy: false, //defaults to false
            timeout: 30, //defaults to Infinity
            maximumAge: 10 //defaults to 0
        })
    }
    inject('getGeoLocation', getGeoLocation);
  }
  