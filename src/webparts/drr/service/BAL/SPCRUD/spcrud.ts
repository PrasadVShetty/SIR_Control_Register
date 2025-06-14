import "@pnp/sp/lists";
import "@pnp/sp/items";
// import { IPatelEngProps } from "../../components/IPatelEngProps";
import { IDrrProps } from "../../../components/IDrrProps";
import SPCRUDOPS from "../../DAL/spcrudops";
 
export interface ISPCRUD {
    getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IDrrProps): Promise<any>;
    insertData(listName: string, data: any, props: IDrrProps): Promise<any>;
    updateData(listName: string, itemId: number, data: any, props: IDrrProps): Promise<any>;
    deleteData(listName: string, itemId: number, props: IDrrProps): Promise<any>;
    getListInfo(listName: string, props: IDrrProps): Promise<any>;
    getListData(listName: string, columnsToRetrieve: string, props: IDrrProps): Promise<any>;
    batchInsert(listName: string, data: any, props: IDrrProps): Promise<any>;
    batchUpdate(listName: string, data: any, props: IDrrProps): Promise<any>;
    batchDelete(listName: string, data: any, props: IDrrProps): Promise<any>;
    createFolder(listName: string, folderName: string, props: IDrrProps):Promise<any>;

    uploadFile(folderServerRelativeUrl: string, file: File, props: IDrrProps): Promise<any>;
    deleteFile(fileServerRelativeUrl: string, props: IDrrProps): Promise<any>;
    currentProfile(props: IDrrProps): Promise<any>;
    //currentUserProfile(props: IDeviationuatProps): Promise<any>;
    getLoggedInSiteGroups(props: IDrrProps): Promise<any>;
    getAllSiteGroups(props: IDrrProps): Promise<any>;
    getTopData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, top: number, props: IDrrProps): Promise<any>;
     addAttchmentInList(attFiles: File, listName: string, itemId: number, fileName: string, props: IDrrProps): Promise<any>;

}

export default async function USESPCRUD(): Promise<ISPCRUD> {
    const spCrudOps = await SPCRUDOPS();
    return {
        getData: async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, props: IDrrProps) => {
            return await spCrudOps.getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
        },
        insertData: async (listName: string, data: any, props: IDrrProps) => {
            return await spCrudOps.insertData(listName, data, props);
        },
        updateData: async (listName: string, itemId: number, data: any, props: IDrrProps) => {
            return await spCrudOps.updateData(listName, itemId, data, props);
        },
        deleteData: async (listName: string, itemId: number, props: IDrrProps) => {
            return await spCrudOps.deleteData(listName, itemId, props);
        },
        getListInfo: async (listName: string, props: IDrrProps) => {
            return await spCrudOps.getListInfo(listName, props);
        },
        getListData: async (listName: string, columnsToRetrieve: string, props: IDrrProps) => {
            return await spCrudOps.getListData(listName, columnsToRetrieve, props);
        },
        batchInsert: async (listName: string, data: any, props: IDrrProps) => {
            return await spCrudOps.batchInsert(listName, data, props);
        },
        batchUpdate: async (listName: string, data: any, props: IDrrProps) => {
            return await spCrudOps.batchUpdate(listName, data, props);
        },
        batchDelete: async (listName: string, data: any, props: IDrrProps) => {
            return await spCrudOps.batchDelete(listName, data, props);
        },
        createFolder: async (listName: string, folderName: string, props: IDrrProps) => {
            return await spCrudOps.createFolder(listName, folderName, props);
        },
        uploadFile: async (folderServerRelativeUrl: string, file: File, props: IDrrProps) => {
            return await spCrudOps.uploadFile(folderServerRelativeUrl, file, props);
        },
        deleteFile: async (fileServerRelativeUrl: string, props: IDrrProps) => {
            return await spCrudOps.deleteFile(fileServerRelativeUrl, props);
        },
        currentProfile: async (props: IDrrProps) => {
            return await spCrudOps.currentProfile(props);
        },
        // const currentUserProfile = async (props: IDeviationuatProps) => {
          
        //    // const queryUrl = "https://etgworld.sharepoint.com/sites/UAT_BPM/_api/web/currentuser/groups";
            
        //     const result: any = await (await spCrudOps).currentUserProfile( props);
        //     return result;
        // };
        getLoggedInSiteGroups: async (props: IDrrProps) => {
            return await spCrudOps.getLoggedInSiteGroups(props);
        },
        getAllSiteGroups: async (props: IDrrProps) => {
            return await spCrudOps.getAllSiteGroups(props);
        },
        getTopData: async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
            , orderby: { column: string, isAscending: boolean }, top: number, props: IDrrProps) => {
            return await spCrudOps.getTopData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, top, props);
        },
        addAttchmentInList: async (attFiles: File, listName: string, itemId: number, fileName: string, props: IDrrProps) => {
            return await spCrudOps.addAttchmentInList(attFiles, listName, itemId, fileName, props);
        }
    };
}