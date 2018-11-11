<template>
    <div id="settings" class="container">
        <div class="row">
            <b-card class="col-md-10 offset-1 mt-3">
                Theme:
                <b-form-select v-model="theme" :options="this.$global.theme"></b-form-select>
            </b-card>
        </div>
    </div>
</template>

<script>
import * as utils from "../utils/utils";
import Vue from "vue";

export default {
    name: "Settings",
    data() {
        return {
            theme: this.$global.variant
        };
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
