import { Link } from "react-router-dom"
import supabase from "../config/supabase"

export default function SmoothieCard({ smoothie,onDelete }: any) {
  const handleDelete = async () => {
    const { data, error } = await supabase.from("smoothies").delete().match({ id: smoothie.id }).select()
    if (error) console.log(error)
    if (data) console.log(data); onDelete(smoothie.id)
  }
  return (
    <div className="smoothie-card">
      <h1>{smoothie.title}</h1>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={`/${smoothie.id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  )
}
