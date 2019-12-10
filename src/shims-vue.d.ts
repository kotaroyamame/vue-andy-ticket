
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue
}

declare module 'vue/types/vue' {
  interface Ticket {
    setItem(item: any): void;
    setQuery(text: string): void;
    setStartTime(time?: string): void;
    setEndTime(time?: string): void;
    setData(data: any): void;
    send(): void;
    reset(): void;
  }
  interface Vue {
    $ticket: Ticket;
  }
}