import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { IItProps } from "../IItProps";
import IITRequestsOps from '../../service/BAL/SPCRUD/ITMaster';
import { IITMaster } from '../../service/INTERFACE/IITMaster';
import Utilities, { IUtilities } from '../../service/BAL/SPCRUD/utilities';
import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import { IReasonMaster } from '../../service/INTERFACE/IReasonMaster';
import ReasonRequestsOps from '../../service/BAL/SPCRUD/ReasonMaster';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useParams, useHistory } from 'react-router-dom';
import { IPersonaProps } from 'office-ui-fabric-react';
import { ISPCRUDOPS } from '../../service/DAL/spcrudops';
import './NewRequest.css';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import * as yup from 'yup';
import { IMaterialCodeMaster } from '../../service/INTERFACE/IMaterialCodeMaster';
import MaterialCodeRequestsOps from '../../service/BAL/SPCRUD/MaterialCodeMaster';
//PlantCodeMaster
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster';
//CategoryMaster
import { ICategoryMaster } from '../../service/INTERFACE/ICategoryMaster';
import CategeoryRequestsOps from '../../service/BAL/SPCRUD/CategeoryMaster';
//TypeMaster
import { ITypeMaster } from '../../service/INTERFACE/ITypeMaster';
import TypeRequestsOps from '../../service/BAL/SPCRUD/TypeMaster';
//YearMaster
import { IYearMaster } from '../../service/INTERFACE/IYearMaster';
import YearRequestsOps from '../../service/BAL/SPCRUD/YearMaster';
//MonthMaster
import { IMonthMaster } from '../../service/INTERFACE/IMonthMaster';
import MonthRequestsOps from '../../service/BAL/SPCRUD/MonthMaster';
//BillingCycle Master
import { IBillCycleMaster } from '../../service/INTERFACE/IBillCycleMaster';
import BillCycleRequestsOps from '../../service/BAL/SPCRUD/BicycleMaster';
//SiteMaster
import { ISiteMaster } from '../../service/INTERFACE/ISiteMaster';
import SiteRequestsOps from '../../service/BAL/SPCRUD/SiteMaster';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';

