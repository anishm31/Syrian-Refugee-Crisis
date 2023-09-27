import React from 'react';

function GenericInstancePage(props) {
    const item = props.instances.find(instance => instance.country === 'Germany')
    console.log("Item is: ", item);
    return (
        <div className='instance-page'>
            <header>
                <h1>{(props.instance) ? props.instance : "General Instance"}</h1>
            </header>
        </div>
    );
}

export default GenericInstancePage;
