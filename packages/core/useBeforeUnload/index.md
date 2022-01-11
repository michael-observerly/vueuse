---
category: Sensors
---

# useBeforeUnload

## Usage

```ts
import { useBeforeUnload } from '.'

const { isTracking } = useBeforeUnload(() => {
  // Do something on before unload event trigger: e.g., load something into local storage
}, {
  immediate: true,
})
```
