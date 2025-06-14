import { IPRMMaster } from "../../INTERFACE/IPRMMaster";
import { IPrmrrProps } from "../../../components/IPrmrrProps";
import SPCRUDOPS from "../../DAL/spcrudops";
export interface IIPRMRequestsOps {
    getIPrmrrMasterData(props: IPRMMaster): Promise<IPRMMaster>;
    getPrmrrDatafilter(props: IPRMMaster): Promise<IPRMMaster>;    
}

export default function IPRMRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getIPrmrrMasterData = async (sorting: any,props: IPrmrrProps): Promise<IPRMMaster[]> => {
    return await (await spCrudOps).getData("PendingRejectedMaterial"
        , "*,Title,PlantCode/PlantCode,PlantCode/Id,MIRNo,ProjectName,MIRDate,GRNNumber,GRNDate,SupplierName,InvoiceNo,InvoiceDate,ItemDescription,UOM,Location,AsperInvoiceChallan,Accepted,Rejected,DateofCommunicationtoBuyerVendor,Remarks,Modified,GroupApprover/Title,GroupApprover/Id,Editor/Title,Editor/ID"
        , "PlantCode,Editor,GroupApprover"
        , ''
        , sorting
        , props).then(results => {
            let brr: Array<IPRMMaster> = new Array<IPRMMaster>();
            results.map((item: {
                Id:number;
                Title:any;                
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                MIRNo:any;
                MIRDate:any;
                GRNNumber:any;
                GRNDate:any;
                SupplierName:any;
                InvoiceNo:any;
                InvoiceDate:any;
                ItemDescription:any;
                UOM:any;
                AsperInvoiceChallan:any;
                Accepted:any;
                Rejected:any;
                DateofCommunicationtoBuyerVendor:any;                
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                Id:item.Id,
                Title:item.Title,
                PlantCode:item.PlantCode.PlantCode,
                PlantCodeId:item.PlantCodeId,
                ProjectName:item.ProjectName,
                Location:item.Location,
                MIRNo:item.MIRNo,
                MIRDate:item.MIRDate,
                GRNNumber:item.GRNNumber,
                GRNDate:item.GRNDate,
                SupplierName:item.SupplierName,
                InvoiceNo:item.InvoiceNo,
                InvoiceDate:item.InvoiceDate,
                ItemDescription:item.ItemDescription,
                UOM:item.UOM,
                AsperInvoiceChallan:item.AsperInvoiceChallan,
                Accepted:item.Accepted,
                Rejected:item.Rejected,
                DateofCommunicationtoBuyerVendor:item.DateofCommunicationtoBuyerVendor,                
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

const getPrmrrDatafilter = async (ArtId: string | number,props: IPrmrrProps): Promise<IPRMMaster[]> => {
    return await (await spCrudOps).getData("PendingRejectedMaterial"
        , "*,Title,PlantCode/PlantCode,PlantCode/Id,MIRNo,ProjectName,MIRDate,GRNNumber,GRNDate,SupplierName,InvoiceNo,InvoiceDate,ItemDescription,UOM,Location,AsperInvoiceChallan,Accepted,Rejected,DateofCommunicationtoBuyerVendor,Remarks,Modified,GroupApprover/Title,GroupApprover/Id,Editor/Title,Editor/ID"
        , "PlantCode,Editor,GroupApprover"
        , "Id eq '"+ArtId+"'"
      // , sorting,
     ,{ column: 'ID', isAscending: true },
         props).then(results => {
            let brr: Array<IPRMMaster> = new Array<IPRMMaster>();
            results.map((item: {
                Id:number;
                Title:any;                
                PlantCode:any;
                PlantCodeId:any;
                ProjectName:any;
                Location:any;
                MIRNo:any;
                MIRDate:any;
                GRNNumber:any;
                GRNDate:any;
                SupplierName:any;
                InvoiceNo:any;
                InvoiceDate:any;
                ItemDescription:any;
                UOM:any;
                AsperInvoiceChallan:any;
                Accepted:any;
                Rejected:any;
                DateofCommunicationtoBuyerVendor:any;                
                Remarks:any;
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                }) => {
                brr.push({
                Id:item.Id,
                Title:item.Title,
                PlantCode:item.PlantCode.PlantCode,
                PlantCodeId:item.PlantCodeId,
                ProjectName:item.ProjectName,
                Location:item.Location,
                MIRNo:item.MIRNo,
                MIRDate:item.MIRDate,
                GRNNumber:item.GRNNumber,
                GRNDate:item.GRNDate,
                SupplierName:item.SupplierName,
                InvoiceNo:item.InvoiceNo,
                InvoiceDate:item.InvoiceDate,
                ItemDescription:item.ItemDescription,
                UOM:item.UOM,
                AsperInvoiceChallan:item.AsperInvoiceChallan,
                Accepted:item.Accepted,
                Rejected:item.Rejected,
                DateofCommunicationtoBuyerVendor:item.DateofCommunicationtoBuyerVendor,                
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
    getIPrmrrMasterData,getPrmrrDatafilter
    };
}