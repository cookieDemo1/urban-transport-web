import { mapState, mapMutations } from 'vuex'

export const appMixin = {
  computed: {
    ...mapState({
    }),
  },
  methods: {
    ...mapMutations('app',{
      updateAppState: 'updateState'
    })
  }
}
