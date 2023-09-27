import React from "react";
import GenericInstancePage from "./GenericInstancePage";
import countryData from "../model_data/country_db.json";
import { Link, useParams } from 'react-router-dom';

function CountryInstancePage() {
    const params = useParams();
    return (
        <div>
            Country Instance Page for {params.id}
            <GenericInstancePage
                instance="name"
                instances={countryData}/>
        </div>
        
    );
}

export default CountryInstancePage;
