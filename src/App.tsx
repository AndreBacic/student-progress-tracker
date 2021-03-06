import { useEffect, useState } from 'react';
import './App.css';
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Grid, GridColumn, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { IReport } from './IReport';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import SuccessMessage from './SuccessMessage';
import ValidatableInput from './ValidatableInput';


function App() {

  const [reports, setReports] = useState<IReport[]>([]);
  const [sort, setSort] = useState<Array<SortDescriptor>>([]);
  const [successMessage, setSuccessMessage] = useState<string>("Added successfully!");
  const [successMessageShow, setSuccessMessageShow] = useState<boolean>(false);

  useEffect(() => {
    const storedReports = localStorage.getItem('reports');
    const jsonReports: IReport[] = storedReports ? JSON.parse(storedReports) : [];
    // cleans reports from before June 9th 2022 when the grades were stored as strings
    jsonReports.forEach(report => {
      report.grade = Number(report.grade);
    });
    setReports(jsonReports);
  }, []);

  const sortChange = (event: GridSortChangeEvent) => {
    setReports(orderBy(reports, event.sort));
    setSort(event.sort);
  };

  function addReport(dataItem: { [name: string]: any }) {
    const newReport: IReport = {
      studentName: dataItem.studentName.trim(),
      course: dataItem.course.trim(),
      grade: Number(dataItem.grade)
    };
    const newReports = [...reports, newReport];
    setReports(newReports);
    localStorage.setItem('reports', JSON.stringify(newReports));

    dataItem.studentName = '';
    dataItem.course = '';
    dataItem.grade = 0;

    setSuccessMessage(`${newReport.studentName} was added successfully!`);
    setSuccessMessageShow(true);
  }


  const studentNameValidator = (value: string) => value?.trim().length > 0 ? "" : "Student name is required";
  const courseValidator = (value: string) => value?.trim().length > 0 ? "" : "Course name is required";
  const gradeValidator = (value: number) => (value >= 0 && value <= 100) ? "" : "Grade must be between 0 and 100";


  return (
    <div className="app-container" >
      <Form onSubmit={addReport}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>
                Add a new student report:
              </legend>
              <Field name={"studentName"} component={ValidatableInput} label={"Student name"} validator={studentNameValidator} />
              <Field name={"course"} component={ValidatableInput} label={"Course name"} validator={courseValidator} />
              <Field
                name={"grade"}
                type={"number"}
                component={ValidatableInput}
                label={"Grade percentage"}
                validator={gradeValidator}
              />
            </fieldset>
            <div className="k-form-buttons" style={{ marginTop: "1rem" }}>
              <button
                type={"submit"}
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                disabled={!formRenderProps.allowSubmit}
              >
                Add
              </button>
            </div>
          </FormElement>
        )}
      />
      <SuccessMessage message={successMessage} show={successMessageShow} onClose={() => setSuccessMessageShow(false)} />
      <Grid
        data={reports}
        style={{ marginTop: "2rem" }}
        sortable={{
          allowUnsort: true,
          mode: "multiple",
        }}
        sort={sort}
        onSortChange={sortChange}>
        <GridColumn field="studentName" title="Student" />
        <GridColumn field="course" title="Course" />
        <GridColumn field="grade" title="Grade" filter="numeric" />
      </Grid>
    </div>
  );
}

export default App;
