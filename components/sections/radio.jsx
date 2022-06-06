import { TitleTextBloc } from "../bloc/titletextbloc"
import { ButtonSecondary } from "../common/Button";
import { Section } from "../common/Section";


export const RadioSection = ({radio}) => {

    return (
        <Section>
            <TitleTextBloc title={radio.titre_texte.titre} text={radio.titre_texte.texte} />
            <ButtonSecondary>Ecouter les podcasts</ButtonSecondary>
        </Section>
    )
}