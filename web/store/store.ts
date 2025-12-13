import AccountStore from './AccountStore'
import CommonStore from './CommonStore'

interface Store {
  accountStore: AccountStore 
  commonStore: CommonStore

}

export const store: Store = {
  accountStore: new AccountStore(),
  commonStore: new CommonStore()
}