import Vue from "vue";
import Vuex from "vuex";
import { isRegExp } from 'util';
import { toUnicode } from 'punycode';

Vue.use(Vuex);

interface TodoObject {
  id: number;
  name: string;
  completed: boolean;
  editmode: boolean;
  updateError:string;
  active:boolean,
}

interface State{
    todos: TodoObject[];
    createError:string;
    getTodoIndex:(id:number) => number
}

interface TodoStore{
  state:State,
  getters:{},
  mutations:{},
  actions:{},
}

interface ID{
  id:number,
}


var store:TodoStore = {
    state:{
      todos:[],
      createError:"",
      getTodoIndex(id:number){
        for(var index:number = 0; index < this.todos.length; index++){
            if (this.todos[index].id === id){
                return index;
            }
          }
        return -1;
      }
    },
    getters:{

      getAllTodos(state:State){
          return state.todos;
      },

      getActiveTodos(state:State){
        return state.todos.filter((todo)=>todo.active)
      },

      getInactiveTodos(state:State){
        return state.todos.filter((todo)=>!todo.active)
      }
    },

    mutations:{
      createTodo(state:State, payload:string){

        if (payload.length > 0){
            state.todos.push({
              id: state.todos.length+1,
              name: payload,
              completed:false,
              editmode:false,
              updateError:"",
              active:true,
            });
        }
        else{
          state.createError = 'Todo should not be empty';
        }
      },


      deleteTodo(state:State,payload:ID){
        var index:number  = state.getTodoIndex(payload.id);
        if(index >= 0){
            state.todos[index].active = false;
        }
        state.createError = "";
      },

      editTodo(state:State, payload:ID){
        var index:number = state.getTodoIndex(payload.id);
        if(index >= 0){
            state.todos[index].editmode = true;
        }
        state.createError = "";
      },

      toggleTodoStatus(state:State, payload:ID){
        var index:number =  state.getTodoIndex(payload.id);
        state.todos[index].completed = !state.todos[index].completed;
        state.createError = "";
      },

      updateTodo(state:State, payload:{id:number,name:string}){
     
        var index:number =  state.getTodoIndex(payload.id);
        if(state.todos[index].editmode && payload.name.length > 0){
            state.todos[index].name = payload.name;
            state.todos[index].editmode = false;
            state.todos[index].completed = false;
            state.todos[index].active = true;
            state.todos[index].updateError = "";
        }
        else{
            console.log('In esle')
            console.log(index);
            state.todos[index].updateError = 'Todo should not be empty';
        }
        state.createError = "";
      }



    },
    actions:{

    }

};

export default new Vuex.Store(store);
