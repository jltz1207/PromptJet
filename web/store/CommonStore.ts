import { makeAutoObservable, runInAction } from "mobx"

export default class CommonStore {
  loadingInitial: boolean = false
  constructor() {
    makeAutoObservable(this)
  }
  setLoadingInitial = (b:boolean) =>{
    runInAction(()=>{
      this.loadingInitial = b
    })

  }
}