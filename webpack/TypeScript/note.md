# TypeScript

## 与简单例子不同之处

```ts
// show.ts
export function show(content: string) {
  window.document.getElementById('app').innerText = 'Hello' + content
}

// main.ts
import { show } from './show

show('Webpack')
```

