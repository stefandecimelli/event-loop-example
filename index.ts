import { events, state } from "./events"

events.on("increment", (events) => {
    state.value = (state.value || 0) + Math.random()
    events.emit("checkstate")
})

events.on("checkstate", () => {
    if (state.value >= 10_000) {
        state.value = 0
    }
})

events.start(() => {

    events.emit("increment")
    events.emit("increment")

    console.log("Value from state:")
    console.log(state.value)

})