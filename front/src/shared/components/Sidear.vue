<template>
<n-space vertical>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false">

    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
      :on-update:value="onUpdate"
      >
      </n-menu>
  </n-layout-sider>
</n-space>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { MenuOption, NIcon, NLayoutSider, NMenu, NSpace } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { method } from 'lodash';

export default defineComponent({
  name: "App",
  components: {
    NSpace,
    NLayoutSider,
    NMenu
  },
  data() {
    return {
      collapsed: false,
      menuOptions: [
        {
          label: 'Home',
          key: 'home',
        },
        {
          label: 'About',
          key: 'about',
        }
      ],
      renderMenuLabel (option: MenuOption) {
        if ('href' in option) {
          return h('a', { href: option.href, target: '_blank' }, [
            option.label as string
          ])
        }
        return option.label as string
      },
      renderMenuIcon (option: MenuOption) {
        if (option.key === 'sheep-man') return true
        if (option.key === 'food') return null
        return h(NIcon, null, { default: () => h(BookmarkOutline) })
      },
      expandIcon () {
        return h(NIcon, null, { default: () => h(CaretDownOutline) })
      },
    }
  },
  methods: {
    onUpdate (key: string, item: MenuOption) {
      this.$router.push({name: key});
    }
  }
});
</script>
