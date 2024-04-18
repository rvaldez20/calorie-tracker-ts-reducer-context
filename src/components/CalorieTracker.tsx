import CalorieDisplay from "./CalorieDisplay"
import useActivity from "../hooks/useActivity"


export default function CalorieTracker() {
   const { caloriesCosumed, caloriesBurned, caloriesTotals } = useActivity()

   return (
      <>
         <h2 className="text-4xl font-black text-white text-center">Calories Summary</h2>

         <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CalorieDisplay
               calories={caloriesCosumed}
               text="Consumed"
            />
            <CalorieDisplay
               calories={caloriesBurned}
               text="Burned"
            />
            <CalorieDisplay
               calories={caloriesTotals}
               text="Difference"
            />
         </div>
      </>
   )
}
