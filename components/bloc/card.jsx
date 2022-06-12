import React from "react";
import Link from "next/link";
import ImagePerso from "./image";
import { useContext } from "react";
import { TransitionContext } from "../../contexts/TransitionContext";
import { useRouter } from "next/router";

const Card = ({ article }) => {
  
  const router = useRouter();
  const { transitionTo } = useContext(TransitionContext);

  const handleOpenBlog = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    transitionTo(`/blog/${slug}`, router.route);
    
  };

  return (
    // <div>test</div>
    <a onClick={(e) => handleOpenBlog(e, article.attributes.slug)} href={`/blog/${article.attributes.slug}`}>
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
  );
};

export default Card;