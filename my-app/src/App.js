//import logo from './logo.svg';
import { useEffect,useState } from "react";
import axios from 'axios';
import {Container, Table} from "react-bootstrap";
import Pagination from "react-js-pagination";

import './App.css';
// require("bootstrap/less/bootstrap.less");

function App() {
  
  const [getData, setGetdata] = useState([]);


  useEffect(() => {
      axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=10')
      .then(function (res) {
        console.log(res);
        setGetdata(res.data);
      })
  },[])

  const column = [
    {
      name: "Id",
      selector: row => row.id,
    },
    {
      name: "Name",
      selector: row => row.name,
    },
    {
      name: "Tagline",
      selector: row => row.tagline,
    },
    {
      name: " First_brewed",
      selector: row => row. first_brewed,
    },
    {
      name: "Description",
      selector: row =>row.description,
    }
  ]
  const handlePageClick = (event) => {
    const newOffset = (event * 10) % 10;
    axios.get(`https://api.punkapi.com/v2/beers?page=${event}&per_page=10`)
    .then(function (res) {
      console.log(res);
      setGetdata(res.data);
    })
    }
  return (  
      <div className = "APP">
        <div className="container">
          <Container>
            <Table className="table table-striped">
            <thead>
          <tr>
          {column && column.map((item, i) => {
            return (
              <th key={i}>{item.name}</th>
            )
          })}
          </tr>
        </thead>
        <tbody>
          {/* {rows && rows.map((item,index) => {
            return ( */}
              
                {getData && getData.map((field, i) => {
                  return(
                    <tr key={i}>
                    <td>{field.id}</td>
                    <td>{field.name}</td>
                    <td>{field.tagline}</td>
                    <td>{field.first_brewed}</td>
                    <td>{field.description}</td>
                    </tr>
                  )
                })}
              
            {/* )
          })} */}
        </tbody>
      </Table>
      <Pagination
          activePage={2}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={handlePageClick}
        />
    </Container>
              {/* columns={column}
              data={getData}

              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponentOptions={{
                rowsPerPageText: "Records per page:",
                rangeSeparatorText: "out of",
              }} */}
        
        </div>

      </div>
  )
      
}


export default App;
