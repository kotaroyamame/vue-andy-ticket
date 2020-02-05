# vue-andy-ticket

## インストール

main.js
```

import { AndyTicket } from 'vue-andy-ticket/dist/vue-andy-ticket.common.js';
Vue.use(AndyTicket, { url: `${subSystemUrl}/product/${PRODUCT_ID}/public-ticket`, productId: PRODUCT_ID });

```

## 使い方

コンポーネント内でthis.$ticketで参照できる
例　)
```
this.$ticket.setData(
	{
		item,
		currentFaqId,
		origin,
		type
	}
);

```

## 機能
- async ticketrequest()

チケットインスタンスがなければ最初に叩かれるメソッド。
新規チケットの発行をリクエストし、正常に発行されればチケットインスタンスを保持する。

- setQuery(text: string)

ticketrequestメソッドにて生成されたチケットインスタンスにクエリをセットする。
チケットインスタンスが無ければ予めticketrequestを実行し、チケットインスタンスを生成する。

- setStartTime(time?: string)

ticketrequestメソッドにて生成されたチケットインスタンスにスタートタイムをセットする。(unixタイムミリ秒のString)引数がない場合は現在時刻がセットされる
チケットインスタンスが無ければ予めticketrequestを実行し、チケットインスタンスを生成する。
例
setStartTime("1580871994980")

- setEndTime(time?: string)

ticketrequestメソッドにて生成されたチケットインスタンスにエンドタイムをセットする。引数がない場合は現在時刻がセットされる
チケットインスタンスが無ければ予めticketrequestを実行し、チケットインスタンスを生成する。

- setData(data: Object)

ticketrequestメソッドにて生成されたチケットインスタンスに任意のデータをセットする。リセットするまで値は保持される。
チケットインスタンスが無ければ予めticketrequestを実行し、チケットインスタンスを生成する。

- async push()

ローカルのチケットインスタンスの情報をサーバーに投げ、サーバのチケットと同期する。

- reset()

チケットインスタンスを破棄する。
再度チケットを発行する場合はticketrequestメソッドを実行する。