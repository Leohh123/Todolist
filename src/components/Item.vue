<template>
    <b-card class="item container">
        <div class="row">
            <h5 class="col-md-10 py-2">{{ name }}
                <b-badge :variant="`outline-${$global.variant}`">{{ (works) ? works.length : 0 }}</b-badge>
            </h5>
            <div class="col-md-2">
                <b-btn v-b-toggle="`item_clp_${ID}`" :variant="`outline-${$global.variant}`" class="float-right">
                    <span class="when-closed">Show</span>
                    <span class="when-opened">Hide</span>
                </b-btn>
            </div>
        </div>
        <b-collapse visible :id="`item_clp_${ID}`">
            <Works :works="works" />
        </b-collapse>
    </b-card>
</template>

<script>
import * as utils from "../utils/utils";
import Works from "./Works.vue";

export default {
    name: "Item",
    props: ["name", "works"],
    components: {
        Works
    },
    data() {
        return {
            ID: utils.genID(),
            show: []
        };
    }
};
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
    display: none;
}
</style>
