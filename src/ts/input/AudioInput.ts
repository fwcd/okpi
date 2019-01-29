import { Listener } from "../utils/ListenerList";
import { InputLock } from "./InputLock";

export interface AudioInput {
	start(): void;
	
	stop(): void;
	
	setLock(lock: InputLock): void;
	
	addDataListener(listener: Listener<any>): void;
	
	removeDataListener(listener: Listener<any>): void;
}
