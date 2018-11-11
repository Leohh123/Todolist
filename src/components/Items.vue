<template>
    <div class="items container">
        <Item v-for="(item, id) in items" :key="id" :name="item.name" :works="item.works" class="mb-1 col-md-10" />
    </div>
</template>

<script>
import Item from "./Item.vue";

export default {
    name: "Items",
    props: ["items"],
    components: {
        Item
    }
};
</script>

<style>
</style>
