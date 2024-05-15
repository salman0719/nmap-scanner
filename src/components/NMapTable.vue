<script setup>
defineProps({
  data: Array
})

</script>

<template>
  <div v-if="data != null" class="table-responsive">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Host</th>
          <th>IP</th>
          <th>Mac</th>
          <th>Open Ports</th>
          <th>OS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.hostname }}</td>
          <td>{{ row.ip }}</td>
          <td>{{ row.mac }}</td>
          <td>
            <table v-if="row.openPorts?.length" class="table table-light table-striped">
              <thead>
                <tr>
                  <th>Protocol</th>
                  <th>Service</th>
                  <th>Port</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(portInfo, portInfoIndex) in row.openPorts" :key="portInfoIndex">
                  <td>{{ portInfo.protocol }}</td>
                  <td>{{ portInfo.service }}</td>
                  <td>{{ portInfo.port }}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>{{ row.osNmap }}</td>
        </tr>
        <tr v-if="!data?.length">
          <td colspan="2" class="text-center">
            No data available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
