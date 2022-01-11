<script setup lang="ts">
import { useBeforeUnload } from '.'

const { isTracking } = useBeforeUnload(() => {
  // Do something: e.g., load something into local storage
}, {
  immediate: true,
})
</script>

<template>
  <div>
    <p>Before Unload Tracking: {{ isTracking }}</p>
  </div>
</template>
