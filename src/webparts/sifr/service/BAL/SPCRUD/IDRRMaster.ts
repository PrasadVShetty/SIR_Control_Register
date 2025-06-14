import { IDRRMaster } from "../../INTERFACE/IDRRMaster";
import { ISifrProps } from "../../../components/ISifrProps";
import SPCRUDOPS from "../../DAL/spcrudops";
export interface IDRRRequestsOps {
    getIDRRMasterData(props: IDRRMaster): Promise<IDRRMaster>;
    getDRRDatafilter(props: IDRRMaster): Promise<IDRRMaster>;    
}

export default function IDRRRequestsOps() {
    const spCrudOps = SPCRUDOPS();

const getIDRRMasterData = async (sorting: any,props: ISifrProps): Promise<IDRRMaster[]> => {
    return await (await spCrudOps).getData("StoresInfra"
        , "*,ProjectCode/ID,ProjectCode/ProjectCode,PlantCode/ID,PlantCode/PlantCode,GroupApprover/Id,GroupApprover/Title,Editor/Id,Editor/Title"
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
                Remarks:any;                                                
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                //new columns
                CLOSEDSTORAGEStatus:any;
                LUBESSTORAGEStatus:any;
                GASESSTORAGEOPENSHEDStatus:any;
                WEIGHTBRIDGEStatus:any;
                STEELYARDStatus:any;
                ScrapSoldOutQtyuptopreviousMonth:any; //Scrap Sold Out Qty upto previous Month since inception Status
                ScrapSoldOutValueINRexclTaxuptop:any; //Scrap Sold Out Qty upto previous Month since inception Status
                CurrentMonthOpeningQtyStatus:any;
                CurrentMonthRecdQtyStatus:any;	
                CurrentMonthSoldQtyStatus:any;
                CurrentMonthScrapSoldValueINRexc:any; //Current Month Scrap Sold Value (INR excl. Tax) Status
                CLOSEDSTORAGE:any;
                LUBESSTORAGE:any;
                GASESSTORAGEOPENSHED:any;
                WEIGHTBRIDGE:any;
                STEELYARD:any;                                
                ScrapSoldOutQtyuptopreviousMonth0:any; //Scrap Sold Out Qty upto previous Month since inception
                ScrapSoldOutValueINRexclTaxuptop0:any; //Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception
                CurrentMonthOpeningQty:any;
                CurrentMonthRecdQty:any;
                CurrentMonthSoldQty:any;
                CurrentMonthScrapSoldValueINRexc0:any; //Current Month Scrap Sold Value (INR excl. Tax)                
                }) => {
                brr.push({
                Id:item.Id,                
                ProjectCode:item.ProjectCode.ProjectCode,
                ProjectCodeId:item.ProjectCodeId,
                PlantCode:item.PlantCode.PlantCode,
                PlantCodeId:item.PlantCodeId,
                ProjectName:item.ProjectName,
                Location:item.Location,                
                Remarks:item.Remarks,                
                GroupApproverId:item.GroupApproverId,
                Created:item.Created,
                Editor:item.Editor,
                Modified:item.Modified,
                //new columns
                CLOSEDSTORAGEStatus:item.CLOSEDSTORAGEStatus,
                LUBESSTORAGEStatus:item.LUBESSTORAGEStatus,
                GASESSTORAGEOPENSHEDStatus:item.GASESSTORAGEOPENSHEDStatus,
                WEIGHTBRIDGEStatus:item.WEIGHTBRIDGEStatus,
                STEELYARDStatus:item.STEELYARDStatus,
                ScrapSoldOutQtyuptopreviousMonth:item.ScrapSoldOutQtyuptopreviousMonth,
                ScrapSoldOutValueINRexclTaxuptop:item.ScrapSoldOutValueINRexclTaxuptop,
                CurrentMonthOpeningQtyStatus:item.CurrentMonthOpeningQtyStatus,
                CurrentMonthRecdQtyStatus:item.CurrentMonthRecdQtyStatus,
                CurrentMonthSoldQtyStatus:item.CurrentMonthSoldQtyStatus,
                CurrentMonthScrapSoldValueINRexc:item.CurrentMonthScrapSoldValueINRexc, 
                CLOSEDSTORAGE:item.CLOSEDSTORAGE,   
                LUBESSTORAGE:item.LUBESSTORAGE,
                GASESSTORAGEOPENSHED:item.GASESSTORAGEOPENSHED,
                WEIGHTBRIDGE:item.WEIGHTBRIDGE,
                STEELYARD:item.STEELYARD,
                ScrapSoldOutQtyuptopreviousMonth0:item.ScrapSoldOutQtyuptopreviousMonth0,   
                ScrapSoldOutValueINRexclTaxuptop0:item.ScrapSoldOutValueINRexclTaxuptop0,
                CurrentMonthOpeningQty:item.CurrentMonthOpeningQty,
                CurrentMonthRecdQty:item.CurrentMonthRecdQty,
                CurrentMonthSoldQty:item.CurrentMonthSoldQty,
                CurrentMonthScrapSoldValueINRexc0:item.CurrentMonthScrapSoldValueINRexc0                
                });
            });
            return brr;
        }
        );
};

