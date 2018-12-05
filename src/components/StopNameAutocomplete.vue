<template>
    <v-autocomplete
            :value="value"
            @input="$emit('input', $event)"
            :items="items"
            :loading="loading"
            :label="label"
            :search-input.sync="sync"
            hide-no-data
            hide-details
            no-filter/>
</template>

<script>
    import StopsService from "../services/StopsService";
    import {clearArray} from "../util/arrayUtil";

    export default {
        name: "StopNameAutocomplete",
        props: ['value', 'label'],

        data: () => ({
            items: [],
            loading: false,
            sync: null,
            timerId: null
        }),

        created() {
            if (this.value) {
                this.load(this.value)
            }
        },

        watch: {
            sync(val) {
                let me = this
                clearTimeout(this.timerId);
                this.timerId = setTimeout(function () {
                    me.load(val)
                }, 300)
            }
        },

        methods: {
            load(query) {
                if (!this.loading) {
                    if (!query) {
                        clearArray(this.items)
                    }
                    else {
                        this.loading = true
                        StopsService.getStops(query)
                            .then(stops => {
                                clearArray(this.items)
                                stops.forEach(item => this.items.push(item))
                            })
                            .finally(() => this.loading = false)
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>