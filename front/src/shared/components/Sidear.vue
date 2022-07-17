<template>
<n-space vertical>
  
</n-space>
<div>
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
      :value="value"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"/>
  </n-layout-sider>
</div>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { MenuOption, NIcon, NLayoutSider, NMenu, NSpace } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { authConfig } from '@/plugins/auth-keycloak/auth.config';

const menuOptions: MenuOption[] = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'Login',
    key: 'login',
  }
]

export default defineComponent({
  name: "App",
  components: {
    NSpace,
    NLayoutSider,
    NMenu
  },
  data() {
    return {
      value: '',
      collapsed: false,
      menuOptions: menuOptions,
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
  }
});
</script>
