import * as React from 'react';
import { useState } from "react";
import { Formik, FormikProps } from 'formik';
import { IWslProps } from "../IWslProps";
import { IUtilities } from '../../service/BAL/SPCRUD/utilities';
//PlantCode Master
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster';
//ProjectCode Master
import { IProjectCodeMaster } from '../../service/INTERFACE/IProjectCodeMaster';
import ProjectCodeRequestsOps from '../../service/BAL/SPCRUD/ProjectCodeMaster';
//Item Master
import { IItemMaster } from '../../service/INTERFACE/IItemMaster';
import ItemRequestsOps from '../../service/BAL/SPCRUD/ItemMaster';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';

import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import {IPersonaProps } from 'office-ui-fabric-react';
import { ISPCRUDOPS } from '../../service/DAL/spcrudops';
import './NewRequest.css'; 
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {IDropdownOption } from '@fluentui/react/lib/Dropdown';
import {PrimaryButton } from '@fluentui/react/lib/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const MRI: IDropdownOption[] = [
  { key: 'Yes', text: 'Yes' },
  { key: 'No', text: 'No' },
];
export const NewRequest: React.FunctionComponent<IWslProps> = (props: IWslProps) => {
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [ProjectCodeData,setProjectCodeData] = useState<IProjectCodeMaster[]>();
  const [ItemData,setItemData] = useState<IItemMaster[]>();
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);  
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [currentDate] = useState(getDate());
  let spCrudObj: ISPCRUD;
  let ProductText: any;
  let newColors = [];
  let changed2: any;
  let changed1: any;
  let BrandText: any;
  let changed3:any;


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
    // // Format the date as YYYY-MM-DD
    // let futureDate = date.toISOString().split('T')[0];
    // console.log(futureDate);
    // if(formValues.ReportDate >= futureDate){
    //   alert ("Future date not allowed in the Report Date field")
    //   return false
    // }
    // if(formValues.RecordDate >= futureDate){
    //   alert ("Future date not allowed in the Received Date field")
    //   return false
    // }
    // if(formValues.InvoiceDate >= futureDate){
    //   alert ("Future date not allowed in the Invoice Date field")
    //   return false
    // }

    let PRRequest: any = {                   
      // 'Title':formValues.;          
      'ProjectCodeId':parseInt(formValues.ProjectCodeId),          
      'PlantCodeId':parseInt(formValues.PlantCodeId),
      'ItemCodeId':parseInt(formValues.ItemCodeId),
      'ProjectName':formValues.ProjectName,
      'Location':formValues.Location,                    
      'ItemDescription':formValues.ItemDescription,
      'UOM':formValues.UOM,
      'OnHandQty':formValues.HandQty,
      'ExpiryDate':formValues.ExpiryDate,
      'Value':formValues.Value,
      'ReasonforNonUtilization':formValues.Utilization,
      'Lifeleftindays':parseInt(formValues.Lifeleft),
      'Remarks':formValues.Remarks,
      'GroupApproverId':{ "results": GroupIds}
    };

    console.log(formValues);
    console.log(PRRequest);
    //return false;

    await spCrudObj.insertData("ShelfLife", PRRequest, props).then(async (brrInsertResult) => {
      alert("WSL details submitted successfully");
      history.push('/InitiatorLanding');
    });

  }


  const validate = yup.object().shape({          
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
              ProjectCodeId: yup.string().test(
                "ProjectCodeId",
                "Project Code is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              ItemCodeId: yup.string().test(
                "ItemCodeId",
                "Item Code is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              ItemDescription: yup.string().test(
                "ItemDescription",
                "Item Description is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              UOM: yup.string().test(
                "UOM",
                "UOM is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              HandQty: yup.string().test(
                "HandQty",
                "On-Hand Qty is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              ExpiryDate: yup.string().test(
                "ExpiryDate",
                "Expiry Date is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              Value: yup.string().test(
                "Value",
                "Value is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              Utilization: yup.string().test(
                "Utilization",
                "Reason for Non-Utilization is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              }),
              Lifeleft: yup.string().test(
                "Lifeleft",
                "Life left in days is required",
                (custCode) => {
                  if (custCode) {
                    return true;
                  } else {
                    return false;
                  }
              })
              // ,
              // Remarks: yup.string().test(
              //   "Remarks",
              //   "Remarks is required",
              //   (custCode) => {
              //     if (custCode) {
              //       return true;
              //     } else {
              //       return false;
              //     }
              // })
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



  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }
  let SelectPlantName;

  function onChangeRequestType(e,formik) {

    // checkval = e.target.value;
    let selectedvalue = e.target.value;
    SelectPlantName = plantMasterCollData.filter((e) => e.Id === parseInt(selectedvalue));
    setPlantGroup(SelectPlantName);
    formik.setFieldValue('ProjectName', SelectPlantName[0].ProjectName);
    formik.setFieldValue('Location', SelectPlantName[0].Location);
    formik.setFieldValue('PlantCodeId', SelectPlantName[0].Id);
  }

  function onChangeDate(e, formik) {
    let date = new Date(e.target.value);
    let todaydate = new Date();
    const startDateObj = new Date(date);

    var timeDiff = new Date(todaydate).getTime() - new Date(date).getTime();
    //var diffDays = timeDiff / (1000 * 3600 * 24);
    var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    formik.setFieldValue('NofoPendingdays', diffDays)


  }

  React.useEffect(() => {
    // let Currentloggedinuser = props.currentSPContext.pageContext.legacyPageContext.userEmail;
    PlantCodeRequestsOps().getPlantCodeData(props).then((plantColl) => {
      setPlantCollData(plantColl);
      ProjectCodeRequestsOps().getProjectCodeData(props).then((ProjectCode) => {
        setProjectCodeData(ProjectCode);
        ItemRequestsOps().getItemData(props).then((ItemRequests) => {
          setItemData(ItemRequests);
      }, error => {
        console.log(error);
      })
    },error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })

  }, []);
  const today = new Date().toISOString().split('T')[0];
  return (
    <Formik initialValues={initialvalues}
      validationSchema={validate}
      onSubmit={(values, helpers) => { }}
    >
      {(formik: any) => (
        <div className='con-box'>
          <div className="new-request-container">
            <div className='row'>
              <div className='col-md-12' style={{padding:'0 8px'}}>
                <div className="text-center heading">
                  <h4>New Request Form</h4>
                </div>
              </div>
            </div>
            <div className='p-3 bg-white shadow-sm border'>

          <div className='form-group row'>
          
          <div className='col-md-3'>
          <label className='col-form-label'>Project Code</label>
          <div>

          <select id='ddlProjectCode' className='form-control' {...getFieldProps(formik, 'ProjectCodeId')} onChange={async (e) => {          
          formik.setFieldValue('ProjectCodeId', e.target.value);          
          formik.handleChange("ProjectCodeId");
          }}>
          <option value="">Select</option>
          {ProjectCodeData !== undefined ? ProjectCodeData.map((Vend) => <option key={Vend.Id} value={Vend.Id}>{Vend.ProjectCode}</option>) : ''}

          </select>
          {formik.errors.ProjectCodeId ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.ProjectCodeId).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
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
          <label className='col-form-label'>Item Code</label>
          <div>

          <select id='ddlPlantCode' className='form-control' {...getFieldProps(formik, 'ItemCodeId')} onChange={async (e) => {          
          formik.setFieldValue('ItemCodeId', e.target.value);          
          formik.handleChange("ItemCodeId");
          }}>
          <option value="">Select</option>
          {ItemData !== undefined ? ItemData.map((Vend) => <option key={Vend.Id} value={Vend.Id}>{Vend.Item}</option>) : ''}

          </select>
          {formik.errors.ItemCodeId ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.ItemCodeId).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Item Description</label>
          <div>
          <textarea id='txtItemDescription' className='form-control'  {...getFieldProps(formik, 'ItemDescription')}/>
          {formik.errors.ItemDescription ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.ItemDescription).replace(/"/g, '')}
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
          <div className='col-md-3'>
          <label className='col-form-label'>On-Hand Qty</label>
          <div>
          <input type='text' id='txtHandQty' className='form-control'  {...getFieldProps(formik, 'HandQty')}></input>
          {formik.errors.HandQty ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.HandQty).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>                    
          </div>

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>Value</label>
          <div>
          <input type='text' id='txtValue' className='form-control'  {...getFieldProps(formik, 'Value')}></input>
          {formik.errors.Value ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Value).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Reason for Non-Utilization</label>
          <div>
          <input type='text' id='txtUtilization' className='form-control'  {...getFieldProps(formik, 'Utilization')}></input>
          {formik.errors.Utilization ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Utilization).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Expiry Date</label>
          <div>
          <DatePicker
          id="txtExpiryDate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.ExpiryDate ? new Date(formik.values.ExpiryDate) : undefined}
          onSelectDate={(date) => {
            if (date) {
              const today = new Date();
              const selectedDate = new Date(date);
              
              // Clear time part for accurate day difference
              today.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);
          
              const timeDiff = selectedDate.getTime() - today.getTime();
              const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          
              formik.setFieldValue('ExpiryDate', date.toISOString());
              formik.setFieldValue('Lifeleft', daysLeft >= 0 ? daysLeft : 0); // Optional: Avoid negative days
            } else {
              formik.setFieldValue('ExpiryDate', '');
              formik.setFieldValue('Lifeleft', '');
            }
          }}          
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
          {formik.errors.ExpiryDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.ExpiryDate}
          </div>
          )}
          </div>
          </div>
          <br></br>
          <div className='col-md-3'>
          <label className='col-form-label'>Life left in days</label>
          <div>
          <input type='text' id='txtLifeleft' className='form-control'  {...getFieldProps(formik, 'Lifeleft')} readOnly></input>
          {formik.errors.Lifeleft ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Lifeleft).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          </div>

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>Remarks</label>
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

            <PrimaryButton type='submit' style={{ width: '100px', background:'#c4291c' }} className={'pr1'} text="Submit" onClick={async () => {
              formik.setFieldValue("condition", "Submitted");
              formik.values.condition = "Submitted";
              //formik.values.isDraft = false;
              await formik.validateForm().then(async (frmResult) => {
                //formik.isValid && 
                if (Object.keys(frmResult).length <= 0) {
                  await onRequestInitiate(formik.values);
                }
              });
            }} value={'Submitted'} iconProps={{ iconName: 'Submit' }} />

            <button type="button" className="btn btn-secondary exitbtn" onClick={() => history.push('/initiatorLanding')} style={{ borderRadius: '2px', padding: '0px 30px !important', width: '100px' }}>Exit</button>
          </div>
          </div>

          </div>
          </div>            
          </div>

      )}
    </Formik>
  );
};

function getPeoplePickerItems(items: any, arg1: any) {
  throw new Error('Function not implemented.');
}


