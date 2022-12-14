import axios from "axios";
import React, { useState, useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import {

  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { connect } from "react-redux";
// React Notification

import { register, update } from "./../../../actions/user";
import { url as baseUrl } from "./../../../api";
import { initialfieldState_userRegistration } from "./../../../_helpers/initialFieldState_UserRegistration";
import useForm from "../Functions/UseForm";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
//import { FaArrowLeft } from "react-icons/fa";
import { TiArrowBack } from 'react-icons/ti'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import PageTitle from "./../../layouts/PageTitle";
//import Select from "react-select";
import DualListBox from "react-dual-listbox";
import _ from "lodash";

Moment.locale("en");
momentLocalizer();


const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
}));
let  arrVal = [];

const UserRegistration = (props) => {
   //
  const userDetail = props.location && props.location.state ? props.location.state.user : null;
  const rolesDef = props.location && props.location.state ? props.location.state.defRole : null;
  const classes = useStyles();
  const { values, setValues, handleInputChange, resetForm } = useForm(
    props.location && props.location.state ? props.location.state.user :  initialfieldState_userRegistration 
  );
  const [gender, setGender] = useState([]);
  const [role, setRole] = useState([]);
  const [confirm, setConfirm] = useState("");
  const [matchingPassword, setMatchingPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [matchingPasswordClass, setMatchingPasswordClass] = useState("");
  const [validPasswordClass, setValidPasswordClass] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.location.state.user.roles);
  const [setArr, setSetArr] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [allOrganisations, setAllorganisations]=useState([]);
  const [organisations,setOrganisations] = useState([]);
  const [selectedOrganisations,setSelectedOrganisations] = useState([ "CHC ZUNGERU" ]);

  const fetchOrganisation=()=>{
    axios
        .get(`${baseUrl}organisation-unit-levels/v2/4/organisation-units`)
        .then((response) => {
          setAllorganisations(response.data);
          setOrganisations(
              Object.entries(response.data).map(([key, value]) => ({
                label: value.name,
                value: value.name,
              }))
          );
          setSelectedOrganisations(
              _.uniq(_.map(userDetail.applicationUserOrganisationUnits, 'organisationUnitName'))
          )
        })
        .catch((error) => {
          console.log(error);
        });
  }
  useEffect(() => {

    async function getCharacters() {
      axios
      .get(`${baseUrl}application-codesets/v2/DESIGNATION`)
      .then((response) => {
        
        setDesignation(
          Object.entries(response.data).map(([key, value]) => ({
            label: value.display,
            value: value.display,
          }))
        );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCharacters();
    fetchOrganisation();
  }, []);

  
  /* Get list of Role parameter from the endpoint */
  useEffect(() => {
    async function getCharacters() {
      axios
        .get(`${baseUrl}account/roles`)
        .then((response) => {
          
          setRole(
            Object.entries(response.data).map(([key, value]) => ({
              label: value.name,
              value: value.name,
            }))
          );
          //console.log(props.location.state.user.roles)
          //setSelectedOption(role.filter(x => x.value in(props.location.state.user.roles)))
        //   props.location.state.user.roles.forEach(function (value, index, array) {
        //     for(var i=0; i<rolesDef.length; i++){
        //       if (rolesDef[i].label===value ){
        //         console.log(rolesDef)
        //         arrVal.push(rolesDef[i])
        //       }
                          
        //     }
            
        // });
        //setSelectedOption(arrVal)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCharacters();
  }, []);
  const onPermissionSelect = (selectedValues) => {
    setSelectedOption(selectedValues);
  };
  const onOrganisationSelect = (selectedValues) => {
    setSelectedOrganisations(selectedValues);
  };

  // check if password and confirm password match
  const handleConfirmPassword = (e, setConfirmPassword = true) => {
    if (setConfirmPassword) setConfirm(e.target.value);
    if (e.target.value === values.password || e.target.value === confirm) {
      setMatchingPassword(true);
      setMatchingPasswordClass("is-valid");
    } else {
      setMatchingPassword(false);
      setMatchingPasswordClass("is-invalid");
    }
  };

  const handlePassword = (e) => {
    handleInputChange(e);
    // validate password
    if (e.target.value.length > 5) {
      setValidPassword(true);
      setValidPasswordClass("is-valid");
    } else {
      setValidPassword(false);
      setValidPasswordClass("is-invalid");
    }
    // check if password and confirm password match
    handleConfirmPassword(e, false);
  };



/*  async function switchFacility (facility) {
    console.log(facility)
    await axios.post(`${baseUrl}users/organisationUnit/${facility}`, {})
        .then(response => {
          toast.success('Facility switched successfully!');
          //toggleAssignFacilityModal();
        }) .catch((error) => {
          toast.error('An error occurred, could not switch facility.');
        });

  }*/

  const updateUserOrganisations=()=>{
    if(selectedOrganisations.length >0){
      //First delete all current organisations
/*      var defaultFacility= _.find(allOrganisations, {name:selectedOrganisations[0]});
      switchFacility(defaultFacility.id);*/
      if(userDetail.applicationUserOrganisationUnits.length >0){
        userDetail.applicationUserOrganisationUnits.map((organisation) =>{

          var orgDetails = _.find(allOrganisations, {name:organisation.organisationUnitId});

          axios.delete(`${baseUrl}application_user_organisation_unit/${orgDetails.id}`, )
              .then(response => {
                toast.success(`successfully added`);
              }) .catch((error) => {
            toast.error(`An error occurred, adding facility`);
          });
        });


      }
      //Add Organisations
      let facilityDetails = [];
      selectedOrganisations.map((organisation) =>{
        var orgDetails = _.find(allOrganisations, {name:organisation});
        facilityDetails.push({
          "applicationUserId": userDetail.id,
          "organisationUnitId": orgDetails.id
        })

      });
      axios.post(`${baseUrl}application_user_organisation_unit`, facilityDetails)
          .then(response => {
            toast.success(`successfully added`);
          }) .catch((error) => {
        toast.error(`An error occurred, adding facility`);
      });
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserOrganisations();
    const dateOfBirth = moment(values.dateOfBirth).format("YYYY-MM-DD");
    values["dateOfBirth"] = dateOfBirth;
    //values["roles"] = [values["role"]]
    // let roleArr = []
    // const newRoleList =selectedOption.forEach(function (value, index, array) {
    //   roleArr.push(value['label'])
    // })
    values["roles"] = selectedOption
    setSaving(true);
    const onSuccess = () => {
      setSaving(false);
      toast.success("User Updated Successful");
      resetForm();
      props.history.push("/users")
    };
    const onError = () => {
      setSaving(false);
      toast.error("Something went wrong");
    };

    
    props.update(userDetail.id,values, onSuccess, onError);
  };



  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar />
        <PageTitle activeMenu={userDetail===null ? "User Registration" : "Edit User"} motherMenu="Users" />
        <Card className={classes.cardBottom}>
        <CardContent>
            <Link
                  to ={{
                    pathname: "/users",
                    state: 'users'
                  }}
            >
              <Button
                variant="contained"
                color="primary"
                className=" float-end ms-1"
                startIcon={<TiArrowBack style={{color:'#fff'}} />}
                style={{backgroundColor:'#014d88'}}
              >
                <span style={{ textTransform: "capitalize" }}>Back </span>
              </Button>
            </Link>
            <br />
          
          <br />
      <ToastContainer autoClose={3000} hideProgressBar />
      
      <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title" style={{color:'#014d88',fontWeight:'bolder'}}>{userDetail===null ? "User Information" : "Edit User Information"}</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                    <Label for="firstName" style={{color:'#014d88',fontWeight:'bolder'}}>First Name *</Label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={values.firstName}
                      onChange={handleInputChange}
                      style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                      required
                    />
                  </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                    <Label for="lastName" style={{color:'#014d88',fontWeight:'bolder'}}>Last Name * </Label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={handleInputChange}
                      value={values.lastName}
                      style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                      required
                    />
                  </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                    <Label for="userName" style={{color:'#014d88',fontWeight:'bolder'}}>Username *</Label>
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      onChange={handleInputChange}
                      value={values.userName}
                      style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                      required
                    />
                  </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                    <Label for="email" style={{color:'#014d88',fontWeight:'bolder'}}>Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      value={values.email}
                      style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                      required
                    />
                  </FormGroup>
                   
                    </div>
                    {/* <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label for="role">Role *</Label>
                      
                      <Select
                            onChange={setSelectedOption}
                            value={selectedOption}
                            options={role}
                            isMulti="true"
                            noOptionsMessage="true"
                      />
                    </FormGroup>                   
                    </div> */}
                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                      <Label for="gender" style={{color:'#014d88',fontWeight:'bolder'}}>Designation </Label>
                      <Input
                        type="select"
                        name="designation"
                        id="designation"
                        value={values.designation}
                        onChange={handleInputChange}
                        style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                        required
                      >
                       
                        {designation.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>                  
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                      <Label for="phoneNumber" style={{color:'#014d88',fontWeight:'bolder'}}>Phone Number *</Label>
                      <Input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={handleInputChange}
                        value={values.phoneNumber}
                        style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                        required
                      />
                      </FormGroup>                                     
                    </div>
                    <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                        <Label for="password" style={{color:'#014d88',fontWeight:'bolder'}}>Password *</Label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handlePassword}
                            value={values.password}
                            style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                            required
                            className={validPasswordClass}
                          />
                        <FormFeedback>
                          Password must be atleast 6 characters
                        </FormFeedback>
                        </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                      <Label for="confirm" style={{color:'#014d88',fontWeight:'bolder'}}>Confirm Password *</Label>
                      <Input
                        type="password"
                        name="confirm"
                        id="confirm"
                        onChange={handleConfirmPassword}
                        value={confirm}
                        style={{height:"40px",border:'solid 1px #014d88',borderRadius:'5px'}}
                        required
                        className={matchingPasswordClass}
                      />
                      <FormFeedback>Passwords do not match</FormFeedback>
                      </FormGroup> 
                    </div>

                  </div>



                  <div className="form-group mb-12 col-md-12">
                    <FormGroup>
                      <Label for="permissions" style={{color:'#014d88',fontWeight:'bolder'}}>Facility*</Label>
                      <DualListBox
                          //canFilter
                          options={organisations}
                          onChange={onOrganisationSelect}
                          selected={selectedOrganisations}
                      />
                    </FormGroup>
                  </div>





                  <div className="form-group mb-12 col-md-12">
                      <FormGroup>
                        <Label for="permissions" style={{color:'#014d88',fontWeight:'bolder'}}>Role*</Label>
                        <DualListBox
                          //canFilter
                          options={role}
                          onChange={onPermissionSelect}
                          selected={selectedOption}
                        />
                      </FormGroup>
                    </div>
                
                  {saving ? <Spinner /> : ""}
              <br />
              {userDetail ===null ? (

                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={saving || !(validPassword && matchingPassword)}
                  style={{backgroundColor:'#014d88',color:'#fff'}}
                >
                  {!saving ? (
                    <span style={{ textTransform: "capitalize" }}>Save</span>
                  ) : (
                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                  )}
                </MatButton>
              )
              :
              (
                <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                disabled={!(validPassword && matchingPassword)}
                style={{backgroundColor:'#014d88',color:'#fff'}}
              >
                {!saving ? (
                  <span style={{ textTransform: "capitalize" }}>Save</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Saving...</span>
                )}
              </MatButton>
              )
            }
                  {" "}<Link
                        to ={{
                          pathname: "/users",
                          state: 'users'
                        }}
                    >
                          <MatButton
                            variant="contained"
                            className={classes.button}
                            startIcon={<CancelIcon style={{color:'#fff'}} />}
                            style={{backgroundColor:'#992E62'}}
                          >
                            <span style={{ textTransform: "capitalize",color:'#fff' }}>Cancel</span>
                          </MatButton>
                </Link>

                </form>
              </div>
            </div>
            
          </div>
        </div>
        </CardContent>
        </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  //status: state.users.status,
  status: [],
});

export default connect(mapStateToProps, { register, update })(UserRegistration);
