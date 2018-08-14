export interface TodoObject {
    id: number;
    name: string;
    completed: boolean;
    editmode: boolean;
    updateError:string;
    active:boolean
}

export interface ID{
    id:number;
  }
  
export interface IDNAME{
    id: number;
    name: string;
}