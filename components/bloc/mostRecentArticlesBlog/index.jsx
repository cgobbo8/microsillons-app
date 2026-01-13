import Link from 'next/link';
import { ArticleFullWith } from './ArticleFullWidth';
import { ArticleSmall } from './ArticleSmall';
import styles from './MostRecentArticlesBlog.module.scss'

export const MostRecentArticlesBlog = ({recentPosts = []}) => {

    if (!recentPosts || recentPosts.length === 0) {
        return null;
    }

    return (
        <div className={styles.recentArticles__component}>
            <h2 className={styles['recentArticles--title']}>Les plus <span className={styles['recentArticles--title--accent']}>récents</span></h2>
            <div className={styles['recentArticles__articles']}>
                {recentPosts[0] && <ArticleFullWith article={recentPosts[0]} />}
                {recentPosts[1] && <ArticleSmall article={recentPosts[1]} />}
                {recentPosts[2] && <ArticleSmall article={recentPosts[2]} />}
                {recentPosts[3] && <ArticleSmall article={recentPosts[3]} />}
            </div>
        </div>
    )
}