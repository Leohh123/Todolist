<template>
    <div id="plan" class="container">
        <div class="row">
            <b-card title="Make your plan" class="col-md-10 offset-1 mt-3">
                <b-input-group prepend="From" class="mb-2">
                    <b-form-input v-model="beginTime" type="date"></b-form-input>
                    <b-input-group-prepend is-text>To</b-input-group-prepend>
                    <b-form-input v-model="endTime" type="date"></b-form-input>
                </b-input-group>
                <b-input-group v-for="(item, id) in plan" :key="id" class="mb-2">
                    <b-form-input :value="item.name" v-model="plan[id].name" type="text" placeholder="Name"></b-form-input>
                    <b-form-input :value="item.total" v-model.number="plan[id].total" type="number" placeholder="Total"></b-form-input>
                    <b-form-input :value="item.proportion" v-model.number="plan[id].proportion" type="number" placeholder="Proportion"></b-form-input>
                    <b-input-group-append>
                        <b-btn @click="plan.splice(id, 1)" :variant="`outline-${$global.variant}`">x</b-btn>
                    </b-input-group-append>
                </b-input-group>
                <b-btn @click="plan.push({name: '', total: '', proportion: ''})" :variant="$global.variant">+</b-btn>
                <b-btn @click="submitPlan" :variant="$global.variant">Submit</b-btn>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Plan",
    props: ["plan", "begin", "end"],
    data() {
        return {
            beginTime: "",
            endTime: ""
        };
    },
    methods: {
        submitPlan() {
            this.$emit("submit", {
                plan: this.plan,
                begin: this.beginTime,
                end: this.endTime
            });
        }
    },
    watch: {
        begin(val) {
            this.beginTime = val;
        },
        end(val) {
            this.endTime = val;
        }
    }
};
</script>

<style>
</style>
