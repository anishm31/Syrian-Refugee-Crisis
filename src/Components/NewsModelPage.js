import React from "react";
import GenericModelPage from "./GenericModelPage";
import NewsCard from "./NewsCard.js";
import newsData from "../model_data/news_db.json";


function NewsModelPage() {
  return (
    <GenericModelPage
      model="News"
      modelCard={NewsCard}
      instances={newsData}
    />
  );
}

export default NewsModelPage;