const MAIN_CHANNEL = Math.random().toString(36)

const channels: { [key: string]: Function[] } = {};

function on(eventType: string, callback: Function) {
    if (callback) {
        channels[eventType] = channels[eventType] || []
        channels[eventType].push(callback);
    }
    else {
        throw new Error("Uncallable function: " + callback);
    }
}

function emit(eventType: string) {
    if (!channels[eventType]) {
        throw new Error("No such channel: " + eventType);
    }
    channels[eventType].forEach(callback => callback());
}

function start(callback: Function) {
    on(MAIN_CHANNEL, () => callback());
    on(MAIN_CHANNEL, () => setImmediate(() => emit(MAIN_CHANNEL)));
    emit(MAIN_CHANNEL);
}

export default { on, emit, start };