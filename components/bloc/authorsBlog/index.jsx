import Link from 'next/link';
import { Author } from './author';
import styles from './AuthorBlog.module.scss'

export const AuthorsBlog = ({authors}) => {

    return (
        <div className={styles.authors__component}>
            <h2 className={styles['authors--title']}>Les <span className={styles['authors--title--accent']}>auteur-es</span></h2>
            <ul className={styles.authors}>
                {authors.map(author => author?.attributes?.articles?.data[0] && <Author key={author.id} author={author} />)}
            </ul>
        </div>
    )
}
