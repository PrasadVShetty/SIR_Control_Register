import { IFreeChargeble } from "../../INTERFACE/IFreeChargeble";
import { ISirControlRegisterProps } from "../../../components/ISirControlRegisterProps";
import SPCRUDOPS from "../../DAL/spcrudops";

export interface IFreeChargebleOps {
    getFreeChargeble(props: IFreeChargeble): Promise<IFreeChargeble>;
   
}
export default function FreeChargebleOps() {
    const spCrudOps = SPCRUDOPS();

    const getFreeChargeble = async (props: ISirControlRegisterProps): Promise<IFreeChargeble[]> => {
        return await (await spCrudOps).getData("FreeChargeble"
            , "*,Options,Status"
            , ""
            , ""
          // , sorting,
         ,{ column: 'Order0', isAscending: true },
             props).then(results => {
                let brr: Array<IFreeChargeble> = new Array<IFreeChargeble>();
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
    getFreeChargeble
    };
}