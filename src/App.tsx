import { useEffect, useState } from 'react';
import './App.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Grid, GridColumn, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { IReport } from './IReport';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';

// TODO: Change favicon to something other than the default React logo
function App() {

  const [reports, setReports] = useState<IReport[]>([]);
  const [sort, setSort] = useState<Array<SortDescriptor>>([
    { field: "ProductName", dir: "desc" },
  ]);

  useEffect(() => {
    const storedReports = localStorage.getItem('reports');
    setReports(storedReports ? JSON.parse(storedReports) : []);
  }, []);

  const sortChange = (event: GridSortChangeEvent) => {
    setReports(orderBy(reports, event.sort));
    setSort(event.sort);
  };

  function addReport(dataItem: { [name: string]: any }) {
    const newReport: IReport = {
      studentName: dataItem.studentName,
      course: dataItem.course,
      grade: dataItem.grade
    };
    const newReports = [...reports, newReport];
    setReports(newReports);
    localStorage.setItem('reports', JSON.stringify(newReports));

    dataItem.studentName = '';
    dataItem.course = '';
    dataItem.grade = '';
  }

  return (
    <div className="app-container" >
      <Form onSubmit={addReport}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement>
            <fieldset className={"k-form-fieldset"}>
              <legend className={"k-form-legend"}>
                Add a new student report:
              </legend>
              <Field name={"studentName"} component={Input} label={"Student name"} />
              <Field name={"course"} component={Input} label={"Course name"} />
              <Field
                name={"grade"}
                type={"number"}
                component={Input}
                label={"Grade percentage (0-100)"}
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
      <Grid
        data={reports}
        style={{ marginTop: "2rem" }}
        sortable={{
          allowUnsort: true,
          mode: "single",
        }}
        sort={sort}
        onSortChange={sortChange}>
        <GridColumn field="studentName" title="Student" />
        <GridColumn field="course" title="Course" />
        <GridColumn field="grade" title="Grade" />
      </Grid>
    </div>
  );
}

export default App;
