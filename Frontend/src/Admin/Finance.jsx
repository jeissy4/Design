import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { Link } from 'react-router-dom';
import '../Css/Finance.css';

export default class Finance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone_no: '',
      total: '',
      amount_paid: '',
      payment_date: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, phone_no, total, amount_paid, payment_date } = this.state;

    try {
      const response = await Axios.post('http://localhost:4000/finance', {
        name,
        phone_no,
        total,
        amount_paid,
        payment_date,
      });

      

      toast.success(response.data.message || "Finance data submitted successfully!");
    } catch (error) {
      console.error("Error submitting finance data:", error);
      toast.error("Failed to submit finance data. Please try again.");
    }
  };

  render() {
    return (
        <div className="main-content">
      <div className="finance">
        <h2>Finance</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Phone_No</label>
            <input
              type="tel"
              value={this.state.phone_no}
              onChange={(e) => this.setState({ phone_no: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Total</label>
            <input
              type="number"
              value={this.state.total}
              onChange={(e) => this.setState({ total: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Amount_paid</label>
            <input
              type="number"
              value={this.state.amount_paid}
              onChange={(e) => this.setState({ amount_paid: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Payment_date</label>
            <input
              type="date"
              value={this.state.payment_date}
              onChange={(e) => this.setState({ payment_date: e.target.value })}
              required
            />
          </div>
          <div>
            <button type="submit">Submit</button>
            <Link to="/registration">Registration</Link>
            <Link to="/visit">Visit</Link>
          </div>
        </form>
        <ToastContainer />
      </div>
      </div>
    );
  }
}
