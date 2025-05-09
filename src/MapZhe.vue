<script lang="ts">
import { cities } from './configs'
import { reactive, defineAsyncComponent, defineProps, ref, type PropType } from '@vue/runtime-core'
import {HiDialog, HiTable} from 'hi-components-pro'
</script>
<script lang="ts" setup>
const MapZheCity = defineAsyncComponent(() => import('./components/ZheMapCity.vue'))
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: []
  },
  group: {
    type: Array,
    default: []
  },
  swidth: {
    type: Number,
    default: 660
  },
  sorte_key: {
    type: String,
    default: 'id'
  },
  use_click: {
    type: Boolean,
    default: true
  },
  map_table_columns_config: Array,
  currentPriceType: String,
  map_table_data_url: String,
})
const cityname = ref<string>('')
const sorted_cities = cities.sort(
  (current: any, next: any) => current[props.sorte_key] - next[props.sorte_key]
)
const visible = ref<boolean>(false)
const haddleShow = (data: any, title: string) => {
  tableData.value = data
  visible.value = true
  cityname.value = title
}
const tableCol = ref<any>()
const tableData = ref<any>([])
const tableDataConfig = reactive({
  default() {
    return tableData
  }
})
</script>
<template>
  <svg :width="swidth" viewBox="0 0 784 886" fill="none" xmlns="http://www.w3.org/2000/svg">
    <map-zhe-city
      v-for="(item, index) in sorted_cities"
      :key="index"
      v-bind="item"
      :data="data[index]"
      :group="group"
      :price="data[index] ? data[index].price : '-'"
      :value="data[index] ? data[index].value : '-'"
      :ratioFormat="data[index] ? data[index].ratioFormat : '-'"
      :use_click="use_click"
      :currentPriceType="currentPriceType"
      :map_table_data_url="map_table_data_url"
      @loadData="haddleShow"
    />
  </svg>
  <hi-dialog
    :width="1200"
    :title="`${cityname}${$attrs.gencategoryName}电厂列表`"
    :hide_footer="true"
    v-model:visible="visible"
  >
    <hi-table
      :hide_selection_col="true"
      :pagination_config="{ hidden: true }"
      :columns_config="map_table_columns_config"
      :tableHeight="350"
      :data_config="tableDataConfig"
    />
  </hi-dialog>
</template>
