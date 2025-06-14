import * as React from 'react';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { IPrmrrProps } from "../IPrmrrProps";
import IPRMRequestsOps from '../../service/BAL/SPCRUD/IPRMMaster';
import { IPRMMaster } from '../../service/INTERFACE/IPRMMaster';
import Utilities, { IUtilities } from '../../service/BAL/SPCRUD/utilities';
import { IPlantCodeMaster } from '../../service/INTERFACE/IPlantCodeMaster';
import PlantCodeRequestsOps from '../../service/BAL/SPCRUD/PlantCodeMaster'
import USESPCRUD, { ISPCRUD } from '../../service/BAL/SPCRUD/spcrud';
import {useParams, useHistory } from 'react-router-dom';
import {IPersonaProps } from 'office-ui-fabric-react';
import { ISPCRUDOPS } from '../../service/DAL/spcrudops';
import './NewRequest.css'; 
import {IDropdownOption } from '@fluentui/react/lib/Dropdown';
import {PrimaryButton } from '@fluentui/react/lib/Button';
import * as yup from 'yup';
//Date
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { DayOfWeek } from '@fluentui/react';

const MRI: IDropdownOption[] = [
    { key: 'Yes', text: 'Yes' },
    { key: 'No', text: 'No' },
  ];
export const EditRequest: React.FunctionComponent<IPrmrrProps> = (props: IPrmrrProps) => {
  const { ArtIntId } = useParams<{ ArtIntId: string }>();
  const history = useHistory();
  const [spCrud, setSPCRUD] = React.useState<ISPCRUDOPS>();
  const [utility, setUtility] = React.useState<IUtilities>();
  const [plantMasterCollData, setPlantCollData] = useState<IPlantCodeMaster[]>();
  const [testProduct, setProductText] = React.useState<string[]>([]);
  const [workrequestColl, setPedningdata] = useState<IPRMMaster[]>();
  const [user, setUser] = React.useState<IPersonaProps[]>();
  const [testBrand, setBrandText] = React.useState<string[]>([]);
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
          'MIRNo': formValues.MIRNo,
          'PlantCodeId': formValues.PlantCodeId,
          'ProjectName': formValues.ProjectName,
          'MIRDate': formValues.MIRDate,
          'GRNNumber': formValues.GRNNo,
          'GRNDate': formValues.GRNDate,
          'SupplierName': formValues.SupplierName,
          'InvoiceNo': formValues.InvoiceNo,
          'InvoiceDate': formValues.InvoiceDate,
          'ItemDescription': formValues.Itemdesc,
          'UOM': formValues.UOM,
          'AsperInvoiceChallan': formValues.InvoiceChallan,
          'Accepted': formValues.Accepted,
          'Rejected': formValues.Rejected,
          'DateofCommunicationtoBuyerVendor': formValues.ComDate,
          'Remarks': formValues.Remarks,
          'Location': formValues.Location,
          'GroupApproverId': { "results": GroupIds }
        };
        
        console.log(formValues);
        console.log(PRRequest);
          
        await spCrudObj.updateData("PendingRejectedMaterial", workrequestColl[0].Id, PRRequest, props).then(async (brrAppUpdateResult1) => {

        alert ("Pending Rejected Material data updated successfully");
        history.push('/InitiatorLanding');

            
     });

    }
       
    const validate = yup.object().shape({
      MIRDate: yup.string().required("MIR Date is required"),
      PlantCodeId: yup.string().required("Plant Code is required"),
      Location: yup.string().required("Location is required"),
      MIRNo: yup.string().required("MIR No is required"),
      GRNNo: yup.string().required("GRN No is required"),
      GRNDate: yup.string().required("GRN Date is required"),
      SupplierName: yup.string().required("Supplier Name is required"), 
      InvoiceNo: yup.string().required("Invoice No is required"),
      InvoiceDate: yup.string().required("Invoice Date is required"),
      Itemdesc: yup.string().required("Item Description is required"),
      UOM: yup.string().required("UOM is required"),
      InvoiceChallan: yup.string().required("Invoice Challan is required"),
      Accepted: yup.string().required("Accepted is required"),
      Rejected: yup.string().required("Rejected is required"),    
      ComDate: yup.string().required("Com Date is required")
    });

    const initialvalues = {      
      MIRDate: '',
      PlantCodeId: '',
      Location: '',
      MIRNo: '',
      GRNNo: '',
      GRNDate: '',
      SupplierName: '',
      InvoiceNo: '',
      InvoiceDate: '',
      Itemdesc: '',
      UOM: '',    
      InvoiceChallan: '',
      Accepted: '',
      Rejected: '',
      ComDate: '',
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
      IPRMRequestsOps().getPrmrrDatafilter(ArtIntId, props).then(approvemasterres => {
        setPedningdata(approvemasterres)
        PlantCodeRequestsOps().getPlantCodeData(props).then((plantColl) => {
            setPlantCollData(plantColl);                            
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
                  if (workrequestColl && workrequestColl[0]?.PlantCodeId) {
                    formik.setFieldValue('PlantCodeId', workrequestColl[0]?.PlantCodeId);
                    onChangeRequestTypeNew(workrequestColl[0]?.PlantCodeId);
                  }                  
                  formik.setFieldValue('MIRDate', workrequestColl != undefined ? workrequestColl[0].MIRDate : undefined);                  
                  formik.setFieldValue('ProjectName', workrequestColl != undefined ? workrequestColl[0].ProjectName : undefined);
                  formik.setFieldValue('Location', workrequestColl != undefined ? workrequestColl[0].Location : undefined);
                  formik.setFieldValue('MIRNo', workrequestColl != undefined ? workrequestColl[0].MIRNo : undefined);
                  formik.setFieldValue('GRNNo', workrequestColl != undefined ? workrequestColl[0].GRNNumber : undefined);
                  formik.setFieldValue('GRNDate', workrequestColl != undefined ? workrequestColl[0].GRNDate : undefined);
                  formik.setFieldValue('SupplierName', workrequestColl != undefined ? workrequestColl[0].SupplierName : undefined);
                  formik.setFieldValue('InvoiceNo', workrequestColl != undefined ? workrequestColl[0].InvoiceNo : undefined);
                  formik.setFieldValue('InvoiceDate', workrequestColl != undefined ? workrequestColl[0].InvoiceDate : undefined);
                  formik.setFieldValue('Itemdesc', workrequestColl != undefined ? workrequestColl[0].ItemDescription : undefined);
                  formik.setFieldValue('UOM', workrequestColl != undefined ? workrequestColl[0].UOM : undefined);
                  formik.setFieldValue('InvoiceChallan', workrequestColl != undefined ? workrequestColl[0].AsperInvoiceChallan : undefined);
                  formik.setFieldValue('Accepted', workrequestColl != undefined ? workrequestColl[0].Accepted : undefined);
                  formik.setFieldValue('Rejected', workrequestColl != undefined ? workrequestColl[0].Rejected : undefined);
                  formik.setFieldValue('ComDate', workrequestColl != undefined ? workrequestColl[0].DateofCommunicationtoBuyerVendor : undefined);
                  formik.setFieldValue('Remarks', workrequestColl != undefined ? workrequestColl[0].Remarks : undefined);
                                      
                  
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
          <label className='col-form-label'>MIR Date</label>
          <div>
          <DatePicker
          id="txtMIRDate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.MIRDate ? new Date(formik.values.MIRDate) : undefined}
          onSelectDate={(date) => formik.setFieldValue('MIRDate', date?.toISOString())}
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
          {formik.errors.MIRDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.MIRDate}
          </div>
          )}
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
          <label className='col-form-label'>MIR No.</label>
          <div>
          <input type='text' id='txtMIRNo' className='form-control'  {...getFieldProps(formik, 'MIRNo')}></input>
          {formik.errors.MIRNo ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.MIRNo).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          
          <div className='col-md-3'>
          <label className='col-form-label'>GRN Number</label>
          <div>
          <input type='text' id='txtGRNNo' className='form-control'  {...getFieldProps(formik, 'GRNNo')}></input>
          {formik.errors.GRNNo ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.GRNNo).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>GRN Date</label>
          <div>
          <DatePicker
          id="txtGRNDate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.GRNDate ? new Date(formik.values.GRNDate) : undefined}
          onSelectDate={(date) => formik.setFieldValue('GRNDate', date?.toISOString())}
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
          {formik.errors.GRNDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.GRNDate}
          </div>
          )}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>Supplier Name</label>
          <div>
          <input type='text' id='txtSupplierName' className='form-control'  {...getFieldProps(formik, 'SupplierName')}></input>
          {formik.errors.SupplierName ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.SupplierName).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>

          </div> 

          <div className='form-group row'>
          <div className='col-md-3'>
          <label className='col-form-label'>Invoice No</label>
          <div>
          <input type='text' id='txtInvoiceNo' className='form-control'  {...getFieldProps(formik, 'InvoiceNo')}></input>
          {formik.errors.InvoiceNo ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.InvoiceNo).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>
          
          <div className='col-md-3'>
          <label className='col-form-label'>Invoice Date</label>
          <div>
          <DatePicker
          id="txtInvoiceDate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.InvoiceDate ? new Date(formik.values.InvoiceDate) : undefined}
          onSelectDate={(date) => formik.setFieldValue('InvoiceDate', date?.toISOString())}
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
          {formik.errors.InvoiceDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.InvoiceDate}
          </div>
          )}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>Item Description</label>
          <div>
          <textarea id='txtItemdesc' className='form-control'  {...getFieldProps(formik, 'Itemdesc')}/>
          {formik.errors.Itemdesc ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Itemdesc).replace(/"/g, '')}
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
          <label className='col-form-label'>As per Invoice/Challan</label>
          <div>
          <input type='text' id='txtInvoiceChallan' className='form-control'  {...getFieldProps(formik, 'InvoiceChallan')}></input>
          {formik.errors.InvoiceChallan ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.InvoiceChallan).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>Accepted</label>
          <div>
          <input type='text' id='txtAccepted' className='form-control'  {...getFieldProps(formik, 'Accepted')}></input>
          {formik.errors.Accepted ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Accepted).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>Rejected</label>
          <div>
          <input type='text' id='txtRejected' className='form-control'  {...getFieldProps(formik, 'Rejected')}></input>
          {formik.errors.Rejected ? (
          <div
          style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}
          >
          {JSON.stringify(formik.errors.Rejected).replace(/"/g, '')}
          </div>
          ) : null}
          </div>
          </div>
          <br></br>

          <div className='col-md-3'>
          <label className='col-form-label'>Date of Communication to Buyer/ Vendor</label>
          <div>
          <DatePicker
          id="txtComDate"
          placeholder="Enter or select a date"
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          value={formik.values.ComDate ? new Date(formik.values.ComDate) : undefined}
          onSelectDate={(date) => formik.setFieldValue('ComDate', date?.toISOString())}
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
          {formik.errors.ComDate && (
          <div style={{
          paddingTop: 0,
          color: "#B2484D",
          fontSize: ".75rem",
          fontFamily: "Segoe UI"
          }}>
          {formik.errors.ComDate}
          </div>
          )}
          </div>
          </div>
          <br></br>   

          </div>

          <div className='form-group row'>
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


