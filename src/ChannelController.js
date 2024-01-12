class ChannelController {
    interval = 50;

    constructor() {
        this.channels = {};
        this.state = {};
    }

    on(eventType, callback) {
        this.channels[eventType] = this.channels[eventType] || []
        this.channels[eventType].push(callback);
    }

    emit(eventType) {
        if(!this.channels[eventType]) {
            throw new Error("No such channel: " + eventType);
        }
        this.channels[eventType].forEach(callback => callback());
    }

}

export default new ChannelController(); // Singleton