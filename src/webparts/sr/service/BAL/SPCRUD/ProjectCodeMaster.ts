import { IProjectCodeMaster } from "../../INTERFACE/IProjectCodeMaster";
import { ISrProps } from "../../../components/ISrProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getProjectCodeData(props: IProjectCodeMaster): Promise<IProjectCodeMaster>;
   
}
export default function ProjectCodeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getProjectCodeData = async (props: ISrProps): Promise<IProjectCodeMaster[]> => {
        return await (await spCrudOps).getData("ProjectCodeMaster"
            , "*,Status,ProjectCode"
            , ""
            , ""
          // , sorting,
         ,{ column: 'ID', isAscending: true },
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