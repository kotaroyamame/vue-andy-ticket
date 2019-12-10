import axios from "axios";
import { AndyTicket } from "./index";
interface TicketData {
	startTime: string;
	endTime?: string;
	item?: any;
}
export class Ticket {
	private key: { partitionKey: string, rangeKey: number } | null = null;
	private item: any;
	private startTime: string = "";
	private endTime: string = "";
	private data: any = null;
	public setItem(item: any) {
		this.item = item;
	}
	public async setData(data: any, isSend = false, isReset = false) {
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
		if (isSend) {
			await this.send();
		}
		if (isReset) {
			this.reset();
		}
	}
	private async send() {
		const postData = {};
		if (this.key != null) {
			Object.assign(postData, this.key);
		}
		if (this.item != null) {
			Object.assign(postData, this.item);
		}
		const res: any = await axios({
			url: AndyTicket.url,
			headers: {
				'Content-Type': 'text/json'
			},
			method: 'POST',
			data: postData,
		});
		console.log(res);
		this.key = res;
	}
	public reset() {
		this.key = null;
		this.item = null;
		this.startTime = "";
	}
}