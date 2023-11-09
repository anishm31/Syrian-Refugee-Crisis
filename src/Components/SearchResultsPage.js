import React from "react";
import CharityModelPage from "./CharityModelPage";
import CountryModelPage from "./CountryModelPage"
import NewsEventsModelPage from "./NewsEventsModelPage"
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
    // from ParkScape (https://gitlab.com/petarilievCS/cs373-idb7)
    const location = useLocation();
    var search = location.pathname.split("/search/").at(-1);
    if (search.includes("%20")) {
        search = search.replace("%20", " ");
    }
    search = search.replace("/", "");
    return (
        <>
        <Container>
            <CharityModelPage searchInput={search}/>
            <CountryModelPage searchInput={search}/>
            <NewsEventsModelPage searchInput={search}/>
        </Container>
        </>
    )
}

export default SearchResultsPage;