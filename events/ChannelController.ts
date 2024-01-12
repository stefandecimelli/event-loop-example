const INTERVAL = 0;
const MAIN_CHANNEL = Math.random().toString(36)

class ChannelController {
    private channels: { [key: string]: Function[] } = {};

    public on(eventType: string, callback: (emit: ChannelController) => void) {
        if(callback) {
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
        this.channels[eventType].forEach(callback => callback(this));
    }

    public start = async (callback: Function) => {
        this.on(MAIN_CHANNEL, () => setTimeout(() => this.emit(MAIN_CHANNEL), INTERVAL));
        this.on(MAIN_CHANNEL, () => callback(this.emit));
        this.emit(MAIN_CHANNEL);
    }

}

export default ChannelController;