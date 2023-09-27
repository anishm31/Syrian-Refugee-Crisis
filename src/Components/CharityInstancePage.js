import React from "react";
import GenericInstancePage from "./GenericInstancePage";
import charityData from "../model_data/charity_db.json";
import { Link, useParams } from 'react-router-dom';

function CharityInstancePage() {
    const params = useParams();
    return (
        <div>
            Charity Instance Page for {params.id}
            <GenericInstancePage
                instance="name"
                instances={charityData}/>
        </div>
        
    );
}

export default CharityInstancePage;
