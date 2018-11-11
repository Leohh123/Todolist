<template>
    <div id="todolist">
        <Navbar :name="name" @select="position = $event" />
        <Nobody v-if="!name" />
        <template v-else>
            <div v-show="position == 'Home'">
                <Progress :plan="plan" :begin="begin" :end="end" :days="days" :date="date" />
                <Days :plan="plan" :days="days" />
            </div>
            <div v-show="position == 'Today'">
                <Today :plan="plan" :days="days" :date="date" @submit="submitToday" />
            </div>
            <div v-show="position == 'Plan'">
                <Plan :plan="plan" :begin="begin" :end="end" :days="days" @submit="submitPlan" />
            </div>
            <div v-show="position == 'About'">
                <About/>
            </div>
            <div v-show="position == 'Settings'">
                <Settings/>
            </div>
        </template>
    </div>
</template>

<script>
import * as utils from "../utils/utils";
import Navbar from "./Navbar.vue";
import Days from "./Days.vue";
import Today from "./Today.vue";
import Plan from "./Plan.vue";
import Nobody from "./Nobody.vue";
import Progress from "./Progress.vue";
import About from "./About.vue";
import Settings from "./Settings.vue";

export default {
    name: "Todolist",
    components: {
        Navbar,
        Days,
        Today,
        Plan,
        Nobody,
        Progress,
        About,
        Settings
    },
    data() {
        return {
            name: "Leohh",
            position: "Home",
            date: utils.getDate(),
            begin: "",
            end: "",
            plan: [],
            days: []
        };
    },
    computed: {},
    methods: {
        submitToday(today) {
            utils.post("php/settoday.php", today, data => {
                location.reload();
            });
        },
        submitPlan(plan) {
            utils.post("php/setplan.php", plan, data => {
                location.reload();
            });
        },
        getName() {
            utils.post("/user/php/whoami.php", data => {
                this.name = data;
            });
        },
        getDays() {
            utils.post("php/getdays.php", data => {
                this.days = JSON.parse(data);
            });
        },
        getPlan() {
            utils.post("php/getplan.php", data => {
                data = JSON.parse(data);
                this.plan = data.plan;
                this.begin = data.begin;
                this.end = data.end;
            });
        }
    },
    created() {
        this.position = utils.getPosition();
        this.getName();
        this.getDays();
        this.getPlan();
    }
};
</script>

<style>
.bd {
    border: 1px black solid;
}
.btn-bilibili {
    background-color: #fb7299;
    border: 0.02133rem solid #fb7299;
    color: #fff;
}
.btn-bilibili:hover {
    color: #fff;
    background-color: #ee83ad;
    border-color: #ee83b0;
}
.bg-bilibili {
    background-color: #fb7299 !important;
}
.text-bilibili {
    color: #fb7299 !important;
}
.badge-bilibili {
    color: #fff;
    background-color: #fb7299;
}
.btn-outline-bilibili {
    color: #fb7299;
    background-color: transparent;
    background-image: none;
    border-color: #fb7299 !important;
}
.btn-outline-bilibili:hover {
    color: #fff;
    background-color: #fb7299;
    border-color: #fb7299;
}
.btn-outline-bilibili:focus,
.btn-outline-bilibili.focus {
    box-shadow: 0 0 0 0.2rem #fb729980 !important;
}
.badge-outline-bilibili {
    color: #fb7299;
    border: 1px solid #fb7299;
}
.badge-outline-primary {
    color: #007bff;
    border: 1px solid #007bff;
}
.badge-outline-secondary {
    color: #6c757d;
    border: 1px solid #6c757d;
}
.badge-outline-success {
    color: #28a745;
    border: 1px solid #28a745;
}
.badge-outline-danger {
    color: #dc3545;
    border: 1px solid #dc3545;
}
.badge-outline-warning {
    color: #ffc107;
    border: 1px solid #ffc107;
}
.badge-outline-info {
    color: #17a2b8;
    border: 1px solid #17a2b8;
}
.badge-outline-light {
    color: #f8f9fa;
    border: 1px solid #f8f9fa;
}
.badge-outline-dark {
    color: #343a40;
    border: 1px solid #343a40;
}
</style>
