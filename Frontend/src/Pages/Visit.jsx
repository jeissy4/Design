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
            design_image:null,
            previewUrl:null
        }
    }

handleSubmit = async (event) => {
  event.preventDefault();

  const { name, phone_no, design_type, size, visit_date, design_image } = this.state;
  const formData = new FormData();

  formData.append("name", name);
  formData.append("phone_no", phone_no);
  formData.append("design_type", design_type);
  formData.append("size", size);
  formData.append("visit_date", visit_date);
  formData.append("design_image", design_image);

  try {
    const response = await Axios.post('http://localhost:4000/visit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    toast.success(response.data.message);
  } catch (error) {
    toast.error("Error submitting visit details.");
    console.error("Visit submission failed:", error);
  }
};

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
           <label>Design Image</label>
  <input
    type="file" accept="image/*"  onChange={(e) => { const file = e.target.files[0]; this.setState({ design_image: file, previewUrl: file ? URL.createObjectURL(file) : null, }); }} required />
</div>

{/* Show uploaded image preview from browser or backend */}
       {this.state.previewUrl && (
       <div className="preview-container">
        <p>Sketch Preview:</p>
         <img src={this.state.previewUrl} alt="Preview" width="200" style={{ marginTop: "10px", border: "1px solid #ccc", borderRadius: "5px" }}  />
        </div>
)}

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