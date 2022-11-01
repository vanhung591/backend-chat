import * as React from 'react';
import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import AppLayout from "../conponents/containers/AppLayout";
import Head from "next/head";
import DeleteIcon from "@mui/icons-material/Delete"
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditStopReasons,
  GridRowModel,
  GridRowParams,
  GridToolbar
} from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import moment from "moment";
import {DATE_FORMAT} from "../src/config/app.constant";
import {deleteRoleById, getListOfRole, updateRoleById} from "services/app/roles.app";
import {RoleDataModel} from "../src/models/RolesDTO";
import RoleFormBuilderDialog from "conponents/containers/roles/RoleFormBuilderDialog";

export default function RolesPage() {

  return (
    <React.Fragment>
      <Head>
        <title>Roles Page</title>
        <meta name="description" content="Trang quản lý quyền"/>
        <link rel="icon"
              href="https://www.creativefabrica.com/wp-content/uploads/2019/04/Chat-icon-by-ahlangraphic-39.jpg"/>
      </Head>
      <AppLayout>
        <Typography variant={"h2"}>Roles Management</Typography>

        <Box sx={{pt: 2}}>
          <RolesDataGridTableContainer/>
        </Box>
      </AppLayout>
    </React.Fragment>
  );
}


const RolesDataGridTableContainer = () => {
  const [dataTable, setDataTable] = useState([])

  const loadDataList = () => {
    getListOfRole().then(res => {
      console.table(res.data.data)
      setDataTable(res.data.data)
    })
  }

  const onDeleteRole = React.useCallback((record: any) => {
    deleteRoleById(`${record?.id}`).then(res => {
      if (res.status !== 200) return;
      loadDataList()
    })
  }, [])

  useEffect(() => {
    loadDataList()
  }, [])

  const columns = [
    {
      "field": "id",
      "hide": true
    },
    {
      "field": "name",
      "headerName": "Role name",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 220,
      "editable": true
    },
    {
      "field": "description",
      "headerName": "Role Description",
      "sortable": true,
      "filterable": true,
      "disableExport": false,
      "width": 220,
      "editable": true
    },
    {
      "field": "created_at",
      "headerName": "Created At",
      "width": 220,
      valueGetter: (record: any) => {
        return moment.unix(record?.value?._seconds).format(DATE_FORMAT.FULL);
      }
    },
    // refs: column definition: https://mui.com/x/react-data-grid/column-definition/#column-types
    {
      field: 'actions',
      "headerName": "Actions",
      type: 'actions',
      width: 200,
      getActions: (param: GridRowParams) => [
        //@ts-ignore
        <GridActionsCellItem key={"delete"} icon={<DeleteIcon/>} onClick={() => onDeleteRole(param)}
                             label="Delete"/>,
      ]
    }
  ]

  const onUpdateRow = React.useCallback(
    async (newRow: GridRowModel) => {
      let payloadUpdate: RoleDataModel = {
        id: newRow.id,
        ...newRow
      }
      const res: any = await updateRoleById(payloadUpdate);
      return res.status === 200 ? Promise.resolve(newRow) : Promise.reject(null)
    },
    []
  );

  const onUpdateRowError = React.useCallback((err: any) => console.log('log::err err', err), [])
  // editing docs:  https://mui.com/x/react-data-grid/editing/

  // example: https://mui.com/x/react-data-grid/editing/#AskConfirmationBeforeSave.tsx
  return (
    <Box sx={{width: '100%'}}>
      <RoleFormBuilderDialog onRefresh={loadDataList}/>

      <Box sx={{pt: 2, height: "calc(100vh - 320px)"}}>
        <DataGrid
          initialState={{
            "columns": {
              "columnVisibilityModel": {
                "id": false,
              }
            }
          }}
          columns={columns} rows={dataTable}
          components={{Toolbar: GridToolbar}}
          componentsProps={{
            toolbar: {
              //refs: https://mui.com/x/react-data-grid/filtering/#quick-filter
              showQuickFilter: true,
              quickFilterProps: {debounceMs: 500},
            }
          }}
          experimentalFeatures={{newEditingApi: true}}
          onCellEditStop={(param, event) => {
            if (param.reason === GridCellEditStopReasons.cellFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }}
          getRowId={(row) => row?.id}
          processRowUpdate={onUpdateRow}
          onProcessRowUpdateError={onUpdateRowError}
        />
      </Box>
    </Box>
  );
}