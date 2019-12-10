import { PluginObject } from 'vue'
import { Component, Prop, Vue as _Vue } from 'vue-property-decorator'
import { Ticket } from "./ticket";
export const AndyTicket: PluginObject<any> = {
	installed: false,
	ticket: new Ticket(),
	url: "",
	install(Vue: typeof _Vue, options?: any): void {
		if (this.installed) {
			return;
		}
		if (options && options.hasOwnProperty('url')) {
			this.url = options.url;
		}
		this.installed = true;
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
