<template>
    <v-list-tile @click="" class="train-route-info-tile">
        <v-list-tile-content>
            <v-list-tile-title>
                {{trainRoute.trainId}}
            </v-list-tile-title>
            <v-list-tile-sub-title>
                <template v-if="trainRoute.trainName">
                    {{formattedTrainName}}
                </template>
                <template v-else>
                    Brak nazwy pociągu
                </template>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
                Dystans: {{trainRoute.kilometers}} km
            </v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
        name: "TrainRouteInfo",
        props: ['trainRoute'],

        computed: {
            formattedTrainName() {
                let name = this.trainRoute.trainName.toLowerCase()
                return this.upperCaseFirst(name)
            }
        },

        methods: {
            upperCaseFirst(text) {
                return text.charAt(0).toUpperCase() + text.slice(1)
            }
        }
    }
</script>

<style lang="scss">
    .train-route-info-tile > a {
        padding-left: 40px !important;
    }
</style>