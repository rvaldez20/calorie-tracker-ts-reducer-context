import { useContext } from "react"
import { ActivityContext } from "../context/ActivityContext"



export default function useActivity() {
   const context = useContext(ActivityContext)
   if(!context) throw new Error('useBudget must be wrap by a BudgetProvider')

   return context
}
