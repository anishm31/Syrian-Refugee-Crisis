import React from "react";
import GenericInstancePage from "./GenericInstancePage";
import { Link, useParams } from 'react-router-dom';

function NewsEventsInstancePage() {
    const params = useParams();
    return (
        <div>
            NewsEvents Instance Page for {params.id}
            <GenericInstancePage
                instance="name"/>
        </div>
        
    );
}

export default NewsEventsInstancePage;
