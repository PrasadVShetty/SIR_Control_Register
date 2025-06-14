// import { ILocationMaster } from "../../INTERFACE/ILocationMaster";
// import { IPlant } from "../../INTERFACE/IMonthMaster";
import { IPlantCodeMaster } from "../../INTERFACE/IPlantCodeMaster";
import { IPrmrrProps } from "../../../components/IPrmrrProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getPlantCodeData(props: IPlantCodeMaster): Promise<IPlantCodeMaster>;
   
}
export default function PlantCodeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getPlantCodeData = async (props: IPrmrrProps): Promise<IPlantCodeMaster[]> => {
        return await (await spCrudOps).getData("PlantCodeMaster"
            , "*,PlantCode,ProjectName,Location/Location,GroupApprover/Id,GroupApprover/Title"
            , "Location,GroupApprover"
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IPlantCodeMaster> = new Array<IPlantCodeMaster>();
                results.map((item: {  Status :any;
                    PlantCode :any;
                    //PlantCodeId :number;
                    ProjectName:any;
                    Title:any;
                    Id:any;
                    Location:any;
                    GroupApproverId:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        PlantCode: item.PlantCode,
                      //  PlantCode: item.PlantCode.Id,
                        ProjectName:item.ProjectName, 
                        Status:item.Status,
                        Title:item.Title,
                        Location:item.Location.Location,
                        GroupApprover:item.GroupApproverId
                       
                    });
                });
                return brr;
            }
            );
    //});
};

return {
    getPlantCodeData
    };
}