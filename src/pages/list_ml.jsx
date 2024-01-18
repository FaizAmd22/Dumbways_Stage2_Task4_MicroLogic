import { useState, useEffect } from "react"
import axios from "axios"

const ListML = () => {
  const [datas, setDatas] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.dazelpro.com/mobile-legends/hero")
        const data = response.data.hero

        if (search.length > 0) {
          const filtered = data.filter((item) => item.hero_name.toLowerCase().includes(search.toLowerCase()))
          setDatas(filtered)
        } else {
          setDatas(data)
        }
      } catch (error) {
        console.error("Error fetching data. Please try again", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [search])

  console.log("datas : ", datas)
  console.log("search : ", search)

  return (
    <div className="h-[95vh] flex flex-col m-auto gap-5 p-10 mt-10">
      <div className="h-[10vh] flex flex-col gap-5">
        <h1 className="font-bold text-center uppercase text-2xl">List Hero Mobile Legends</h1>

        <div className="w-[80vw] md:w-[60vw]">
          <label htmlFor="search" className="flex flex-col">
            Search by hero name
            <input
              type="text"
              name="search"
              placeholder="search"
              className="bg-slate-200 rounded-xl px-5 py-1"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="w-[80vw] md:w-[60vw] h-[80vh] overflow-auto mt-5 flex flex-col gap-10">
          {datas.map((data, index) => (
            <div key={index} className="flex gap-10 items-center">
              <div className="w-[20%]">
                <img src="https://i.pinimg.com/564x/ea/1e/d1/ea1ed14327f20b2037fc7aea3ac523d4.jpg" alt="heroML" className="rounded-full w-[100%]" />
              </div>

              <div>
                <h1>{data.hero_name}</h1>
                <p>{data.hero_role}</p>
                <p>{data.hero_specially}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListML;
