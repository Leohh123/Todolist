import * as utils from "./utils";

export default {
    variant: utils.getCookie("theme") || "bilibili",
    theme: [{
            value: "bilibili",
            text: "Pink"
        },
        {
            value: "primary",
            text: "Blue"
        },
        {
            value: "secondary",
            text: "Grey"
        },
        {
            value: "success",
            text: "Green"
        },
        {
            value: "danger",
            text: "Red"
        },
        {
            value: "warning",
            text: "Yellow"
        },
        {
            value: "info",
            text: "Cyan"
        },
        {
            value: "light",
            text: "White"
        },
        {
            value: "dark",
            text: "Black"
        }
    ],
    clockInReward: {
        clock: 1,
        finish: 5,
        excess: 3,
        plan: 10 // future function: extra reward to each finished plan
    }
}