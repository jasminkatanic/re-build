import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useFetchData from './useFetchData';

const Content = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('Movies');
  const [isMovies, setIsMovies] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);
  const [category, setCategory] = useState('movies');
  const {data, error} = useFetchData('http://localhost:5000/', category, pageOffset, searchTerm);  
 
  
  function toggleValue(e){    
    if(e.target.checked){
      setCategory('shows');
    }else{
      setCategory('movies');
    }
    setTitle(e.target.checked ? 'TV Shows' : 'Movies');    
    setPageOffset(0);
  }  

  function onViewMoreClick(){
    setPageOffset(pageOffset + 10);    
  }

  function onStarClick(id, rateing){
    const category = isMovies ? 'movies' : 'shows';
    axios.post(`http://localhost:5000/${category}/${id}`,{rateing})
     .then(() => setCategory(category))
  };

  return (  

    <div>          
    {/* SEARCH AND TOGGLE SECTION */}
    <div className="navbar">         
      <div className="navbar-first">
        <div className="navbar-first-search">
          <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} type="text" placeholder="Enter your search term"/>
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

    {/* TITLE SECTION */}
    <h2>{title}</h2>

    {/* CONTENT SECTION */}
    <div className="content">  

      {data.length    
      ?data.map((movies, index) =>        
        <div className="content-card" key={index}>          
          <div className="content-card-content">
            <div className="content-card-content-top">
              <img src={movies.image} alt={movies.title} />
            </div>
            <div className="content-card-content-bottom">
              <div className="content-card-content-bottom-title">{movies.title}</div>
              <div className="content-card-content-bottom-description">{movies.description}</div>
              <div className="content-card-content-bottom-cast"><strong>Release Date:</strong>{new Date(movies.release).toLocaleDateString('en-GB')}</div>  
              <div className="content-card-content-bottom-cast"><strong>Cast:</strong>{``+movies.cast}</div>                 
            </div>
            <div className="content-card-content-rateing">
              <div className="content-card-content-rateing-stars">              
                <FaStar className="content-card-content-rateing-stars-item" onClick={() => onStarClick(movies._id, 1)}/>
                <FaStar className="content-card-content-rateing-stars-item" onClick={() => onStarClick(movies._id, 2)}/>
                <FaStar className="content-card-content-rateing-stars-item" onClick={() => onStarClick(movies._id, 3)}/>
                <FaStar className="content-card-content-rateing-stars-item" onClick={() => onStarClick(movies._id, 4)}/>
                <FaStar className="content-card-content-rateing-stars-item" onClick={() => onStarClick(movies._id, 5)}/>
              </div>
            </div>
          </div>
        </div>
        
      ):
        <h2>Sorry Your Search Term Did Not Return Any Results</h2>
      }
    
    <div className="content-viewmore">      
      <button onClick={onViewMoreClick} className={`${pageOffset>=data.length ? "hidden" : ""}`}>View More</button>
    </div>
    </div>
    
    </div>
    
  );
}
 
export default Content;