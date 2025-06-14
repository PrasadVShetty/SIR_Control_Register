import { IReasonMaster } from "../../INTERFACE/IReasonMaster";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IReasonRequestsOps {
    getReasonMasterData(props: IReasonMaster): Promise<IReasonMaster>;

    
}

export default function ReasonRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getReasonMasterData = async (props: IItProps): Promise<IReasonMaster[]> => {
        return await (await spCrudOps).getData("ReasonMaster"
            , "*,Reason,Status,Title"
            , ""
            , "Status eq 'Active'"
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IReasonMaster> = new Array<IReasonMaster>();
                results.map((item: { Status :any;
                    Reason :any;
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        Reason: item.Reason,
                        Status:item.Status, 
                        Title:item.Title
                       
                    });
                });
                return brr;
            }
            );
    //});
};

return {
    getReasonMasterData
    };
}