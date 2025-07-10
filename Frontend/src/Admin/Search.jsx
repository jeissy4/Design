import React, { useState } from 'react';
import Axios from 'axios';
import '../Css/Search.css'; 

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reportData, setReportData] = useState(null); // State to hold report data

    const handleSearch = async () => {
        if (!query.trim()) return; 
        setLoading(true);
        setError('');

        try {
            const res = await Axios.get('http://localhost:4000/api/search', {
                params: { query } 
            });
            setResults(res.data); 
        } catch (err) {
            setError('Search failed: ' + err.message); 
        } finally {
            setLoading(false);
        }
    };

    const generateReport = async (customer) => {
        try {
            const res = await Axios.get(`http://localhost:4000/api/report`, {
                params: { phone_no: customer.phone_no }
            });
            console.log('Generating report for:', customer);
            console.log('Report Data:', res.data);
            setReportData(res.data); // Set the report data to state
        } catch (error) {
            console.error('Error generating report:', error);
            alert('Failed to generate report.');
        }
    };

    return (
        <div className='main-content'>
        <div className='search'>
            <h2>Search Customers</h2>
            <input
                type="text"
                placeholder="Enter name or phone number"
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {results.map((customer) => (
                    <li key={customer.phone_no}>
                        <strong>{customer.name}</strong> - {customer.phone_no}
                        <button onClick={() => generateReport(customer)}>Generate Report</button>
                    </li>
                ))}
            </ul>

            
           {reportData && (
  <div className="report">
    <h3>Report for {reportData.registration[0]?.name}</h3>

    <h4>Registration Data:</h4>
    <ul>
      {reportData.registration.map((item, index) => (
        <li key={index}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </li>
      ))}
    </ul>

    <h4>Visit Data:</h4>
    <ul>
      {reportData.visits.map((item, index) => (
        <li key={index}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </li>
      ))}
    </ul>

    <h4>Finance Data:</h4>
    <ul>
      {reportData.finance.map((item, index) => (
        <li key={index}>
          {Object.entries(item).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </li>
      ))}
    </ul>
  </div>
)}

            
        </div>
        </div>
    );
}
