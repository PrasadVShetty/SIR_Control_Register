import { IActivityParticular } from "../../INTERFACE/IActivityParticular";
import { ISirControlRegisterProps } from "../../../components/ISirControlRegisterProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IActivityParticularOps {
    getActivityParticular(props: IActivityParticular): Promise<IActivityParticular>;
   
}
export default function ActivityParticularOps() {
    const spCrudOps = SPCRUDOPS();

    const getActivityParticular = async (strFilter: string, sorting: any,props: ISirControlRegisterProps): Promise<IActivityParticular[]> => {
        return await (await spCrudOps).getData("ActivityParticular"
            , "*,ActivityParticular,Status"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IActivityParticular> = new Array<IActivityParticular>();
                results.map((item: { 
                    Id:any;
                    Status:any;
                    ActivityParticular:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        ActivityParticular: item.ActivityParticular,
                        Status:item.Status                                         
                    });
                });
                return brr;
            }
            );
    //});
};

return {
    getActivityParticular
    };
}