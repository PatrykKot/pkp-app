<template>
    <div>
        <v-toolbar dark
                   extended
                   color="primary"
                   extension-height="5">
            <v-toolbar-title>
                <span class="title">
                    {{from}} - {{to}}
                </span>
            </v-toolbar-title>
            <v-progress-linear v-if="progress"
                               slot="extension"
                               :indeterminate="true"
                               color="white"
                               class="ma-0"/>
        </v-toolbar>
        <v-content>
            <v-layout row>
                <v-flex xs12>
                    <v-list two-line>
                        <template v-for="(route, index) in routes">
                            <route-info :route="route"/>
                            <v-divider
                                    v-if="index + 1 < routes.length"
                                    :key="index"/>
                        </template>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
    import ConnectionsService from "../../../services/ConnectionsService";
    import {clearArray} from "../../../util/arrayUtil";
    import RouteInfo from "./RouteInfo";

    export const CONNECTION_RESULTS_VIEW = "ConnectionResultsView"

    export default {
        name: "ConnectionResultsView",
        components: {RouteInfo},
        props: ['from', 'to'],

        data: () => ({
            progress: false,
            routes: []
        }),

        created() {
            this.progress = true

            ConnectionsService.find(this.from, this.to)
                .then(data => {
                    clearArray(this.routes)
                    data.routes.forEach(route => this.routes.push(route))
                })
                .finally(() => this.progress = false)
        }
    }
</script>