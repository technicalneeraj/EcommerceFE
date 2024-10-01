import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utility/Api';
import { useNavigate } from 'react-router-dom';

const UserData = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest('GET', '/userdata',{
            withCredentials: true, // Important to include credentials (cookies)
          });
        console.log(response.data.message);
        setData(response.data.message); // Assuming you want to store this in state
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      {data ? (
        <div>{data}</div> // Render your data here
      ) : (
        <div>Loading...</div> // Loading state
      )}
    </div>
  );
};

export default UserData;
