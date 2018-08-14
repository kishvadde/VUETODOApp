<template>
    <div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <form action="">
                    <div class="form-group">
                        <label for="todo">Create Todo:</label>
                        <input v-model="new_todo" type="text" placeholder="Enter your todo text here" class="form-control" id="todo">
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
import Vue from 'vue'
import Todo from '../views/Todo.vue'
import { Component,Prop} from 'vue-property-decorator'


interface TodoObject {
    id: number;
    name: string;
    completed: boolean;
    editmode: boolean;
    update_error:string;
}

@Component({components: {
    Todo
    },
})
export default class TodoList extends Vue{

    todolist:TodoObject[] = [];
    new_todo:string = "";

    get ActiveTodoList(){
        return this.$store.getters.getActiveTodos;
    }

    get AllTodoList(){
        return this.$store.state.todos;
    }

    get createError(){
        return this.$store.state.createError;
    }

    createTodo(){
        this.$store.commit('createTodo',this.new_todo);
    }

    // getTodoIndex(id: number){      
    //     for(var index:number = 0; index < this.todolist.length; index++){
    //         if (this.todolist[index].id === id){
    //             return index;
    //         }
    //     }
    //     return -1;
    // }

    // createTodo(name:string){
    //     if(this.new_todo.length > 0){
    //         this.count += 1;
    //         this.todolist.push({
    //             id: this.count,
    //             name: this.new_todo,
    //             completed: false,
    //             editmode:false,
    //             update_error:"",
    //         });
    //         this.new_todo = "";
    //         this.error = "";
    //     }
    //     else{
    //         this.error = "Todo should not be empty"
    //     }
    // }

    // deleteTodo(id: number){
    //     var index:number = this.getTodoIndex(id);
    //     if(index >= 0){
    //         this.todolist.splice(index,1);
    //     }
    //     this.error = "";
    // }

    // editTodo(id:number){
    //     var index:number = this.getTodoIndex(id);
    //     if(index >= 0){
    //         this.todolist[index].editmode = true;
    //     }
    //     this.error = "";
    // }

    // toggleTodoStatus(id: number){
    //    var index:number =  this.getTodoIndex(id);
    //    this.todolist[index].completed = !this.todolist[index].completed;
    //    this.error = "";
    // }

    // updateTodo(id: number, name:string){

    //     var index:number = this.getTodoIndex(id);
    //     if(this.todolist[index].editmode && name.length > 0){
    //         this.todolist[index].name = name;
    //         this.todolist[index].editmode = false;
    //         this.todolist[index].completed = false;
    //         this.todolist[index].update_error = "";
    //     }
    //     else{
    //         this.todolist[index].update_error = 'Todo should not be empty';
    //     }
    //     this.error = "";
        
    // }
}
</script>


<style>
</style>