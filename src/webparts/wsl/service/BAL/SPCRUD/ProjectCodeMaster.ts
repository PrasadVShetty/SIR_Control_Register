// import { ILocationMaster } from "../../INTERFACE/ILocationMaster";
// import { IPlant } from "../../INTERFACE/IMonthMaster";
import { IProjectCodeMaster } from "../../INTERFACE/IProjectCodeMaster";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getProjectCodeData(props: IProjectCodeMaster): Promise<IProjectCodeMaster>;
   
}
export default function ProjectCodeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getProjectCodeData = async (props: IWslProps): Promise<IProjectCodeMaster[]> => {
        return await (await spCrudOps).getData("ProjectCodeMaster"
            , "*,Status,ProjectCode"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IProjectCodeMaster> = new Array<IProjectCodeMaster>();
                results.map((item: {  
                    Status :any;    
                    ProjectCode:any;    
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,                                              
                        ProjectCode:item.ProjectCode, 
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
    getProjectCodeData
    };
}