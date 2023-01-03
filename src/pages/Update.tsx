import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabase"
// @ts-ignore
import { Helmet } from "react-helmet"

export default function Update() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState<any>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!title || !method || !rating) {
      setFormError("Please fill in all fields")
      return
    }
    const { data, error } = await supabase.from("smoothies").update({ title, method, rating }).eq("id", id).select()
    if (error) {
      console.log(error)
      setFormError("Could not update smoothie recipe")
    }
    if (data) {
      console.log(data[0])
      setFormError(null)
      setTitle("")
      setMethod("")
      setRating("")
      navigate(`/`)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("smoothies").select().eq("id", id).single()
      if (error) {
        console.log(error)
        navigate("/", { replace: true })
      }
      if (data) {
        console.log(data)
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }
    fetchData()
  }, [id, navigate])
  return (
    <div className="page update">
      <Helmet>
        <title>Update - {id}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="method">Method:</label>
        <textarea id="method" value={method} onChange={(e) => setMethod(e.target.value)} />

        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />

        <button type="submit" className="bg-green-500">
          Update Smoothie Recipe
        </button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
