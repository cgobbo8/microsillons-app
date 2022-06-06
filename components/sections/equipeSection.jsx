import ImagePerso from "../bloc/image";
import { TitleTextBloc } from "../bloc/titletextbloc";
import { Section } from "../common/Section";
import { useEffect, useState } from "react";
import { Member } from "../component/Member";
import { Team } from "../component/Team";


export const EquipeSection = ({equipeInfo, equipe}) => {
    let [equipeList, setEquipeList] = useState({});

    useEffect(() => {
        setEquipeList({})
        equipe.forEach(membre => {
            // get first letter of the firstname
            let firstLetter = membre.attributes.prenom.charAt(0);
            setEquipeList(prevState => {
                return {
                    ...prevState,
                    [firstLetter]: [...prevState[firstLetter] || [], membre]
                    }})
        })

    }, [equipe])
    
    return (
        <Section>
            <TitleTextBloc title={equipeInfo.titre} text={equipeInfo.texte} />
            <Team team={equipeList} />
        </Section>
    )
}