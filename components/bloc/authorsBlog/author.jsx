import ImagePerso from '../image';
import styles from './AuthorBlog.module.scss'
import Link from 'next/link';

export const Author = ({ author }) => {
    console.log(author);
    
    return (
        <Link href={{ 
            pathname: '/blog/auteur/[slug]',
            query: { slug: author.attributes.slug }
            }} >
            <a href={`/blog/auteur/${author.attributes.slug}`} className={styles.author}>
                <div className={styles['author--picture']}>
                    <ImagePerso image={author.attributes.avatar} />
                </div>
                <div className={styles['author--info']}>{author.attributes.prenom} {author.attributes.nom}</div>
            </a>
        </Link>
    )
}