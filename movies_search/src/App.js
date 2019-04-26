import React, { Component} from 'react';
import './App.css';
import MoviesRows from './MoviesRows.js'
import $ from 'jquery'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {}
    

    this.performSearch("") }
    
    performSearch (SearchTerm){
      console.log("Perform search using moviedb")
      const urlString = "https://api.themoviedb.org/3/search/movie?query=&api_key=dc7effe6c8dfd8d954b490b60bce97fa&query=" + SearchTerm
      $.ajax({
        url: urlString,
        success: (SearchTerm) => {
          console.log("Fetched data successfuly")
          //console.log(searchResults)
          const results = SearchTerm.results
          //console.log(results[0])
          
          var movieRows = []

          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path            
            //console.log(movie.poster_path)
            const movieRow = <MoviesRows movie={movie}/> 
            
           
            movieRows.push(movieRow)
            
          })

          this.setState({rows: movieRows})
        },
        error: (xhr, status, err) => {
          console.error("failed to fetch data")
        }

        
      })
  }
  
  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const SearchTerm = event.target.value
    boundObject.performSearch(SearchTerm)
  }
 render(){
  return (
    <div>

      <table className="titleBar">
        <body>
          <tr>
            <td>
              <img alt="app icon" width="75" src="server.svg"/>
            </td>
            <td width="8"/>
            <td>
             <h1>MoviesDB Search </h1> 
            </td>
          </tr>
        </body>

      </table>

      <input style={{
        fontSize: 24,
        display: 'block',
        width: '99%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,

      }} onChange={this.searchChangeHandler.bind(this)}placeholder="Enter movie name"/>

      {this.state.rows}


    </div>
  );
 }
  
}

export default  App;
