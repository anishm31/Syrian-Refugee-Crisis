import React from "react";
import GenericInstancePage from "./GenericInstancePage";
import { useParams } from 'react-router-dom';

function NewsEventsInstancePage() {
    const params = useParams();
    return (
        <div>
            NewsEvents Instance Page for {params.id}
            <GenericInstancePage
                instance={params.id}/>
        </div>
        
    );
}

export default NewsEventsInstancePage;
