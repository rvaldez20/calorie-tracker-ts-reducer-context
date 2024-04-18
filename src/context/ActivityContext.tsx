import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";

type ActivityProviderProps = {
   children: ReactNode
}

type ActivityContextProps = {
   state: ActivityState
   dispatch: Dispatch<ActivityActions>
   caloriesCosumed: number
   caloriesBurned: number
   caloriesTotals: number
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)


export const ActivityProvider = ({children}: ActivityProviderProps) => {

   //* Reducer
   const [state, dispatch] = useReducer(activityReducer, initialState)


   //* Contadores
   const caloriesCosumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

   const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

   const caloriesTotals = useMemo(() => caloriesCosumed - caloriesBurned, [state.activities])

   return (
      <ActivityContext.Provider value={{
         state,
         dispatch,
         caloriesCosumed,
         caloriesBurned,
         caloriesTotals,
      }}>
         {children}
      </ActivityContext.Provider>
   )
}
