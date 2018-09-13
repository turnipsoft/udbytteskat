<template>
  <div id="app">
    <UdbytteSkat />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UdbytteSkat from './components/UdbytteSkat.vue';

@Component({
  components: {
    UdbytteSkat,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
