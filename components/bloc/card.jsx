import React from "react";
import Link from "next/link";
import ImagePerso from "./image";

const Card = ({ article }) => {
  return (
    // <div>test</div>
    <Link href={`/article/${article.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <ImagePerso image={article.attributes.cover} />
          </div>
          <div className="uk-card-body">
            <span id="category" className="uk-text-uppercase">
              <ul>
                {article.attributes.podcast_types.data.map(type => {
                  return (
                    <li key={type.attributes.slug}>
                      {type.attributes.type}
                    </li>
                  );
                })}
              </ul>
            </span>
            <p id="title" className="uk-text-large">
              {article.attributes.titre}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;