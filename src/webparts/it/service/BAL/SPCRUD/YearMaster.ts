import { IYearMaster } from "../../INTERFACE/IYearMaster";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IYearOps {
    getYearMasterData(props: IYearMaster): Promise<IYearMaster>;    
}

export default function YearRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getYearMasterData = async (props: IItProps): Promise<IYearMaster[]> => {
        return await (await spCrudOps).getData("YearMaster"
            , "*,Year,Status,Title"
            , ""
            , "Status eq 'Active'"
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IYearMaster> = new Array<IYearMaster>();
                results.map((item: { Status :any;
                    Year :any;
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        Year: item.Year,
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
    getYearMasterData
    };
}