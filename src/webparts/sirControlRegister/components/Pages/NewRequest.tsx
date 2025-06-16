import * as React from 'react';
import { useState } from "react";
import { Formik, FormikProps } from 'formik';
import { ISirControlRegisterProps } from "../ISirControlRegisterProps";
import { IUtilities } from '../../service/BAL/SPCRUD/utilities';
//Plant Code Master
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster';
//Material Code Master
import { IMaterialCodeMaster } from '../../service/INTERFACE/IMaterialCodeMaster';
import MaterialCodeRequestsOps from '../../service/BAL/SPCRUD/MaterialCodeMaster';
//
import { IFreeChargeble } from '../../service/INTERFACE/IFreeChargeble';
import FreeChargebleOps from '../../service/BAL/SPCRUD/FreeChargeble';
//
import { IDeptEmpCltPRWPlt } from '../../service/INTERFACE/IDeptEmpCltPRWPlt';
import DeptEmpCltPRWPltOps from '../../service/BAL/SPCRUD/DeptEmpCltPRWPlt';
//
import { IActivityParticular } from '../../service/INTERFACE/IActivityParticular';
import ActivityParticularOps from '../../service/BAL/SPCRUD/ActivityParticular';

import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import { IReasonMaster } from '../../service/INTERFACE/IReasonMaster';
import { IPersonaProps } from 'office-ui-fabric-react';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';

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
export const NewRequest: React.FunctionComponent<ISirControlRegisterProps> = (props: ISirControlRegisterProps) => {
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [MaterialCollData, setMaterialCollData] = useState<IMaterialCodeMaster[]>();
  const [ChargeCollData, setChargeCollData] = useState<IFreeChargeble[]>();
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);
  const [DeptEmpCltPRWPltData, setDeptEmpCltPRWPltData] = useState<IDeptEmpCltPRWPlt[]>();
  const [ActivityParticulars, setActivityParticulars] = useState<IActivityParticular[]>();
  const [ReasonCollData, setreasonCollData] = useState<IReasonMaster[]>();
  const [testProduct, setProductText] = React.useState<string[]>([]);

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
      'GroupApproverId': { "results": GroupIds }
    };

    console.log(formValues);
    console.log(PRRequest);
    //return false;

    await spCrudObj.insertData("SIRControl", PRRequest, props).then(async (brrInsertResult) => {
      alert("SIR Control details submitted successfully");
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
    UOM: '',
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
    const fetchData = async () => {
      try {
        const plantColl = await PlantCodeRequestsOps().getPlantCodeData(props);
        setPlantCollData(plantColl);

        const materialCodeData = await MaterialCodeRequestsOps().getMaterialCodeData(props);
        setMaterialCollData(materialCodeData);

        const chargeData = await FreeChargebleOps().getFreeChargeble?.(props);
        setChargeCollData(chargeData);

        const DeptEmpCltPRWPlt = await DeptEmpCltPRWPltOps().getDeptEmpCltPRWPlt?.(props);
        setDeptEmpCltPRWPltData(DeptEmpCltPRWPlt);

        const ActivityParticular = await ActivityParticularOps().getActivityParticular?.(props);
        setActivityParticulars(ActivityParticular);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
                  <h4>SIR Control Register Form</h4>
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
                      await onChangeRequestType(e, formik);
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
                    <textarea id='txtMaterialDesc' className='form-control'  {...getFieldProps(formik, 'MaterialDesc')} />
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
                    <select id='txtIssuedtoActiv' className='form-control' {...getFieldProps(formik, 'IssuedtoActiv')} onChange={async (e) => {
                      // changed3 = e.target.value;>
                      formik.setFieldValue('IssuedtoActiv', e.target.value);                      
                      formik.handleChange("IssuedtoActiv");
                    }}>
                      <option value="">Select</option>
                      {ActivityParticulars !== undefined ? ActivityParticulars.map((Vend) => <option key={Vend.ActivityParticular} value={Vend.ActivityParticular}>{Vend.ActivityParticular}</option>) : ''}

                    </select>
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
                    <select id='txtIssuetoDept' className='form-control' {...getFieldProps(formik, 'IssuetoDept')} onChange={async (e) => {
                      // changed3 = e.target.value;>
                      formik.setFieldValue('IssuetoDept', e.target.value);                      
                      formik.handleChange("IssuetoDept");
                    }}>
                      <option value="">Select</option>
                      {DeptEmpCltPRWPltData !== undefined ? DeptEmpCltPRWPltData.map((Vend) => <option key={Vend.Options} value={Vend.Options}>{Vend.Options}</option>) : ''}

                    </select>
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
                    <select id='txtCharge' className='form-control' {...getFieldProps(formik, 'Charge')} onChange={async (e) => {
                      // changed3 = e.target.value;>
                      formik.setFieldValue('Charge', e.target.value);                      
                      formik.handleChange("Charge");
                    }}>
                      <option value="">Select</option>
                      {ChargeCollData !== undefined ? ChargeCollData.map((Vend) => <option key={Vend.Options} value={Vend.Options}>{Vend.Options}</option>) : ''}

                    </select>
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
                <br></br>
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


