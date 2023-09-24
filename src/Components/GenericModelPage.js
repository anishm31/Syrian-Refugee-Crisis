import React from 'react';
import SearchBar from './SearchBar';
import InstanceGrid from './InstanceGrid';
import Container from 'react-bootstrap/Container';

function GenericModelPage(props) {
    return (
        <div className='model-page'>
            <Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
                <header>
                    <h1>{(props.model) ? props.model : "General Model"}</h1>
                </header>
                <SearchBar />
                <InstanceGrid model={props.model} modelCard={props.modelCard} filePath={props.filePath}></InstanceGrid>
            </Container>
        </div>
    );
}

export default GenericModelPage;