import Vue from 'vue'
import Router from 'vue-router'

import ConnectionSearchView, {CONNECTION_SEARCH_VIEW} from '../view/routes/search/ConnectionSearchView'
import ConnectionResultsView, {CONNECTION_RESULTS_VIEW} from '../view/routes/results/ConnectionResultsView'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: CONNECTION_SEARCH_VIEW,
        component: ConnectionSearchView,
        props: true
    }, {
        path: '/results/:from/:to',
        name: CONNECTION_RESULTS_VIEW,
        component: ConnectionResultsView,
        props: true
    }]
})
