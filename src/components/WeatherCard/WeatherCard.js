import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from "mdb-react-ui-kit";
import Badge from 'react-bootstrap/Badge';

import Moment from 'react-moment';
const WeatherCard = (props) => {
    return (
        <section>
        <MDBContainer className="h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="8" lg="6" xl="4">
                <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
                <MDBCardBody className="p-4">
                    <div className="d-flex">
                    <MDBTypography tag="h6" className="flex-grow-1">
                        <strong>{props.location.charAt(0).toUpperCase()}{props.location.slice(1)}</strong> {" "}
                        <Badge pill bg="primary">
                            {props.locationCode[0].Country.LocalizedName.slice(0,2).toUpperCase()}
                        </Badge>
                    </MDBTypography>
                    <MDBTypography tag="h6">
                        <Moment format="YYYY/MM/DD">{props.weather.time}</Moment>
                    </MDBTypography>
                    </div>
                    <div className="d-flex flex-column text-center mt-5 mb-4">
                        <MDBTypography
                            tag="h6"
                            className="display-7 mb-0 font-weight-bold"
                            style={{ color: "#1C2331", fontSize: `auto` }}
                        >
                        {props.weather.Headline.Category.toUpperCase()}
                        </MDBTypography>
                        <span className="small" style={{ color: "#868B94" }}>
                            {"Minimum: "}
                            {`${props.weather.DailyForecasts[0].Temperature.Minimum.Value}°${props.weather.DailyForecasts[0].Temperature.Minimum.Unit}`} 
                            <br />
                            {"Maximum: "}
                            {`${props.weather.DailyForecasts[0].Temperature.Maximum.Value}°${props.weather.DailyForecasts[0].Temperature.Maximum.Unit}`} 
                        </span>
                        
                        </div>

                        <div className="d-flex align-items-center">
                        <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                            <div>
                            <img alt="Day" src={props.weather.DailyForecasts[0].Day.Icon < 10 ? `https://developer.accuweather.com/sites/default/files/0${props.weather.DailyForecasts[0].Day.Icon}-s.png`:`https://developer.accuweather.com/sites/default/files/${props.weather.DailyForecasts[0].Day.Icon}-s.png`} />
                            <span className="ms-1">Day: {props.weather.DailyForecasts[0].Day.IconPhrase}</span>
                            </div>
                            <div>
                            <img alt="Night" src={props.weather.DailyForecasts[0].Night.Icon < 10 ? `https://developer.accuweather.com/sites/default/files/0${props.weather.DailyForecasts[0].Night.Icon}-s.png`:`https://developer.accuweather.com/sites/default/files/${props.weather.DailyForecasts[0].Night.Icon}-s.png`} />
                            <span className="ms-1">Night: {props.weather.DailyForecasts[0].Night.IconPhrase}</span>
                            </div>
                        </div>
                    
                    </div>
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </MDBRow>
        </MDBContainer>
        </section>
    );
}

export default WeatherCard;