import { Component } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import '../Css/Visit.css';

 export default class Visit extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:'',
            phone_no:'',
            design_type:'',
            size:'',
            visit_date:'',
        }
    }

       handleSubmit = (event) => {
        event.preventDefault();
        const { name, phone_no, design_type, size, visit_date } = this.state;
        try{
            const response = Axios.post('http://localhost:4000/visit', {
                name,
                phone_no,
                design_type,
                size,
                visit_date,

            });
            this.setState({message: response.data.message});
        } catch(error){
            console.error("Error submitting visit data:", error);
        
            
        }
        
        toast.success(" successful!")
      }
 render(){
    return(
        <div className="main-content">
        <div className="visit">

            <h2>Visit Day</h2>
            <form  onSubmit={this.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} required/>
                </div>
                <div>
                    <label>Phone_No</label>
                    <input type="tel" value={this.state.phone_no} onChange={(e) => this.setState({phone_no: e.target.value})} required/>
                </div>
                <div>
                    <label>Design_Type</label>
                    <input type="text" value={this.state.design_type} onChange={(e) => this.setState({design_type: e.target.value})} required/>
                </div>
                <div>
                    <label>Size</label>
                    <input type="text" value={this.state.size} onChange={(e) => this.setState({size: e.target.value})} required/>
                </div>
                <div>
                    <label>Visit_Date</label>
                    <input type="date" value={this.state.visit_date} onChange={(e) => this.setState({visit_date: e.target.value})} required/>
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