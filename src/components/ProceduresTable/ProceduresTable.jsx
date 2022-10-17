import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { getProcedureTypeDisplayName } from "../../utils/procedures";
import { getWorkerCategoryDisplayName } from "../../utils/workerCategory";
import PriceCell from "../DataTable/PriceCell";

const TableRow = (props) => {

    const {
        index,
        procedure: {
            id, name, price, type,
            workerCategory, workerRate, workerIncome,
        }
    } = props;

    return (
        <Table.Row>
            <Table.Cell collapsing textAlign="center">
                {index + 1}.
            </Table.Cell>
            <Table.Cell>
                <Link to={`/dashboard/procedures/${id}`}>
                    {name}
                </Link>
            </Table.Cell>

            <Table.Cell collapsing>
                {getProcedureTypeDisplayName(type)}
            </Table.Cell>

            <Table.Cell collapsing>
                {getWorkerCategoryDisplayName(workerCategory)}
            </Table.Cell>

            <Table.Cell textAlign='right' collapsing>
                <PriceCell>{price}</PriceCell>
            </Table.Cell>

            <Table.Cell textAlign='right' collapsing>
                <PriceCell>{workerIncome || price * workerRate}</PriceCell>
            </Table.Cell>
        </Table.Row>
    );
}

const ProceduresTable = ({ tableData = [] }) => {

    const getTableRow = (procedure, i) => (
        <TableRow
            index={i}
            key={procedure.id}
            procedure={procedure}
        />
    );

    return (
        <Table
            celled
            striped
            padded
        // sortable
        >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>Название</Table.HeaderCell>
                    <Table.HeaderCell>Тип</Table.HeaderCell>
                    <Table.HeaderCell>Категория мастера</Table.HeaderCell>
                    <Table.HeaderCell>Стоимость услуги</Table.HeaderCell>
                    <Table.HeaderCell>Заработок мастера</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    tableData.map(getTableRow)
                }
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={5}>Количество услуг</Table.HeaderCell>
                    <Table.HeaderCell collapsing textAlign="right">
                        {tableData.length}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default ProceduresTable;