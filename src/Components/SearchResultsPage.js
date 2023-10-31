import React from "react";
import CharityModelPage from "./CharityModelPage";
import CountryModelPage from "./CountryModelPage"
import NewsEventsModelPage from "./NewsEventsModelPage"
import Container from "react-bootstrap/Container";

const SearchResultsPage = () => {
    return (
        <>
        {/* <h1>Hello</h1> */}
        <Container>
            <CharityModelPage />
            <CountryModelPage />
            <NewsEventsModelPage />
        </Container>
        </>
    )
}

export default SearchResultsPage;