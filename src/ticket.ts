import axios from "axios";
import { AndyTicket } from "./index";
interface TicketData {
	startTime: string;
	endTime?: string;
	item?: any;
}
export interface Ticket {
	setItem(item: any): void;
	setQuery(text: string): void;
	setStartTime(time?: string): void;
	setEndTime(time?: string): void;
	setData(data: any): void;
	send(): void;
	reset(): void;
}
export class TicketService implements Ticket {
	private key: { partitionKey: string, rangeKey: number } | null = null;
	private item: any;
	private startTime: string = "";
	private endTime: string = "";
	private data: any = null;
	private query: string = "NONE";
	private currentScript: string = "NONE";
	private currentFaqId: string = "NONE";
	public setItem(item: any) {
		this.item = item;
	}
	public setQuery(text: string) {
		this.query = text;
	}
	public setStartTime(time?: string) {
		this.startTime = time || String(new Date().getTime());
	}
	public setEndTime(time?: string) {
		this.endTime = time || String(new Date().getTime());
	}
	public async setData(data: any) {
		if (this.data == null) {
			this.data = {};
		}
		for (const key in data) {
			if (key === 'item') {
				continue;
			}
			this.data[key] = data[key];
		}
		if (data.item) {
			this.setItem(data.item);
		}
	}
	public async send() {
		const values = {};
		Object.assign(values, { query: this.query, currentScript: this.currentScript, currentFaqId: this.currentFaqId });
		if (this.key != null) {
			Object.assign(values, { partitionKey: this.key.partitionKey, rangeKey: this.key.rangeKey });
		}
		if (this.data != null) {
			Object.assign(values, this.data);
		}
		if (this.item != null) {
			Object.assign(values, this.item);
		}
		if (this.startTime != '') {
			Object.assign(values, { startTime: this.startTime });
		}
		if (this.endTime != '') {
			Object.assign(values, { endTime: this.endTime });
		}
		const res: any = await axios({
			url: AndyTicket.url,
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			data: { values },
		});
		console.log(res);
		this.key = res;
	}
	public reset() {
		this.key = null;
		this.item = null;
		this.startTime = "";
		this.data = null;
		this.endTime = "";
		this.query = "NONE";
		this.currentScript = "NONE";
		this.currentFaqId = "NONE";
	}
}