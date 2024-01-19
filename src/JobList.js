// JobList.js
import React, { useState, useEffect } from 'react';
import './JobList.css';
import accountLogo from './images/insure.svg'

const JobList = () => {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from data.json
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setJobListings(data);
        setFilteredJobListings(data);
      });
  }, []);

  useEffect(() => {
    // Filter job listings based on the search term
    const filteredListings = jobListings.filter((job) =>
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobListings(filteredListings);
  }, [searchTerm, jobListings]);

  const clearFilter = () => {
    // Clear the filter and show all job listings
    setSearchTerm('');
  };

  return (
    <div className='job-list-container'>
        <div className='search-container'>
      <input
        type="text"
        placeholder="Search for a job..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />
      <button onClick={clearFilter} className='clear-button'>Clear Filter</button>
      </div>
      
      <div>
        
        {filteredJobListings.map((job) => (
          <div key={job.id} className='job-listing'>
            <img src={accountLogo} alt="Company Logo" />
            <div className='left-side'>
            <p>{job.company}</p>
            <h5>{job.position}</h5>
            </div>
            
            {/* <div className="job-info">
              <p>{job.role}</p>
              <p>{job.level}</p>
              <p>{job.postedAt}</p>
              <p>{job.contract}</p>
              <p>{job.location}</p>
            </div> */}
            <div className="skills">
            {job.languages.map((language, index) => (
              <p key={index}>{language}</p>
            ))}
              {/* <p>{job.languages.join(', ')}</p> */}
              {/* <p>{job.tools.join(', ')}</p> */}
              {job.tools.map((tool, index) => (
              <p key={index}>{tool}</p>
            ))}
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
