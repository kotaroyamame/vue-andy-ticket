import axios from "axios";
import { AndyTicket } from "./index";
export namespace Ticket {
	let key: { partitionKey: string, rangeKey: number } | null = null;
	let item: any;
	let startTime: string = "";
	export const setItem = (item: any) => {
		item = item;
	}
	export const hoge = () => {
		console.log(AndyTicket);
	}
	const send = async () => {
		const postData = {};

		const res = await axios({
			url: '',
			headers: {
				'Content-Type': 'text/json'
			},
			method: 'POST',
			data: {},
		});
	}
	const reset = () => { }
}