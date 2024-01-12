import e from "./ChannelController.js";

const mainChanel = Math.random().toString(36)

e.start = async (callback) => {
    e.on(mainChanel, () => setTimeout(() => e.emit(mainChanel), e.interval));
    e.on(mainChanel, () => callback());
    e.emit(mainChanel);
}

export const events = e;
export const state = {}; 