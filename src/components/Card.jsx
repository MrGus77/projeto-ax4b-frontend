import { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

export default function Card({ restaurant, isRegister = false, updateRestaurants }) {
    const inputRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const createNewRestaurant = useCallback(async (name) => {
        setIsLoading(true)

        try {
            await axios.post('http://localhost:2015/restaurant', {
                name,
            })

            updateRestaurants()
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    if (isRegister) {
        return <article>
            <input ref={inputRef} type="text" placeholder="Nome" name="name" id="name" />
            <button disabled={isLoading} onClick={() => createNewRestaurant(inputRef?.current?.value)}>Salvar</button>

            {error && <p>{error}</p>}
        </article>
    }


    return (<article>
        <h2>{restaurant?.name}</h2>
        <p>Código: {restaurant?.code}</p>
        <p>Votos: {restaurant?.votes}</p>
        <FontAwesomeIcon icon="fa-thin fa-star" style={{color: "#cfcf3f",}} />
    </article>)
}