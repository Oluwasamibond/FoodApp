import { useEffect, useState } from "react";
import styles from './fooddetails.module.css'
import ItemList from "./ItemList";
function FoodDetails({foodId}){
    const [food, setFood] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = "d3c818a24129492d8e64ba41ebecc8c4"
    useEffect(()=> {
       async function fetchFood(){
            const res = await fetch(`${URL}?apiKey=${API_KEY}`)
            const data = await res.json()
            console.log(data)
            setFood(data)
            setIsLoading(false)
        }
        fetchFood()
    }, [foodId])
    return(
        <div>
            <div className={styles.recipeCard}>
                <h1 className={styles.recipeName}>{food.title}</h1>
                <img className={styles.recipeImage} src={food.image} alt="" />
           
                <div className={styles.recipeDetails}>
                    <span>
                        <strong>🕔 {food.readyInMinutes} Minutes</strong>
                    </span>
                    <span>
                        <strong> 🤼 Serves {food.servings}</strong>
                    </span>
                    <span> 
                    <strong>{food.vegetarian ? "🥕Vegetarian": "🍖Non-Vegetarian"}</strong>
                    </span>
                    <span>{food.vegan? "🐄 Vegan" : ""}</span>
                </div> 
                <div>
                     💲 <span>{food.pricePerServing / 100} per serving</span>
                </div>
                    <h2>Ingredients</h2>
                    <ItemList food={food} isLoading={isLoading}/>
                    <h2>Instructions</h2>
                <div className={styles.recipeInstructions}>
                    <ol>
                        {isLoading? <p>Loading...</p>:food.analyzedInstructions[0].steps.map((step)=>(
                            <li>{step.step}</li>

                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails;