import { Route, Routes } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"
import Home from "./pages/Home"

import "./App.css"
import Update from "./pages/Update"
import Create from "./pages/Create"

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Supa Smoothie</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}
