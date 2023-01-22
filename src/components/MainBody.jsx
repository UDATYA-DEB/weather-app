import React, { useState } from 'react'
import './style/mainbody.css'

const MainBody = () => {
    const [city, setCity] = useState()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])
    const api_key = 'f211b629800040318f2110618232201'

    const handleRequest = async()=>{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`)
        if (response.status === 400){
            alert('Enter valid City Name.')
        }
        else{
            const getData = await response.json()
            setData([{city: getData.location.name, country: getData.location.country, temp: getData.current.temp_c, nature: getData.current.condition.text, icon: getData.current.condition.icon}])
        }
        setLoader(false)
    }

    const fetchData = ()=>{
        console.log('button clicked');
        setLoader(true)
        handleRequest()
    }

    if (loader){
        return <p className='loader'>
            Loading...
        </p>
    }

  return (
    <div className='mainbody-container'>
        <div className='field-container'>
            <input type="text" name='locator' value={city} onChange={(e)=>setCity(e.target.value)}/>
            <button className="btn" onClick={fetchData}>Search</button>
        </div>
        {data.map((element)=>{
            return <div className='data-container'>
                <p>{element.city}, {element.country}</p>
                <p>{element.temp} °C</p>
                <div className='logo-container'>
                    <img src={element.icon} alt={element.nature} />
                </div>
                <p>Condition: {element.nature}</p>
            </div>
        })}
    </div>
  )
}

export default MainBody