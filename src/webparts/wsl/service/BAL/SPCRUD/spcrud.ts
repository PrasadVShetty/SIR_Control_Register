import "@pnp/sp/lists";
import "@pnp/sp/items";
// import { IPatelEngProps } from "../../components/IPatelEngProps";
import { IWslProps } from "../../../components/IWslProps";
import SPCRUDOPS from "../../DAL/spcrudops";
 
export interface ISPCRUD {
    getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IWslProps): Promise<any>;
    insertData(listName: string, data: any, props: IWslProps): Promise<any>;
    updateData(listName: string, itemId: number, data: any, props: IWslProps): Promise<any>;
    deleteData(listName: string, itemId: number, props: IWslProps): Promise<any>;
    getListInfo(listName: string, props: IWslProps): Promise<any>;
    getListData(listName: string, columnsToRetrieve: string, props: IWslProps): Promise<any>;
    batchInsert(listName: string, data: any, props: IWslProps): Promise<any>;
    batchUpdate(listName: string, data: any, props: IWslProps): Promise<any>;
    batchDelete(listName: string, data: any, props: IWslProps): Promise<any>;
    createFolder(listName: string, folderName: string, props: IWslProps):Promise<any>;

    uploadFile(folderServerRelativeUrl: string, file: File, props: IWslProps): Promise<any>;
    deleteFile(fileServerRelativeUrl: string, props: IWslProps): Promise<any>;
    currentProfile(props: IWslProps): Promise<any>;
    //currentUserProfile(props: IDeviationuatProps): Promise<any>;
    getLoggedInSiteGroups(props: IWslProps): Promise<any>;
    getAllSiteGroups(props: IWslProps): Promise<any>;
    getTopData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, top: number, props: IWslProps): Promise<any>;
     addAttchmentInList(attFiles: File, listName: string, itemId: number, fileName: string, props: IWslProps): Promise<any>;

}

export default async function SPCRUD(): Promise<ISPCRUD> {
    const spCrudOps = SPCRUDOPS();

    const getData = async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IWslProps) => {
        const items: any[] = await (await spCrudOps).getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
        return items;
    };

    const insertData = async (listName: string, data: any, props: IWslProps) => {
        const result: any = await (await spCrudOps).insertData(listName, data, props);
        return result;
    };

    const updateData = async (listName: string, itemId: number, data: any, props: IWslProps) => {
        const result: any = await (await spCrudOps).updateData(listName, itemId, data, props);
        return result;
    };

    const deleteData = async (listName: string, itemId: number, props: IWslProps) => {
        const result: any = await (await spCrudOps).deleteData(listName, itemId, props);
        return result;
    };

    const getListInfo = async (listName: string, props: IWslProps) => {
        const list: any = await (await spCrudOps).getListInfo(listName, props);
        return list;
    };

    const getListData = async (listName: string, columnsToRetrieve: string, props: IWslProps) => {
        const list: any = await (await spCrudOps).getListData(listName, columnsToRetrieve, props);
        return list;
    };

    const batchInsert = async (listName: string, data: any, props: IWslProps) => {
        const result: any = await (await spCrudOps).batchInsert(listName, data, props);
        return result;
    };

    const batchUpdate = async (listName: string, data: any, props: IWslProps) => {
        const result: any = await (await spCrudOps).batchUpdate(listName, data, props);
        return result;
    };

    const batchDelete = async (listName: string, data: any, props: IWslProps) => {
        const result: any = await (await spCrudOps).batchDelete(listName, data, props);
        return result;
    };
    const createFolder = async (listName: string, folderName: string, props: IWslProps) => {
        const result: any = await (await spCrudOps).createFolder(listName, folderName, props);
        return result;
    };

    const uploadFile = async (folderServerRelativeUrl: string, file: File, props: IWslProps) => {
        const result: any = await (await spCrudOps).uploadFile(folderServerRelativeUrl, file, props);
        return result;
    };

    const deleteFile = async (fileServerRelativeUrl: string, props: IWslProps) => {
        const result: any = await (await spCrudOps).deleteFile(fileServerRelativeUrl, props);
        return result;
    };
    const currentProfile = async (props: IWslProps) => {
        const result: any = await (await spCrudOps).currentProfile( props);
        return result;
    };
    // const currentUserProfile = async (props: IDeviationuatProps) => {
      
    //    // const queryUrl = "https://etgworld.sharepoint.com/sites/UAT_BPM/_api/web/currentuser/groups";
        
    //     const result: any = await (await spCrudOps).currentUserProfile( props);
    //     return result;
    // };
    const getLoggedInSiteGroups = async (props: IWslProps) => {
        const groupItems: any[] = await (await spCrudOps).getLoggedInSiteGroups(props);
        return groupItems;
    };
    const getAllSiteGroups = async (props: IWslProps) => {
        const groupItems: any[] = await (await spCrudOps).getAllSiteGroups(props);
        return groupItems;
    };
        const getTopData = async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, top: number, props: IWslProps) => {
        const items: any[] = await (await spCrudOps).getTopData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, top, props);
        return items;
    };
    const addAttchmentInList = async (attFiles: File, listName: string, itemId: number, fileName: string, props: IWslProps) => {
        const result: any = await (await spCrudOps).addAttchmentInList(attFiles, listName, itemId, fileName, props);
        return result;
    };

    return {
        getData,
        insertData,
        updateData,
        deleteData,
        getListInfo,
        getListData,
        batchInsert,
        batchUpdate,
        batchDelete,
        createFolder,
        uploadFile,
        deleteFile,
        currentProfile,
      //  currentUserProfile,
        getLoggedInSiteGroups,
        getAllSiteGroups,
        getTopData,
        addAttchmentInList
        

    };
}