<script setup>
import { ref } from 'vue'
import SubmitBtn from './SubmitBtn.vue'
import NMapTable from './NMapTable.vue'

const useRawCmd = ref(false)
const rawCmd = ref('')
const addresses = ref('')
const isLoading = ref(false)
const processedData = ref(null)
const rawResponse = ref(null)

const emit = defineEmits(['submit'])

const onSubmit = (e) => {
  if (isLoading.value) { return }

  const raw = useRawCmd.value
  const value = raw ? rawCmd.value : addresses.value
  if (!value) { return }

  const data = {
    raw,
    value
  }

  processedData.value = null
  rawResponse.value = null

  isLoading.value = true
  emit('submit', e, data, (res) => {
    isLoading.value = false
    if (res) {
      if (raw) {
        rawResponse.value = res.result
      } else {
        processedData.value = res.result
      }
    }
  })
}

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12 mb-3">
        <form @submit.prevent="onSubmit($event)">
          <div class="form-check form-switch mb-2">
            <input class="form-check-input" type="checkbox" id="useRawCmd" v-model="useRawCmd" />
            <label class="form-check-label" for="useRawCmd">Use raw command</label>
          </div>

          <div class="mb-3">
            <div v-if="useRawCmd">
              <div class="input-group">
                <span class="input-group-text">nmap </span>
                <input type="text" class="form-control input-mid" v-model="rawCmd" placeholder="Arguments" />
                <SubmitBtn :disabled="isLoading" />
              </div>
              <div class="form-text px-2">
                Put the arguments that should be followed by "nmap ".
                Example: <b>-sV -O 3.9.15.241 www.google.com</b>
              </div>
            </div>
            <div v-else class="input-group">
              <div class="align-self-center pe-2">Enter IP Address(es)</div>
              <input type="text" aria-label="IP Address(es)" class="form-control input-mid" v-model="addresses"
                placeholder="IP Address(es)">
              <SubmitBtn :disabled="isLoading" />
            </div>
          </div>
        </form>
      </div>

      <div class="col-sm-6 mb-3">
        <div class="text-center">
          <div v-if="isLoading" class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <template v-if="!isLoading">
          <p v-if="useRawCmd && rawResponse != null" class="raw-response">{{ rawResponse }}</p>
          <NMapTable v-if="!useRawCmd && !isLoading" :data="processedData" />
        </template>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container-fluid {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.raw-response {
  white-space: pre-wrap;
  padding: .75rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border-radius: 4px;
  border: 1px solid #bbb;
  max-height: calc(100vh - 240px);
  overflow: auto;
}
</style>
