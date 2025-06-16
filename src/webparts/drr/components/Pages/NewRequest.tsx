import * as React from 'react';
import { useState } from "react";
import { Formik, FormikProps } from 'formik';
import { IDrrProps } from "../IDrrProps";
import { IUtilities } from '../../service/BAL/SPCRUD/utilities';

import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import { IPersonaProps } from 'office-ui-fabric-react';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';
//Plantcode
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster';
//Projectcode
import { IProjectCodeMaster } from '../../service/INTERFACE/IProjectCodeMaster';
import ProjectCodeRequestsOps from '../../service/BAL/SPCRUD/ProjectCodeMaster';

import { ISPCRUDOPS } from '../../service/DAL/spcrudops';
import './NewRequest.css';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const MRI: IDropdownOption[] = [
  { key: 'Yes', text: 'Yes' },
  { key: 'No', text: 'No' },
];
export const NewRequest: React.FunctionComponent<IDrrProps> = (props: IDrrProps) => {
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [ProjectCodeData,setProjectCodeData] = useState<IProjectCodeMaster[]>();
  const [testBrand, setBrandText] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<IPersonaProps[]>();

  const [currentDate] = useState(getDate());
  let spCrudObj: ISPCRUD;
  let ProductText: any;
  let newColors = [];
  let changed2: any;
  let changed1: any;
  let BrandText: any;
  let changed3: any;


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
    for (var i = 0; i < SetPlantGroup.length; i++) {
      let test = SetPlantGroup[i].GroupApprover;
      for (var j = 0; j < test.length; j++) {
        GroupIds.push(test[j]);
      }
    }
    // Format the date as YYYY-MM-DD
    let futureDate = date.toISOString().split('T')[0];
    console.log(futureDate);
    if (formValues.SIRDate >= futureDate) {
      alert("Future date not allowed in the Report Date field")
      return false
    }

    let PRRequest: any = {
      'ProjectCodeId':  formValues.ProjectCodeId,
      'PlantCodeId': formValues.PlantCodeId,
      'ProjectName': formValues.ProjectName,
      'Location': formValues.Location,
      'Receipt': formValues.Receipt,
      'ReceiptLocalfromAuthorisedPump': formValues.ReceiptLocal,
      'IssueOwnconsumption': formValues.Issue,
      'IssueChargeable': formValues.IssueChargeable,
      'Closing': formValues.Closing,
      'Opening': formValues.Opening,
      'Remarks': formValues.Remarks,  
      'GroupApproverId': { "results": GroupIds }
    };

    console.log(formValues);    
    //return false;

    await spCrudObj.insertData("WeeklyDiesel", PRRequest, props).then(async (brrInsertResult) => {
      alert("Weekly Diesel details submitted successfully");
      history.push('/InitiatorLanding');
    });

  }


  const validate = yup.object().shape({
    ProjectCodeId: yup.string().required("Project Code is required"),
    PlantCodeId: yup.string().required("Plant Code is required"), 
    ProjectName: yup.string().required("Project Name is required"),
    Location: yup.string().required("Location is required"),
    Receipt: yup.number().required("Receipt is required"),
    ReceiptLocal: yup.number().required("Receipt Local is required"),
    Issue: yup.number().required("Issue is required"), 
    IssueChargeable: yup.number().required("Issue Chargeable is required"),
    Closing: yup.number().required("Closing is required"),
    Opening: yup.number().required("Opening is required")    
  });

  const initialvalues = {
    ProjectCodeId: '',
    PlantCodeId: '',
    ProjectName: '',
    Location: '',
    Receipt: '',
    ReceiptLocal: '',
    Issue: '',
    IssueChargeable: '',
    Closing: '',
    Opening: '',
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

  function onChangeRequestType(e, formik) {

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
    const fetchPlantCodeData = async () => {
      try {
        const plantColl = await PlantCodeRequestsOps().getPlantCodeData(props);
        setPlantCollData(plantColl);
        const ProjectCode = await ProjectCodeRequestsOps().getProjectCodeData(props);
        setProjectCodeData(ProjectCode);
      } catch (error) {
        console.error('Error fetching plant code data:', error);
      }
    };

    fetchPlantCodeData();
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
              <div className='col-md-12' style={{ padding: '0 8px' }}>
                <div className="text-center heading">
                  <h4>DRR Form</h4>
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
                    await onChangeRequestType(e, formik);
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
                <label className='col-form-label'>Receipt (Direct from IOCL/ BPCL/ HPCL Depot)</label>
                <div>
                  <input type='number' id='txtReceipt' className='form-control' {...getFieldProps(formik, 'Receipt')}></input>
                  {formik.errors.Receipt ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D", 
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.Receipt).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='col-md-3'>
                <label className='col-form-label'>Receipt (Local from Authorised Pump)</label>
                <div>
                  <input type='number' id='txtReceiptLocal' className='form-control'  {...getFieldProps(formik, 'ReceiptLocal')}></input>
                  {formik.errors.ReceiptLocal ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D",
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.ReceiptLocal).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='col-md-3'>
                <label className='col-form-label'>Issue (Own consumption)</label>
                <div>
                  <input type='number' id='txtIssue' className='form-control' {...getFieldProps(formik, 'Issue')}></input>
                  {formik.errors.Issue ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D",
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.Issue).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='col-md-3'>
                <label className='col-form-label'>Issue (Chargeable)</label>
                <div>
                  <input type='number' id='txtIssueChargeable' className='form-control' {...getFieldProps(formik, 'IssueChargeable')}></input>
                  {formik.errors.IssueChargeable ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D",
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.IssueChargeable).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>
                          
            </div>

            <div className='form-group row'>
              <div className='col-md-3'>
                <label className='col-form-label'>Closing</label>
                <div>
                  <input type='number' id='txtClosing' className='form-control' {...getFieldProps(formik, 'Closing')}></input>
                  {formik.errors.Closing ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D", 
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.Closing).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>
              
              <div className='col-md-3'>
                <label className='col-form-label'>Opening</label>
                <div>
                  <input type='number' id='txtOpening' className='form-control' {...getFieldProps(formik, 'Opening')}></input>
                  {formik.errors.Opening ? (
                    <div
                      style={{
                        paddingTop: 0,
                        color: "#B2484D",
                        fontSize: ".75rem",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      {JSON.stringify(formik.errors.Opening).replace(/"/g, '')}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className='col-md-3'>
                <label className='col-form-label'>REMARKS</label>
                <div>
                  <textarea id='txtRemarks' className='form-control'  {...getFieldProps(formik, 'Remarks')} />
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
            </div>

            <div className="row my-3">
              <div className='d-flex btnall'>

                <PrimaryButton type='submit' style={{ width: '100px', background: '#c4291c' }} className={'pr1'} text="Submit" onClick={async () => {
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


