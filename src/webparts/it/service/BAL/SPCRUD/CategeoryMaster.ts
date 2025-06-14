import { ICategoryMaster } from "../../INTERFACE/ICategoryMaster";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface ICategeoryRequestsOps {
    getCategoryData(props: ICategoryMaster): Promise<ICategoryMaster>;    
}

export default function CategeoryRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getCategoryData = async (props: IItProps): Promise<ICategoryMaster[]> => {
return await (await spCrudOps).getData("CategoryMaster"
, "*,Category,Status,Title,SubCategory"
, ""
, ""          
,{ column: 'Order0', isAscending: true },
props).then(results => {
                    let brr: Array<ICategoryMaster> = new Array<ICategoryMaster>();
                    results.map((item: { Category :any;
                    SubCategory:any;
                    Title:any;
                    Id:any;
                    Status:any;
                    }) => {
                    brr.push({
                    Id:item.Id,
                    SubCategory: item.SubCategory,
                    Category: item.Category,
                    Status:item.Status, 
                    Title:item.Title
                });
            });
            return brr;
        }
    );
};

return {
    getCategoryData
    };
}