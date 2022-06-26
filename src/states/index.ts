import { persistStore } from 'redux-persist'
import { store } from './store'

export { store }
export const persistor = persistStore(store)
