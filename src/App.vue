<script setup>
import NavBar from './components/NavBar.vue'
import ScanInterface from './components/ScanInterface.vue'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const onSubmit = async (_, data, onComplete) => {
  let json

  try {
    const res = await fetch('http://localhost:' + SERVER_PORT + '/scan', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })

    if (res.ok) {
      json = await res.json()
    } else {
      throw await res.json()
    }

  } catch (ex) {
    let message = ex.result || ex.message
    if (message?.code) {
      message = 'Failed to process, error code - "' + message.code + '"'
    }

    $toast.error(message || 'Failed to process')
  } finally {
    onComplete(json)
  }
}

</script>

<template>
  <NavBar />
  <ScanInterface @submit="onSubmit" />
</template>