const getDRRDatafilter = async (ArtId: string | number,props: ISifrProps): Promise<IDRRMaster[]> => {
    return await (await spCrudOps).getData("StoresInfra"
        , "*,ProjectCode/ID,ProjectCode/ProjectCode,PlantCode/ID,PlantCode/PlantCode,GroupApprover/Id,GroupApprover/Title,Editor/Id,Editor/Title"
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
                Remarks:any;                                                
                GroupApproverId:any;
                Created:any;
                Editor:any;
                Modified:any;
                //new columns
                CLOSEDSTORAGEStatus:any;
                LUBESSTORAGEStatus:any;
                GASESSTORAGEOPENSHEDStatus:any;
                WEIGHTBRIDGEStatus:any;
                STEELYARDStatus:any;
                ScrapSoldOutQtyuptopreviousMonth:any; //Scrap Sold Out Qty upto previous Month since inception Status
                ScrapSoldOutValueINRexclTaxuptop:any; //Scrap Sold Out Qty upto previous Month since inception Status
                CurrentMonthOpeningQtyStatus:any;
                CurrentMonthRecdQtyStatus:any;	
                CurrentMonthSoldQtyStatus:any;
                CurrentMonthScrapSoldValueINRexc:any; //Current Month Scrap Sold Value (INR excl. Tax) Status
                CLOSEDSTORAGE:any;
                LUBESSTORAGE:any;
                GASESSTORAGEOPENSHED:any;
                WEIGHTBRIDGE:any;
                STEELYARD:any;                                
                ScrapSoldOutQtyuptopreviousMonth0:any; //Scrap Sold Out Qty upto previous Month since inception
                ScrapSoldOutValueINRexclTaxuptop0:any; //Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception
                CurrentMonthOpeningQty:any;
                CurrentMonthRecdQty:any;
                CurrentMonthSoldQty:any;
                CurrentMonthScrapSoldValueINRexc0:any; //Current Month Scrap Sold Value (INR excl. Tax) 
                }) => {
                brr.push({
                    Id:item.Id,                
                    ProjectCode:item.ProjectCode.ProjectCode,
                    ProjectCodeId:item.ProjectCodeId,
                    PlantCode:item.PlantCode.PlantCode,
                    PlantCodeId:item.PlantCodeId,
                    ProjectName:item.ProjectName,
                    Location:item.Location,                
                    Remarks:item.Remarks,                
                    GroupApproverId:item.GroupApproverId,
                    Created:item.Created,
                    Editor:item.Editor,
                    Modified:item.Modified,
                    //new columns
                    CLOSEDSTORAGEStatus:item.CLOSEDSTORAGEStatus,
                    LUBESSTORAGEStatus:item.LUBESSTORAGEStatus,
                    GASESSTORAGEOPENSHEDStatus:item.GASESSTORAGEOPENSHEDStatus,
                    WEIGHTBRIDGEStatus:item.WEIGHTBRIDGEStatus,
                    STEELYARDStatus:item.STEELYARDStatus,
                    ScrapSoldOutQtyuptopreviousMonth:item.ScrapSoldOutQtyuptopreviousMonth,
                    ScrapSoldOutValueINRexclTaxuptop:item.ScrapSoldOutValueINRexclTaxuptop,
                    CurrentMonthOpeningQtyStatus:item.CurrentMonthOpeningQtyStatus,
                    CurrentMonthRecdQtyStatus:item.CurrentMonthRecdQtyStatus,
                    CurrentMonthSoldQtyStatus:item.CurrentMonthSoldQtyStatus,
                    CurrentMonthScrapSoldValueINRexc:item.CurrentMonthScrapSoldValueINRexc, 
                    CLOSEDSTORAGE:item.CLOSEDSTORAGE,   
                    LUBESSTORAGE:item.LUBESSTORAGE,
                    GASESSTORAGEOPENSHED:item.GASESSTORAGEOPENSHED,
                    WEIGHTBRIDGE:item.WEIGHTBRIDGE,
                    STEELYARD:item.STEELYARD,
                    ScrapSoldOutQtyuptopreviousMonth0:item.ScrapSoldOutQtyuptopreviousMonth0,   
                    ScrapSoldOutValueINRexclTaxuptop0:item.ScrapSoldOutValueINRexclTaxuptop0,
                    CurrentMonthOpeningQty:item.CurrentMonthOpeningQty,
                    CurrentMonthRecdQty:item.CurrentMonthRecdQty,
                    CurrentMonthSoldQty:item.CurrentMonthSoldQty,
                    CurrentMonthScrapSoldValueINRexc0:item.CurrentMonthScrapSoldValueINRexc0                                                           
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