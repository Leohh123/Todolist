<template>
    <div id="progress" class="container">
        <div class="row">
            <div class="col-md-10 offset-1 mt-3">
                <div class="mb-2">
                    <b-progress :max="1" show-progress animated>
                        <template v-if="expProgress > progress">
                            <b-progress-bar :value="progress" :precision="2" :variant="$global.variant"></b-progress-bar>
                            <b-progress-bar :value="expProgress - progress" :precision="2" :variant="$global.variant != 'danger' ? 'danger' : 'bilibili'"></b-progress-bar>
                        </template>
                        <template v-else-if="expProgress < progress">
                            <b-progress-bar :value="expProgress" :precision="2" :variant="$global.variant"></b-progress-bar>
                            <b-progress-bar :value="progress - expProgress" :precision="2" :variant="$global.variant != 'success' ? 'success' : 'bilibili'"></b-progress-bar>
                        </template>
                        <template v-else>
                            <b-progress-bar :value="progress" :precision="2" :variant="$global.variant"></b-progress-bar>
                        </template>
                    </b-progress>
                </div>
                <b-card>
                    <div class="container mb-2">
                        <div class="row">
                            <div class="text-left col-md-3">
                                <strong>Begin: </strong> {{ begin }}
                            </div>
                            <div class="text-right col-md-3 offset-6">
                                <strong>End: </strong> {{ end }}
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <!-- progress expectation excess -->
                            <div class="text-left col-md-3">
                                <strong>Progress: </strong> {{ toPercentage(progress) }}
                            </div>
                            <div class="text-center col-md-4 offset-1">
                                <strong>Expectation: </strong> {{ toPercentage(expProgress) }}
                            </div>
                            <div class="text-right col-md-3 offset-1">
                                <strong>Excess: </strong> {{ toPercentage(progress - expProgress) }}
                            </div>
                        </div>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as utils from "../utils/utils";

export default {
    name: "Progress",
    props: ["plan", "begin", "end", "days", "date"],
    methods: {
        toPercentage: utils.toPercentage
    },
    computed: {
        deltaDay() {
            return utils.getDeltaDays(this.begin, this.end);
        },
        totalProp() {
            var tot = 0;
            for (var now of this.plan) {
                tot += now.proportion;
            }
            return tot;
        },
        deltaProps() {
            var arr = [];
            for (var now of this.plan) {
                arr[now.name] = now.proportion / (this.totalProp * now.total);
            }
            return arr;
        },
        progress() {
            var sum = 0;
            for (var day of this.days) {
                for (var item of day.items) {
                    var p = this.deltaProps[item.name];
                    if (p != undefined && item.works) {
                        sum += item.works.length * p;
                    }
                }
            }
            return utils.toRate(sum);
        },
        expProgress() {
            return utils.toRate(
                (new Date().getTime() - new Date(this.begin).getTime()) /
                    (this.deltaDay * 86400000)
            );
        },
        todayProgress() {
            for (var day of this.days) {
                if (day.date == this.date) {
                    var sum = 0;
                    for (var item of day.items) {
                        var p = this.deltaProps[item.name];
                        if (p != undefined && item.works) {
                            sum += item.works.length * p;
                        }
                    }
                    return sum;
                }
            }
            return 0;
        }
    }
};
</script>

<style>
</style>
