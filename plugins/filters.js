import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('formatDate', val =>moment(val).format('h:mm a'))

Vue.filter('timeRelative', val =>moment(val).fromNow())