import { PluginObject } from 'vue'
import { Component, Prop, Vue as _Vue } from 'vue-property-decorator'
import { Ticket } from "./ticket";
export const AndyTicket: PluginObject<any> = {
	installed: false,
	install(Vue: typeof _Vue, options?: any): void {
		if (this.installed) {
			return;
		}

		this.installed = true;
		this.ticket = new Ticket();
		this.hoge = "asdf";
		Vue.prototype.$ticket = this.ticket;
		// Object.defineProperties(Vue.prototype, {
		// 	$ticket: {
		// 		get() {
		// 			return this.ticket;
		// 		},
		// 	},
		// });

	},
};
