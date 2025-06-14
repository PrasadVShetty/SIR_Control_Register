import { ISiteMaster } from "../../INTERFACE/ISiteMaster";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface ISiteOps {
    getSiteMasterData(props: ISiteMaster): Promise<ISiteMaster>;    
}

export default function SiteRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getSiteMasterData = async (props: IItProps): Promise<ISiteMaster[]> => {
        return await (await spCrudOps).getData("SiteMaster"
            , "*,Site,Status,Title"
            , ""
            , "Status eq 'Active'"
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<ISiteMaster> = new Array<ISiteMaster>();
                results.map((item: { Status :any;
                    Site :any;
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        Site: item.Site,
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
    getSiteMasterData
    };
}