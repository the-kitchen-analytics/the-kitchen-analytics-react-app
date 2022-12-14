import _ from 'lodash'
import { Grid, Message } from 'semantic-ui-react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import CreateReceiptForm from './CreateReceiptForm'
import ErrorMessage from '../../../components/ui/ErrorMessage'
import { useState, useMemo } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useLocalStorage, usePostData, useSessionStorage } from '../../../hooks'
import { formatDateForDatePicker, getCurrentDate } from '../../../utils/date'
import { createReceipt } from '../../../services/receiptService'
import { convertFormDataToReceipt } from '../../../utils/receipt'
import { TABLE_DAILY } from '../../../data/routePaths'

const INITIAL_ACORDITION_INDEX = -1

const CreateReceipt = () => {

  const { userDetails: { uid, workerCategory } } = useOutletContext()

  const navigate = useNavigate()
  const [isLoading, error, postData] = usePostData()

  const [shouldDisplaySuccessMessage, setShouldDisplaySuccessMesage] = useState(false)

  const initialFormData = useMemo(() => ({
    date: formatDateForDatePicker(getCurrentDate()),
    uid: uid,
    procedures: [],
  }), [uid])

  const [shouldRedirectToHomePageAfterSubmit, setShouldRedirectToHomePageAfterSubmit] =
    useLocalStorage('shouldRedirectToHomePageAfterSubmit', false)

  const [shouldDisplayPreview, setShouldDisplayPreview] =
    useLocalStorage('shouldDisplayPreview', true)

  const [formData, setFormData] = useSessionStorage(
    'submitFormData', initialFormData)

  const [accorditionActiveIndex, setAccorditionActiveIndex] =
    useSessionStorage('accorditionActiveIndex', INITIAL_ACORDITION_INDEX)

  const convertedFormData = useMemo(() => {
    return convertFormDataToReceipt(formData)
  }, [formData])

  const isDateFieldValid = () => {
    return !!formData.date
  }

  const isProceduresFieldValid = () => {
    return !_.isEmpty(formData.procedures)
  }

  const isFormDataValid = () => {
    if (!isDateFieldValid()) {
      return false
    }

    if (!isProceduresFieldValid()) {
      return false
    }

    return true
  }

  const clearForm = () => {
    setFormData(initialFormData)
    setShouldDisplaySuccessMesage(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setShouldDisplaySuccessMesage(false)

    if (!shouldDisableSubmitFormButton()) {
      setAccorditionActiveIndex(INITIAL_ACORDITION_INDEX)

      const receipt = await postData(createReceipt, convertedFormData)

      if (receipt.id) {
        clearForm()
        setShouldDisplaySuccessMesage(true)

        if (shouldRedirectToHomePageAfterSubmit) {
          navigate('/')
        }
      }
    }
  }

  const handleClearFromButtonClick = () => {
    setAccorditionActiveIndex(INITIAL_ACORDITION_INDEX)
    clearForm()
  }

  const shouldDisableClearFormButton = () => {
    return _.isEqual(formData, initialFormData) || isLoading
  }

  const shouldDisableSubmitFormButton = () => {
    return isLoading || !isFormDataValid()
  }

  return (
    <DashboardLayout
      icon="cloud upload"
      header="?????????????????? ????????????"
      subheader="?????????????????? ???????? ???????????? ?? ????????????"
    >
      <Grid.Row>
        <Grid.Column>
          {
            shouldDisplaySuccessMessage && (
              <Message
                positive
                icon="check circle"
                header="???????????? ?????????????? ??????????????????"
                content={
                  <>?????????????????? ?? ???????????? <Link to={TABLE_DAILY}>?????????????? -{'>'} ???? ????????</Link>, ?????????? ?????????????????????? ????????????</>
                }
              />
            )
          }
          {
            error && (
              <ErrorMessage message={error.message} />
            )
          }
          <CreateReceiptForm
            formData={formData}
            setFormData={setFormData}
            convertedFormData={convertedFormData}
            workerCategory={workerCategory}
            accorditionActiveIndex={accorditionActiveIndex}
            setAccorditionActiveIndex={setAccorditionActiveIndex}
            shouldRedirectToHomePageAfterSubmit={shouldRedirectToHomePageAfterSubmit}
            setShouldRedirectToHomePageAfterSubmit={setShouldRedirectToHomePageAfterSubmit}
            shouldDisplayPreview={shouldDisplayPreview}
            setShouldDisplayPreview={setShouldDisplayPreview}
            isLoading={isLoading}
            handleFormSubmit={handleFormSubmit}
            handleClearFromButtonClick={handleClearFromButtonClick}
            shouldDisableSubmitFormButton={shouldDisableSubmitFormButton}
            shouldDisableClearFormButton={shouldDisableClearFormButton}
            isDateFieldValid={isDateFieldValid}
          />
        </Grid.Column>
      </Grid.Row>
    </DashboardLayout >
  )
}

export default CreateReceipt