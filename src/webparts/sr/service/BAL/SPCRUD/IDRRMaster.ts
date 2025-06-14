import { IDRRMaster } from "../../INTERFACE/IDRRMaster";
import { ISrProps } from "../../../components/ISrProps";
import SPCRUDOPS from "../../DAL/spcrudops";

// Define proper types for the SharePoint item
interface SharePointItem {
    Id: number;
    ProjectCode: { ProjectCode: string };
    ProjectCodeId: number;
    PlantCode: { PlantCode: string };
    PlantCodeId: number;
    ProjectName: string;
    Location: string;
    ItemDescription: string;
    UOM: string;
    NewConsumedQtyuptopreviousMonths: number;
    RecdQtyUpTopreviousMonthsinceinc: number;
    ScrapSoldOutQtyuptopreviousMonth: number;
    ScrapSoldOutValue: number;
    CurrentMonthOpeningQty: number;
    CurrentMonthRecdQty: number;
    CurrentMonthSoldQty: number;
    CurrentMonthScrapSoldValueINRexc: number;
    TotalRecdQty: number;
    TotalSold: number;
    ScrapAvailable: number;
    TotalSoldOutValueINRexclTax: number;
    Remarks: string;
    GroupApproverId: number;
    Created: string;
    Editor: { Title: string };
    Modified: string;
    TypeofItem: { Item: string };
    TypeofItemId: number;
}

export interface IDRRRequestsOps {
    getIDRRMasterData(sorting: any, props: ISrProps): Promise<IDRRMaster[]>;
    getDRRDatafilter(artId: string | number, props: ISrProps): Promise<IDRRMaster[]>;
}

// Constants for reuse
const SELECT_FIELDS = "*,ProjectCode/ID,ProjectCode/ProjectCode,PlantCode/ID,PlantCode/PlantCode,TypeofItem/ID,TypeofItem/Item,Location,ItemDescription,UOM,NewConsumedQtyuptopreviousMonths,RecdQtyUpTopreviousMonthsinceinc,ScrapSoldOutQtyuptopreviousMonth,ScrapSoldOutValue,CurrentMonthOpeningQty,CurrentMonthRecdQty,CurrentMonthSoldQty,CurrentMonthScrapSoldValueINRexc,TotalRecdQty,TotalSold,ScrapAvailable,TotalSoldOutValueINRexclTax,Remarks,GroupApprover/Id,GroupApprover/Title,Editor/Id,Editor/Title";
const EXPAND_FIELDS = "PlantCode,Editor,GroupApprover,ProjectCode,TypeofItem";
const LIST_NAME = "ScrapReport";

// Helper function to map SharePoint item to IDRRMaster
const mapToIDRRMaster = (item: SharePointItem): IDRRMaster => ({
    Id: item.Id,
    ProjectCode: item.ProjectCode.ProjectCode,
    ProjectCodeId: item.ProjectCodeId,
    PlantCode: item.PlantCode.PlantCode,
    PlantCodeId: item.PlantCodeId,
    ProjectName: item.ProjectName,
    Location: item.Location,
    ItemDescription: item.ItemDescription,
    UOM: item.UOM,
    NewConsumedQtyuptopreviousMonthsinceinception: item.NewConsumedQtyuptopreviousMonths,
    RecdQtyUpTopreviousMonthsinceinception: item.RecdQtyUpTopreviousMonthsinceinc,
    ScrapSoldOutQtyuptopreviousMonthsinceinception: item.ScrapSoldOutQtyuptopreviousMonth,
    ScrapSoldOutValue: item.ScrapSoldOutValue,
    CurrentMonthOpeningQty: item.CurrentMonthOpeningQty,
    CurrentMonthRecdQty: item.CurrentMonthRecdQty,
    CurrentMonthSoldQty: item.CurrentMonthSoldQty,
    CurrentMonthScrapSoldValueINRexclTax: item.CurrentMonthScrapSoldValueINRexc,
    TotalRecdQty: item.TotalRecdQty,
    TotalSold: item.TotalSold,
    ScrapAvailable: item.ScrapAvailable,
    TypeofItemId: item.TypeofItemId,
    TypeofItem: item.TypeofItem.Item,
    TotalSoldOutValueINRexclTax: item.TotalSoldOutValueINRexclTax,
    Remarks: item.Remarks,
    GroupApproverId: item.GroupApproverId,
    Created: item.Created,
    Editor: item.Editor.Title,
    Modified: item.Modified
});

export default function IDRRRequestsOps(): IDRRRequestsOps {
    const spCrudOps = SPCRUDOPS();

    const getIDRRMasterData = async (sorting: any, props: ISrProps): Promise<IDRRMaster[]> => {
        try {
            const results = await (await spCrudOps).getData(
                LIST_NAME,
                SELECT_FIELDS,
                EXPAND_FIELDS,
                '',
                sorting,
                props
            );
            return results.map(mapToIDRRMaster);
        } catch (error) {
            console.error('Error fetching IDRR master data:', error);
            throw new Error('Failed to fetch IDRR master data');
        }
    };

    const getDRRDatafilter = async (artId: string | number, props: ISrProps): Promise<IDRRMaster[]> => {
        try {
            const filter = `Id eq '${artId}'`;
            const results = await (await spCrudOps).getData(
                LIST_NAME,
                SELECT_FIELDS,
                EXPAND_FIELDS,
                filter,
                { column: 'ID', isAscending: true },
                props
            );
            return results.map(mapToIDRRMaster);
        } catch (error) {
            console.error('Error fetching filtered DRR data:', error);
            throw new Error('Failed to fetch filtered DRR data');
        }
    };

    return {
        getIDRRMasterData,
        getDRRDatafilter
    };
}