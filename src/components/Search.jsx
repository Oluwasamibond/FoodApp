import { useEffect, useState } from "react";
import styles from './search.module.css'
const URL = "https://api.spoonacular.com/recipes/complexSearch"
const API_KEY = "d3c818a24129492d8e64ba41ebecc8c4"

function Search({foodData, setFoodData}){
    const [query, setQuery] = useState('pasta')
    useEffect(() => {
      async function fetchFood(){
           const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY} `)
           const data = await res.json()
           console.log(data.results)
           setFoodData(data.results)
       }
       fetchFood()
    }, [query])
    return(
        <div className={styles.searchContainer}>
            <input className={styles.input}
                value={query} 
                onChange={(e)=>setQuery(e.target.value)} 
                type="text" />
        </div>
    )
}

export default Search;