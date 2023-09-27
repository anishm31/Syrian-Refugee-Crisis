import React from "react";
import { useParams } from 'react-router-dom';

function NewsEventsInstancePage() {
    const params = useParams();
    return (
        <div>
            NewsEvents Instance Page for {params.id}
        </div>
        
    );
}

export default NewsEventsInstancePage;
