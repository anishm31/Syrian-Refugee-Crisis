import React from "react";
import GenericModelPage from "./GenericModelPage";
import CountryCard from "./CountryCard";
import countryData from "../model_data/country_db.json";

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