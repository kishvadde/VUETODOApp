import Vue from "vue";
import Vuex from "vuex";
import {TodoObject, ID, IDNAME} from './models';
Vue.use(Vuex);



interface State{
    todos: TodoObject[];
    createTodoError:string;
    getTodoIndex:(id:number) => number;
}

interface TodoStore{
  state:State;
  getters:{};
  mutations:{};
  actions:{};
}

var store:TodoStore = {
    state:{
      todos:[],
      createTodoError:"",
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

      createError(state:State){
        return state.createTodoError;
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
          state.createTodoError = 'Todo should not be empty';
        }
      },

      deleteTodo(state:State,payload:ID){
        var index:number  = state.getTodoIndex(payload.id);
        if(index >= 0){
            state.todos[index].active = false;
        }
        state.createTodoError = "";
      },

      editTodo(state:State, payload:ID){
        var index:number = state.getTodoIndex(payload.id);
        if(index >= 0){
            state.todos[index].editmode = true;
        }
        state.createTodoError = "";
      },

      toggleTodoStatus(state:State, payload:ID){
        var index:number =  state.getTodoIndex(payload.id);
        state.todos[index].completed = !state.todos[index].completed;
        state.createTodoError = "";
      },

      updateTodo(state:State, payload:IDNAME){
     
        var index:number =  state.getTodoIndex(payload.id);
        if(state.todos[index].editmode && payload.name.length > 0){
            state.todos[index].name = payload.name;
            state.todos[index].editmode = false;
            state.todos[index].completed = false;
            state.todos[index].active = true;
            state.todos[index].updateError = "";
        }
        else{
            state.todos[index].updateError = 'Todo should not be empty';
        }
        state.createTodoError = "";
      }



    },
    actions:{
      createTodo(context:any, name:string){
          context.commit('createTodo',name);
      },

      deleteTodo(context:any, payload:ID){
          context.commit('deleteTodo',payload);
      },

      editTodo(context:any, payload:ID){
        context.commit('editTodo', payload);
      },

      toggleTodoStatus(context:any, payload:ID){
        context.commit('toggleTodoStatus', payload);
      },

      updateTodo(context:any, payload:IDNAME){
        context.commit('updateTodo', payload);
      }

    }

};

export default new Vuex.Store(store);
