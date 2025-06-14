import { ISIRRequestData } from "../../INTERFACE/ISIRRequestData";
import { ISirControlRegisterProps } from "../../../components/ISirControlRegisterProps";
import SPCRUDOPS from "../../DAL/spcrudops";
// import { string } from "yup";

export interface ISIRRequestsOps {
    getPendingSIRRequestsData(strFilter: string, sorting: any,props: ISIRRequestData): Promise<ISIRRequestData>;        
    getSRNRequestsDatafilter(props: ISIRRequestData): Promise<ISIRRequestData>;
}
export default function PendingSIRRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getPendingSIRRequestsData = async (sorting: any,props: ISirControlRegisterProps): Promise<ISIRRequestData[]> => {
    return await (await spCrudOps).getData("SIRControl"
        , "*,SIRNUMBER,PlantCode/PlantCode,PlantCode/ID,ProjectName,SIRDATE,MATERIALCODE/MaterialCode,MATERIALCODE/ID,ID,MATERIALDESCRIPTION,UOM,ISSUEQTY,IssuedtoActivityParticular,ISSUEDTO,FREECHARGEABLE,REMARKS,Location,IssuetoLocation,Editor/Title,Editor/ID,GroupApprover/Title,GroupApprover/Id"
        , "PlantCode,MATERIALCODE,Editor,GroupApprover"
        ,''                   
        , sorting,         
            props).then(results => {
            let brr: Array<ISIRRequestData> = new Array<ISIRRequestData>();
            results.map((item: { PlantCode: any; 
                PlantCodeId: any;    
                Id:any;    
                SIRNUMBER:any;
                ProjectName:any;
                SIRDATE:any;
                MATERIALCODE:any;
                MATERIALDESCRIPTION:any;
                UOM:any;
                ISSUEQTY:any;
                IssuedtoActivityParticular:any;
                ISSUEDTO:any;
                FREECHARGEABLE:AudioNode;
                REMARKS:any;
                Location:any;
                IssuetoLocation:any;
                Editor:any;
                Modified:any;
                MaterialCodeId:any;
                GroupApproverId:any;
                }) => {
                brr.push({
                    Id:item.Id,
                    PlantCode: item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCode.ID,
                    SIRNUMBER:item.SIRNUMBER,
                    ProjectName:item.ProjectName,
                    SIRDATE:item.SIRDATE,
                    MATERIALCODE:item.MATERIALCODE.MaterialCode,
                    MaterialCodeId:item.MATERIALCODE.ID,
                    MATERIALDESCRIPTION:item.MATERIALDESCRIPTION,
                    UOM:item.UOM,
                    ISSUEQTY:item.ISSUEQTY,
                    IssuedtoActivityParticular:item.IssuedtoActivityParticular,
                    ISSUEDTO:item.ISSUEDTO,
                    FREECHARGEABLE:item.FREECHARGEABLE,
                    REMARKS:item.REMARKS,
                    Location:item.Location,
                    IssuetoLocation:item.IssuetoLocation,
                    Editor:item.Editor.Title,
                    Modified:item.Modified,
                    GroupApproverId:item.GroupApproverId                        
                });
            });
        return brr;
    }
);    
};

const getSRNRequestsDatafilter = async (ArtId: string | number,props: ISirControlRegisterProps): Promise<ISIRRequestData[]> => {
    return await (await spCrudOps).getData("SIRControl"
        , "*,SIRNUMBER,PlantCode/PlantCode,PlantCode/ID,ProjectName,SIRDATE,MATERIALCODE/MaterialCode,MATERIALCODE/ID,ID,MATERIALDESCRIPTION,UOM,ISSUEQTY,IssuedtoActivityParticular,ISSUEDTO,FREECHARGEABLE,REMARKS,Location,IssuetoLocation,Editor/Title,Editor/ID,GroupApprover/Title,GroupApprover/Id"
        , "PlantCode,MATERIALCODE,Editor,GroupApprover"
        , "Id eq '"+ArtId+"'"
      // , sorting,
     ,{ column: 'Order0', isAscending: true },
         props).then(results => {
            let brr: Array<ISIRRequestData> = new Array<ISIRRequestData>();
            results.map((item: { PlantCode: any; 
                PlantCodeId: any;    
                Id:any;    
                SIRNUMBER:any;
                ProjectName:any;
                SIRDATE:any;
                MATERIALCODE:any;
                MATERIALDESCRIPTION:any;
                UOM:any;
                ISSUEQTY:any;
                IssuedtoActivityParticular:any;
                ISSUEDTO:any;
                FREECHARGEABLE:AudioNode;
                REMARKS:any;
                Location:any;
                IssuetoLocation:any;
                Editor:any;
                Modified:any;
                MaterialCodeId:any;
                GroupApproverId:any;
                }) => {
                brr.push({
                    Id:item.Id,
                    PlantCode: item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCode.ID,
                    SIRNUMBER:item.SIRNUMBER,
                    ProjectName:item.ProjectName,
                    SIRDATE:item.SIRDATE,
                    MATERIALCODE:item.MATERIALCODE.MaterialCode,
                    MaterialCodeId:item.MATERIALCODE.ID,
                    MATERIALDESCRIPTION:item.MATERIALDESCRIPTION,
                    UOM:item.UOM,
                    ISSUEQTY:item.ISSUEQTY,
                    IssuedtoActivityParticular:item.IssuedtoActivityParticular,
                    ISSUEDTO:item.ISSUEDTO,
                    FREECHARGEABLE:item.FREECHARGEABLE,
                    REMARKS:item.REMARKS,
                    Location:item.Location,
                    IssuetoLocation:item.IssuetoLocation,
                    Editor:item.Editor.Title,
                    Modified:item.Modified,
                    GroupApproverId:item.GroupApproverId                                        
                });
            });
        return brr;
        }
    );
};

return {
    getPendingSIRRequestsData,getSRNRequestsDatafilter
    };
}