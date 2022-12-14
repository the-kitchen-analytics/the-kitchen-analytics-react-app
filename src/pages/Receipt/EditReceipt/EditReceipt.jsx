import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Form, Grid, Table } from 'semantic-ui-react'
import PriceCell from '../../../components/DataTable/PriceCell'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { ErrorMessage, Price } from '../../../components/ui'
import { GoBackButton } from '../../../components/ui/Button'
import { usePostData, useUserSettings } from '../../../hooks'
import { deleteReceiptById } from '../../../services/receiptService'
import { calculateTotalPrice, calculateTotalWorkerIncome } from '../../../utils/money'
import { getProcedureTypeDisplayName } from '../../../utils/procedures'
import NoContent from '../../NoContent'

const EditReceipt = () => {

  const { id } = useParams()
  const { getReceiptById } = useOutletContext()
  const { settings: { controlsSize } } = useUserSettings()
  const [isLoading, error, postData] = usePostData()
  const navigate = useNavigate()
  const receipt = getReceiptById(id)

  if (!receipt) {
    return <NoContent />
  }

  const header = `Запись от ${receipt.dateFormatted}`

  const handleDeleteButtonClick = async () => {
    if (window.confirm('Вы действительно хотите удалить запись?')) {
      await postData(deleteReceiptById, id)
      navigate(-1)
    }
  }

  return (
    <DashboardLayout
      header={header}
      subheader="Детализация записи клиента"
    >
      <Grid.Row>
        <Grid.Column>
          {
            error && <ErrorMessage message={error.message} />
          }

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  content="Название услуги"
                />
                <Table.HeaderCell
                  collapsing
                  content="Тип"
                />
                <Table.HeaderCell
                  collapsing
                  content="Стоимость услуги"
                />
                <Table.HeaderCell
                  collapsing
                  content="Заработок мастера"
                />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                receipt.procedures.map((procedure, i) => (
                  <Table.Row key={`${procedure.name}-${i}`}>
                    <Table.Cell
                      content={procedure.name}
                    />

                    <Table.Cell
                      content={getProcedureTypeDisplayName(procedure.type)}
                    />

                    <Table.Cell
                      textAlign="right"
                      content={(
                        <Price euro>
                          {procedure.priceBeforeTaxes}
                        </Price>
                      )}
                    />

                    <Table.Cell
                      textAlign="right"
                      content={(
                        <strong>
                          <Price euro>
                            {procedure.priceAfterTaxes}
                          </Price>
                        </strong>
                      )}
                    />
                  </Table.Row>
                ))
              }
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell
                  colSpan={2}
                  content={
                    <strong>
                      Итого
                    </strong>
                  }
                />

                <Table.HeaderCell
                  textAlign="right"
                  content={
                    <strong>
                      <PriceCell>
                        {calculateTotalPrice(receipt.procedures)}
                      </PriceCell>
                    </strong>
                  }
                />

                <Table.HeaderCell
                  textAlign="right"
                  content={
                    <strong>
                      <PriceCell>
                        {calculateTotalWorkerIncome(receipt.procedures)}
                      </PriceCell>
                    </strong>
                  }
                />
              </Table.Row>
            </Table.Footer>
          </Table>

        </Grid.Column>

      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Form loading={isLoading}>
            <Form.Group widths="equal">
              <Form.Field>
                <GoBackButton />
              </Form.Field>

              <Form.Button
                fluid
                size={controlsSize}
                icon="trash"
                type="button"
                negative
                content="Удалить"
                onClick={handleDeleteButtonClick}
              />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>

    </DashboardLayout >
  )
}

export default EditReceipt