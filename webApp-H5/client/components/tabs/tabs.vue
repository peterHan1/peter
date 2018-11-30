<script>
export default {
  name: 'Tabs',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  render () {
    const content = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <div class="tab-content">
          {content}
        </div>
      </div>
    )
  },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabs-header
  display flex
  background #fff
  justify-content space-between
</style>
