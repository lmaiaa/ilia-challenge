import { computed, reactive } from "vue";

//state
const state = reactive({
  loading: false,
});

//action
const actions = {
  Loading: (loading: boolean): void => {
    state.loading = loading;
  },
};

//getter
const getters = { getStateLoading: computed(() => state.loading) };

export { state, getters, actions };
