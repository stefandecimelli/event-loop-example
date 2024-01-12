const INTERVAL = 50;
const MAIN_CHANNEL = Math.random().toString(36)

class ChannelController {
    private channels: {[key: string]: Function[]};

    constructor() {
        this.channels = {};
    }

    on(eventType: string, callback: Function) {
        this.channels[eventType] = this.channels[eventType] || []
        this.channels[eventType].push(callback);
    }

    emit(eventType: string) {
        if(!this.channels[eventType]) {
            throw new Error("No such channel: " + eventType);
        }
        this.channels[eventType].forEach(callback => callback());
    }

    start = async (callback: Function) => {
        this.on(MAIN_CHANNEL, () => setTimeout(() => this.emit(MAIN_CHANNEL), INTERVAL));
        this.on(MAIN_CHANNEL, () => callback());
        this.emit(MAIN_CHANNEL);
    }

}

export default new ChannelController(); // Singleton