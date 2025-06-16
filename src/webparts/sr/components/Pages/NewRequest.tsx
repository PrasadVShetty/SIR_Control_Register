import * as React from 'react';
import { useState } from "react";
import { Formik, FormikProps } from 'formik';
import { ISrProps } from "../ISrProps";
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
//ItemMaster
import { IItemMaster } from '../../service/INTERFACE/IItemMaster';
import ItemMasterRequestsOps from '../../service/BAL/SPCRUD/ItemMaster';

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
export const NewRequest: React.FunctionComponent<ISrProps> = (props: ISrProps) => {
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [ProjectCodeData, setProjectCodeData] = useState<IProjectCodeMaster[]>();
  const [testBrand, setBrandText] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [ItemMasterData, setItemMasterData] = useState<IItemMaster[]>();

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
    
    let PRRequest: any = {
      'ProjectCodeId': formValues.ProjectCodeId,
      'PlantCodeId': formValues.PlantCodeId,
      'ProjectName': formValues.ProjectName,
      'Location': formValues.Location,      
      'Remarks': formValues.Remarks,      
      'TypeofItemId': formValues.TypeOfItem,
      'ItemDescription': formValues.ItemDescription,
      'UOM': formValues.UOM,
      'NewConsumedQtyuptopreviousMonths': formValues.ConsumedQtyPrevMonth,
      'RecdQtyUpTopreviousMonthsinceinc': formValues.RecdQtyPrevMonth,
      'ScrapSoldOutQtyuptopreviousMonth': formValues.ScrapSoldQtyPrevMonth,
      'ScrapSoldOutValue': formValues.ScrapSoldValuePrevMonth,
      'CurrentMonthOpeningQty': formValues.CurrentMonthOpeningQty,
      'CurrentMonthRecdQty': formValues.CurrentMonthRecdQty,
      'CurrentMonthSoldQty': formValues.CurrentMonthSoldQty,
      'CurrentMonthScrapSoldValueINRexc': formValues.CurrentMonthScrapSoldValue,
      'TotalRecdQty': formValues.TotalRecdQty,
      'TotalSold': formValues.TotalSold,
      'ScrapAvailable': formValues.ScrapAvailable,
      'TotalSoldOutValueINRexclTax': formValues.TotalSoldOutValue,      
      'GroupApproverId': { "results": GroupIds }
    };

    console.log(formValues);
    //return false;

    await spCrudObj.insertData("ScrapReport", PRRequest, props).then(async (brrInsertResult) => {
      alert("Scrap Report details submitted successfully");
      history.push('/InitiatorLanding');
    });

  }


  const validate = yup.object().shape({
    ProjectCodeId: yup.string().required("Project Code is required"),
    PlantCodeId: yup.string().required("Plant Code is required"),
    ProjectName: yup.string().required("Project Name is required"),
    Location: yup.string().required("Location is required"),
    TypeOfItem: yup.string().required("Type of Item is required"),
    ItemDescription: yup.string().required("Item Description is required"),
    UOM: yup.string().required("UOM is required"),
    ConsumedQtyPrevMonth: yup.number().required("Consumed Qty Prev Month is required"),
    RecdQtyPrevMonth: yup.number().required("Recd Qty Prev Month is required"),
    ScrapSoldQtyPrevMonth: yup.number().required("Scrap Sold Qty Prev Month is required"),  
    ScrapSoldValuePrevMonth: yup.number().required("Scrap Sold Value Prev Month is required"),
    CurrentMonthOpeningQty: yup.number().required("Current Month Opening Qty is required"),
    CurrentMonthRecdQty: yup.number().required("Current Month Recd Qty is required"),
    CurrentMonthSoldQty: yup.number().required("Current Month Sold Qty is required"),
    CurrentMonthScrapSoldValue: yup.number().required("Current Month Scrap Sold Value is required"),
    TotalRecdQty: yup.number().required("Total Recd Qty is required"),
    TotalSold: yup.number().required("Total Sold is required"),
    ScrapAvailable: yup.number().required("Scrap Available is required"),
    TotalSoldOutValue: yup.number().required("Total Sold Out Value is required")    
  });

  const initialvalues = {
    ProjectCodeId: '',
    PlantCodeId: '',
    ProjectName: '',
    Location: '',
    ConsumedQtyPrevMonth:'',
    RecdQtyPrevMonth: '',
    ScrapSoldQtyPrevMonth: '',
    ScrapSoldValuePrevMonth: '',
    CurrentMonthOpeningQty: '',
    CurrentMonthRecdQty: '',
    CurrentMonthSoldQty: '',
    CurrentMonthScrapSoldValue: '',
    TotalRecdQty: '',
    TotalSold: '',
    ScrapAvailable: '',
    TotalSoldOutValue: '',
    TypeOfItem: '',
    ItemDescription: '',
    UOM: '',    
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
        const ItemMasterData = await ItemMasterRequestsOps().getItemMasterData(props);
        setItemMasterData(ItemMasterData);
      } catch (error) {
        console.error('Error fetching plant code data:', error);
      }
    };

    fetchPlantCodeData();
  }, []);

  const AutoSum = ({ formik }: { formik: any }) => {
    React.useEffect(() => {
      //Calculate ConsumedQtyPrevMonth
      const RecdQtyPrevMonth = parseFloat(formik.values.RecdQtyPrevMonth || '0');
      const ConsumedQtyPrevMonth = RecdQtyPrevMonth/0.0003;

      //Total Recd. Qty.
      const CurrentMonthRecdQty = parseFloat(formik.values.CurrentMonthRecdQty || '0');
      const CurrentMonthOpeningQty = parseFloat(formik.values.CurrentMonthOpeningQty || '0');        
      const TotalRecdQty = CurrentMonthRecdQty + CurrentMonthOpeningQty + RecdQtyPrevMonth;

      //Total Sold
      const CurrentMonthSoldQty = parseFloat(formik.values.CurrentMonthSoldQty || '0');
      const ScrapSoldQtyPrevMonth = parseFloat(formik.values.ScrapSoldQtyPrevMonth || '0');
      const TotalSold = CurrentMonthSoldQty + ScrapSoldQtyPrevMonth ;

      //Scrap Available
      const ScrapAvailable = TotalRecdQty - TotalSold; 

      //Total Sold Out Value
      const ScrapSoldValuePrevMonth = parseFloat(formik.values.ScrapSoldValuePrevMonth || '0');
      const CurrentMonthScrapSoldValue = parseFloat(formik.values.CurrentMonthScrapSoldValue || '0');
      const TotalSoldOutValue = ScrapSoldValuePrevMonth + CurrentMonthScrapSoldValue;
      
      formik.setFieldValue('ConsumedQtyPrevMonth', ConsumedQtyPrevMonth);
      formik.setFieldValue('TotalRecdQty', TotalRecdQty);
      formik.setFieldValue('TotalSold', TotalSold);
      formik.setFieldValue('ScrapAvailable', ScrapAvailable);
      formik.setFieldValue('TotalSoldOutValue', TotalSoldOutValue);
      
    }, [
      formik.values.RecdQtyPrevMonth,
      formik.values.CurrentMonthRecdQty,
      formik.values.CurrentMonthOpeningQty,
      formik.values.CurrentMonthSoldQty,
      formik.values.ScrapSoldQtyPrevMonth,
      formik.values.ScrapSoldValuePrevMonth,
      formik.values.CurrentMonthScrapSoldValue  
    ]);

    return null;
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <Formik initialValues={initialvalues}
      validationSchema={validate}
      onSubmit={(values, helpers) => { }}
    >
      {(formik: any) => (
        <><AutoSum formik={formik} />
        <div className='con-box'>
          <div className="new-request-container">
            <div className='row'>
              <div className='col-md-12' style={{ padding: '0 8px' }}>
                <div className="text-center heading">
                  <h4>SR Form</h4>
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
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ProjectCodeId).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Plant Code</label>
                  <div>
                    <select id='ddlPlantCode' className='form-control' {...getFieldProps(formik, 'PlantCodeId')} onChange={async (e) => {
                      formik.setFieldValue('PlantCodeId', e.target.value);
                      await onChangeRequestType(e, formik);
                      formik.handleChange("PlantCodeId");
                    }}>
                      <option value="">Select</option>
                      {plantMasterCollData !== undefined ? plantMasterCollData.map((Vend) => <option key={Vend.Id} value={Vend.Id}>{Vend.PlantCode}</option>) : ''}
                    </select>
                    {formik.errors.PlantCodeId ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.PlantCodeId).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Project Name</label>
                  <div>
                    <input type="text" className="form-control form-bd" {...getFieldProps(formik, 'ProjectName')} readOnly />
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Location </label>
                  <div>
                    <input type="text" className="form-control form-bd" {...getFieldProps(formik, 'Location')} readOnly />
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Type of Item</label>
                  <div>
                    <select id='ddlTypeOfItem' className='form-control' {...getFieldProps(formik, 'TypeOfItem')} onChange={async (e) => {
                      formik.setFieldValue('TypeOfItem', e.target.value);
                      formik.handleChange("TypeOfItem");
                    }}>
                      <option value="">Select</option>
                      {ItemMasterData !== undefined ? ItemMasterData.map((item) => <option key={item.Id} value={item.Id}>{item.Item}</option>) : ''}
                    </select>
                    {formik.errors.TypeOfItem ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.TypeOfItem).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Item Description</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'ItemDescription')}></input>
                    {formik.errors.ItemDescription ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ItemDescription).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>UOM</label>
                  <div>
                    <input type='text' className='form-control' {...getFieldProps(formik, 'UOM')}></input>
                    {formik.errors.UOM ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.UOM).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>New Consumed Qty upto previous Month since inception</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'ConsumedQtyPrevMonth')} readOnly></input>
                    {formik.errors.ConsumedQtyPrevMonth ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ConsumedQtyPrevMonth).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Recd. Qty. Up To previous Month since inception</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'RecdQtyPrevMonth')}></input>
                    {formik.errors.RecdQtyPrevMonth ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.RecdQtyPrevMonth).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Qty upto previous Month since inception</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'ScrapSoldQtyPrevMonth')}></input>
                    {formik.errors.ScrapSoldQtyPrevMonth ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldQtyPrevMonth).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Sold Out Value (INR excl. Tax) upto previous Month since inception</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'ScrapSoldValuePrevMonth')}></input>
                    {formik.errors.ScrapSoldValuePrevMonth ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapSoldValuePrevMonth).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Opening Qty.</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'CurrentMonthOpeningQty')}></input>
                    {formik.errors.CurrentMonthOpeningQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthOpeningQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Recd. Qty.</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'CurrentMonthRecdQty')}></input>
                    {formik.errors.CurrentMonthRecdQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthRecdQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Sold Qty.</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'CurrentMonthSoldQty')}></input>
                    {formik.errors.CurrentMonthSoldQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthSoldQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Current Month Scrap Sold Value (INR excl. Tax)</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'CurrentMonthScrapSoldValue')}></input>
                    {formik.errors.CurrentMonthScrapSoldValue ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.CurrentMonthScrapSoldValue).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Total Recd. Qty.</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'TotalRecdQty')} readOnly></input>
                    {formik.errors.TotalRecdQty ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.TotalRecdQty).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-md-3'>
                  <label className='col-form-label'>Total Sold</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'TotalSold')} readOnly></input>
                    {formik.errors.TotalSold ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.TotalSold).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Scrap Available</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'ScrapAvailable')} readOnly></input>
                    {formik.errors.ScrapAvailable ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.ScrapAvailable).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Total Sold Out Value (INR excl. Tax)</label>
                  <div>
                    <input type='number' className='form-control' {...getFieldProps(formik, 'TotalSoldOutValue')} readOnly></input>
                    {formik.errors.TotalSoldOutValue ? (
                      <div style={{ paddingTop: 0, color: "#B2484D", fontSize: ".75rem", fontFamily: "Segoe UI" }}>
                        {JSON.stringify(formik.errors.TotalSoldOutValue).replace(/"/g, '')}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='col-md-3'>
                  <label className='col-form-label'>Remarks</label>
                  <div>
                    <textarea className='form-control' rows={4} {...getFieldProps(formik, 'Remarks')}></textarea>
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
        </>
      )}
    </Formik>
  );
};

function getPeoplePickerItems(items: any, arg1: any) {
  throw new Error('Function not implemented.');
}


