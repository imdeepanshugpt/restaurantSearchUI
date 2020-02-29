/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import RestaurantCard from './components/restaurantCard';
import SearchBar from './components/searchBar';
import { fetchRestaurants } from './api/restaurants';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


const App = () => {
  const [restaurants, setRestaurantData] = useState([]);
  const [filteredRestaurants, setfilteredRestaurantData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchRestaurants().then((response) => {
      setRestaurantData(response.data);
      setfilteredRestaurantData(response.data);
      console.log('API RESPONSE', response.data);
      const years = response.data.map((restaurant) => {
        return restaurant['Top Ten'].split(' ')[0];
      });
      const filteredYears = years.filter((year, index) => {
        return ((years.indexOf(year) === index) && (year !== "NaN"))
      });
      setYears(filteredYears);
    }).catch((error) => {
      console.log(error);
    })
  }, [restaurants.length]);

  function searchData(searchText) {
    if (searchText === '') {
      setfilteredRestaurantData(restaurants);
    } else {
      const searchedData = restaurants.filter((restaurant) => {
        return ((restaurant.Brand).toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
      });
      setfilteredRestaurantData(searchedData);
    }
  }

  return (
    <div className="App">
      <SearchBar onChange={(text) => searchData(text)}></SearchBar>
      <div style={{ margin: "20px" }}>
        <Autocomplete
          onChange={(event, value) => {
            if (value === null) {
              setfilteredRestaurantData(restaurants);
            } else {
              setfilteredRestaurantData(restaurants.filter((restaurant) => {
                return (restaurant['Top Ten'].indexOf(value) !== -1);
              }))
            }
          }}
          id="filter-demo"
          options={years}
          getOptionLabel={option => option}
          filterOptions={
            createFilterOptions({
              matchFrom: 'start',
              stringify: option => option,
            })
          }
          style={{ width: 300 }}
          renderInput={params =>
            <TextField {...params} label="Year filter" variant="outlined" />}
        />
      </div>
      <RestaurantCard restaurants={filteredRestaurants}></RestaurantCard>
    </div>
  );
}

export default App;
