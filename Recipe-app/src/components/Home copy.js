import React,{useState} from 'react';
import Product from './Product';
import Dropdownbox from './Dropdownbox';
const Home = () => {
const [search,setSearch] = useState('');
const [data,setData] = useState([]);
const [isSubmitted, setIsSubmitted] = useState(false);
const [selectedOption, setSelectedOption] = useState('');
const handleSelect = (value) => {
  setSelectedOption(value);
};

const options = [
  { value: 'chicken', label: 'Chicken' },
  { value: 'beef', label: 'Beef' },
  { value: 'pasta', label: 'Pasta' },
];
const submitHandler = (e)=>{
  e.preventDefault();
  setIsSubmitted(true);
  if (search.trim() === '') {
    // If search is empty, do not fetch data
    setData([]);
    return;
  }
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(response => response.json()).then((data) =>{
    if(data.meals){
      setData(data.meals)
    }else{
      setData([]);
    }
  })
  .catch((err) => console.error('Error fetching data:', err))

}
  return (
    <div className='Main p-4'>
      <div className='container-fluid'>
      <div className='d-flex gap-5'>
        <div className='Left fixed-left'>
        <div className='Form-box'>
        <form onSubmit={submitHandler}>
        <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)} className='form-control mb-3'placeholder='Search for a meal...'/>
        <input type='submit' value='Search' className='btn btn-primary'/>
      </form>
     <Dropdownbox options={options} onSelect={handleSelect}/>
    </div>
        </div>
      <div className='Right'>
      <div className='Food-container'>
        {data.length >0 ? <Product data={data}/>:(isSubmitted && <p>Your item "{search}" not found.</p>)}
      </div>
      </div>
     </div>
      </div>

    </div>

  )
}

export default Home