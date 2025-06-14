// import { ILocationMaster } from "../../INTERFACE/ILocationMaster";
// import { IPlant } from "../../INTERFACE/IMonthMaster";
import { IItemMaster } from "../../INTERFACE/IItemMaster";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IPlantCodeRequestsOps {
    getItemData(props: IItemMaster): Promise<IItemMaster>;
   
}
export default function ItemRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getItemData = async (props: IWslProps): Promise<IItemMaster[]> => {
        return await (await spCrudOps).getData("ItemMaster"
            , "*,Status,Item"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IItemMaster> = new Array<IItemMaster>();
                results.map((item: {  
                    Status :any;    
                    Item:any;    
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,                                              
                        Item:item.Item, 
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
    getItemData
    };
}