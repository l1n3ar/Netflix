import "./App.css";
import Row from "./Components/Row";
import requests from "./requests";
import Banner from "./Components/Banner";
import Nav from "./Components/Nav";

function App() {
  // console.log(instance + requests.fetchNetflixOriginals);

  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetch={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetch={requests.fetchTrending} />
      <Row title="Top Rated" fetch={requests.fetchTopRated} />
      <Row title="Action Movies" fetch={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetch={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetch={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetch={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetch={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
