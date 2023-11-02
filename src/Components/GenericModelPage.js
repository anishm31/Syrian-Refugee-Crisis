import React from 'react';
import SearchBar from './SearchBar';
import InstanceGrid from './InstanceGrid';
import Container from 'react-bootstrap/Container';
import SortDropDown from './SortDropDown';
import "../CSS/GenericModelPage.css"

function GenericModelPage(props) {
    return (
        <div className='model-page'>
            <Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
                <header>
                    <h1>{(props.model) ? props.model : "General Model"}</h1>
                </header>
                <div className="search-and-dropdown">
                <SearchBar className= "search-bar" />
                <SortDropDown className="sort-drop-down" name = {props.instances} onSort={props.handleSort}> 
                </SortDropDown>
                </div>
            
            
                <InstanceGrid model={props.model} modelCard={props.modelCard} instances={props.instances} totalInstances={props.totalInstances}></InstanceGrid>
            </Container>
        </div>
    );
}

export default GenericModelPage;