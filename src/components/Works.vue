<template>
    <div class="works">
        <ul>
            <li v-for="(work, id) in works" :key="id">
                {{ work }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Works",
    props: ["works"]
};
</script>

<style>
</style>
