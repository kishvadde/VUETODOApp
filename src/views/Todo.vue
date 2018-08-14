<template>
    <div class="todo" v-if="!editmode">
        <span :style="{fontSize:'18px'}" v-if="!active">
            <strike>
                {{name}}
            </strike>
        </span>
        <span v-else :style="{fontSize:'18px'}"> {{name}} </span>
        <span v-if="completed" :style="{fontSize:'18px',color:'green'}"  class="glyphicon glyphicon-ok-circle"></span>
        <span class="pull-right" :style="{marginRight:'4px'}">
            <button class="btn btn-default" @click="editTodo">
                Edit
            </button>
        </span>
        <span class="pull-right" :style="{marginRight:'4px'}">
            <button v-if='!completed' class="btn btn-default" @click="toggleTodoStatus">
                Mark completed
            </button>
            <button v-else class="btn btn-default" @click="toggleTodoStatus">
                Mark Not completed
            </button>
        </span>
        <span class="pull-right" :style="{marginRight:'4px'}">
            <button class="btn btn-default" @click="deleteTodo">
                Delete
            </button>
        </span>
    </div>
    <div class="todo" v-else>
        <form action="">
           <div class="form-group">
                <input v-model="updated_todo" type="text" class="form-control">
            </div>
            <div v-if="updateError">*{{updateError}}</div>
        </form>
         <span><button  class="btn btn-default" @click="updateTodo">Update</button></span>
    </div>
</template> 


<script lang="ts">
import { Component,Prop} from 'vue-property-decorator';
import Vue from 'vue'


@Component
export default class Todo extends Vue{
   @Prop({default: 0}) private id:number;
   @Prop({default: ""}) private name:string;
   @Prop({default: false}) private completed:boolean;
   @Prop({default: false}) private editmode:boolean;
   @Prop({default: ""}) private updateError:string;
   @Prop({default: true}) private active:boolean;

    updated_todo:string = "";

    created(){
        this.updated_todo = this.name;
    }

    editTodo(){
        this.$store.commit('editTodo',
           {id:this.id});
    }

    updateTodo(){
        this.$store.commit('updateTodo',
            {id:this.id,
            name:this.updated_todo
            });
    }

    deleteTodo(){
        this.$store.commit('deleteTodo', {id: this.id});
    }

    toggleTodoStatus(){
        this.$store.commit('toggleTodoStatus', {id: this.id});
    }

  }
</script>

<style scoped>
.todo{
    padding: 2%;
    border: solid 1px gainsboro;
    border-radius: 3%;
    margin: 1%;
}
</style>


