import { ListBloc } from "../bloc/listbloc"
import { TitleTextBloc } from "../bloc/titletextbloc"


export const AssociationSection = ({association}) => {
    console.log('association : ');
    console.log(association);
    return (
        <section className="section">
            <TitleTextBloc title={association.titre_texte.titre} text={association.titre_texte.texte} />
            <ListBloc list={association.liste} />
        </section>
    )
}