<template>
    <div>
        <v-toolbar dark
                   extended
                   color="primary"
                   extension-height="7">
            <v-toolbar-title>
                <span>
                    Wyszukaj połączeń
                </span>
            </v-toolbar-title>
            <v-progress-linear v-if="progress"
                               slot="extension"
                               :indeterminate="true"
                               color="white"
                               class="ma-0"/>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs12>
                        <stop-name-autocomplete label="Stacja początkowa"
                                                v-model="fromStop"/>
                    </v-flex>
                    <v-flex xs12>
                        <stop-name-autocomplete label="Stacja końcowa"
                                                v-model="toStop"/>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-btn @click="search"
                               block
                               large
                               color="secondary">
                            Szukaj
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container>
                <div class="code-container">
                    <pre v-highlightjs="result">
                        <code class="javascript"></code>
                    </pre>
                </div>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import StopNameAutocomplete from "../../components/StopNameAutocomplete";
    import ConnectionsService from "../../services/ConnectionsService";
    import VueHighlightJS from 'vue-highlightjs'
    import Vue from 'vue'

    export const CONNECTION_SEARCH_VIEW = "ConnectionSearchView"

    Vue.use(VueHighlightJS)

    export default {
        name: 'ConnectionSearchView',
        components: {StopNameAutocomplete},

        data: () => ({
            progress: false,
            fromStop: null,
            toStop: null,
            result: ''
        }),

        methods: {
            search() {
                if (this.fromStop && this.toStop) {
                    ConnectionsService.find(this.fromStop, this.toStop)
                        .then(connection => {
                            this.result = JSON.stringify(connection, null, 2)
                        })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .code-container {
        code {
            display: block;
        }
    }
</style>