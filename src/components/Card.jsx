import { useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

export default function Card({ restaurant, isRegister = false, updateRestaurants }) {
    const inputRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const createNewRestaurant = useCallback(async (name) => {
        setIsLoading(true)

        try {
            await axios.post(import.meta.env.VITE_API_URL + '/restaurant', {
                name,
            })

            updateRestaurants()
        } catch (error) {
            setError(error?.response?.data || 'Erro ao criar restaurante')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const voteRestaurant = useCallback(async (id) => {
        setIsLoading(true)

        try {
            await axios.post(import.meta.env.VITE_API_URL + '/votes', {
                user: 'mock', restaurant_code: id
            })

            updateRestaurants()
        } catch (error) {
            setError(error?.response?.data || 'Erro ao votar')
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

        <button disabled={isLoading} onClick={() => voteRestaurant(restaurant?.code)}>
            <span>Vote</span>
            <FontAwesomeIcon icon={faStar} style={{ color: "#cfcf3f", }} />
        </button>

        {error && <p>{error}</p>}
    </article>)
}