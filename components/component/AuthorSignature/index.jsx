import Moment from "react-moment";
import 'moment/locale/fr'
import { ButtonSecondary } from "../../common/Button"; 
import ImagePerso from "../../bloc/image";
import styles from './AuthorSignature.module.scss'
import Link from "next/link";

export const AuthorSignature = ({ author, article = null, isBlogPost = false }) => {

    if (!author?.data?.attributes) {
        return null;
    }

    return (
        <div className={styles.author} >
            <div className={styles['author--picture']}>
                {author?.data?.attributes?.avatar && (
                    <ImagePerso
                    image={author?.data?.attributes?.avatar}
                    />
                )}
            </div>
            <div className={styles.author__info}>
                <div className={styles.author__info__bloc}>
                    <p className="uk-margin-remove-bottom">
                        {isBlogPost ? 'Ecrit par' : ''} <span className={styles['author__info__bloc--accent']}>{author?.data?.attributes?.prenom} {author?.data?.attributes?.nom}</span>
                    </p>
                    {
                        article &&  <p className="uk-text-meta uk-margin-remove-top">
                                        <Moment format="MMM Do YYYY">
                                            {article?.attributes?.published_at}
                                        </Moment>
                                    </p>
                    }
                    
                </div>
                { isBlogPost && 
                <Link href={`/blog/auteur/${author?.data?.attributes?.slug}`}>
                    <a  href={`/blog/auteur/${author?.data?.attributes?.slug}`}>
                        <ButtonSecondary>Consulter les articles de cet auteur</ButtonSecondary>
                    </a>
                </Link> }
            </div>
        </div>
    )
}