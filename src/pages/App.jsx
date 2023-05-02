import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { Card } from '../components'

export default function App() {
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getRestaurants = useCallback(
    async () => {
      setIsLoading(true)

      try {
        await axios.get('http://localhost:2015/restaurant').then(response => {
          setRestaurants(response.data)
        })

      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }, []
  )

  useEffect(() => {
    ; (async () => await getRestaurants())()
  }, [getRestaurants])

  return (
    <main>
      <h1>Restaurantes</h1>

      <section>
        {isLoading ? <p>Carregando...</p> : null}

        {error && <p>{error}</p>}

        {restaurants?.length && !isLoading ? <>
          <Card restaurant={{}} updateRestaurants={getRestaurants} isRegister />

          {restaurants?.map(restaurant => (
            <Card key={restaurant.code} restaurant={restaurant} />
          ))}
        </>
          : null}
      </section>
    </main >
  )
}