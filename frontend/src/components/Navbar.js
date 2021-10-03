import { useState } from "react";

import useFetchData from './useFetchData';

const Navbar = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isMovies, setIsMovies] = useState(true);
  const [category, setCategory] = useState('movies');
  const [pageOffset, setPageOffset] = useState(0);  

  const {data, error} = useFetchData(`http://localhost:5000/${category}?pageOffset=${pageOffset}${searchTerm ? `&search=${searchTerm}` : ''}`);  

  function toggleValue(){ 
    
    if(isMovies){
      setCategory('shows');
      setIsMovies(false);
    }else{
      setCategory('movies');
      setIsMovies(true);
    }  
    //fetchData(e.target.checked ? 'shows' : 'movies');
    //setPageOffset(0);
  };

  function searchData(){
    if(searchTerm.length>=2){
      //fetchData(isMovies ? 'movies' : 'shows', searchTerm);
      
    } else if(searchTerm.length===0){
      //fetchData(isMovies ? 'movies' : 'shows');
    }
    
  };
  
  
  return (
  
  <div className="navbar">
    {console.log(data)}
  <div className="navbar-first">
    <div className="navbar-first-search">
      <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} onKeyDown={searchData} type="text" placeholder="Enter your search term"/>
    </div>        
  </div>
  <div className="navbar-second">
    <div className="navbar-second-content">
      <div className="navbar-second-content-movies">Movies</div>
      <div className="navbar-second-content-toggle">
        <input type="checkbox" id="toggle" onChange={toggleValue}/>
        <label htmlFor="toggle"></label>
      </div>
      <div className="navbar-second-content-shows">TV Shows</div>
    </div>
  </div>      
</div>

);
}
 
export default Navbar;