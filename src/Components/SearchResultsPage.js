import React from "react";
import CharityModelPage from "./CharityModelPage";
import CountryModelPage from "./CountryModelPage"
import NewsEventsModelPage from "./NewsEventsModelPage"
import Container from "react-bootstrap/Container";
// import { useLocation } from "react-router-dom";

const SearchResultsPage = () => {
    // // from ParkScape (https://gitlab.com/sarthaksirotiya/cs373-idb/)
    // const location = useLocation();
    // var search = location.pathname.split("/search/").at(-1);
    // if (search.includes("%20")) {
    //     search = search.replace("%20", " ");
    // }
    // search = search.replace("/", "");
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