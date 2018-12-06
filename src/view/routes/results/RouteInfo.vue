<template>
    <v-list-group v-model="active"
                  no-action>
        <v-list-tile slot="activator">
            <v-list-tile-content>
                <v-list-tile-title>
                    <span>
                        {{formattedStartDate}} - {{formattedFinishDate}}
                    </span>
                    <span style="margin-left: 10px">
                        ({{formattedTravelTime}})
                    </span>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    <span>
                        Przesiadek: {{route.trainRoutes.length}}
                    </span>
                </v-list-tile-sub-title>
                <v-list-tile-sub-title>
                    <span>
                        Dystans: {{route.kilometers}} km
                    </span>
                </v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
        <v-list two-line>
            <template v-for="(trainRoute, index) in route.trainRoutes">
                <train-route-info :train-route="trainRoute"/>
                <v-divider
                        v-if="index + 1 < route.trainRoutes.length"
                        :key="index"/>
            </template>
        </v-list>
    </v-list-group>
</template>

<script>
    import {formatDate} from "../../../util/dateUtils";
    import TrainRouteInfo from "./TrainRouteInfo";

    export default {
        name: "RouteInfo",
        components: {TrainRouteInfo},
        props: ['route'],

        data: () => ({
            active: false
        }),

        computed: {
            formattedStartDate() {
                return formatDate(this.route.travelStartDate)
            },

            formattedFinishDate() {
                return formatDate(this.route.travelFinishDate)
            },

            travelTimeMin() {
                return this.route.travelTimeMs / 1000 / 60
            },

            travelTimeHour() {
                return Math.floor(this.travelTimeMin / 60)
            },

            travelTimeDiffMin() {
                return this.travelTimeMin - this.travelTimeHour * 60
            },

            formattedTravelTime() {
                let text = this.travelTimeDiffMin + ' min.'
                if (this.travelTimeHour > 0) {
                    text = this.travelTimeHour + ' godz. ' + text
                }

                return text
            }
        }
    }
</script>