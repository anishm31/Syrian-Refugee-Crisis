import React from 'react';
import SearchBar from './SearchBar';
import InstanceGrid from './InstanceGrid';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function GenericModelPage(props) {
    return (
        <div className='model-page'>
            <Container className='mt-5' style={{width : "85%", textAlign : "center"}}>
                <header>
                    <h1>{(props.model) ? props.model : "General Model"}</h1>
                </header>
                {props.showFilters && (
                    <SearchBar
                        handleSearch={props.handleSearch}
                        name={props.instances}
                        handleSort={props.handleSort}
                        model={props.model}
                        handleFilter={props.handleFilter}
                    />
                )}
                {props.loaded ?
                <InstanceGrid 
                    model={props.model} 
                    modelCard={props.modelCard} 
                    instances={props.instances} 
                    totalInstances={props.totalInstances}
                    searchQuery={props.searchQuery}
                />
                :
                <div style={{paddingTop: "20px"}}>
                    <Spinner animation="border" variant="primary" />
                </div>
                }
            </Container>
        </div>
    );
}

export default GenericModelPage;