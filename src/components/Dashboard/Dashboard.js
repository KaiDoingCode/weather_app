import React, {useState} from "react";
import Form from "../shared/Form";
import { api, apiKey } from "../../api/api";
import WeatherCard from "../WeatherCard/WeatherCard";
import ErrorModal from "../shared/ErrorModal";
import LoadingSpinner from '../shared/LoadingSpinner';


const Dashboard = () => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [locationCode, setCode] = useState(null);

    const clearError = () => setError(null);

    const handleSubmit = async (location) => {
        try {
            setLocation(location);
            setLoading(true);
            setWeather(null);
            const locationInfo =  await api.get(`/locations/v1/cities/search?apikey=${apiKey}&q=${location}`);
            setCode(locationInfo.data);
            const weatherInfo = await api.get(`/forecasts/v1/daily/1day/${locationInfo.data[0].Key}?apikey=${apiKey}`);
            if(weatherInfo){
                setLoading(false);
                console.log(weatherInfo);
                setWeather(weatherInfo.data);
            }
        } catch(e){
            setLoading(false);
            setError(e);
        }
    }
    return (
        <React.Fragment >
            <ErrorModal error={error} handleClose={clearError}/>
            <Form onSubmit={handleSubmit} buttonDisable={loading} />
            <div className='d-flex  align-content-center justify-content-center'>
                {loading && <LoadingSpinner />}
            </div>
            {weather && <div>
                <WeatherCard locationCode={locationCode} weather={weather} location={location} />
            </div>}
        </React.Fragment>
       
    )
}

export default Dashboard;