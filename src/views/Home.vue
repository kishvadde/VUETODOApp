<template>
  <div class="home container">
   <TodoList/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoList from '../components/TodoList.vue'
import { Component} from 'vue-property-decorator'

@Component({
  components:{
    TodoList
  }
})
export default class Home extends Vue{

}
</script>

