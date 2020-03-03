
import Vue from "vue";
// declare module '*.vue' {
// 	import Vue from 'vue'
	
//   export default Vue
// }
declare module "vue/types/vue" {
	interface TicketService {
		setItem(item: any): void;
		setQuery(text: string): void;
		setStartTime(time?: string): void;
		setEndTime(time?: string): void;
		setData(data: any): void;
		push(): Promise<any>;
		reset(): void;
	}
	interface Vue {
		readonly $ticket: TicketService;
	}
}

