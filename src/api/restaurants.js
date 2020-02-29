import axios from 'axios';

const restaurant = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com'
});

const fetchRestaurants = async (data) => {
    const response = await restaurant.get('/TopRamen');
    return response;
}

export { fetchRestaurants };