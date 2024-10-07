import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Header_View from "~/pages/layout/header";
import { RenderTalkSimulationInputUI } from "~/pages/talk_simulation/talk_simulation_input";
import { SimulationThemeCheckboxType } from "~/pages/talk_simulation/talk_simulation_type";
import { API, GetDomain } from "~/utility/api_static";


export const meta: MetaFunction = () => {
    return [
      { title: "Talk Simulation" },
      { name: "description", content: "Simulation planning for your patient" },
    ];
  };

  export async function loader() {
    const response = await fetch(GetDomain(API.GetSimulationCheckboxes));
        
    return await response.json();
  }
  
  
export default function Talk_Simulation_Input_Page() {
    const checkboxes_data = useLoaderData<typeof loader>();
    const [info_checkboxes, set_checkboxes] = useState<SimulationThemeCheckboxType[]>([]);

    useEffect(() => {
        if (checkboxes_data != null)
            set_checkboxes(checkboxes_data['checkboxes']);
    }, [checkboxes_data]);

    return (
        <div className="object_relation_theory">
            <Header_View></Header_View>
            <RenderTalkSimulationInputUI checkboxes={info_checkboxes}></RenderTalkSimulationInputUI>
        </div>
    );
}
    