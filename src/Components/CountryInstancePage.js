import React from "react";
import countryData from "../model_data/country_db.json";
import { useParams } from 'react-router-dom';

function CountryInstancePage() {
    const params = useParams();
    const item = countryData.find(instance => instance.country === params.id)
    console.log("Item is: ", item);
    return (
        <div>
            Country Instance Page for {params.id}
        </div>
        
    );
}

export default CountryInstancePage;
