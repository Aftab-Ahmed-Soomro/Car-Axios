import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ApiData.css'

const ApiData = () => {

    const [product, setProduct] = useState([]);
    const [loading, isLoading] = useState(false);
    const [make,isMake] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [isFound, setIsFound] = useState(false);
    // const [hit,setHit] = useState(0);
    const getData = async() => {
        isLoading(true);
        try {
            const data = await axios.get('https://freetestapi.com/api/v1/cars');
            const res = data?.data;
            console.log(res);
            setProduct(res);  
            setFilterProduct(res);
            const makes = [... new Set(res.map((item)=>item.make))];
            isMake(makes);
            // console.log(makes);
            isLoading(false)
        }
        catch(error) {
            console.log(error);
        }
    };

    const handleValue = (cat) => {
      if (cat == 'All') {
        setFilterProduct(product);
      } else {
        const filteredData = product.filter((item)=>item.make === cat);
      // console.log(cat);
      // console.log(filteredData);
      setFilterProduct(filteredData);
      }
    }

    const handleSearch = () => {
      const filterSearch = filterProduct.filter((item) => item.model.toLowerCase().includes(search.toLowerCase()));
      if (filterSearch.length === 0) {
        setIsFound(true)
      }
      else {
        // console.log(search);
        // console.log(filterSearch);
        setFilterProduct(filterSearch);
        setIsFound(false);
      }
    }

    const handleEnterSearch = (e) => {
      if (e.key == 'Enter') {
        handleSearch();
      }
    }

    // console.log(product);
    useEffect(()=> {
        getData();
        // console.log('Api Received')
    },[])
    // console.log(loading);
    

  return (
    <div>
      {/* <button className='border-2 border-solid border-black' onClick={()=>setHit(hit+1)}>Click Me!</button> */}
      {loading ? <div className="loader mt-20 m-auto"></div> :
      <>
        <div>
          <h1 className='text-center mt-5 text-5xl'>Cars Collection 🚘</h1>
        </div>
        <div className='flex justify-center items-center gap-5 mb-16 mt-12'>
          <input className='border-2 border-solid border-black py-3 px-4 rounded-lg w-96' placeholder='Enter Car Model' onKeyDown={handleEnterSearch} value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <select className='border-2 border-solid border-black py-3 px-4 rounded-lg' onChange={(e)=>handleValue(e.target.value)}>
          <option value='All'>All</option>
          {make.map((item,index)=> {
            return (
              <option key={index} value={item}>{item}</option>
            )
          })}
        </select>
        <button className='text-black bg-white px-4 py-3 rounded-lg hover:text-white hover:bg-black border-2 border-solid border-black' onClick={handleSearch}>Search</button>
      </div>
      {isFound ? <div className='flex justify-center h-[320px]'><img src="./imgs/nodata.avif" alt="" /></div> : 
      <div className='flex flex-wrap gap-10 justify-center items-center'>
        {filterProduct.map((item)=> {
        const {id, make, model, price, year, image} = item;
        return (
            <div className='flex flex-col items-center justify-center gap-4 boxShadow rounded-lg' key={id}>
            <img className='w-[200px] h-[180px] rounded-t-lg' src={image} alt="" />
            <h1 className='text-2xl'>{make}</h1>
            <h1 className='text-lg'>{model}</h1>
            <h1 className='mb-2 text-green-600 text-xl'>{price}$</h1>
            </div>
        )
      })}
      </div>
      }
      </>
      }
      <div className='bg-black text-white py-9 mt-16 flex items-center justify-center'>
        <h1 className='text-center text-xl'>Made with ❤️ by Aftab</h1>
      </div>
    </div>
  );
}

export default ApiData