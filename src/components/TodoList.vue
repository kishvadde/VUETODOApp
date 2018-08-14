<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <form action="">
                    <div class="form-group">
                        <label for="todo">Create Todo:</label>
                        <input v-model="newTodo" type="text" placeholder="Enter your todo text here" class="form-control" id="todo">
                        <div v-if="createError" :style="{color:'red'}">*{{createError}}</div>
                    </div>
                </form>
                <span>
                    <button  class="btn btn-primary pull-right"  @click="createTodo">Create</button>
                </span>
            </div>
        </div>
        <div class="row">
            <div id ="alltodos" class="col-md-8 col-md-offset-2">
                <todo  v-for="todo in AllTodoList" v-bind:key="todo.id" :id="todo.id" :name="todo.name" :udpateError="todo.updateError" :completed="todo.completed" :editmode="todo.editmode" :active="todo.active"/>  
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import Todo from '../views/Todo.vue';
import {TodoObject} from '../models';
import { Component,Prop} from 'vue-property-decorator'



@Component({components: {
    Todo
    },
})
export default class TodoList extends Vue{

    newTodo:string = "";

    get AllTodoList(){
        return this.$store.getters.getAllTodos;
    }

    get createError(){
        return this.$store.getters.createError;
    }

    createTodo(){
        this.$store.dispatch('createTodo',this.newTodo);
    }

}
</script>