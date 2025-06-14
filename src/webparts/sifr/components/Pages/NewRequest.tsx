import * as React from 'react';
import { useState } from "react";
import { Formik, FormikProps } from 'formik';
import { ISifrProps } from "../ISifrProps";
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
export const NewRequest: React.FunctionComponent<ISifrProps> = (props: ISifrProps) => {
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [ProjectCodeData, setProjectCodeData] = useState<IProjectCodeMaster[]>();
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
      'ProjectCodeId': formValues.ProjectCodeId,
      'PlantCodeId': formValues.PlantCodeId,
      'ProjectName': formValues.ProjectName,
      'Location': formValues.Location,
      'Remarks': formValues.Remarks,
      'GroupApproverId': { "results": GroupIds },
      //new columns 
      'CLOSEDSTORAGEStatus': formValues.ClosedStorageStatus,
      'LUBESSTORAGEStatus': formValues.LubesStorageStatus,
      'GASESSTORAGEOPENSHEDStatus': formValues.GasesStorageStatus,
      'WEIGHTBRIDGEStatus': formValues.WeightBridgeStatus,
      'STEELYARDStatus': formValues.SteelYardStatus,
      'ScrapSoldOutQtyuptopreviousMonth': formValues.ScrapSoldOutQtyStatus, //Scrap Sold Out Qty upto previous Month since inception Status
      'ScrapSoldOutQtyuptopreviousMonth0': formValues.ScrapSoldOutQty, //Scrap Sold Out Qty upto previous Month since inception
      'ScrapSoldOutValueINRexclTaxuptop': formValues.ScrapSoldOutValueStatus, //Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception Status
      'ScrapSoldOutValueINRexclTaxuptop0': formValues.ScrapSoldOutValue, //Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception
      'CurrentMonthScrapSoldValueINRexc': formValues.CurrentMonthScrapSoldValueStatus, //Current Month Scrap Sold Value (INR excl. Tax) Status
      'CurrentMonthScrapSoldValueINRexc0': formValues.CurrentMonthScrapSoldValue, //Current Month Scrap Sold Value (INR excl. Tax)
      'CurrentMonthOpeningQtyStatus': formValues.CurrentMonthOpeningQtyStatus,
      'CurrentMonthRecdQtyStatus': formValues.CurrentMonthRecdQtyStatus,
      'CurrentMonthSoldQtyStatus': formValues.CurrentMonthSoldQtyStatus,      
      'CLOSEDSTORAGE': formValues.ClosedStorage,
      'LUBESSTORAGE': formValues.LubesStorage,
      'GASESSTORAGEOPENSHED': formValues.GasesStorage,
      'WEIGHTBRIDGE': formValues.WeightBridge,
      'STEELYARD': formValues.SteelYard,            
      'CurrentMonthOpeningQty': formValues.CurrentMonthOpeningQty,
      'CurrentMonthRecdQty': formValues.CurrentMonthRecdQty,
      'CurrentMonthSoldQty': formValues.CurrentMonthSoldQty     
    };

    console.log(formValues);
    //return false;

    await spCrudObj.insertData("StoresInfra", PRRequest, props).then(async (brrInsertResult) => {
      alert("Stores Infrastructure details submitted successfully");
      history.push('/InitiatorLanding');
    });

  }


  const validate = yup.object().shape({
    ProjectCodeId: yup.string().required("Project Code is required"),
    PlantCodeId: yup.string().required("Plant Code is required"), 
    ProjectName: yup.string().required("Project Name is required"),
    Location: yup.string().required("Location is required"),
    ClosedStorageStatus: yup.string().required("Closed Storage Status is required"),
    ClosedStorage: yup.string().required("Closed Storage is required"),
    LubesStorage: yup.string().required("Lubes Storage is required"),
    LubesStorageStatus: yup.string().required("Lubes Storage Status is required"),
    GasesStorage: yup.string().required("Gases Storage is required"),
    GasesStorageStatus: yup.string().required("Gases Storage Status is required"),
    WeightBridge: yup.string().required("Weight Bridge is required"),    
    WeightBridgeStatus: yup.string().required("Weight Bridge Status is required"),
    SteelYardStatus: yup.string().required("Steel Yard Status is required"),            
    SteelYard: yup.string().required("Steel Yard is required"),
    ScrapSoldOutQty: yup.string().required("Scrap Sold Out Qty is required"),
    ScrapSoldOutQtyStatus: yup.string().required("Scrap Sold Out Qty Status is required"),
    ScrapSoldOutValue: yup.string().required("Scrap Sold Out Value is required"),
    ScrapSoldOutValueStatus: yup.string().required("Scrap Sold Out Value Status is required"),
    CurrentMonthOpeningQty: yup.string().required("Current Month Opening Qty is required"),
    CurrentMonthRecdQty: yup.string().required("Current Month Recd Qty is required"),
    CurrentMonthSoldQty: yup.string().required("Current Month Sold Qty is required"),
    CurrentMonthScrapSoldValue: yup.string().required("Current Month Scrap Sold Value is required"),    
    CurrentMonthOpeningQtyStatus: yup.string().required("Current Month Opening Qty Status is required"),
    CurrentMonthRecdQtyStatus: yup.string().required("Current Month Recd Qty Status is required"),
    CurrentMonthSoldQtyStatus: yup.string().required("Current Month Sold Qty Status is required"),
    CurrentMonthScrapSoldValueStatus: yup.string().required("Current Month Scrap Sold Value Status is required"),        
  });

  const initialvalues = {
    ProjectCodeId: '',
    PlantCodeId: '',
    ProjectName: '',
    Location: '',
    Remarks: '',
    ClosedStorageStatus: '',
    LubesStorageStatus: '',
    GasesStorageStatus: '',
    WeightBridgeStatus: '',
    SteelYardStatus: '',
    ClosedStorage: '',
    LubesStorage: '',
    GasesStorage: '',
    WeightBridge: '',
    SteelYard: '',
    ScrapSoldOutQty: '',
    ScrapSoldOutValue: '',
    CurrentMonthOpeningQty: '',
    CurrentMonthOpeningQtyStatus: '',
    CurrentMonthRecdQty: '',
    CurrentMonthRecdQtyStatus: '',
    CurrentMonthSoldQty: '',
    CurrentMonthSoldQtyStatus: '',
    CurrentMonthScrapSoldValue: '',
    CurrentMonthScrapSoldValueStatus: '',
    MonthSinceInception: '',
    MonthSinceInceptionStatus: '',
    MonthSinceInceptionValue: '',
    MonthSinceInceptionValueStatus: '',
    ScrapSoldOutQtyStatus: '',
    ScrapSoldOutValueStatus: ''
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
                  <label className='col-form-label'>CLOSED STORAGE</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ClosedStorage')} />
                    {formik.errors.ClosedStorage ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ClosedStorage).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>CLOSED STORAGE Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'ClosedStorageStatus')}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.ClosedStorageStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ClosedStorageStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>LUBES STORAGE</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'LubesStorage')} />
                    {formik.errors.LubesStorage ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.LubesStorage).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>LUBES STORAGE Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'LubesStorageStatus')}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.LubesStorageStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.LubesStorageStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>GASES STORAGE (OPEN SHED)</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'GasesStorage')} />
                    {formik.errors.GasesStorage ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.GasesStorage).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>GASES STORAGE (OPEN SHED) Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'GasesStorageStatus')}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.GasesStorageStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.GasesStorageStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>WEIGHT BRIDGE</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'WeightBridge')} />
                    {formik.errors.WeightBridge ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.WeightBridge).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>WEIGHT BRIDGE Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'WeightBridgeStatus')}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.WeightBridgeStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.WeightBridgeStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>

                <div className='col-md-3'>
                  <label className='col-form-label'>STEEL YARD</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'SteelYard')} />
                    {formik.errors.SteelYard ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.SteelYard).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>STEEL YARD Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'SteelYardStatus')}>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.SteelYardStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.SteelYardStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Qty upto previous Month since inception</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ScrapSoldOutQty')} />
                    {formik.errors.ScrapSoldOutQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldOutQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Qty upto previous Month since inception Status</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ScrapSoldOutQtyStatus')} />
                    {formik.errors.ScrapSoldOutQtyStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldOutQtyStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ScrapSoldOutValue')} />
                    {formik.errors.ScrapSoldOutValue ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldOutValue).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception Status</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ScrapSoldOutValueStatus')} />
                    {formik.errors.ScrapSoldOutValueStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldOutValueStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Opening Qty</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'CurrentMonthOpeningQty')} />
                    {formik.errors.CurrentMonthOpeningQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthOpeningQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Opening Qty Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'CurrentMonthOpeningQtyStatus')}>
                      <option value="">Select Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.CurrentMonthOpeningQtyStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthOpeningQtyStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Recd. Qty</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'CurrentMonthRecdQty')} />
                    {formik.errors.CurrentMonthRecdQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthRecdQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Recd. Qty Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'CurrentMonthRecdQtyStatus')}>
                      <option value="">Select Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.CurrentMonthRecdQtyStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthRecdQtyStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Sold Qty</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'CurrentMonthSoldQty')} />
                    {formik.errors.CurrentMonthSoldQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthSoldQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Sold Qty Status</label>
                  <div>
                    <select className='form-control' {...getFieldProps(formik, 'CurrentMonthSoldQtyStatus')}>
                      <option value="">Select Status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.errors.CurrentMonthSoldQtyStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthSoldQtyStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Scrap Sold Value (INR excl. Tax)</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'CurrentMonthScrapSoldValue')} />
                    {formik.errors.CurrentMonthScrapSoldValue ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthScrapSoldValue).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Scrap Sold Value (INR excl. Tax) Status</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'CurrentMonthScrapSoldValueStatus')} />
                    {formik.errors.CurrentMonthScrapSoldValueStatus ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthScrapSoldValueStatus).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Remarks</label>
                  <div>
                    <textarea className='form-control' {...getFieldProps(formik, 'Remarks')} />
                    {formik.errors.Remarks ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
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


