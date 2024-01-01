<script setup lang="ts">
import { type UseWebNotificationOptions, useWebNotification } from '@vueuse/core'

const options: UseWebNotificationOptions = {
  title: 'Hello, world from VueUse!',
  dir: 'auto',
  lang: 'en',
  renotify: true,
  tag: 'test',
}

const {
  isSupported,
  notification,
  permissionGranted,
  show,
} = useWebNotification(options)
</script>

<template>
  <div>
    <p>
      Supported: <BooleanDisplay :value="isSupported" />
    </p>
    <p>
      {{ notification?.title }}
    </p>
  </div>

  <div v-if="isSupported">
    <button :disabled="!permissionGranted" @click="show()">
      Show Notification
    </button>
  </div>
  <div v-else>
    The Notification Web API is not supported in your browser.
  </div>
</template>
