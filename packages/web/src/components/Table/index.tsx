import React, { ReactNode } from 'react'
import { Table as RTable, TableProps, Spinner } from 'react-bootstrap'
// import { Container } from './styles';/

interface OwnProps {
  header: string[]
  values: ReactNode[][]
  loading?: boolean
  noDataMessage: ReactNode | string
}

type Props = OwnProps & TableProps

const Table: React.FC<Props> = ({
  header,
  values,
  loading,
  noDataMessage,
  ...props
}) => {
  return (
    <RTable {...props}>
      <thead>
        <tr>
          {header.map((v, idx) => (
            <th key={idx}>{v}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={header.length} className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </td>
          </tr>
        )}
        {values.length > 0 &&
          values.map((row, idx) => (
            <tr key={idx}>
              {row.map((v, idx) => (
                <td key={idx}>{v}</td>
              ))}
            </tr>
          ))}
        {values.length === 0 && !loading && (
          <tr>
            <td colSpan={header.length} className="text-center">
              {noDataMessage}
            </td>
          </tr>
        )}
      </tbody>
    </RTable>
  )
}

Table.defaultProps = {
  striped: true,
  bordered: true,
  hover: true,
  responsive: true,
  noDataMessage: 'No data Found'
}

export default Table