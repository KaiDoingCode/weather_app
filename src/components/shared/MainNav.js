import React, {useState} from "react";
import { api, apiKey } from "../../api/api";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Button from "./Button";
import Moment from "react-moment";
import LoadingSpinner from './LoadingSpinner';
import ErrorModal from './ErrorModal';

const MainNav = () => {
  const [geography, setGeoGraphy] = useState(null);
  const [showBasic, setShowBasic] = useState(false);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async (latitude, longitude) => {
    try{
      const location = await api.get(`/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`);
      if(location){
        const weatherInfo = await api.get(`/forecasts/v1/daily/1day/${location.data.Key}?apikey=${apiKey}`);
          if(weatherInfo){
            setWeather(weatherInfo.data);
          }
        setGeoGraphy({...geography, location: location});
        setLoading(false);
      }
    } catch(e){
      setLoading(false);
      setError(e)
    }
    
  }

  const getCurrentLocation = (e) => {
    setLoading(true);
    e.preventDefault();
    
    if(navigator && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        getLocation(position.coords.latitude, position.coords.longitude);
        setGeoGraphy({...geography, 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });     
      });
    }
    
  }


  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} handleClose={() => {
        setError(null);
      }} />}
      <MDBContainer fluid>
        <MDBNavbarBrand><strong>Weather App</strong></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <FontAwesomeIcon icon={faBars} />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
          </MDBNavbarNav>
          {geography && weather && geography.location ? 
          <form className='d-flex input-group w-auto'>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  {geography.location.data.LocalizedName}, {` ${geography.location.data.Country.LocalizedName}`}
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink><Moment format="YYYY/MM/DD">{weather.DailyForecasts[0].Date}</Moment></MDBNavbarLink>
              </MDBNavbarItem>
                <MDBNavbarLink>
                  {weather.Headline.Category.toUpperCase()}
                </MDBNavbarLink>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link'>
                    More Info
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>
                      <div>
                        <img alt="Day" src={weather.DailyForecasts[0].Day.Icon < 10 ? `https://developer.accuweather.com/sites/default/files/0${weather.DailyForecasts[0].Day.Icon}-s.png`:`https://developer.accuweather.com/sites/default/files/${weather.DailyForecasts[0].Day.Icon}-s.png`} />
                        <span className="ms-1">Day: {weather.DailyForecasts[0].Day.IconPhrase}</span>
                      </div>
                    </MDBDropdownItem>
                    <MDBDropdownItem link>
                      <div>
                        <img alt="Day" src={weather.DailyForecasts[0].Night.Icon < 10 ? `https://developer.accuweather.com/sites/default/files/0${weather.DailyForecasts[0].Night.Icon}-s.png`:`https://developer.accuweather.com/sites/default/files/${weather.DailyForecasts[0].Night.Icon}-s.png`} />
                        <span className="ms-1">Night: {weather.DailyForecasts[0].Night.IconPhrase}</span>
                      </div>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              
            </MDBNavbarNav>
          </form> : 
          <form className='d-flex input-group w-auto'>
            <Button disabled={loading} type='primary' onClick={getCurrentLocation}>Get Your Location</Button>
          </form>
          }
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
    
};

export default MainNav;