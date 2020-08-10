import React, { ReactNode } from 'react'
import { Table as RTable, TableProps, Spinner } from 'react-bootstrap'
// import { Container } from './styles';/

interface OwnProps {
  header: string[]
  loading?: boolean
  noDataMessage: ReactNode | string
  children?: ReactNode
  empty: boolean
}

type Props = OwnProps & TableProps

const Table: React.FC<Props> = ({
  header,
  empty,
  children,
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
        {!empty && !loading && children}
        {!loading && empty && (
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
  empty: true,
  noDataMessage: 'No data Found'
}

export default Table
