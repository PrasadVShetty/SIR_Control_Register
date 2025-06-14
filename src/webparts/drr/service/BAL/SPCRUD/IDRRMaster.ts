import { IDRRMaster } from "../../INTERFACE/IDRRMaster";
import { IDrrProps } from "../../../components/IDrrProps";
import SPCRUDOPS from "../../DAL/spcrudops";
export interface IDRRRequestsOps {
    getIDRRMasterData(props: IDRRMaster): Promise<IDRRMaster>;
    getDRRDatafilter(props: IDRRMaster): Promise<IDRRMaster>;    
}

export default function IDRRRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getIDRRMasterData = async (sorting: any,props: IDrrProps): Promise<IDRRMaster[]> => {
    return await (await spCrudOps).getData("WeeklyDiesel"
        , "*,ProjectCode/ID,ProjectCode/ProjectCode,PlantCode/ID,PlantCode/PlantCode,Location,Opening,Receipt,ReceiptLocalfromAuthorisedPump,IssueOwnconsumption,IssueChargeable,Closing,Remarks,GroupApprover/Id,GroupApprover/Title,Editor/Id,Editor/Title"
        , "PlantCode,Editor,GroupApprover,ProjectCode"
        , ''
        , sorting
        , props).then(results => {
            let brr: Array<IDRRMaster> = new Array<IDRRMaster>();
            results.map((item: {
                Id:number;
                ProjectCode:any;
                ProjectCodeId:any;
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                Opening:any;
                Receipt:any;
                ReceiptLocalfromAuthorisedPump:any;
                IssueOwnconsumption:any;
                IssueChargeable:any;
                Closing:any;
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                Id:item.Id,                
                ProjectCode:item.ProjectCode.ProjectCode,
                ProjectCodeId:item.ProjectCodeId,
                PlantCode:item.PlantCode.PlantCode,
                PlantCodeId:item.PlantCodeId,
                ProjectName:item.ProjectName,
                Location:item.Location,
                Opening:item.Opening,
                Receipt:item.Receipt,
                ReceiptLocalfromAuthorisedPump:item.ReceiptLocalfromAuthorisedPump,
                IssueOwnconsumption:item.IssueOwnconsumption,
                IssueChargeable:item.IssueChargeable,
                Closing:item.Closing,
                Remarks:item.Remarks,                
                GroupApproverId:item.GroupApproverId,
                Created:item.Created,
                Editor:item.Editor,
                Modified:item.Modified
                });
            });
            return brr;
        }
        );
};

const getDRRDatafilter = async (ArtId: string | number,props: IDrrProps): Promise<IDRRMaster[]> => {
    return await (await spCrudOps).getData("WeeklyDiesel"
        , "*,ProjectCode/ID,ProjectCode/ProjectCode,PlantCode/ID,PlantCode/PlantCode,Location,Opening,Receipt,ReceiptLocalfromAuthorisedPump,IssueOwnconsumption,IssueChargeable,Closing,Remarks,GroupApprover/Id,GroupApprover/Title,Editor/Id,Editor/Title"
        , "PlantCode,Editor,GroupApprover,ProjectCode"
        , "Id eq '"+ArtId+"'"
      // , sorting,
     ,{ column: 'ID', isAscending: true },
         props).then(results => {
            let brr: Array<IDRRMaster> = new Array<IDRRMaster>();
            results.map((item: {
                Id:number;
                ProjectCode:any;
                ProjectCodeId:any;
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                Opening:any;
                Receipt:any;
                ReceiptLocalfromAuthorisedPump:any;
                IssueOwnconsumption:any;
                IssueChargeable:any;
                Closing:any;
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                Id:item.Id,                
                ProjectCode:item.ProjectCode.ProjectCode,
                ProjectCodeId:item.ProjectCodeId,
                PlantCode:item.PlantCode.PlantCode,
                PlantCodeId:item.PlantCodeId,
                ProjectName:item.ProjectName,
                Location:item.Location,
                Opening:item.Opening,
                Receipt:item.Receipt,
                ReceiptLocalfromAuthorisedPump:item.ReceiptLocalfromAuthorisedPump,
                IssueOwnconsumption:item.IssueOwnconsumption,
                IssueChargeable:item.IssueChargeable,
                Closing:item.Closing,
                Remarks:item.Remarks,                
                GroupApproverId:item.GroupApproverId,
                Created:item.Created,
                Editor:item.Editor,
                Modified:item.Modified                                        
                });
            });
        return brr;
        }
    );
};

return {
    getIDRRMasterData,getDRRDatafilter
    };
}