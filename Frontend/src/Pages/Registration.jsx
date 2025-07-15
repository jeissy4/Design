import React, {Component}  from "react";
import{ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import '../Css/Registration.css'; 



export default class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone_no:'',
            name:'',
        }
    }
  handleSubmit = async (event) => {
  event.preventDefault();

  const { phone_no, name } = this.state;

  try {
    const response = await Axios.post('http://localhost:4000/registration', {
      phone_no,
      name,
    });

    toast.success(response.data.message);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.warning(error.response.data.message);
    } else {
      toast.error("use a unique phone no .");
      console.error("Error submitting registration data:", error);
    }
  }
};


    render(){
        return(
            <div className = "main-content">
            <div className="registration">
                <h2>Registration</h2>
                <form   onSubmit={this.handleSubmit}>
                    <div>
                        <label>Phone_No</label>
                        <input type="tel" value={this.state.phone_no} onChange={(e) => this.setState({phone_no: e.target.value})} required/>
                    </div>

                    <div>
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} required/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>

                </form>
                <ToastContainer/>
            </div>
            </div>
        )
    }
}