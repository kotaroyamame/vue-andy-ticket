import axios from "axios";
import {AndyTicket} from "./index";
export class Ticket {
	key: { partitionKey: string, rangeKey: number } | null = null;
	item: any;
	startTime: string = "";
	setItem(item: any) {
		this.item = item;
	}
	hoge(){
		console.log(AndyTicket);
	}
	public async send() {
		const postData={};
		
		const res = await axios({
			url: '',
			headers: {
				'Content-Type': 'text/json'
			},
			method: 'POST',
			data: {},
		});
	}
	public reset() { }
}