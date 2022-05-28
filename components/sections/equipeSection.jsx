import ImagePerso from "../bloc/image";
import { TitleTextBloc } from "../bloc/titletextbloc";


export const EquipeSection = ({equipeInfo, equipe}) => {
    console.log('equipeInfo : ');
    console.log(equipeInfo);
    return (
        <section className="section">
            <TitleTextBloc title={equipeInfo.titre} text={equipeInfo.texte} />
            {
                equipe.map(membre => {
                    return (
                        <div className="membre" key={membre.id}>
                            <p className="p-2">{membre.attributes.prenom}</p>
                            <p className="p-2">{membre.attributes.nom}</p>
                            <p className="p-2">{membre.attributes.poste}</p>
                            <ImagePerso classProp={'mini'} image={membre.attributes.photo} />
                        </div>
                    )
                })
            }
            {/* <ListBloc list={equipe.liste} /> */}
        </section>
    )
}