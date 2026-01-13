import { TitleTextBloc } from "../bloc/titletextbloc";
import { Divider } from "../common/Divider";
import { GridBloc } from "../common/GridBloc";
import { Section } from "../common/Section";
import { SerieComponent } from "../component/SerieComponent";


export const EmissionsSection = ({emissionsInfo, emissions = []}) => {
    return (
        <Section >
            <TitleTextBloc title={emissionsInfo?.titre} text={emissionsInfo?.texte} />
            <Divider />
            <GridBloc>
                {
                    emissions?.map(emission => {
                        return (
                            <SerieComponent key={emission.id} serie={emission} />
                        )
                    })
                }
            </GridBloc>
        </Section>
    )
}