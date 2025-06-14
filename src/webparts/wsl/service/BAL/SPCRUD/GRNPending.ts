import { IPendingGRN } from "../../INTERFACE/IPendingGRN";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";
// import { string } from "yup";

export interface IPendingGRNRequestsOps {
    getPendingGRNRequestsData(strFilter: string, sorting: any,props: IPendingGRN): Promise<IPendingGRN>;
    getPendingGRNRequestsDatafilter(props: IPendingGRN): Promise<IPendingGRN>;
    
}
export default function PendingGRNRequestsOps() {
    const spCrudOps = SPCRUDOPS();

    const getPendingGRNRequestsData = async (strFilter: string, sorting: any,props: IWslProps): Promise<IPendingGRN[]> => {
        return await (await spCrudOps).getData("PendingGRN"
            , "*,PlantCode/PlantCode,PlantCode/Id,ReasonforPending/Reason,ReasonforPending/Id,NameActiontobetakenby/Title,NameActiontobetakenby/EMail,Editor/Title,Editor/EMail,NameActiontobetakenby/Id"
            , "PlantCode,ReasonforPending,NameActiontobetakenby,Editor"
            , strFilter
           // , sorting
           , sorting,
         //,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IPendingGRN> = new Array<IPendingGRN>();
                results.map((item: { Id: any; PlantCode: any; ReportDate: any; ProjectName: any; MIRNO: any; RecdDate: any;ReasonforPending: any; SupplierName: any; ApproverLevel: any; InvoiceDate: any; Description: any; PONo: any; InvoiceValueIncludingTax: any; InvoiceChallanNo: any;ManualMIRdone: any;
                    DetailedReason: any;
                    Nosofpendingdays:any;
                    //NameActiontobetakenby:any;
                    Location:any;Remarks:any;NameActiontobetakenby:any;Editor:any;Modified:any;
                    NameActiontobetakenbyId:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        PlantCode: item.PlantCode.PlantCode,
                        PlantCodeId:item.PlantCode.Id,

                        ReportDate:item.ReportDate, 
                        ProjectName:item.ProjectName,
                        MIRNO :item.MIRNO,
                        RecdDate:item.RecdDate,
                        ReasonforPending :item.ReasonforPending.Reason,
                        ReasonforPendingId:item.ReasonforPending.Id,

                        SupplierName:item.SupplierName,
                        ApproverLevel:item.ApproverLevel,
                        InvoiceDate:item.InvoiceDate,
                        Description:item.Description,
                        PONo:item.PONo,
                        InvoiceValueIncludingTax:item.InvoiceValueIncludingTax,
                        InvoiceChallanNo:item.InvoiceChallanNo,
                        ManualMIRdone: item.ManualMIRdone,
                        DetailedReason: item.DetailedReason,
                        Nosofpendingdays:item.Nosofpendingdays,
                     NameActiontobetakenby:item.NameActiontobetakenby.Title,
                    NameActiontobetakenbyId:item.NameActiontobetakenby.Id,
                     NameActiontobetakenbyEmail:item.NameActiontobetakenby !== undefined ? item.NameActiontobetakenby.EMail : '',


                        Location:item.Location,
                        Remarks:item.Remarks,
                        Editor:item.Editor.Title,
                        Modified:item.Modified

                        
                       
                    });
                });
                return brr;
            }
            );
    //});
};
const getPendingGRNRequestsDatafilter = async (ArtId: string | number,props: IWslProps): Promise<IPendingGRN[]> => {
    return await (await spCrudOps).getData("PendingGRN"
        , "*,PlantCode/PlantCode,PlantCode/Id,ReasonforPending/Reason,ReasonforPending/Id,NameActiontobetakenby/Title,NameActiontobetakenby/EMail,Editor/Title,Editor/EMail,NameActiontobetakenby/Id"
        , "PlantCode,ReasonforPending,NameActiontobetakenby,Editor"
        , "Id eq '"+ArtId+"'"
      // , sorting,
     ,{ column: 'Order0', isAscending: true },
         props).then(results => {
            let brr: Array<IPendingGRN> = new Array<IPendingGRN>();
            results.map((item: { Id: any; PlantCode: any; ReportDate: any; ProjectName: any; MIRNO: any; RecdDate: any;ReasonforPending: any; SupplierName: any; ApproverLevel: any; InvoiceDate: any; Description: any; PONo: any; InvoiceValueIncludingTax: any; InvoiceChallanNo: any;ManualMIRdone: any;
                DetailedReason: any;
                Nosofpendingdays:any;
                //NameActiontobetakenby:any;
                Location:any;Remarks:any;NameActiontobetakenby:any;Editor:any;Modified:any;
                NameActiontobetakenbyId:any;
                }) => {
                brr.push({
                    Id:item.Id,
                    PlantCode: item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCode.Id,
                    //ReportDate:item.ReportDate !== undefined ? new Date(item.ReportDate): null, 
                    ReportDate:item.ReportDate, 

                    ProjectName:item.ProjectName,
                    MIRNO :item.MIRNO,
                    RecdDate:item.RecdDate,
                    ReasonforPending :item.ReasonforPending.Reason,
                    ReasonforPendingId:item.ReasonforPending.Id,
                    SupplierName:item.SupplierName,
                    ApproverLevel:item.ApproverLevel,
                    InvoiceDate:item.InvoiceDate,
                    Description:item.Description,
                    PONo:item.PONo,
                    InvoiceValueIncludingTax:item.InvoiceValueIncludingTax,
                    InvoiceChallanNo:item.InvoiceChallanNo,
                    ManualMIRdone: item.ManualMIRdone,
                    DetailedReason: item.DetailedReason,
                    Nosofpendingdays:item.Nosofpendingdays,
                    NameActiontobetakenby:item.NameActiontobetakenby.Title,
                    NameActiontobetakenbyId:item.NameActiontobetakenby.Id,

                    NameActiontobetakenbyEmail:item.NameActiontobetakenby !== undefined ? item.NameActiontobetakenby.EMail : '',

                    Location:item.Location,
                    Remarks:item.Remarks,
                    Editor:item.Editor.Title,
                    Modified:item.Modified

                    
                   
                });
            });
            return brr;
        }
        );
//});
};

return {
    getPendingGRNRequestsData,getPendingGRNRequestsDatafilter
    };
}