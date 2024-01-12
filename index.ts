import { events, state } from "./events"

events.on("increment", () => {
    state.value = (state.value || 0) + 150
    events.emit("checkstate")
})

events.on("checkstate", () => {
    if (state.value >= 10_000) {
        state.value = 0
    }
})

events.start(() => {
    events.emit("increment")
    console.log("Value from state: " + state.value)
})