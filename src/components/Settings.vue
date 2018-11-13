<template>
    <div id="settings" class="container">
        <div class="row">
            <b-card title="Settings" class="col-md-10 offset-1 mt-3">
                <b-form-group id="theme" horizontal :label-cols="4" breakpoint="md" description="Choose your theme color" label="Theme" label-for="theme_sel">
                    <b-form-select id="theme_sel" v-model="theme" :options="this.$global.theme"></b-form-select>
                </b-form-group>
                <b-btn @click="reload" :variant="this.$global.variant">OK</b-btn>
            </b-card>
        </div>
    </div>
</template>

<script>
import * as utils from "../utils/utils";

export default {
    name: "Settings",
    data() {
        return {
            theme: this.$global.variant
        };
    },
    methods: {
        reload() {
            location.reload();
        }
    },
    watch: {
        theme() {
            utils.setTheme(this.theme);
        }
    }
};
</script>

<style>
</style>
