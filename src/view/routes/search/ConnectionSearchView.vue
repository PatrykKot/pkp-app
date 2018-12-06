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
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs12>
                        <stop-name-autocomplete label="Stacja początkowa"
                                                :value="fromStop"
                                                :storage-key="fromKey"
                                                @input="setFrom($event)"/>
                    </v-flex>
                    <v-flex xs12>
                        <stop-name-autocomplete label="Stacja końcowa"
                                                :value="toStop"
                                                :storage-key="toKey"
                                                @input="setTo($event)"/>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-btn @click="search"
                               :disabled="!canSearch"
                               block
                               large
                               color="secondary">
                            Szukaj
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import StopNameAutocomplete from "./StopNameAutocomplete";
    import {CONNECTION_RESULTS_VIEW} from '../results/ConnectionResultsView'
    import {addQueryParams} from "../../../router/routerUtils";
    import LimitedArrayStorage from "../../../services/LimitedArrayStorage";

    export const CONNECTION_SEARCH_VIEW = "ConnectionSearchView"

    const FROM_KEY = 'fromHistory'
    const TO_KEY = 'toHistory'
    const MAX_STOPS_HINT_COUNT = 3

    export default {
        name: 'ConnectionSearchView',
        components: {StopNameAutocomplete},

        computed: {
            canSearch() {
                return this.fromStop && this.toStop
            },

            fromStop() {
                return this.$route.query.from
            },

            toStop() {
                return this.$route.query.to
            },

            fromKey() {
                return FROM_KEY
            },

            toKey() {
                return TO_KEY
            }
        },

        methods: {
            setFrom(from) {
                addQueryParams({from})
            },

            setTo(to) {
                addQueryParams({to})
            },

            search() {
                LimitedArrayStorage.put(this.fromKey, this.fromStop, MAX_STOPS_HINT_COUNT)
                LimitedArrayStorage.put(this.toKey, this.toStop, MAX_STOPS_HINT_COUNT)

                this.$router.push({
                    name: CONNECTION_RESULTS_VIEW,
                    params: {
                        from: this.fromStop,
                        to: this.toStop
                    }
                })
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