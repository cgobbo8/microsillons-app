import { TitleTextBloc } from "../bloc/titletextbloc"
import { ButtonSecondary } from "../common/Button";
import { Section } from "../common/Section";
import { useRouter } from "next/router";


export const RadioSection = ({radio}) => {

    const router = useRouter();

    // redirect to /podcasts
    const redirectToPodcasts = () => {
        router.push('/podcasts');
    }

    return (
        <Section>
            <TitleTextBloc title={radio.titre_texte.titre} text={radio.titre_texte.texte} />
            <ButtonSecondary onClick={redirectToPodcasts}>Ecouter les podcasts</ButtonSecondary>
        </Section>
    )
}