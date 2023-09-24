import React from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import countryData from "./country_data.json";

function CountryModelPage() {
  return (
    <GenericModelPage
      model="Countries"
      modelCard={CountryCard}
      instances={countryData}
    />
  );
}

export default CountryModelPage;