import ReactMarkdown from "react-markdown"
import styles from './Titletextbloc.module.scss'

import { joinStyles } from "../../../utils"

export const TitleTextBloc = ({title, text}) => {
    return (
        <div className={styles.title_text_bloc}>
            <h3 className={joinStyles(styles['title_text_bloc--title'], 't-2')}>{title}</h3>
            <ReactMarkdown className={joinStyles(styles['title_text_bloc--text'], 'p-2')}>{text}</ReactMarkdown>
        </div>
    )
}