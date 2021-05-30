import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';


//import { MDBCol, MDBIcon } from "mdbreact";

const SearchBar = function() {
  return <form action = "/search"> 
  <div class="Hotbg">
    <input type="text" name="searchquery" class="Hotbg-txt" placeholder="Search >>>"/>
    <a href="#" class="Hotbg-btn">
      <i class="fa fa-search"></i>
    </a>
</div>
</form>
};

ReactDOM.render(SearchBar(),document.getElementById('root'));