<script lang="ts">
import {computed} from '@vue/runtime-core'
import { pointers_data, provinces } from './configs'
interface Pointer {
  x: number
  y: number
  province?: string
}
</script>
<script setup lang="ts">

const props = defineProps({
  province: { type: String, default: '新疆' },
  provinces: Array
})
const allLinePath = computed(() => {
  const set = new Set(props.provinces)
  return Array.from(set)
    .filter((province_name: any) => province_name && province_name !== '浙江')
    .map((province_name: any) => {
      console.log('province_name:', province_name)
      return getLinePath(province_name)
    })
})
const getLinePath = (province_name: string | undefined) => {
  const start_pointer = pointers_data.find(
    (pointer: Pointer) => pointer?.province === province_name
  )
  console.log('start_pointer:', start_pointer)
  const end_pointer = {
    province: '浙江',
    x: 705.408,
    y: 507.54
  }
  const getContrlPointerPos = (start: Pointer, end: Pointer, angle: number) => {
    const { x: x1, y: y1 } = start
    const { x: x2, y: y2 } = end
    const PI = Math.PI
    // 两点之间 x 轴夹角弧度
    let xAngle = Math.atan2(y2 - y1, x2 - x1)
    // 转为角度
    xAngle = (360 * xAngle) / (2 * PI)
    // 两点间的长度
    const L = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
    // 计算等腰三角形斜边长度
    const L2 = L / 2 / Math.cos((angle * 2 * PI) / 360)
    const x = x1 + Math.round(L2 * Math.cos(((xAngle + angle) * 2 * PI) / 360))
    const y = y1 + Math.round(L2 * Math.sin(((xAngle + angle) * 2 * PI) / 360))
    return { x, y }
  }
  const c_pointer = getContrlPointerPos(start_pointer, end_pointer, 30)
  const line_path = `
        M${start_pointer.x},${start_pointer.y}
        Q${c_pointer.x},${c_pointer.y}
        ${end_pointer.x - 10},${end_pointer.y}
      `
  return { line_path, start_pointer, end_pointer }
}
const line_path = computed(() => {
  if (!props.province) {
    return ''
  }
  const { line_path } = getLinePath(props.province)
  return line_path
})
</script>
<template>
  <svg width="780" viewBox="0 0 941 732" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        v-for="(item, index) in provinces"
        :key="index"
        v-bind="item"
        fill="#092155"
        stroke="#87B8E5"
        stroke-miterlimit="10"
      />
    </g>
    <g>
      <path
        d="M800.643 586.101L810.792 597.267L822.392 598.282L844.141 591.177L861.54 582.041H876.04L881.84 592.192L886.19 582.041H893.439V581.025M800.643 586.101L807.892 581.025H893.439M800.643 586.101V716.037H893.439V581.025M800.643 586.101H802.092V715.021H891.99V581.025H893.439M819.492 604.373L828.192 602.343L823.842 612.494L816.592 614.524L819.492 604.373ZM818.042 627.721L820.942 636.857H822.392L819.492 627.721H818.042ZM823.842 650.054L818.042 658.175H819.492L826.742 650.054H823.842ZM809.342 674.417L812.242 682.538H813.692L812.242 674.417H809.342ZM833.991 700.81L842.691 696.749H844.141L836.891 700.81H833.991ZM854.291 683.553L862.991 671.371H864.44L857.191 683.553H854.291ZM870.24 655.129L874.59 647.008H877.49L873.14 655.129H870.24ZM874.59 631.782V622.645H877.49V631.782H874.59ZM876.04 613.509L880.39 606.403H881.84L877.49 613.509H876.04ZM884.74 599.298L890.539 591.177H891.99L887.64 599.298H884.74Z"
        stroke="#87B8E5" stroke-miterlimit="10" />
    </g>
    <text
      fill="white"
      fill-opacity="0.8"
      xml:space="preserve"
      style="white-space: pre"
      font-family="PingFang SC"
      font-size="3"
      font-weight="600"
      letter-spacing="0px"
    >
      <tspan x="161" y="229.54">新疆</tspan>
      <tspan x="235" y="453.54">西藏</tspan>
      <tspan x="652" y="176.54">内蒙古</tspan>
      <tspan x="334" y="357.54">青海</tspan>
      <tspan x="435" y="463.54">四川</tspan>
      <tspan x="812" y="118.54">黑龙江</tspan>
      <tspan x="326" y="261.54">甘肃</tspan>
      <tspan x="419" y="585.54">云南</tspan>
      <tspan x="526" y="596.54">广西</tspan>
      <tspan x="566" y="520.54">湖南</tspan>
      <tspan x="537" y="353.54">陕西</tspan>
      <tspan x="596" y="599.54">广东</tspan>
      <tspan x="793" y="199.54">吉林</tspan>
      <tspan x="625" y="305.54">河北</tspan>
      <tspan x="576" y="450.54">湖北</tspan>
      <tspan x="497" y="537.54">贵州</tspan>
      <tspan x="669" y="344.54">山东</tspan>
      <tspan x="628" y="522.54">江西</tspan>
      <tspan x="596" y="388.54">河南</tspan>
      <tspan x="743" y="241.54">辽宁</tspan>
      <tspan x="580" y="312.54">山西</tspan>
      <tspan x="653" y="435.54">安徽</tspan>
      <tspan x="669" y="550.54">福建</tspan>
      <tspan x="704" y="488.54">浙江</tspan>
      <tspan x="696" y="408.54">江苏</tspan>
      <tspan x="511" y="469.54">重庆</tspan>
      <tspan x="482" y="319.54">宁夏</tspan>
      <tspan x="541" y="695.54">海南</tspan>
      <tspan x="714" y="603.54">台湾</tspan>
      <tspan x="641" y="261.54">北京</tspan>
      <tspan x="666" y="293.54">天津</tspan>
      <tspan x="725" y="442.54">上海</tspan>
      <tspan x="620" y="638.54">香港</tspan>
      <tspan x="581" y="648.54">澳门</tspan>
      <tspan x="819.04" y="693.944">南海诸岛</tspan>
    </text>
    <g v-for="(item, index) in allLinePath" :key="index">
      <path stroke-width="1" :d="item.line_path" stroke="url(#line-gradient)" />
      <circle
        v-if="item.start_pointer"
        :cx="item.start_pointer.x + 10"
        :cy="item.start_pointer.y"
        r="2"
        fill="#ffa500"
      />
      <circle
        v-if="item.start_pointer"
        :cx="item.end_pointer.x + 10"
        :cy="item.end_pointer.y"
        r="2"
        fill="#ffa500"
      />
    </g>
    <path stroke-width="7" marker-end="url(#arrow)" :d="line_path" stroke="url(#line-gradient)" />
    <defs>
      <marker
        id="arrow"
        markerWidth="6"
        markerHeight="6"
        viewBox="0 0 12 12"
        refX="6"
        refY="6"
        orient="auto"
      >
        <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill="#ffa500" />
      </marker>
      <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffa500" stop-opacity="0" />
        <stop offset="1" stop-color="#ffa500" stop-opacity="1" />
      </linearGradient>
    </defs>
  </svg>
</template>
