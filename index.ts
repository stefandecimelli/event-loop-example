import { events, state } from "./events"

events.on("increment", () => {
    state.value = (state.value || 0) + 175
    events.emit("checkstate")
})

events.on("checkstate", () => {
    if (state.value >= 10_000) {
        state.value = state.value - 10_000
    }
})

events.start(() => {
    events.emit("increment")
    console.log("Value from state: " + state.value)
})