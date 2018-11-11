<template>
    <div id="today" class="container">
        <div class="row">
            <b-card v-for="(item, item_id) in items" :key="item_id" :title="item.name" class="col-md-10 offset-1 mt-3">
                <b-input-group v-for="(work, work_id) in item.works" :key="work_id" class="mb-2">
                    <b-form-input v-model="items[item_id].works[work_id]" type="text" placeholder="Notes here...">
                        {{ item_id }} {{ work_id }}
                    </b-form-input>
                    <b-input-group-append>
                        <b-btn @click="items[item_id].works.splice(work_id, 1)" :variant="`outline-${$global.variant}`">x</b-btn>
                    </b-input-group-append>
                </b-input-group>
                <b-btn @click="items[item_id].works.push('')" :variant="`outline-${$global.variant}`">+</b-btn>
            </b-card>
            <b-card class="col-md-10 offset-1 my-4">
                <b-form-input v-model="note" placeholder="How's your day..." class="mb-3"></b-form-input>
                <b-btn @click="submitData" :variant="$global.variant">Submit</b-btn>
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Today",
    props: ["plan", "days", "date"],
    data() {
        return {
            items: [],
            note: ""
        };
    },
    methods: {
        getData(days, plan) {
            var ids = [],
                cnt = 0;
            this.items = [];
            for (var now of plan) {
                this.items.push({
                    name: now.name,
                    works: []
                });
                ids[now.name] = cnt++;
            }
            for (var now of days) {
                if (now.date == this.date) {
                    for (var item of now.items) {
                        var nowID = ids[item.name];
                        if (nowID != undefined && item.works) {
                            for (var work of item.works) {
                                this.items[nowID].works.push(work);
                            }
                        }
                    }
                    this.note = now.note;
                    break;
                }
            }
        },
        submitData() {
            this.$emit("submit", {
                date: this.date,
                items: this.items,
                note: this.note
            });
        }
    },
    watch: {
        days(val) {
            this.getData(val, this.plan);
        },
        plan(val) {
            this.getData(this.days, val);
        }
    }
};
</script>

<style>
</style>
