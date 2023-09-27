import React from 'react';

function GenericInstancePage(props) {
    return (
        <div className='instance-page'>
            <header>
                <h1>{(props.instance) ? props.instance : "General Instance"}</h1>
            </header>
        </div>
    );
}

export default GenericInstancePage;
