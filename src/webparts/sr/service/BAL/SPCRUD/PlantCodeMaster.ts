import { IPlantCodeMaster } from "../../INTERFACE/IPlantCodeMaster";
import { ISrProps } from "../../../components/ISrProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getPlantCodeData(props: IPlantCodeMaster): Promise<IPlantCodeMaster>;
   
}
export default function PlantCodeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getPlantCodeData = async (props: ISrProps): Promise<IPlantCodeMaster[]> => {
        return await (await spCrudOps).getData("PlantCodeMaster"
            , "*,PlantCode,ProjectName,Location/Location,GroupApprover/Id,GroupApprover/Title"
            , "Location,GroupApprover"
            , ""
          // , sorting,
         ,{ column: 'ID', isAscending: true },
             props).then(results => {
                let brr: Array<IPlantCodeMaster> = new Array<IPlantCodeMaster>();
                results.map((item: {  Status :any;
                    PlantCode :any;                    
                    ProjectName:any;
                    Title:any;
                    Id:any;
                    Location:any;
                    GroupApproverId:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        PlantCode: item.PlantCode,                      
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
};

return {
    getPlantCodeData
    };
}