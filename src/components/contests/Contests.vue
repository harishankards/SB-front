<template>
  <vuestic-widget headerText="Your contests">

    <vuestic-data-table
                :tableData ="tableData"
                :tableFields="tableFields"
                :itemsPerPage="itemsPerPage"
                :sortFunctions="sortFunctions"
                :apiMode="apiMode"
                :paginationPath="paginationPath" />
  </vuestic-widget>
</template>

<script>
export default{
  name: 'contestHistory',
  data () {
    return {
      // apiUrl: 'https://vuetable.ratiw.net/api/users', // Api retuns table data
      apiMode: false, // Choose api mode or just pass array in data-table component
      tableFields: [
        {
          name: 'contestname', // Object property name in your data e.g. (data[0].name)
          sortField: 'contestname' // Object property name in your data which will be used for sorting
        },
        {
          name: 'sponsor',
          sortField: 'sponsor'
        },
        {
          name: 'mode',
          title: 'mode' // Title of column
        },
        {
          name: 'date',
          title: 'date'
        },
        {
          name: 'finalstatus',
          title: 'finalstatus'
        }
      ],
      itemsPerPage: [  // values in dropdown "Items Per Page"
        {
          value: 2
        },
        {
          value: 5
        },
        {
          value: 10
        }
      ],
      sortFunctions: {       // use custom sorting functions for prefered fields
        'name': function (item1, item2) {
          return item1 >= item2 ? 1 : -1
        },
        'email': function (item1, item2) {
          return item1 >= item2 ? 1 : -1
        }
      },
      paginationPath: '',
      tableData: [
        {
          contestName: 'Google Summer of Code',
          contestSponsor: 'Google'
        }
      ]
    }
  }
}
</script>
