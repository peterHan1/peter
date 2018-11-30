<script>
export default {
  name: 'Tab',
  props: {
    index: {
      required: true,
      type: [Number, String]
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  computed: {
    active () {
      return this.$parent.value === this.index
    }
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {tab}
      </li>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 80px
  // margin-right 30px
  position relative
  font-size 26px
  height 80px
  cursor pointer
  flex 1
  text-align center
  overflow hidden
  // background blue
  &.active
    color #FF7102
  &.active:after
    // border-bottom 2px solid blue
    content " "
    position absolute
    border-radius 3px
    position absolute
    left 50%
    bottom 0
    margin-left -34px
    width 68px
    height 6px
    z-index 1
    background-color #FF7102
  &:last-child
    margin-right 0
</style>
