import "@pnp/sp/lists";
import "@pnp/sp/items";
// import { IPatelEngProps } from "../../components/IPatelEngProps";
import { IItProps } from "../../../components/IItProps";
import SPCRUDOPS from "../../DAL/spcrudops";
 
export interface ISPCRUD {
    getData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IItProps): Promise<any>;
    insertData(listName: string, data: any, props: IItProps): Promise<any>;
    updateData(listName: string, itemId: number, data: any, props: IItProps): Promise<any>;
    deleteData(listName: string, itemId: number, props: IItProps): Promise<any>;
    getListInfo(listName: string, props: IItProps): Promise<any>;
    getListData(listName: string, columnsToRetrieve: string, props: IItProps): Promise<any>;
    batchInsert(listName: string, data: any, props: IItProps): Promise<any>;
    batchUpdate(listName: string, data: any, props: IItProps): Promise<any>;
    batchDelete(listName: string, data: any, props: IItProps): Promise<any>;
    createFolder(listName: string, folderName: string, props: IItProps):Promise<any>;

    uploadFile(folderServerRelativeUrl: string, file: File, props: IItProps): Promise<any>;
    deleteFile(fileServerRelativeUrl: string, props: IItProps): Promise<any>;
    currentProfile(props: IItProps): Promise<any>;
    //currentUserProfile(props: IDeviationuatProps): Promise<any>;
    getLoggedInSiteGroups(props: IItProps): Promise<any>;
    getAllSiteGroups(props: IItProps): Promise<any>;
    getTopData(listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, top: number, props: IItProps): Promise<any>;
     addAttchmentInList(attFiles: File, listName: string, itemId: number, fileName: string, props: IItProps): Promise<any>;

}

export default async function SPCRUD(): Promise<ISPCRUD> {
    const spCrudOps = SPCRUDOPS();

    const getData = async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, props: IItProps) => {
        const items: any[] = await (await spCrudOps).getData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, props);
        return items;
    };

    const insertData = async (listName: string, data: any, props: IItProps) => {
        const result: any = await (await spCrudOps).insertData(listName, data, props);
        return result;
    };

    const updateData = async (listName: string, itemId: number, data: any, props: IItProps) => {
        const result: any = await (await spCrudOps).updateData(listName, itemId, data, props);
        return result;
    };

    const deleteData = async (listName: string, itemId: number, props: IItProps) => {
        const result: any = await (await spCrudOps).deleteData(listName, itemId, props);
        return result;
    };

    const getListInfo = async (listName: string, props: IItProps) => {
        const list: any = await (await spCrudOps).getListInfo(listName, props);
        return list;
    };

    const getListData = async (listName: string, columnsToRetrieve: string, props: IItProps) => {
        const list: any = await (await spCrudOps).getListData(listName, columnsToRetrieve, props);
        return list;
    };

    const batchInsert = async (listName: string, data: any, props: IItProps) => {
        const result: any = await (await spCrudOps).batchInsert(listName, data, props);
        return result;
    };

    const batchUpdate = async (listName: string, data: any, props: IItProps) => {
        const result: any = await (await spCrudOps).batchUpdate(listName, data, props);
        return result;
    };

    const batchDelete = async (listName: string, data: any, props: IItProps) => {
        const result: any = await (await spCrudOps).batchDelete(listName, data, props);
        return result;
    };
    const createFolder = async (listName: string, folderName: string, props: IItProps) => {
        const result: any = await (await spCrudOps).createFolder(listName, folderName, props);
        return result;
    };

    const uploadFile = async (folderServerRelativeUrl: string, file: File, props: IItProps) => {
        const result: any = await (await spCrudOps).uploadFile(folderServerRelativeUrl, file, props);
        return result;
    };

    const deleteFile = async (fileServerRelativeUrl: string, props: IItProps) => {
        const result: any = await (await spCrudOps).deleteFile(fileServerRelativeUrl, props);
        return result;
    };
    const currentProfile = async (props: IItProps) => {
        const result: any = await (await spCrudOps).currentProfile( props);
        return result;
    };
    // const currentUserProfile = async (props: IDeviationuatProps) => {
      
    //    // const queryUrl = "https://etgworld.sharepoint.com/sites/UAT_BPM/_api/web/currentuser/groups";
        
    //     const result: any = await (await spCrudOps).currentUserProfile( props);
    //     return result;
    // };
    const getLoggedInSiteGroups = async (props: IItProps) => {
        const groupItems: any[] = await (await spCrudOps).getLoggedInSiteGroups(props);
        return groupItems;
    };
    const getAllSiteGroups = async (props: IItProps) => {
        const groupItems: any[] = await (await spCrudOps).getAllSiteGroups(props);
        return groupItems;
    };
        const getTopData = async (listName: string, columnsToRetrieve: string, columnsToExpand: string, filters: string
        , orderby: { column: string, isAscending: boolean }, top: number, props: IItProps) => {
        const items: any[] = await (await spCrudOps).getTopData(listName, columnsToRetrieve, columnsToExpand, filters, orderby, top, props);
        return items;
    };
    const addAttchmentInList = async (attFiles: File, listName: string, itemId: number, fileName: string, props: IItProps) => {
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