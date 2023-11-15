import { useState } from "react"

const App = ()=> {
  const surpriseOptions = [
    "cảnh biển với hoàng hôn tuyệt đẹp",
    "Những chú chó dễ thương đang vui chơi",
    "cảnh núi non hùng vĩ ",
    "Cuộc sống náo nhiệt, đông đúc"
  ]
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);


  const surpriseMe = () => {
    const randomValue =  surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const getImages = async()=> {
    try {
      const options = {
        method:'POST',
        body:JSON.stringify({
          message:value
        }),
        headers:{
          "content-type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/images',options)
      const data = await response.json();
      console.log(data)
      setImages(data)
    } catch (error) {
      console.error(error)
    }
  }
 console.log(value);
  return (
    <div className="app">
      <section className="search-section">
        <p>Nhập từ khóa để tạo bức ảnh tuyệt đẹp
          <span className="surprise" onClick={surpriseMe}>Ngẫu nhiên</span>
        </p>
        <div className="input-container">
          <input
          value={value}
           placeholder="Nhập tại đây"
           onChange={e => setValue(e.target.value)}
           />

          <button onClick={getImages}>Tạo</button>
        </div>
      </section>
      <section className="image-section">
        {images?.map((image,_index)=>(
          <img key={_index} src={image.url} alt={`Tạo ảnh ${value}`}></img>
        ))}
      </section>
    </div>
  );
}

export default App;
