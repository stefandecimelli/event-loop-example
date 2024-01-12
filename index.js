import { events, state } from "./src/events.js";

events.on("increment", () => {
    state.value = (state.value || 0) + 1;
})

events.start(() => {
    
    events.emit("increment");
    events.emit("increment");

    console.log("Valule from state:");
    console.log(state.value);

})