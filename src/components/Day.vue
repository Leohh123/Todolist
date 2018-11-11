<template>
    <b-collapse :id="`day_${date}`" visible>
        <b-card :title="date">
            <Items :items="items" />
            <p class="card-text mt-3">
                <strong>Note: </strong>{{ note }}</p>
        </b-card>
    </b-collapse>
</template>

<script>
import Items from "./Items.vue";

export default {
    name: "Day",
    props: ["date", "items", "note"],
    components: {
        Items
    }
};
</script>

<style>
</style>
