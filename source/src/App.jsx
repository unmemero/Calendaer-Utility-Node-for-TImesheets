
import React, { useState } from 'react';
import ProfilePage from './ProfilePage';
import TimesheetEditor from './TimesheetEditor';
import { Box, Tabs, Tab } from '@mui/material';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-encryption-key';

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
}
function decryptData(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const initialData = {
  profile: {
    firstName: '',
    lastName: '',
    middleInitial: '',
    employeeId: '',
    department: '',
    positionType: 'full-time',
  },
  schedule: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  },
  timesheets: [],
};

function App() {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialData);

  // Save encrypted data to localStorage
  const saveData = (newData) => {
    setData(newData);
    const encrypted = encryptData(newData);
    localStorage.setItem('timesheetData', encrypted);
  };

  // Load data from localStorage
  React.useEffect(() => {
    const encrypted = localStorage.getItem('timesheetData');
    if (encrypted) {
      try {
        setData(decryptData(encrypted));
      } catch {
        setData(initialData);
      }
    }
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Profile" />
        <Tab label="Monthly Timesheet Editor" />
      </Tabs>
      {tab === 0 && (
        <ProfilePage
          profile={data.profile}
          setProfile={(profile) => saveData({ ...data, profile })}
          schedule={data.schedule}
          setSchedule={(schedule) => saveData({ ...data, schedule })}
          timesheets={data.timesheets}
          setTimesheets={(timesheets) => saveData({ ...data, timesheets })}
        />
      )}
      {tab === 1 && (
        <TimesheetEditor
          profile={data.profile}
          schedule={data.schedule}
          timesheets={data.timesheets}
          setTimesheets={(timesheets) => saveData({ ...data, timesheets })}
        />
      )}
    </Box>
  );
}

export default App;
