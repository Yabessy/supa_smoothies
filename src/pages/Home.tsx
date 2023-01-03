// @ts-ignore
import { Helmet } from "react-helmet"
import supabase from "../config/supabase"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

export default function Home() {
  const [fetchError, setFetchError] = useState<any>(null)
  const [smoothies, setSmoothies] = useState<any>(null)
  const [orderBy, setOrderBy] = useState<any>("created_at")

  const handleDelete = async (id: any) => {
    setSmoothies(smoothies.filter((smoothie: any) => smoothie.id !== id))
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select().order(orderBy, { ascending: true })
      if (error) setFetchError("could not fetch smoothies"), console.log(error), setSmoothies(null)
      if (data) setSmoothies(data), setFetchError(null), setFetchError(null)
    }
    fetchSmoothies()
  }, [orderBy])
  return (
    <div className="page home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By: {orderBy}</p>
            <button onClick={() => setOrderBy("created_at")}>Time Create</button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie: any) => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
