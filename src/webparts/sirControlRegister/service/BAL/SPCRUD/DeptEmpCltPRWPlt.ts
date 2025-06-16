import { IDeptEmpCltPRWPlt } from "../../INTERFACE/IDeptEmpCltPRWPlt";
import { ISirControlRegisterProps } from "../../../components/ISirControlRegisterProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IDeptEmpCltPRWPltOps {
    getDeptEmpCltPRWPlt(props: IDeptEmpCltPRWPlt): Promise<IDeptEmpCltPRWPlt>;
   
}
export default function DeptEmpCltPRWPltOps() {
    const spCrudOps = SPCRUDOPS();

    const getDeptEmpCltPRWPlt = async (strFilter: string, sorting: any,props: ISirControlRegisterProps): Promise<IDeptEmpCltPRWPlt[]> => {
        return await (await spCrudOps).getData("DeptEmpCltPRWPlt"
            , "*,Options,Status"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IDeptEmpCltPRWPlt> = new Array<IDeptEmpCltPRWPlt>();
                results.map((item: { 
                    Id:any;
                    Status:any;
                    Options:any;
                    }) => {
                    brr.push({
                        Id:item.Id,
                        Options: item.Options,
                        Status:item.Status                                         
                    });
                });
                return brr;
            }
            );
    //});
};

return {
    getDeptEmpCltPRWPlt
    };
}