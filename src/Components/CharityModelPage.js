import React from "react";
import GenericModelPage from "./GenericModelPage";
import CharityCard from "./CharityCard";
import charityData from "../model_data/charity_db.json"

function CharityModelPage() {
  return (
    <GenericModelPage 
      model="Charities"
      modelCard={CharityCard}
      instances={charityData}
    />
  );
}

export default CharityModelPage;