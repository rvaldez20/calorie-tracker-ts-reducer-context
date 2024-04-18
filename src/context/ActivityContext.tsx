import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
   children: ReactNode
}

type ActivityContextProps = {
   state: ActivityState
   dispatch: Dispatch<ActivityActions>
   caloriesCosumed: number
   caloriesBurned: number
   caloriesTotals: number
   categoryName: (category: Activity['category']) => string[]
   isEmptyActivity: boolean
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)


export const ActivityProvider = ({children}: ActivityProviderProps) => {

   //* Reducer
   const [state, dispatch] = useReducer(activityReducer, initialState)


   //* Contadores
   const caloriesCosumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

   const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

   const caloriesTotals = useMemo(() => caloriesCosumed - caloriesBurned, [state.activities])

   //* Funciones de activityList
   const categoryName = useMemo(() =>
         (category:Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
      , [state.activities]
   )

   const isEmptyActivity = useMemo(() => state.activities.length === 0, [state.activities])

   return (
      <ActivityContext.Provider value={{
         state,
         dispatch,
         caloriesCosumed,
         caloriesBurned,
         caloriesTotals,
         categoryName,
         isEmptyActivity,
      }}>
         {children}
      </ActivityContext.Provider>
   )
}
