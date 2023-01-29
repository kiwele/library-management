import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUser } from "../../redux/userSlice";
import { Button } from "@mui/material";
import axios from "axios";

// const onButtonClick = (e, row) => {
//   e.stopPropagation();
//   console.log(row.id);
//   //do whatever you want with the row
// };

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },

//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
//   {
//     field: "actions",
//     headerName: "Actions",
//     width: 100,
//     renderCell: (params) => {
//       return (
//         <Button
//           onClick={(e) => onButtonClick(e, params.row)}
//           variant="contained"
//         >
//           Delete
//         </Button>
//       );
//     },
//   },
// ];

export default function UserDataTable() {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  const onButtonClick = (e, row) => {
    e.stopPropagation();

        dispatch(deleteUser(row.id));
    //do whatever you want with the row
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
  
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];




  let rows = users.map((x) => {
    return { id: x.userId, lastName: x.last_name, firstName: x.first_name };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