const MRI: IDropdownOption[] = [
  { key: 'Yes', text: 'Yes' },
  { key: 'No', text: 'No' },
];
export const EditRequest: React.FunctionComponent<IItProps> = (props: IItProps) => {
  const { ArtIntId } = useParams<{ ArtIntId: string }>();
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [ReasonCollData, setreasonCollData] = useState<IReasonMaster[]>();
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [workrequestColl, setPedningdata] = useState<IITMaster[]>();
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [testBrand, setBrandText] = React.useState<string[]>([]);
  const [MaterialCollData, setMaterialCollData] = useState<IMaterialCodeMaster[]>();
  const [currentDate] = useState(getDate());
  const [CategoryMasterData, setCategoryData] = useState<ICategoryMaster[]>();
  const [TypeMasterData, setTypeData] = useState<ITypeMaster[]>();
  const [YearMasterData, setYearData] = useState<IYearMaster[]>();
  const [MonthMasterData, setMonthData] = useState<IMonthMaster[]>();
  const [BillCycleMasterData, setBicycleData] = useState<IBillCycleMaster[]>();
  const [SubCategoryMasterData, setSubCateData] = React.useState<any[]>([]);
  const [SetPlantGroup, setPlantGroup] = React.useState<any[]>([]);
  const [isBudgetedPage, setIsBudgetedPage] = useState(false);
  const [SiteMasterData, setSiteData] = useState<ISiteMaster[]>();

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

    var GroupIds = [];
    for (var i = 0; i < SetPlantGroup.length; i++) {
      let test = SetPlantGroup[i].GroupApprover;
      for (var j = 0; j < test.length; j++) {
        GroupIds.push(test[j]);
      }
    }

    let date = new Date();
    date.setDate(date.getDate() + 1);

    let onBehalf = 0;
    let onBehalfEmail = "";

    let PRRequest: any = {
      'ProjectName': formValues.ProjectName,
      'GroupApproverId': { "results": GroupIds },
      'PlantCodeId': parseInt(formValues.PlantCodeId),
      'Location': formValues.Location,
      'OTC': formValues.OTC,
      'CategoryId': parseInt(formValues.Category),
      'SubCategoryId': parseInt(formValues.SubCategory),
    };
    if (props.requestType !== 'budgeted') {
      PRRequest['YearId'] = parseInt(formValues.Year),
        PRRequest['AddTypeId'] = parseInt(formValues.Type),
        PRRequest['BillingCycleId'] = parseInt(formValues.BillingCycle),
        PRRequest['BillingMonthId'] = parseInt(formValues.BillingMonth),
        PRRequest['Recurring'] = formValues.Recurring,
        PRRequest['Budgeted'] = formValues.Budgeted,
        PRRequest['PONumber'] = formValues.PONumber,
        PRRequest['POValue'] = parseInt(formValues.POValue),
        PRRequest['Total'] = formValues.Total,
        PRRequest['Actual'] = formValues.Actual,
        PRRequest['RenewalDate'] = formValues.RenewalDate
    }
    if (props.requestType === 'budgeted') {
      PRRequest['Quantity'] = formValues.Quantity;
      PRRequest['Costperunit'] = formValues.CostPerUnit;
      PRRequest['Total2'] = formValues.TotalQty;
      PRRequest['SiteBudgeted'] = "Yes";
      PRRequest['ProcuredQty'] = formValues.ProcuredQty,
      PRRequest['BalanceQty'] = formValues.BalanceQty,
      PRRequest['TotalCost'] = formValues.TotalCost,
      PRRequest['SiteId'] = formValues.Site
    }

    console.log(formValues);
    console.log(PRRequest);

    await spCrudObj.updateData("IT", workrequestColl[0].Id, PRRequest, props).then(async (brrAppUpdateResult1) => {

      alert("IT data updated successfully")
      history.push('/InitiatorLanding');


    });

  }

  const requiredIf = (condition: boolean, message: string) =>
      condition ? yup.mixed().required(message) : yup.mixed().notRequired();

  const validate = yup.object().shape({
      PlantCodeId: yup.string().required("Plant Code is required"),
      Category: yup.string().required("Category is required"),
      SubCategory: yup.string().required("Sub Category is required"),
      OTC: yup.string().required("OTC is required"),
  
      Type: requiredIf(!isBudgetedPage, "Type is required"),
      BillingCycle: requiredIf(!isBudgetedPage, "Billing Cycle is required"),
      BillingMonth: requiredIf(!isBudgetedPage, "Billing Month is required"),
      Year: requiredIf(!isBudgetedPage, "Year is required"),
      RenewalDate: requiredIf(!isBudgetedPage, "Renewal Date is required"),
      Recurring: requiredIf(!isBudgetedPage, "Recurring is required"),
  
      Site: yup.number().when([], {
        is: () => isBudgetedPage,
        then: schema => schema.required("Site is required"),
        otherwise: schema => schema.notRequired()
      }),
  
      Total: yup.number().when([], {
        is: () => !isBudgetedPage,
        then: schema => schema.required("Total is required"),
        otherwise: schema => schema.notRequired()
      }),
  
      Actual: yup.number().when([], {
        is: () => !isBudgetedPage,
        then: schema => schema.required("Actual is required"),
        otherwise: schema => schema.notRequired()
      }),
  
      Quantity: yup.number().when([], {
        is: () => isBudgetedPage,
        then: schema => schema.required("Quantity is required"),
        otherwise: schema => schema.notRequired()
      }),
  
      CostPerUnit: yup.number().when([], {
        is: () => isBudgetedPage,
        then: schema => schema.required("Cost Per Unit is required"),
        otherwise: schema => schema.notRequired()
      }),
  
      ProcuredQty: yup.number().when([], {
        is: () => isBudgetedPage,
        then: schema => schema.required("Procured Quantity is required"),
        otherwise: schema => schema.notRequired()
      })
    });

  const initialvalues = {
    Budgeted: '',
    PlantCodeId: '',
    ProjectName: '',
    Location: '',
    Category: '',
    SubCategory: '',
    Type: '',
    BillingCycle: '',
    BillingMonth: '',
    Year: '',
    RenewalDate: '',
    OTC: '',
    Recurring: '',
    POValue: '',
    PONumber: '',
    Total: '',
    Actual: '',
    Quantity: 0,
    CostPerUnit: '',
    TotalQty: '',
    Site: '',
    ProcuredQty: '',
    BalanceQty: '',
    TotalCost: ''
  };

  function onChangeDate(e, formik) {
    let date = new Date(e.target.value);
    let todaydate = new Date();
    const startDateObj = new Date(date);
    var timeDiff = new Date(todaydate).getTime() - new Date(date).getTime();
    var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    formik.setFieldValue('NofoPendingdays', diffDays)
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${date}/${month}/${year}`;
  }

  let SelectPlantName;

  function onChangeRequestType(e, formik) {
    let selectedvalue = e.target.value;
    const workrequestColl = plantMasterCollData.filter((e) => e.Id === parseInt(selectedvalue));
    setPlantGroup(workrequestColl);
    formik.setFieldValue('ProjectName', workrequestColl[0].ProjectName)
    formik.setFieldValue('Location', workrequestColl[0].Location)
  }

  function onChangeRequestType2(e, formik) {
    let selectedvalue = e.target.options[e.target.selectedIndex].text;
    SelectPlantName = CategoryMasterData.filter((item) => item.Category === selectedvalue);
    setSubCateData(SelectPlantName);
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

  const AutoSum = ({ formik }: { formik: any }) => {
    React.useEffect(() => {
      const po = parseFloat(formik.values.POValue || '0');
      const otc = parseFloat(formik.values.OTC || '0');
      const recurring = parseFloat(formik.values.Recurring || '0');
      const total = otc + recurring;
      const Actual = total - po;
      const quantity = parseFloat(formik.values.Quantity || '0');
      const costPerUnit = parseFloat(formik.values.CostPerUnit || '0');
      const totalQtyCost = quantity * costPerUnit;
      const ProcuredQty = parseFloat(formik.values.ProcuredQty || '0');
      const BalanceQty = quantity - ProcuredQty;
      const TotalCost = totalQtyCost + otc;

      formik.setFieldValue('Total', total);
      formik.setFieldValue('Actual', Actual);
      formik.setFieldValue('TotalQty', totalQtyCost);
      formik.setFieldValue('BalanceQty', BalanceQty);
      formik.setFieldValue('TotalCost', TotalCost);
    }, [
      formik.values.POValue,
      formik.values.OTC,
      formik.values.Recurring,
      formik.values.Quantity,
      formik.values.CostPerUnit,
      formik.values.ProcuredQty
    ]);

    return null;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch IT data
        const approvemasterres = await IITRequestsOps().getITDatafilter(ArtIntId, props);
        setPedningdata(approvemasterres);

        // Fetch plant code data
        const plantColl = await PlantCodeRequestsOps().getPlantCodeData(props);
        setPlantCollData(plantColl);

        // Fetch category data
        const CategoryData = await CategeoryRequestsOps().getCategoryData(props);
        setCategoryData(CategoryData);

        // Fetch type data
        const TypeData = await TypeRequestsOps().getTypeMasterData(props);
        setTypeData(TypeData);

        // Fetch year data
        const YearData = await YearRequestsOps().getYearMasterData(props);
        setYearData(YearData);

        // Fetch month data
        const MonthData = await MonthRequestsOps().getMonthData(props);
        setMonthData(MonthData);

        // Fetch billing cycle data
        const BicycleData = await BillCycleRequestsOps().getBicycleData(props);
        setBicycleData(BicycleData);

        // Fetch site data  
        const SiteData = await SiteRequestsOps().getSiteMasterData(props);
        setSiteData(SiteData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ArtIntId, props]);

  const today = new Date().toISOString().split('T')[0];

  return (

    <Formik initialValues={initialvalues}
      validationSchema={validate}

      onSubmit={(values, helpers) => { }}>{
        formik => (
          <><AutoSum formik={formik} />
            <div>
              {
                React.useEffect(() => {
                  formik.setFieldValue('ProjectName', workrequestColl != undefined ? workrequestColl[0].ProjectName : undefined);
                  formik.setFieldValue('Location', workrequestColl != undefined ? workrequestColl[0].Location : undefined);
                  formik.setFieldValue('OTC', workrequestColl != undefined ? workrequestColl[0].OTC : undefined);
                  formik.setFieldValue('Recurring', workrequestColl != undefined ? workrequestColl[0].Recurring : undefined);
                  formik.setFieldValue('Budgeted', workrequestColl != undefined ? workrequestColl[0].Budgeted : undefined);
                  formik.setFieldValue('PONumber', workrequestColl != undefined ? workrequestColl[0].PONumber : undefined);
                  formik.setFieldValue('POValue', workrequestColl != undefined ? workrequestColl[0].POValue : undefined);
                  formik.setFieldValue('Total', workrequestColl != undefined ? workrequestColl[0].Total : undefined);
                  formik.setFieldValue('Actual', workrequestColl != undefined ? workrequestColl[0].Actual : undefined);
                  formik.setFieldValue('ProjectName', workrequestColl != undefined ? workrequestColl[0].ProjectName : undefined);

                  if (workrequestColl && workrequestColl[0]?.RenewalDate) {
                    formik.setFieldValue('RenewalDate', workrequestColl[0]?.RenewalDate.split('T')[0]);
                  }
                  if (workrequestColl && workrequestColl[0]?.PlantCode) {
                    formik.setFieldValue('PlantCodeId', workrequestColl[0]?.PlantCode);
                    onChangeRequestTypeNew(workrequestColl[0]?.PlantCode);
                  }
                  if (workrequestColl && workrequestColl[0]?.BillingCycleId) {
                    formik.setFieldValue('BillingCycle', workrequestColl[0]?.BillingCycleId);
                  }
                  if (workrequestColl && workrequestColl[0]?.BillingMonthId) {
                    formik.setFieldValue('BillingMonth', workrequestColl[0]?.BillingMonthId);
                  }
                  if (workrequestColl && workrequestColl[0]?.CategoryId) {
                    formik.setFieldValue('Category', workrequestColl[0]?.CategoryId);
                    CategeoryRequestsOps().getCategoryData(props).then((CategoryData) => {
                      SelectPlantName = CategoryData.filter((item) => item.Category === workrequestColl[0]?.Category);
                      setSubCateData(SelectPlantName);
                    });
                  }
                  if (workrequestColl && workrequestColl[0]?.SubCategoryId) {
                    formik.setFieldValue('SubCategory', workrequestColl[0]?.SubCategoryId);
                  }
                  if (workrequestColl && workrequestColl[0]?.AddTypeId) {
                    formik.setFieldValue('Type', workrequestColl[0]?.AddTypeId);
                  }
                  if (workrequestColl && workrequestColl[0]?.YearId) {
                    formik.setFieldValue('Year', workrequestColl[0]?.YearId);
                  }

                  // Set request type based on Site/Quantity presence
                  if (workrequestColl && workrequestColl[0]?.SiteBudgeted === 'Yes') {
                    props.requestType = 'budgeted';
                    setIsBudgetedPage(true);

                  formik.setFieldValue('Site', workrequestColl[0]?.SiteId);
                  formik.setFieldValue('Quantity', workrequestColl[0]?.Quantity);
                  formik.setFieldValue('CostPerUnit', workrequestColl[0]?.Costperunit);
                  formik.setFieldValue('TotalQty', workrequestColl[0]?.Total2);
                  formik.setFieldValue('TotalCost', workrequestColl != undefined ? workrequestColl[0].TotalCost : undefined);
                  formik.setFieldValue('BalanceQty', workrequestColl != undefined ? workrequestColl[0].BalanceQty : undefined);
                  formik.setFieldValue('ProcuredQty', workrequestColl != undefined ? workrequestColl[0].ProcuredQty : undefined);
                  } else {
                    props.requestType = 'new';
                    setIsBudgetedPage(false);
                  }

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
                                        {/* 1.Plant Code */}
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
                                        {/* 2.Project Name */}
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
                                        {/* 3.Location */}
                                        <div className='col-md-3'>
                                          <label className='col-form-label'>Location</label>
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
                                        {/* 4.Category */}
                                        <div className='col-md-3'>
                                          <label className='col-form-label'>Category</label>
                                          <div>
                                            <select id='ddlCategory' className='form-control' {...getFieldProps(formik, 'Category')} onChange={async (e) => {
                                              formik.setFieldValue('Category', e.target.value);
                                              await onChangeRequestType2(e, formik);
                                              formik.handleChange("Category");
                                            }}>
                                              <option value="">Select</option>
                                              {CategoryMasterData !== undefined ? Array.from(new Map(CategoryMasterData.map(item => [item.Category, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.Category}</option>)) : ''}
                                            </select>
                                            {formik.errors.Category ? (
                                              <div
                                                style={{
                                                  paddingTop: 0,
                                                  color: "#B2484D",
                                                  fontSize: ".75rem",
                                                  fontFamily: "Segoe UI"
                                                }}
                                              >
                                                {JSON.stringify(formik.errors.Category).replace(/"/g, '')}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <br></br>
                                        {/* 5.Sub Category */}
                                        <div className='col-md-3'>
                                          <label className='col-form-label'>Sub Category</label>
                                          <div>
                                            <select id='ddlSubCategory' className='form-control' {...getFieldProps(formik, 'SubCategory')}>
                                              <option value="">Select</option>
                                              {SubCategoryMasterData !== undefined ? Array.from(new Map(SubCategoryMasterData.map(item => [item.SubCategory, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.SubCategory}</option>)) : ''}
                                            </select>
                                            {formik.errors.SubCategory ? (
                                              <div
                                                style={{
                                                  paddingTop: 0,
                                                  color: "#B2484D",
                                                  fontSize: ".75rem",
                                                  fontFamily: "Segoe UI"
                                                }}
                                              >
                                                {JSON.stringify(formik.errors.SubCategory).replace(/"/g, '')}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <br></br>
                                        {/* 14.OTC */}
                                        <div className='col-md-3'>
                                          <label className='col-form-label'>OTC</label>
                                          <div>
                                            <input type='number' id='txtOTC' className='form-control'  {...getFieldProps(formik, 'OTC')}></input>
                                            {formik.errors.OTC ? (
                                              <div
                                                style={{
                                                  paddingTop: 0,
                                                  color: "#B2484D",
                                                  fontSize: ".75rem",
                                                  fontFamily: "Segoe UI"
                                                }}
                                              >
                                                {JSON.stringify(formik.errors.OTC).replace(/"/g, '')}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        {/* 6.Type */}
                                        {!isBudgetedPage && (<>
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Type</label>
                                            <div>
                                              <select id='ddlType' className='form-control' {...getFieldProps(formik, 'Type')}>
                                                <option value="">Select</option>
                                                {TypeMasterData !== undefined ? Array.from(new Map(TypeMasterData.map(item => [item.TypeName, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.TypeName}</option>)) : ''}
                                              </select>
                                              {formik.errors.Type ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Type).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 7.Billing Cycle */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Billing Cycle</label>
                                            <div>
                                              <select id='ddlBillingCycle' className='form-control' {...getFieldProps(formik, 'BillingCycle')}>
                                                <option value="">Select</option>
                                                {BillCycleMasterData !== undefined ? Array.from(new Map(BillCycleMasterData.map(item => [item.BillingCycle, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.BillingCycle}</option>)) : ''}
                                              </select>
                                              {formik.errors.BillingCycle ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.BillingCycle).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 8.Payment Month */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Payment Month</label>
                                            <div>
                                              <select id='ddlBillingMonth' className='form-control' {...getFieldProps(formik, 'BillingMonth')}>
                                                <option value="">Select</option>
                                                {MonthMasterData !== undefined ? Array.from(new Map(MonthMasterData.map(item => [item.Month, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.Month}</option>)) : ''}
                                              </select>
                                              {formik.errors.BillingMonth ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.BillingMonth).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 9.Year */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Year</label>
                                            <div>
                                              <select id='ddlYear' className='form-control' {...getFieldProps(formik, 'Year')}>
                                                <option value="">Select</option>
                                                {YearMasterData !== undefined ? Array.from(new Map(YearMasterData.map(item => [item.Year, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.Year}</option>)) : ''}
                                              </select>
                                              {formik.errors.Year ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Year).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 10.Renewal Date */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Renewal Date</label>
                                            <div>
                                              <DatePicker
                                                id="txtRenewalDate"
                                                placeholder="Enter or select a date"
                                                allowTextInput={true}
                                                firstDayOfWeek={DayOfWeek.Sunday}
                                                value={formik.values.RenewalDate ? new Date(formik.values.RenewalDate) : undefined}
                                                onSelectDate={(date) => formik.setFieldValue('RenewalDate', date?.toISOString())}
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
                                              {formik.errors.RenewalDate && (
                                                <div style={{
                                                  paddingTop: 0,
                                                  color: "#B2484D",
                                                  fontSize: ".75rem",
                                                  fontFamily: "Segoe UI"
                                                }}>
                                                  {formik.errors.RenewalDate}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 11.Budgeted */}
                                          <div className="col-md-3">
                                            <label className="col-form-label">Budgeted</label>
                                            <div>
                                              <select
                                                id="ddlBudgeted"
                                                className="form-control"
                                                {...getFieldProps(formik, 'Budgeted')}
                                              >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                              </select>
                                              {formik.errors.Budgeted ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Budgeted).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 13.PO Number */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>PO Number</label>
                                            <div>
                                              <input type='text' id='txtPONumber' className='form-control'  {...getFieldProps(formik, 'PONumber')}></input>
                                              {formik.errors.PONumber ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.PONumber).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          <br></br>
                                          {/* 15.Recurring */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Recurring</label>
                                            <div>
                                              <input type='number' id='txtRecurring' className='form-control'  {...getFieldProps(formik, 'Recurring')}></input>
                                              {formik.errors.Recurring ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Recurring).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 16.PO Value */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>PO Value</label>
                                            <div>
                                              <input type='number' id='txtPOValue' className='form-control'  {...getFieldProps(formik, 'POValue')}></input>
                                              {formik.errors.POValue ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.POValue).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 17.Total (OTC + Recurring) */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Total (OTC + Recurring)</label>
                                            <div>
                                              <input
                                                type="text"
                                                className="form-control form-bd"
                                                // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
                                                {...getFieldProps(formik, 'Total')}
                      
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                          <br></br>
                                          {/* 18.Actual (Total - PO Value) */}
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Actual (Total - PO Value)</label>
                                            <div>
                                              <input
                                                type="text"
                                                className="form-control form-bd"
                                                // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
                                                {...getFieldProps(formik, 'Actual')}
                      
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                          <br></br></>)}
                                        {/* 12.Site */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Site</label>
                                            <div>
                                              <select id='ddlSiteCycle' className='form-control' {...getFieldProps(formik, 'Site')}>
                                                <option value="">Select</option>
                                                {SiteMasterData !== undefined ? Array.from(new Map(SiteMasterData.map(item => [item.Site, item])).values()).map((Vend) => (<option key={Vend.Id} value={Vend.Id}>{Vend.Site}</option>)) : ''}
                                              </select>
                                              {formik.errors.Site ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Site).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 19.Quantity */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Quantity</label>
                                            <div>
                                              <input type='number' id='txtQuantity' className='form-control'  {...getFieldProps(formik, 'Quantity')}></input>
                                              {formik.errors.Quantity ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.Quantity).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 20.Cost per Unit */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Cost per Unit</label>
                                            <div>
                                              <input type='number' id='txtCostPerUnit' className='form-control'  {...getFieldProps(formik, 'CostPerUnit')}></input>
                                              {formik.errors.CostPerUnit ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.CostPerUnit).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 21.Total Price (Quantity * Cost per Unit) */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Total Price (Quantity * Cost per Unit)</label>
                                            <div>
                                              <input
                                                type="text"
                                                className="form-control form-bd"
                                                // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
                                                {...getFieldProps(formik, 'TotalQty')}
                      
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 23.Procured Quantity */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Procured Quantity</label>
                                            <div>
                                              <input type='number' id='txtProcuredQty' className='form-control'  {...getFieldProps(formik, 'ProcuredQty')}></input>
                                              {formik.errors.ProcuredQty ? (
                                                <div
                                                  style={{
                                                    paddingTop: 0,
                                                    color: "#B2484D",
                                                    fontSize: ".75rem",
                                                    fontFamily: "Segoe UI"
                                                  }}
                                                >
                                                  {JSON.stringify(formik.errors.ProcuredQty).replace(/"/g, '')}
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 24.Balance Qty (Total Qty - Procured Qty) */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Balance Qty (Total Qty - Procured Qty)</label>
                                            <div>
                                              <input
                                                type="text"
                                                className="form-control form-bd"
                                                // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
                                                {...getFieldProps(formik, 'BalanceQty')}
                      
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        )}
                                        <br></br>
                                        {/* 25.Total Cost (Total Price+OTC) */}
                                        {isBudgetedPage && (
                                          <div className='col-md-3'>
                                            <label className='col-form-label'>Total Cost (Total Price+OTC)</label>
                                            <div>
                                              <input
                                                type="text"
                                                className="form-control form-bd"
                                                // value={SelectPlantName !== undefined && SelectPlantName[0] !== undefined ? SelectPlantName[0].ProjectName : ''}
                                                {...getFieldProps(formik, 'TotalCost')}
                      
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>

                      <div className="row my-3">
                        <div className='d-flex btnall'>
                          <PrimaryButton type='submit' style={{ width: '100px', background: '#c4291c' }} className={'pr1'} text="Submit" onClick={async () => {
                            formik.setFieldValue("condition", "Submitted");
                            await formik.validateForm().then(async (frmResult) => {
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
              </div>
            </div>
          </>
        )
      }
    </Formik>

  );
};


