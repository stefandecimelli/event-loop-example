const INTERVAL = 50;

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
        const mainChanel = Math.random().toString(36)
        this.on(mainChanel, () => setTimeout(() => this.emit(mainChanel), INTERVAL));
        this.on(mainChanel, () => callback());
        this.emit(mainChanel);
    }

}

export default new ChannelController(); // Singleton