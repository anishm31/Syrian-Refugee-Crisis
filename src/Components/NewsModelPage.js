import React from "react";
import GenericModelPage from "./GenericModelPage";
import NewsCard from "./NewsCard.js";
import news_data from "../model_data/news_db.json";

function NewsModelPage() {
  return (
    <GenericModelPage
      model="News"
      modelCard={NewsCard}
      instances={news_data}
    />
  );
}

export default NewsModelPage;