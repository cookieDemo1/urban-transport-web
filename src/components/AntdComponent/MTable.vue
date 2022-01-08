<template>
  <a-table
      class="table__modify"
      :columns="columns"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <!--    vue >=2.6.0版本，使用v-slot替代slot 和slot-scope-->
    <template v-for="column in columns" :slot="column.scopedSlots?column.scopedSlots.customRender:''" slot-scope="text,record">
      <slot :name="column.scopedSlots?column.scopedSlots.customRender:''" v-bind="{text,record}" ></slot>
    </template>
  </a-table>
</template>

<script>

  export default {
    name: 'm-table',
    props: {
      columns: {
        type: Array,
        default: () => []
      }
    },
  }
</script>

<style lang="less">

  /*table*/
  .table__modify{
    .ant-table-title{
      display: none;
    }
    .ant-table-thead > tr > th{
      padding: 0;
      height: 28px;
      font-weight: bold;
      color: @textRegularColor;
      background: @hoverColor;
      border-bottom: 1px solid @lineColor;
    }

    .ant-table-tbody > tr > td{
      padding: 0;
      height: 38px;
      color: @textRegularColor;
      background: #081D6B;
      border-bottom: 1px solid @lineColor;
    }

    .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
    .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
      background: @hoverColor;
    }

    .ant-table-placeholder{
      border-radius: 0;
      border: none;
    }
  }

  /*table pagination*/
  .table__modify{
    .ant-pagination {
      float: inherit;
      text-align: center;
      color: @textRegularColor;

      .ant-pagination-prev a, .ant-pagination-next a{
        color: @textRegularColor;
      }

      .ant-pagination-item a{
        color: @textRegularColor;
      }

      .ant-pagination-item:focus a, .ant-pagination-item:hover a{
        color: @primaryColor;
      }

      .ant-pagination-item-active {
        background-color: @hoverColor;
      }
      .ant-pagination-item-active a {
        color: @primaryColor;
      }

      //省略号
      .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis, .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
        min-width: 23px;
        color: @textRegularColor;
      }

      //不可点击
      .ant-pagination-disabled a, .ant-pagination-disabled:hover a, .ant-pagination-disabled:focus a, .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus .ant-pagination-item-link {
        color: @disabledColor;
      }

      .ant-pagination-options-quick-jumper input{
        border-color: @textRegularColor;

        &:hover{
          border-color: @primaryColor;
        }
      }
    }
  }

  /*text-button*/
  .table__modify{
    .text-button{
      &.ant-btn::before{
        background: transparent;
      }
      &.text-danger-button{
        color: @dangerColor;
      }
      &[ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node{
        animation: none;
      }
    }
  }

</style>
