import React from "react";
import GenericInstancePage from "./GenericInstancePage";
import charityData from "../model_data/charity_db.json";
import { useParams } from 'react-router-dom';

function CharityInstancePage() {
    const params = useParams();
    return (
        <div>
            Charity Instance Page for {params.id}
            <GenericInstancePage
                model="Charities"
                instance={params.id}
                instances={charityData}/>
        </div>
        
    );
}

export default CharityInstancePage;
