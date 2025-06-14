import { IWSLMaster } from "../../INTERFACE/IWSLMaster";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";
export interface IIWSLRequestsOps {
    getIWSLMasterData(props: IWSLMaster): Promise<IWSLMaster>;
    getWSLDatafilter(props: IWSLMaster): Promise<IWSLMaster>;    
}

export default function IWSLRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getIWSLMasterData = async (sorting: any,props: IWslProps): Promise<IWSLMaster[]> => {
    return await (await spCrudOps).getData("ShelfLife"
        , "*,Title,ProjectCode/ProjectCode,ProjectCode/Id,PlantCode/PlantCode,PlantCode/Id,ProjectName,Location,ItemCode/Item,ItemCode/Id,ItemDescription,UOM,OnHandQty,ExpiryDate,Value,ReasonforNonUtilization,Lifeleftindays,Remarks,Modified,GroupApprover/Title,GroupApprover/Id,Editor/Title,Editor/ID"
        , "ProjectCode,PlantCode,ItemCode,Editor,GroupApprover"
        , ''
        , sorting
        , props).then(results => {
            let brr: Array<IWSLMaster> = new Array<IWSLMaster>();
            results.map((item: {
                Id:number;
                Title:any;
                ProjectCode:any;
                ProjectCodeId:any;
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                ItemCode:any;
                ItemCodeId:any;
                ItemDescription:any;
                UOM:any;
                OnHandQty:any;
                ExpiryDate:any;
                Value:any;
                ReasonforNonUtilization:any;
                Lifeleftindays:any;
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                    Id:item.Id,
                    Title:item.Title,
                    ProjectCode:item.ProjectCode.ProjectCode,
                    ProjectCodeId:item.ProjectCodeId,
                    PlantCode:item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCodeId,
                    ProjectName:item.ProjectName,
                    Location:item.Location,
                    ItemCode:item.ItemCode.Item,
                    ItemCodeId:item.ItemCodeId,
                    ItemDescription:item.ItemDescription,
                    UOM:item.UOM,
                    OnHandQty:item.OnHandQty,
                    ExpiryDate:item.ExpiryDate,
                    Value:item.Value,
                    ReasonforNonUtilization:item.ReasonforNonUtilization,
                    Lifeleftindays:item.Lifeleftindays,
                    Remarks:item.Remarks,
                    GroupApproverId:item.GroupApproverId,
                    Created:item.Created,
                    Editor:item.Editor.Title,
                    Modified:item.Modified
                });
            });
            return brr;
        }
        );
//});
};

const getWSLDatafilter = async (ArtId: string | number,props: IWslProps): Promise<IWSLMaster[]> => {
    return await (await spCrudOps).getData("ShelfLife"
        , "*,Title,ProjectCode/ProjectCode,ProjectCode/Id,PlantCode/PlantCode,PlantCode/Id,ProjectName,Location,ItemCode/Item,ItemCode/Id,ItemDescription,UOM,OnHandQty,ExpiryDate,Value,ReasonforNonUtilization,Lifeleftindays,Remarks,Modified,GroupApprover/Title,GroupApprover/Id,Editor/Title,Editor/ID"
        , "ProjectCode,PlantCode,ItemCode,GroupApprover,Editor"
        , "Id eq '"+ArtId+"'"
      // , sorting,
     ,{ column: 'ID', isAscending: true },
         props).then(results => {
            let brr: Array<IWSLMaster> = new Array<IWSLMaster>();
            results.map((item: {
                Id:number;
                Title:any;
                ProjectCode:any;
                ProjectCodeId:any;
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                ItemCode:any;
                ItemCodeId:any;
                ItemDescription:any;
                UOM:any;
                OnHandQty:any;
                ExpiryDate:any;
                Value:any;
                ReasonforNonUtilization:any;
                Lifeleftindays:any;
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                    Id:item.Id,
                    Title:item.Title,
                    ProjectCode:item.ProjectCode.ProjectCode,
                    ProjectCodeId:item.ProjectCodeId,
                    PlantCode:item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCodeId,
                    ProjectName:item.ProjectName,
                    Location:item.Location,
                    ItemCode:item.ItemCode.Item,
                    ItemCodeId:item.ItemCodeId,
                    ItemDescription:item.ItemDescription,
                    UOM:item.UOM,
                    OnHandQty:item.OnHandQty,
                    ExpiryDate:item.ExpiryDate,
                    Value:item.Value,
                    ReasonforNonUtilization:item.ReasonforNonUtilization,
                    Lifeleftindays:item.Lifeleftindays,
                    Remarks:item.Remarks,
                    GroupApproverId:item.GroupApproverId,
                    Created:item.Created,
                    Editor:item.Editor.Title,
                    Modified:item.Modified                                        
                });
            });
        return brr;
        }
    );
};

return {
    getIWSLMasterData,getWSLDatafilter
    };
}