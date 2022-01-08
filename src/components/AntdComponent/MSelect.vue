<template>
  <a-select
      dropdownClassName="select-dropdown__modify"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-select>
</template>

<script>
  export default {
    name: 'm-select',
    model: {
      event: 'change'
    },
  }
</script>

<style lang="less">

  .select-dropdown__modify{
    .ant-select-dropdown-menu-item-selected{
      background: @hoverColor;
      color: @primaryColor;
    }
    .ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled){
      background: @hoverColor;
    }
  }
</style>
