import React, {useState} from "react";
import Button from './Button';

const Form = (props) => {

    const [location, setLocation] = useState('');
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(location);
        }} className="p-2">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Search weather by city name</label>
                <div className="d-flex align-items-center bd-highlight mb-3">
                    <input onChange={e => setLocation(e.target.value)} type="text" className="form-control" id="city" aria-describedby="locationSearch" placeholder="Enter city" />
                    <Button disabled={props.buttonDisable} onClick={e => {
                        e.preventDefault();
                        props.onSubmit(location);
                    }}>Search</Button>
                </div>
            </div>         
        </form>
    );
}

export default Form;