import Link from 'next/link';
import { ArticleFullWith } from './ArticleFullWidth';
import { ArticleSmall } from './ArticleSmall';
import styles from './MostRecentArticlesBlog.module.scss'

export const MostRecentArticlesBlog = ({recentPosts}) => {

    return (
        <div className={styles.recentArticles__component}>
            <h2 className={styles['recentArticles--title']}>Les plus <span className={styles['recentArticles--title--accent']}>récents</span></h2>
            <div className={styles['recentArticles__articles']}>
                <ArticleFullWith article={recentPosts[0]} />
                <ArticleSmall article={recentPosts[1]} />
                <ArticleSmall article={recentPosts[2]} />
                <ArticleSmall article={recentPosts[3]} />
            </div>
        </div>
    )
}