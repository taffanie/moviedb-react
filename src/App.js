import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const [state, setState] = useState({ // state & setState are 2 arguments
    // default values
    query: "",
    results: [],
    selected: {}
  });

  const apiurl = "http://www.omdbapi.com/?apikey=36e80f96";

  const search = (e) => {
    if (e.key === 'Enter') {
      axios(apiurl + "&s=" + state.query).then(({ data }) => {
        console.log(data.Search);
        let userresults = data.Search;

        setState(prevState => {
          return { ...prevState, results: userresults }
        })
      });
    }
  }

  const handleInput = (e) => {
    let userquery = e.target.value;

    setState(prevState => {
      return { ...prevState, query: userquery }
    });

    // console.log(state.query);
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result)

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
