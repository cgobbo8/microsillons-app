import { TitleTextBloc } from "../bloc/titletextbloc";
import { Section } from "../common/Section";


export const EmissionsSection = ({emissionsInfo, emissions}) => {
    return (
        <Section >
            <TitleTextBloc title={emissionsInfo.titre} text={emissionsInfo.texte} />

            {
                emissions.map(emission => {
                    return (
                        <div className="emission" key={emission.id}>
                            <h3 className="t-4">{emission.attributes.titre}</h3>
                            <h3 className="p-2">{emission.attributes.description}</h3>
                        </div>
                    )
                })
            }
            
            {/* <ListBloc list={emissions.liste} /> */}
        </Section>
    )
}