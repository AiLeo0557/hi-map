<script lang="ts">
import { computed,defineEmits, defineProps} from '@vue/runtime-core';
import {useBusPost} from 'hi-http'
import {getFormatNum} from 'hi-utils-pro'
</script>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: [Number, String],
    default: 100
  },
  price: {
    type: [Number, String]
  },
  ratioFormat: {
    type: String,
    default: ''
  },
  group: {
    type: Array,
    default: []
  },
  use_click: Boolean,
  currentPriceType: String,
  map_table_data_url: {
    type: String,
    default: ''
  }
})
const fill = computed(() => {
  const data = props.price || props.value
  const item: any = props.group.find((row: any) => {
    if (row.end) {
      return data >= row.start && data < row.end
    } else {
      return data >= row.start
    }
  })
  return item?.color || '#2967BCFF'
})
const emit = defineEmits(['loadData'])
const handdleClick = async ({ data, title }: any) => {
  if (!props.use_click) {
    return
  }
  const res = await useBusPost(props.map_table_data_url, data)
  emit('loadData', res, title)
}
const format = (value: number) => getFormatNum(value, 2)
</script>
<template>
  <g>
    <path :d="($attrs as any).path" :fill="fill" stroke="#87B8E5" stroke-miterlimit="10" />
    <text
      fill="white"
      fill-opacity="0.8"
      xml:space="preserve"
      font-family="PingFang SC"
      font-size="5"
      font-weight="600"
      letter-spacing="0px"
      text-anchor="middle"
      v-if="currentPriceType !== '02'"
    >
      <tspan
        :x="($attrs as any).title_position.x"
        :y="($attrs as any).title_position.y - 10"
        :style="{
          fill:
            value && value !== '-' && currentPriceType === '01' && fill !== '#FFAE4C'
              ? '#ffa04D!important'
              : '#fff!important',
          'white-space': 'pre'
        }"
      >
        {{ ($attrs as any).title }}
      </tspan>
    </text>
    <text
      fill="white"
      fill-opacity="0.8"
      xml:space="preserve"
      font-family="PingFang SC"
      font-size="6"
      font-weight="600"
      letter-spacing="0px"
      text-anchor="middle"
      v-if="currentPriceType === '02' && !value"
    >
      <tspan
        :x="($attrs as any).title_position.x"
        :y="($attrs as any).title_position.y - 10"
        :style="{
          fill: '#fff!important',
          'white-space': 'pre'
        }"
      >
        {{ ($attrs as any).title }}
      </tspan>
    </text>
    <text
      fill="white"
      fill-opacity="0.8"
      xml:space="preserve"
      font-family="PingFang SC"
      font-size="5"
      font-weight="500"
      letter-spacing="0px"
      text-anchor="middle"
    >
      <tspan
        v-if="currentPriceType === '01'"
        @click="handdleClick(($attrs as any))"
        class="dian_chang_gesu"
        :style="{
          fill:
            value && value !== '-' && fill !== '#FFAE4C' ? '#ffa04D!important' : '#fff!important',
          'white-space': 'pre'
        }"
        :x="($attrs as any).value_position.x"
        :y="($attrs as any).value_position.y"
      >
        {{ value }}
      </tspan>
    </text>
  </g>
</template>
<style>
.dian_chang_gesu {
  cursor: pointer;
}
.dian_chang_gesu:hover {
  fill: #112646;
  font-weight: 600;
}
</style>
