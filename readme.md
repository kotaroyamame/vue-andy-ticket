# vue-andy-ticket

## インストール

main.js
```

import { AndyTicket } from 'vue-andy-ticket/dist/vue-andy-kurage.common.js';
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

- setQuery(text: string)

クエリをセットする

- setStartTime(time?: strig)

スタートタイムをセットする。引数がない場合は現在時刻がセットされる

- setEndTime(time?: strig)

エンドタイムをセットする。引数がない場合は現在時刻がセットされる

- setData(data: Object)

任意のデータをセットする。リセットするまで値は保持される。

- async send()

チケットをサーバーに投げる（リセットしない場合はrangeKeyなどが内部に保持され、上書きされる）

- reset()

チケットがリセットされる。