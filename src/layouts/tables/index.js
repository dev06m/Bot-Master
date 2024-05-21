/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

//import CircularProgress from '@mui/material/CircularProgress';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";

function Tables() {
  const [page_nume, setPageNum] = useState(1); 
  var { columns, rows } = authorsTableData(page_nume);
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    console.log(rows)
    if (rows.length > 0)
      setLoading(false); 
    else
      setLoading(true);
      console.log(rows)
  }, [page_nume])
  
  const fetch_byPageNum = async () => {
    await setLoading(false);
  }

  const set_loadinAndPageNum = (num) => {
    
    rows = [];
    setLoading(true);
    setPageNum(num);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Dota 2 Skins
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              </Card>
              <MDBox
                  pt={3}
                >
                <MDPagination>
                  <MDPagination item>
                    <Icon>keyboard_arrow_left</Icon>
                  </MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(1)}>1</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(2)}>2</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(3)}>3</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(4)}>4</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(5)}>5</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(6)}>6</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(7)}>7</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(8)}>8</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(9)}>9</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(10)}>10</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(11)}>11</MDPagination>
                  <MDPagination item onClick={() => set_loadinAndPageNum(12)}>12</MDPagination>
                  <MDPagination item>
                    <Icon>keyboard_arrow_right</Icon>
                  </MDPagination>
                </MDPagination>
              </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
    )
}

export default Tables;
