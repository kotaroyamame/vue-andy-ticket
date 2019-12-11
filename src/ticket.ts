import axios from "axios";
import { AndyTicket } from "./index";
interface TicketData {
	startTime: string;
	endTime?: string;
	item?: any;
}
export interface TicketService {
	setItem(item: any): void;
	setQuery(text: string): void;
	setStartTime(time?: string): void;
	setEndTime(time?: string): void;
	setData(data: any): void;
	push(): void;
	reset(): void;
}
class Ticket {
	private item: any;
	private startTime: string = "";
	private endTime: string = "";
	private data: any = null;
	private query: string = "NONE";
	private currentScript: string = "NONE";
	private currentFaqId: string = "NONE";
	constructor(private partitionKey: string, private rangeKey: number) {

	}
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
	public get Data() {
		const values = { partitionKey: this.partitionKey, rangeKey: this.rangeKey };
		Object.assign(values, { query: this.query, currentScript: this.currentScript, currentFaqId: this.currentFaqId });
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
		return values;
	}
}
export class TicketFactory implements TicketService {
	private static ticketFactory = new TicketFactory();
	private ticket: Ticket | null = null;
	private constructor() { }
	public static getInstance() {
		return this.ticketFactory;
	}
	public async ticketrequest(): Promise<{ error: boolean, response: any }> {
		if (this.ticket !== null) {
			return { error: true, response: this.ticket };
		}
		const values = {};
		try {
			const res: any = await axios({
				url: AndyTicket.url,
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				data: { values },
			});
			console.log(res);
			if (res && res.hasOwnProperty('putItem') && res.putItem.hasOwnProperty('partitionKey') && res.putItem.hasOwnProperty('rangeKey')) {
				const { partitionKey, rangeKey } = res.putItem;
				const ticket = new Ticket(partitionKey, rangeKey);
				this.ticket = ticket;
			}
			return { error: false, response: this.ticket };
		} catch (e) {
			return { error: true, response: e };
		}
	}
	public setItem(item: any) {
		if (this.ticket) {
			this.ticket.setItem(item);
		}
	}
	public setQuery(text: string) {
		if (this.ticket) {
			this.ticket.setQuery(text);
		}
	}
	public setStartTime(time?: string) {
		if (this.ticket) {
			this.ticket.setStartTime(time || String(new Date().getTime()));
		}
	}
	public setEndTime(time?: string) {
		if (this.ticket) {
			this.ticket.setEndTime(time || String(new Date().getTime()));
		}
	}
	public async setData(data: any) {
		if (this.ticket) {
			this.ticket.setData(data);
		}
	}
	public async push() {
		if (this.ticket == null) {
			return;
		}
		const values = this.ticket.Data;
		const res: any = await axios({
			url: AndyTicket.url,
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			data: { values },
		});
		return res;
	}
	public reset() {
		this.ticket = null;
	}
}