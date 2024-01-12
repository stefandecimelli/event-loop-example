const MAIN_CHANNEL = Math.random().toString(36)

class ChannelController {
    private channels: { [key: string]: Function[] } = {};

    public on(eventType: string, callback: Function) {
        if (callback) {
            this.channels[eventType] = this.channels[eventType] || []
            this.channels[eventType].push(callback);
        }
        else {
            throw new Error("Uncallable function: " + callback);
        }
    }

    public emit(eventType: string) {
        if (!this.channels[eventType]) {
            throw new Error("No such channel: " + eventType);
        }
        this.channels[eventType].forEach(callback => callback());
    }

    public start(callback: Function) {
        this.on(MAIN_CHANNEL, () => callback());
        this.on(MAIN_CHANNEL, () => setImmediate(() => this.emit(MAIN_CHANNEL)));
        this.emit(MAIN_CHANNEL);
    }

}

export default ChannelController;