// import { ILocationMaster } from "../../INTERFACE/ILocationMaster";
// import { IPlant } from "../../INTERFACE/IMonthMaster";
import { IMaterialCodeMaster } from "../../INTERFACE/IMaterialCodeMaster";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getMaterialCodeData(props: IMaterialCodeMaster): Promise<IMaterialCodeMaster>;
   
}
export default function MaterialCodeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getMaterialCodeData = async (props: IWslProps): Promise<IMaterialCodeMaster[]> => {
        return await (await spCrudOps).getData("MaterialCodeMaster"
            , "*,MaterialCode,Status"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IMaterialCodeMaster> = new Array<IMaterialCodeMaster>();
                results.map((item: {  
                    Status :any;
                    MaterialCode :any;                                        
                    Title:any;
                    Id:any;                    
                    }) => {
                    brr.push({
                        Id:item.Id,                                              
                        MaterialCode:item.MaterialCode, 
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
    getMaterialCodeData
    };
}