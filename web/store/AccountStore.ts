import agent from "@/api/agent";
import { LoginForm, User } from "@/models/Account";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
export default class AccountStore {
  loadingInitial = false;
  user: User | null = null
  constructor() {
    makeAutoObservable(this)
  }

  login = async (form: LoginForm) => {
    store.commonStore.setLoadingInitial(true)
    try {
      const response = await agent.account.login(form)
      const user = response.data.user as User //possible be null
      console.log(response.data)
      console.log(user)

      runInAction(() => {
        this.user = user
      })
      store.commonStore.setLoadingInitial(false)
      return response.data
    }
    catch (error) {
      runInAction(() => this.loadingInitial = false)
      console.error(error)
      throw error
    }
  }
  register = async (form: any) => {
    try {
      store.commonStore.setLoadingInitial(true)
      const response = await agent.account.register(form)
      runInAction(() => {
        this.user = response.data.user as User
        console.log(this.user)
      })
      store.commonStore.setLoadingInitial(false)
      return response.data
    }
    catch (err) {
      store.commonStore.setLoadingInitial(false)
      console.error(err);
    }
  }
  register_checkEmail = async (email: string) => {
    try {
      store.commonStore.setLoadingInitial(true)
      const response = await agent.account.register_checkEmail(email)
      store.commonStore.setLoadingInitial(false)
      return response.data
    }
    catch (err) {
      store.commonStore.setLoadingInitial(false)
      console.error(err);
    }
  }
  logout = () => {
    try {
      runInAction(() => {
        this.user = null
      })
      return
    }
    catch (error) {
      throw error
    }
  }

  forgot = async (email: string) => {
    try {
      store.commonStore.setLoadingInitial(true)
      const result = await agent.account.forgot(email);
      store.commonStore.setLoadingInitial(false)
      return result.data
    }
    catch (error) {
      store.commonStore.setLoadingInitial(false)
      throw error
    }
  }
  forgot_submitCode = async (model: { email: string, code: string }) => {
    try {
      store.commonStore.setLoadingInitial(true)
      const result = await agent.account.forgot_submitCode(model);
      store.commonStore.setLoadingInitial(false)
      return result.data
    }
    catch (error) {
      store.commonStore.setLoadingInitial(false)
      throw error
    }
  }
  forgot_submitPassword = async (model: any) => {
    try {
      store.commonStore.setLoadingInitial(true)
      const result = await agent.account.forgot_submitPassword(model);
      store.commonStore.setLoadingInitial(false)
      return result.data
    }
    catch (error) {
      store.commonStore.setLoadingInitial(false)
      throw error
    }
  }
}