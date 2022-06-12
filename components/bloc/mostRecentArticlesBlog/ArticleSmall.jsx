import { OverlayCover } from '../../common/Overlay';
import ImagePerso from '../image';
import styles from './Article.module.scss'
import Link from 'next/link';
import { joinStyles } from '../../../utils';

export const ArticleSmall = ({ article }) => {
    return (
        <Link href={{
            pathname: '/blog/[slug]',
            query: { slug: article.attributes.slug }
            }}>
            <a className={joinStyles(styles.article__small, styles.article)} href={`/blog/${article.attributes.slug}`}>
                <div className={styles['article__small--cover']}>
                    <ImagePerso image={article.attributes.cover} />
                    <OverlayCover />
                </div>
                <div className={styles['article__small']}>
                    <h2 className={styles['article__small--title']}>{article.attributes.titre}</h2>
                </div>
            </a>
        </Link>
    )
}