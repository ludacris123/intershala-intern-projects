import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container} from "@mui/material";
import Trending from "./Pages/Trending";
import Search from "./Pages/Search"
import Series from "./Pages/Series";
import Movies from "./Pages/Movies";


function App() {

  return (

    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
            <Routes>
              <Route path="/" element={<Trending />} exact ></Route>
              <Route path="/Search" element={<Search />}></Route>
              <Route path="/Series" element={<Series />}></Route>
              <Route path="/Movies" element={<Movies />}></Route>
            </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;


