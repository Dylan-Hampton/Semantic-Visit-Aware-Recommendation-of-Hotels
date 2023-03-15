export interface IAddMarkerData {
    test: string;
}

export interface IAddLineData {

}

export default class MapController {
    public static ADD_MARKER: string = "AddMarker";
    public static ADD_LINE: string = "AddLine";

    private static instance: MapController;
    private subscribers: { [key: string]: Function[] } = {};
  
    private constructor() {}
  
    static getInstance(): MapController {
      if (!MapController.instance) {
        MapController.instance = new MapController();
      }
      return MapController.instance;
    }
  
    // Subscribe a listener function to a specific event
    subscribe(eventName: string, listener: Function): void {
      if (!this.subscribers[eventName]) {
        this.subscribers[eventName] = [];
      }
      this.subscribers[eventName].push(listener);
    }
  
    // Unsubscribe a listener function from a specific event
    unsubscribe(eventName: string, listener: Function): void {
      if (!this.subscribers[eventName]) {
        return;
      }
      const index = this.subscribers[eventName].indexOf(listener);
      if (index !== -1) {
        this.subscribers[eventName].splice(index, 1);
      }
    }
  
    // Publish an event with optional data to all subscribers
    publish(eventName: string, data?: any): void {
      if (!this.subscribers[eventName]) {
        return;
      }
      this.subscribers[eventName].forEach((listener) => {
        listener(data);
      });
    }
}