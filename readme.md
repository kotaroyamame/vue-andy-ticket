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
	},
	true,
	true
);

```

## 機能
- async ticketrequest()

最初に必ず叩かなければならないメソッド。
新規チケットの発行をリクエストし、正常に発行されればチケットインスタンスを保持する。

- setQuery(text: string)

ticketrequestメソッドにて生成されたチケットインスタンスにクエリをセットする。

- setStartTime(time?: strig)

ticketrequestメソッドにて生成されたチケットインスタンスにスタートタイムをセットする。引数がない場合は現在時刻がセットされる

- setEndTime(time?: strig)

ticketrequestメソッドにて生成されたチケットインスタンスにエンドタイムをセットする。引数がない場合は現在時刻がセットされる

- setData(data: Object)

ticketrequestメソッドにて生成されたチケットインスタンスに任意のデータをセットする。リセットするまで値は保持される。

- async push()

ticketrequestメソッドにて生成されたチケットインスタンスの情報をサーバーに投げ、ローカルのチケットをサーバーに同期する。

- reset()

チケットインスタンスを破棄する。
再度チケットを発行する場合はticketrequestメソッドを実行する。