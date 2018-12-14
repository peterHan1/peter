<radio :options="award" @selectFn="awardSelectFn"></radio>

award: {
    status: 'C',
    list: [{label: '全部', value: 'A'}, {label: '奖励', value: 'B'}, {label: '不奖励', value: 'C'}]
}
awardSelectFn (data) {
    this.$emit('autoTypeFn', data)
}