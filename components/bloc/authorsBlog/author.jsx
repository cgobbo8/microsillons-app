import ImagePerso from '../image';
import styles from './AuthorBlog.module.scss'
import Link from 'next/link';

export const Author = ({ author }) => {
    
    return (
        <Link href={`/auteur/[id]`} >
            <a href={`/auteur/[id]`} className={styles.author}>
                <div className={styles['author--picture']}>
                    <ImagePerso image={author.attributes.avatar} />
                </div>
                <div className={styles['author--info']}>{author.attributes.prenom} {author.attributes.nom}</div>
            </a>
        </Link>
    )
}