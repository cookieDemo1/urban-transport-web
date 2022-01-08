<template>
  <a-date-picker
      class="date-picker__modify"
      dropdownClassName="date-picker-dropdown__modify"
      style="width: 100%"
      v-bind="$attrs"
      v-on="$listeners"
  >
    <slot></slot>
  </a-date-picker>

</template>

<script>

  export default {
    name: 'm-date-picker',
    model: {
      event: 'change'
    },
  }
</script>

<style lang="less">

  .date-picker-dropdown__modify{
    .ant-calendar{
      width: 300px;
      border-color: @primaryColor;
      color: @textPrimaryColor;
    }
  }

  .date-picker-dropdown__modify{
    .ant-calendar-input-wrap{
      border-color: @lineColor;
    }
  }

  .date-picker-dropdown__modify{
    .ant-calendar-header{
      border-color: @lineColor;
    }

    .ant-calendar-header .ant-calendar-century-select,
    .ant-calendar-header .ant-calendar-decade-select,
    .ant-calendar-header .ant-calendar-year-select,
    .ant-calendar-header .ant-calendar-month-select,
    .ant-calendar-time .ant-calendar-day-select{
      color: @textPrimaryColor;
      &:hover{
        color: @primaryColor;
      }
    }
    .ant-calendar-header .ant-calendar-prev-century-btn::before, .ant-calendar-header .ant-calendar-prev-decade-btn::before, .ant-calendar-header .ant-calendar-prev-year-btn::before, .ant-calendar-header .ant-calendar-prev-century-btn::after, .ant-calendar-header .ant-calendar-prev-decade-btn::after, .ant-calendar-header .ant-calendar-prev-year-btn::after{
      border-color: @textPrimaryColor;
    }
    .ant-calendar-header .ant-calendar-prev-month-btn::before, .ant-calendar-header .ant-calendar-prev-month-btn::after{
      border-color: @textPrimaryColor;
    }
    .ant-calendar-header .ant-calendar-next-month-btn::before, .ant-calendar-header .ant-calendar-next-month-btn::after{
      border-color: @textPrimaryColor;
    }
    .ant-calendar-header .ant-calendar-next-century-btn::before, .ant-calendar-header .ant-calendar-next-decade-btn::before, .ant-calendar-header .ant-calendar-next-year-btn::before, .ant-calendar-header .ant-calendar-next-century-btn::after, .ant-calendar-header .ant-calendar-next-decade-btn::after, .ant-calendar-header .ant-calendar-next-year-btn::after{
      border-color: @textPrimaryColor;
    }


    .ant-calendar-decade-panel-header, .ant-calendar-year-panel-header, .ant-calendar-month-panel-header{
      border-color: @lineColor;
      * {
        color: @textPrimaryColor;
        &:hover{
          color: @primaryColor;
        }
      }
      *::before,*::after{
        border-color: @textPrimaryColor;
      }
    }
  }

  .date-picker-dropdown__modify{
    .ant-calendar-decade-panel-decade, .ant-calendar-year-panel-year, .ant-calendar-month-panel-month, .ant-calendar-date{
      color: @textPrimaryColor;
      &:hover {
        color: @textPrimaryColor;
        background: @hoverColor;
      }
      &:active{
        color: @textPrimaryColor;
        background: @primaryColor;
      }
    }

    .ant-calendar-decade-panel-selected-cell .ant-calendar-decade-panel-decade,
    .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year,
    .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month,
    .ant-calendar-selected-day .ant-calendar-date {
      color: #ffffff;
      background: @primaryColor;
    }

    .ant-calendar-last-month-cell .ant-calendar-date, .ant-calendar-next-month-btn-day .ant-calendar-date, .ant-calendar-last-month-cell .ant-calendar-date:hover, .ant-calendar-next-month-btn-day .ant-calendar-date:hover{
      color: @disabledColor;
    }
  }


  .date-picker-dropdown__modify{
    .ant-calendar-time-picker-select{
      border-color: @lineColor;
      ul{
        width: 100%;
      }
      //li:focus{
      //  color: @primaryColor;
      //}
      li:hover{
        background: @hoverColor;
      }
      li.ant-calendar-time-picker-select-option-selected{
        background: @hoverColor;
        color: @primaryColor;
      }
      li.ant-calendar-time-picker-select-option-selected:hover{
        background: @hoverColor;
      }
    }

    .ant-calendar-time-picker-select li{
      text-align: left;
      padding: 0 0 0 12px;
    }
  }



  .date-picker-dropdown__modify{
    .ant-calendar-footer{
      border-color: @lineColor;
    }
  }


</style>
