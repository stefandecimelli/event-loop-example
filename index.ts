import { events, state } from "./events"

events.on("increment", (events) => {
    state.value = (state.value || 0) + 1
    events.emit("checkstate")
})

events.on("checkstate", () => {
    if (state.value >= 10) {
        state.value = 0
    }
})

events.start(() => {

    events.emit("increment")
    events.emit("increment")

    console.log("Value from state:")
    console.log(state.value)

})