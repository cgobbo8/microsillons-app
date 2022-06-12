
import styles from './ArticleByType.module.scss'
import { Section } from "../../common/Section";
import Flickity from 'react-flickity-component'
import Link from 'next/link';
import { joinStyles } from '../../../utils';
import { useState } from 'react';
import { InfiniteArticles } from './InfiniteArticles';
import { fetchAPI } from '../../../lib/api';


export const ArticleByType = ({ articles, categories }) => {
    const [articlesToShow, setArticlesToShow] = useState(articles);
    const [categorySelected, setCategorySelected] = useState(null);


    const handleCategorySelected = async (category) => {
        setCategorySelected(category);
        console.log(category);
        if (category) {
            const res = await fetchAPI("/articles", {
                populate: "*", 
                pagination: {
                  start: 0,
                  limit: 8
                }, 
                filters: {
                    podcast_types: {
                        id : category.id
                    }
                },
                sort: "publishedAt:DESC" })
    
            console.log(res);
            setArticlesToShow(res.data);
        } else {
            setArticlesToShow(articles);
        }

    }

    return (
        
        <Section className={styles.article_by_type}>
            <h3 className={styles['article_by_type--title']}>Explorer par <span className={styles['article_by_type--title--accent']}>types</span></h3>
            <div className={styles['article_by_type__categories']}>
                <button onClick={() => handleCategorySelected(null)} className={joinStyles(styles['article_by_type__categories--category'], !categorySelected && styles['article_by_type__categories--category--active'])}>Tous</button>
                {
                    categories.map(category => <button key={category.id} onClick={() => handleCategorySelected(category)} className={joinStyles(styles['article_by_type__categories--category'], (categorySelected?.id === category.id) && styles['article_by_type__categories--category--active'])}>{category.attributes.type}</button> )
                }
            </div>
            <InfiniteArticles articles={articlesToShow} categorySelected={categorySelected} />
        </Section>
    )
}