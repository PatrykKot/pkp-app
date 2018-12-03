import Vue from 'vue'
import Router from 'vue-router'

import ConnectionSearchView, {CONNECTION_SEARCH_VIEW} from '../view/routes/ConnectionSearchView'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: CONNECTION_SEARCH_VIEW,
        component: ConnectionSearchView,
        props: true
    }]
})
