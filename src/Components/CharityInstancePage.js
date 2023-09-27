import React from "react";
import charityData from "../model_data/charity_db.json";
import { useParams } from 'react-router-dom';

function CharityInstancePage() {
    const params = useParams();
    const item = charityData.find(instance => instance.country === params.id)
    console.log("Item is: ", item);
    return (
        <div>
            Charity Instance Page for {params.id}
        </div>
        
    );
}

export default CharityInstancePage;
