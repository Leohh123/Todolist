<template>
    <div id="days" class="container">
        <div class="row">
            <Day v-for="(day, id) in days" :key="id" :date="day.date" :items="day.items" :note="day.note" class="col-md-10 offset-1 mt-3" />
        </div>
    </div>
</template>

<script>
import Day from "./Day.vue";

export default {
    name: "Days",
    props: ["plan", "days"],
    components: {
        Day
    }
};
</script>

<style>
</style>
