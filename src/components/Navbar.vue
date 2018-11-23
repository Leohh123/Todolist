<template>
    <b-navbar toggleable="md" type="dark" :variant="$global.variant">
        <b-navbar-brand>Todolist</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item v-for="(item, index) in positions" :key="index" href="javascript:void(0)" :active="selected == item" @click="select(item)">
                    {{ item }}
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <template v-if="name">
                    <b-nav-item active>Hello, {{ name }}</b-nav-item>
                    <b-nav-item href="javascript:void(0)" @click="logout">Logout</b-nav-item>
                </template>
                <template v-else>
                    <b-nav-item href="/user/login.html">Login</b-nav-item>
                    <b-nav-item href="/user/register.html">Register</b-nav-item>
                </template>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import * as utils from "../utils/utils";

export default {
    name: "Navbar",
    props: ["name"],
    data() {
        return {
            selected: "Home", // useless initial val
            positions: ["Home", "Today", "Plan", "Settings", "About"]
        };
    },
    methods: {
        select(item) {
            this.selected = item;
            this.$emit("select", item);
        },
        logout() {
            utils.logout();
        }
    },
    created() {
        this.selected = utils.getPosition();
    }
};
</script>

<style>
</style>
