import { OverlayCover } from '../../common/Overlay';
import ImagePerso from '../image';
import styles from './Article.module.scss'
import Link from 'next/link';
import { joinStyles } from '../../../utils';
import { useContext } from 'react';
import { TransitionContext } from '../../../contexts/TransitionContext';
import { useRouter } from 'next/router';

export const ArticleFullWith = ({ article }) => {
    const {transitionTo} = useContext(TransitionContext);
    const router = useRouter();

    const handleOpenBlog = (e, slug) => {
        e.preventDefault();
        e.stopPropagation();
        transitionTo(`/blog/${slug}`, router.route);
        
      };

    return (
        <a onClick={(e) => handleOpenBlog(e, article.attributes.slug)} className={joinStyles(styles.article__full, styles.article)} href={`/blog/${article.attributes.slug}`}>
            <div className={styles['article__full--cover']}>
                <ImagePerso image={article.attributes.cover} />
                <OverlayCover />
            </div>
            <div className={styles['article__full__content']}>
                <h2 className={styles['article__full--title']}>{article.attributes.titre}</h2>
            </div>
        </a>
    )
}