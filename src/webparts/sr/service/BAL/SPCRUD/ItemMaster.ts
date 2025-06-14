import { IItemMaster } from "../../INTERFACE/IItemMaster";
import { ISrProps } from "../../../components/ISrProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IItemMasterOps {
    getTypeMasterData(props: IItemMaster): Promise<IItemMaster>;    
}

export default function ItemMasterRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getItemMasterData = async (props: ISrProps): Promise<IItemMaster[]> => {
        return await (await spCrudOps).getData("ItemMaster"
            , "*,Item,Status,Title"
            , ""
            , ""          
            ,{ column: 'Id', isAscending: true },
             props).then(results => {
                let brr: Array<IItemMaster> = new Array<IItemMaster>();
                results.map((item: { Status :any;
                    Item :any;
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        Item: item.Item,
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
    getItemMasterData
    };
}