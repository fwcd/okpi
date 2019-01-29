import { Listener } from "../../utils/ListenerList";

export interface AudioInput {
	start(): void;
	
	stop(): void;
	
	addDataListener(listener: Listener<any>): void;
	
	removeDataListener(listener: Listener<any>): void;
}
