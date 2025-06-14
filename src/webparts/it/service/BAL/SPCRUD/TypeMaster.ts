import { ITypeMaster } from "../../INTERFACE/ITypeMaster";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface ITypeOps {
    getTypeMasterData(props: ITypeMaster): Promise<ITypeMaster>;

    
}

export default function TypeRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getTypeMasterData = async (props: IItProps): Promise<ITypeMaster[]> => {
        return await (await spCrudOps).getData("TypeMaster"
            , "*,TypeName,Status,Title"
            , ""
            , "Status eq 'Active'"
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<ITypeMaster> = new Array<ITypeMaster>();
                results.map((item: { Status :any;
                    TypeName :any;
                    Title:any;
                    Id:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        TypeName: item.TypeName,
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
    getTypeMasterData
    };
}