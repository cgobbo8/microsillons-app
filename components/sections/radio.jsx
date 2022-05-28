import { TitleTextBloc } from "../bloc/titletextbloc"


export const RadioSection = ({radio}) => {
    console.log('radio : ');
    console.log(radio);
    return (
        <section className="section">
            <TitleTextBloc title={radio.titre_texte.titre} text={radio.titre_texte.texte} />
        </section>
    )
}