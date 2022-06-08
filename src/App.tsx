import { useEffect, useRef, useState } from 'react';
import './App.css';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { IReport, IStudent } from './interfaces';

// TODO: Change favicon to something other than the default React logo
function App() {

  const [student, setStudent] = useState<IStudent>();

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    setStudent(storedStudent ? JSON.parse(storedStudent) : null);
  }, []);

  // TODO: Add form to add a new report
  return (
    <div className="App" >
      <Grid data={student?.reports} >
        <GridColumn field="course" title="Course" />
        <GridColumn field="grade" title="Grade" />
      </Grid>
    </div>
  );
}

export default App;
