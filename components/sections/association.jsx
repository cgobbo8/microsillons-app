import { ListBloc } from "../bloc/listbloc"
import { TitleTextBloc } from "../bloc/titletextbloc"
import { ButtonSecondary } from "../common/Button";
import { Divider } from "../common/Divider";
import { Section } from "../common/Section";


export const AssociationSection = ({association, onClick}) => {

    return (
        <Section>
            <TitleTextBloc title={association.titre_texte.titre} text={association.titre_texte.texte} />
            <Divider />
            <ListBloc list={association.liste} />
            <ButtonSecondary onClick={onClick}>Contacter l'association</ButtonSecondary>
        </Section>
    )
}