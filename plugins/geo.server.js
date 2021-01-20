
export default ({ app }, inject) => {
    // Inject $hello(msg) in Vue, context and store.
    //https://www.openstreetmap.org/#map=17/53.37788/-1.46313
    const getGeoLocation = function(){   
        const pos = {
                "coords":{
                    "latitude"  :  53.37788 ,
                    "longitude" :  -1.46313
                }
        }
        //console.log("pos", pos)
        return pos
  }
  inject('getGeoLocation', getGeoLocation);
}
