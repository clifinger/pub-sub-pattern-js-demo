const EventBusFactory = () => {
    /**
     * @type {Record<string, Set<((payload: any) => any)> | undefined>}
     */
    const listeners = {};

    /**
     * Publish message
     * @param {string} event
     * @param {any} payload
     */
    const fire = (event, payload) => {
        // publish message here
        const eventListeners = listeners[event]

        return eventListeners ? [...eventListeners].map((listener) => listener(payload)) : []
    };

    /**
     * Subscribe to a message
     * @param {string} event 
     * @param {(payload: any) => any} listener
     */
    const listen = (event, listener) => {
        if (!(event in listeners)) {
            listeners[event] = new Set([listener])
        } else {
            listeners[event].add(listener)
        }
    };


    /**
     * Unsubscribe from an event
     * @param {string} event 
     * @param {(payload: any) => any} removeListener
     */
    const unsubscribe = (event, removeListener) => {
        if ((event in listeners)) {
            listeners[event].delete(removeListener)
        }
    };

    return {
        fire,
        listen,
        unsubscribe
    }
}


module.exports = EventBusFactory
