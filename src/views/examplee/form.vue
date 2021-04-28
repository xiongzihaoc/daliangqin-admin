<template>
  <div class="app-container">
    <ElTable :list="list" :columns="columns"></ElTable>
  </div>
</template>
<script>
import ElTable from "../../components/DemoD";
export default {
  components: {
    ElTable,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "陆游",
          dynasty: "南宋",
          magnumOpus: "《醉中出西门偶书》",
        },
        {
          id: 2,
          name: "李清照",
          dynasty: "南宋",
          magnumOpus: "《声声慢·寻寻觅觅》",
        },
        { id: 3, name: "李白", dynasty: "唐", magnumOpus: "《月下独酌》" },
        { id: 4, name: "杜甫", dynasty: "唐", magnumOpus: "《登高》" },
        {
          id: 5,
          name: "晏殊",
          dynasty: "北宋",
          magnumOpus: "《浣溪沙·一曲新词酒一杯》",
        },
        { id: 6, name: "孟浩然", dynasty: "唐", magnumOpus: "《春晓》" },
      ],
      columns: [
        { key: "name", title: "名字" },
        { key: "dynasty", title: "朝代" },
        { key: "magnumOpus", title: "代表作" },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>
