import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { ISirControlRegisterProps } from "../ISirControlRegisterProps";
import PendingSIRRequestsOps from '../../service/BAL/SPCRUD/SIRControl';
import { ISIRRequestData } from '../../service/INTERFACE/ISIRRequestData';
import Utilities, { IUtilities } from '../../service/BAL/SPCRUD/utilities';
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster'
import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import { IReasonMaster } from '../../service/INTERFACE/IReasonMaster';
import {useParams, useHistory } from 'react-router-dom';
import {IPersonaProps } from 'office-ui-fabric-react';
import { ISPCRUDOPS } from '../../service/DAL/spcrudops';
import './NewRequest.css'; 
import {IDropdownOption } from '@fluentui/react/lib/Dropdown';
import {PrimaryButton } from '@fluentui/react/lib/Button';
import * as yup from 'yup';
import { IMaterialCodeMaster } from '../../service/INTERFACE/IMaterialCodeMaster';
import MaterialCodeRequestsOps from '../../service/BAL/SPCRUD/MaterialCodeMaster';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';

const MRI: IDropdownOption[] = [
    { key: 'Yes', text: 'Yes' },
    { key: 'No', text: 'No' },
  ];
export const EditRequest: React.FunctionComponent<ISirControlRegisterProps> = (props: ISirControlRegisterProps) => {
  const { ArtIntId } = useParams<{ ArtIntId: string }>();
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [ReasonCollData, setreasonCollData] = useState<IReasonMaster[]>();
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [workrequestColl, setPedningdata] = useState<ISIRRequestData[]>();
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [testBrand, setBrandText] = React.useState<string[]>([]);
  const [MaterialCollData, setMaterialCollData] = useState<IMaterialCodeMaster[]>();
  const [currentDate] = useState(getDate());
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);  
  let spCrudObj: ISPCRUD;
  let ProductText: any;
  let newColors = [];
  let changed2: any;
  let changed1: any;
  let BrandText: any;


    function getFieldProps(formik: FormikProps<any>, field: string) {
        return { ...formik.getFieldProps(field), errorMessage: formik.errors[field] as string };
    }

    const _getPeoplePickerItems = (item: IPersonaProps[]) => {
      setUser(item);
      let reportingManagerEmail: any[] = [];
      item.map((item) => {
        reportingManagerEmail.push(item.id)
      })
  
      if (item.length === 0) {
        reportingManagerEmail = [];
      }
  

    }

    async function onRequestInitiate(formValues: any) {
        spCrudObj = await USESPCRUD();
        setSPCRUD(spCrudObj);

        let date = new Date();
        date.setDate(date.getDate() + 1);
        
        var GroupIds = [];
        for(var i=0;i<SetPlantGroup.length;i++)
        {
          let test = SetPlantGroup[i].GroupApprover;
          for(var j=0;j<test.length;j++)
          {
            GroupIds.push(test[j]);
          }      
        }

        let futureDate = date.toISOString().split('T')[0];
        console.log(futureDate);
        if(formValues.SIRDate >= futureDate){
          alert ("Future date not allowed in the Report Date field")
          return false
        } 
        
        let onBehalf = 0;
        let onBehalfEmail = "";                
         
        let PRRequest: any = {                   
          'SIRDATE': formValues.SIRDate,
          'PlantCodeId': formValues.PlantCodeId,
          'ProjectName': formValues.ProjectName,
          'Location': formValues.Location,
          'SIRNUMBER': formValues.SIRNO,
          'MATERIALCODEId': parseInt(formValues.MaterialCodeId),
          'ISSUEQTY': formValues.IssueQty.toString(),
          'FREECHARGEABLE': formValues.Charge,
          'MATERIALDESCRIPTION': formValues.MaterialDesc,
          'UOM': formValues.UOM,
          'IssuetoLocation': formValues.IssueLoct,
          'IssuedtoActivityParticular': formValues.IssuedtoActiv,
          'ISSUEDTO': formValues.IssuetoDept,    
          'REMARKS': formValues.Remarks,
          'GroupApproverId':{ "results": GroupIds}
        };
        
        console.log(formValues);
        console.log(PRRequest);
          
        await spCrudObj.updateData("SIRControl", workrequestColl[0].Id, PRRequest, props).then(async (brrAppUpdateResult1) => {

        alert ("Pending SIR data updated successfully")
        history.push('/InitiatorLanding');

            
     });

    }
       
    const validate = yup.object().shape({
        SIRDate: yup.string().test(
          "SIRDate",
          "SIR DATE is required",
          (custCode) => {
            if (custCode) {
              return true;
            } else {
              return false;
            }
          }),      
          PlantCodeId: yup.string().test(
            "PlantCodeId",
            "Plant Code is required",
            (custCode) => {
              if (custCode) {
                return true;
              } else {
                return false;
              }
            }),
    
            Location: yup.string().test(
              "Location",
              "Location is required",
              (custCode) => {
                if (custCode) {
                  return true;
                } else {
                  return false;
                }
              }),
    
              SIRNO: yup.string().test(
                "SIRNO",
                "SIR NO Name is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
                }),
              
              MaterialCodeId: yup.string().test(
              "MaterialCodeId",
              "Material Code Name is required",
              (custCode) => {
                if (custCode) {
                  return true;
                } else {
                  return false;
                }
              }),
    
              MaterialDesc: yup.string().test(
              "MaterialDesc",
              "Material Description Name is required",
              (custCode) => {
                if (custCode) {
                  return true;
                } else {
                  return false;
                }
              }),
    
              UOM: yup.string().test(
              "UOM",
              "UOM Name is required",
              (custCode) => {
                if (custCode) {
                  return true;
                } else {
                  return false;
                }
              }),
    
              IssueQty: yup.string().test(
              "IssueQty",
              "Quantity is required",
              (custCode) => {
                if (custCode) {
                  return true;
                } else {
                  return false;
                }
              }),
    
              IssueLoct: yup.string().test(
                "IssueLoct",
                "Location is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
                }),
    
              IssuedtoActiv: yup.string().test(
                "IssuedtoActiv",
                "Activity/Particular is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
                }),
              
              IssuetoDept: yup.string().test(
                "IssuetoDept",
                "DEPT/ EMPLOYEE/ CLIENT/ PRW/ PLANT is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
                }),
                
                Charge: yup.string().test(
                  "Charge",
                  "FREE/CHARGEABLE is required",
                  (custCode) => {
                    if (custCode) {
                      return true;
                    } else {
                      return false;
                    }
                  }),
    });

    const initialvalues = {
      SIRDate: '',
      PlantCodeId: '',
      ProjectName: '',
      Location: '',
      SIRNO: '',
      MaterialCodeId: '',
      IssueQty: '',
      Charge: '',
      MaterialDesc: '',
      UOM:'',
      IssueLoct: '',
      IssuedtoActiv: '',
      IssuetoDept: '',    
      Remarks: ''
    };

    function onChangeDate(e,formik){
      let date = new Date(e.target.value);
      let todaydate = new Date();
      const startDateObj = new Date(date);
      var timeDiff = new Date(todaydate).getTime() - new Date(date).getTime();        
      var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      formik.setFieldValue('NofoPendingdays',diffDays)
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
    }
    
    function onChangeRequestType(e, formik) {              
        let selectedvalue = e.target.value;
        const workrequestColl = plantMasterCollData.filter((e) => e.Id === parseInt(selectedvalue));
        setPlantGroup(workrequestColl);        
        formik.setFieldValue('ProjectName',workrequestColl[0].ProjectName)
        formik.setFieldValue('Location',workrequestColl[0].Location)                
    }

    async function onChangeRequestTypeNew(value) {
      try {
        // Wait for plant code data to be fetched
        const plantColl = await PlantCodeRequestsOps().getPlantCodeData(props);          
        // Then continue with rest of the logic
        let selectedvalue = value;
        const workrequestColl = plantColl.filter(
          (e) => e.Id === parseInt(selectedvalue)
        );
        setPlantGroup(workrequestColl);
      } catch (error) {
        console.error('Error fetching plant code data:', error);
      }
    }

    React.useEffect(() => {        
        PendingSIRRequestsOps().getSRNRequestsDatafilter(ArtIntId, props).then(approvemasterres => {
        setPedningdata(approvemasterres)
        PlantCodeRequestsOps().getPlantCodeData(props).then((plantColl) => {
            setPlantCollData(plantColl);                  
          MaterialCodeRequestsOps().getMaterialCodeData(props).then((MaterialCodeData) => {
                  setMaterialCollData(MaterialCodeData);
                }, error => {
                  console.log(error);
                })}, error => {
            console.log(error);
        })},  
        error => {
            console.log(error);
        })
        
    }, []);
    const today = new Date().toISOString().split('T')[0];

    return (
      <Formik initialValues={initialvalues}
        validationSchema={validate}
  
        onSubmit={(values, helpers) => { }}>{
          formik => (
            // <section >
            <div>
              {
                React.useEffect(() => {
                  if (workrequestColl && workrequestColl[0]?.SIRDATE) {
                    formik.setFieldValue('SIRDate', workrequestColl[0]?.SIRDATE.split('T')[0]);
                  }
                  if (workrequestColl && workrequestColl[0]?.PlantCodeId) {
                    formik.setFieldValue('PlantCodeId', workrequestColl[0]?.PlantCodeId);
                    onChangeRequestTypeNew(workrequestColl[0]?.PlantCodeId);
                  }
                  if (workrequestColl && workrequestColl[0]?.MaterialCodeId) {
                    formik.setFieldValue('MaterialCodeId', workrequestColl[0]?.MaterialCodeId);
                  }
                  formik.setFieldValue('ProjectName', workrequestColl != undefined ? workrequestColl[0].ProjectName:undefined);
                  formik.setFieldValue('Location', workrequestColl != undefined ? workrequestColl[0].Location : undefined);                                    
                  formik.setFieldValue('SIRNO', workrequestColl != undefined ? workrequestColl[0].SIRNUMBER : undefined);
                  formik.setFieldValue('MaterialDesc', workrequestColl != undefined ? workrequestColl[0].MATERIALDESCRIPTION : undefined);
                  formik.setFieldValue('UOM', workrequestColl != undefined ? workrequestColl[0].UOM : undefined);
                  formik.setFieldValue('IssueQty', workrequestColl != undefined ? parseInt(workrequestColl[0].ISSUEQTY) : undefined);                                   
                  formik.setFieldValue('IssuedtoActiv', workrequestColl != undefined ? workrequestColl[0].IssuedtoActivityParticular: undefined);
                  formik.setFieldValue('IssuetoDept', workrequestColl != undefined ? workrequestColl[0].ISSUEDTO: undefined);
                  formik.setFieldValue('Charge', workrequestColl != undefined ? workrequestColl[0].FREECHARGEABLE: undefined);
                  formik.setFieldValue('Remarks', workrequestColl != undefined ? workrequestColl[0].REMARKS: undefined);
                  formik.setFieldValue('IssueLoct', workrequestColl != undefined ? workrequestColl[0].IssuetoLocation: undefined);
                  
                }, [workrequestColl])
              }
          <div>
          <div className='con-box'>
          <div className="new-request-container">
          <div className='row'>
          <div className='col-md-12'>
          <div className="text-center heading">
          <h4>New Request Form</h4>
          </div>
          </div>
          </div>
          <div className='p-3 bg-white shadow-sm border'>
                
                                 
          <div className='form-group row'>

          <div className='col-md-3'>
          <label className='col-form-label'>SIR DATE</label>
          <div>
          <DatePicker
          id="txtsirdate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.SIRDate ? new Date(formik.values.SIRDate) : undefined}
          onSelectDate={(date) => formik.setFieldValue('SIRDate', date?.toISOString())}
          parseDateFromString={(input) => {
          const parts = input.split(/[\/\-]/).map(p => p.trim());
          const today = new Date();

          // Format: "31" => 31st of this month
          if (parts.length === 1 && /^\d{1,2}$/.test(parts[0])) {
          return new Date(today.getFullYear(), today.getMonth(), parseInt(parts[0]));
          }

          // Format: "31/03" => 31 March current year
          if (parts.length === 2 && /^\d{1,2}$/.test(parts[0]) && /^\d{1,2}$/.test(parts[1])) {
          return new Date(today.getFullYear(), parseInt(parts[1]) - 1, parseInt(parts[0]));
          }

          // Format: "31/03/1999" => full date
          if (parts.length === 3) {
          const [day, month, year] = parts.map(Number);
          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            return new Date(year, month - 1, day);
          }
          }

          return undefined; // fallback
          }}
          formatDate={(date) =>
          date
          ? `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`
          : ''
          }             
          styles={{ root: { width: '100%' } }}
          />
          {formik.errors.SIRDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.SIRDate}
          </div>
          )}
          </div>
          </div>

          <div className='col-md-3'>
          <label className='col-form-label'>Plant Code</label>
          <div>

          <select id='ddlPlantCode' className='form-control' {...getFieldProps(formik, 'PlantCodeId')} onChange={async (e) => {
          // changed3 = e.target.value;

          formik.setFieldValue('PlantCodeId', e.target.value);
          await onChangeRequestType(e,formik);
          formik.handleChange("PlantCodeId");
          }}>
          <option value="">Select</option>
          {plantMasterCollData !== undefined ? plantMasterCollData.map((Vend) => <option key={Vend.Id} value={Vend.Id}>{Vend.PlantCode}</option>) : ''}

          </select>
          {formik.errors.PlantCodeId ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.PlantCodeId).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Project Name</label>
          <div>
          <input
          type="text"
          className="form-control form-bd"
          // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
          {...getFieldProps(formik, 'ProjectName')}

          readOnly
          />
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Location </label>
          <div>
          <input
          type="text"
          className="form-control form-bd"
          // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].Location : ''}
          {...getFieldProps(formik, 'Location')}

          readOnly
          />
          </div>
          </div>
          <br></br>
          </div>

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>SIR NO.</label>
          <div>
          <input type='text' id='txtSIRNO' className='form-control'  {...getFieldProps(formik, 'SIRNO')}></input>
          {formik.errors.SIRNO ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.SIRNO).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Material Code</label>
          <div>

          <select id='ddlMaterialCode' className='form-control' {...getFieldProps(formik, 'MaterialCodeId')} onChange={async (e) => {
          // changed3 = e.target.value;

          formik.setFieldValue('MaterialCodeId', e.target.value);
          await onChangeRequestType(e,formik);
          formik.handleChange("MaterialCodeId");
          }}>
          <option value="">Select</option>
          {MaterialCollData !== undefined ? MaterialCollData.map((Vend) => <option key={Vend.Id} value={Vend.Id}>{Vend.MaterialCode}</option>) : ''}

          </select>
          {formik.errors.MaterialCodeId ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.MaterialCodeId).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>MATERIAL DESCRIPTION</label>
          <div>
          <textarea id='txtMaterialDesc' className='form-control'  {...getFieldProps(formik, 'MaterialDesc')}/>
          {formik.errors.MaterialDesc ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.MaterialDesc).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>UOM</label>
          <div>
          <input type='text' id='txtUOM' className='form-control'  {...getFieldProps(formik, 'UOM')}></input>
          {formik.errors.UOM ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.UOM).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          </div> 

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>ISSUE QTY</label>
          <div>
          <input type='number' id='txtIssueQty' className='form-control'  {...getFieldProps(formik, 'IssueQty')}></input>
          {formik.errors.IssueQty ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.IssueQty).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Issue to (Location)</label>
          <div>
          <input type='text' id='txtIssueLoct' className='form-control'  {...getFieldProps(formik, 'IssueLoct')}></input>
          {formik.errors.IssueLoct ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.IssueLoct).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Issued to (Activity/ Particular)</label>
          <div>
          <input type='text' id='txtIssuedtoActiv' className='form-control'  {...getFieldProps(formik, 'IssuedtoActiv')}></input>
          {formik.errors.IssuedtoActiv ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.IssuedtoActiv).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>  
          <label className='col-form-label'>ISSUED TO (DEPT/ EMPLOYEE/ CLIENT/ PRW/ PLANT)</label>
          <div>
          <input type='text' id='txtIssuetoDept' className='form-control'  {...getFieldProps(formik, 'IssuetoDept')}></input>
          {formik.errors.IssuetoDept ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.IssuetoDept).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          </div>

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>FREE/ CHARGEABLE</label>
          <div>
          <input type='text' id='txtCharge' className='form-control'  {...getFieldProps(formik, 'Charge')}></input>
          {formik.errors.Charge ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Charge).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>REMARKS</label>
          <div>
          <textarea id='txtRemarks' className='form-control'  {...getFieldProps(formik, 'Remarks')}/>
          {formik.errors.Remarks ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Remarks).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          </div> 

          <div className="row my-3">
            <div className='d-flex btnall'>                
            <PrimaryButton type='submit' style={{width: '100px' , background:'#c4291c'}} className={'pr1'} text="Submit" onClick={async () => {
              formik.setFieldValue("condition", "Submitted");                                         
              await formik.validateForm().then(async (frmResult) => {                                        
                if (Object.keys(frmResult).length <= 0) {
                  await onRequestInitiate(formik.values);
                }
              });
            }} value={'Submitted'} iconProps={{ iconName: 'Submit' }} />

            <button type="button" className="btn btn-secondary exitbtn" onClick={() => history.push('/initiatorLanding')} style={{borderRadius:'2px',padding:'0px 30px !important',width: '100px'}}>Exit</button>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          </div>
          )
        }
      </Formik>  
    );
};


