# table

- props
    + tableData
        * type: Array
        * item
            - {keys: values}
    + tableTitle
        * type: Array
        * item
            - {prop: '', label: '', width: ''}
    + count
        * type: Number
    + page
        * type: Number
    + per
        * type: Number
- emit
    + currentPage
        * params: 当前页码
        * type: Number