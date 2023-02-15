import { FC } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { COLORS } from '../../common/colors';

// TODO: do not use internet links
const IMAGE_PLACEHOLDER_URL = 'https://tvmatcheslive.com/league-of-legends/international/european-masters-season-playoffs/ago-rogue.png';

interface IDataGridProps {
  columns: IColumn[];
  rows: any[];
  page: number;
  limit: number;
  handleChangePage: any; // TODO: fix
  handleChangeRowsPerPage: any; // TODO: fix
};

interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
};

export const DataGrid: FC<IDataGridProps> = (props) => {
  const { columns, rows, page, limit, handleChangePage, handleChangeRowsPerPage } = props;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: COLORS.BLACK, fontSize: '1.3em' }}>
      <TableContainer sx={{ maxHeight: 400, backgroundColor: COLORS.BLACK }}>
        <Table style={{ color: COLORS.PRIMARY }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: COLORS.BLACK, color: COLORS.PRIMARY }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              //.slice(page * limit, page * limit + limit)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const url = value || IMAGE_PLACEHOLDER_URL;
                      if (column.id === 'logo') {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              color: COLORS.PRIMARY,
                              '& img': {
                                width: '75px',
                                height: '75px',
                                objectFit: 'cover'
                              }
                            }}>
                            <img src={url} alt='Logo' />
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align} sx={{ color: COLORS.PRIMARY, fontSize: '1em' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                          </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            color: COLORS.PRIMARY,
            '& .MuiTablePagination-selectIcon': {
              color: COLORS.PRIMARY,
              backgroundColor: COLORS.BLACK,
            },
          }}
          rowsPerPageOptions={[20, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
};
