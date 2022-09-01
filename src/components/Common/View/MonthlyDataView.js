import React, { useState, useMemo } from "react";
import { Grid, Header, Divider } from "semantic-ui-react";
import MonthSelect from "../MonthSelect";
import { getCurrentMonth } from "../../../utils/DateUtils";

const MonthlyDataView = ({ getData, component }) => {

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth() + 1)

    const monthSelectOptions = useMemo(() => ([
        {
            key: 0,
            text: 'Январь',
            value: 1
        },
        {
            key: 1,
            text: 'Февраль',
            value: 2
        },
        {
            key: 2,
            text: 'Март',
            value: 3
        },
        {
            key: 3,
            text: 'Апрель',
            value: 4
        },
        {
            key: 4,
            text: 'Май',
            value: 5
        },
        {
            key: 5,
            text: 'Июнь',
            value: 6
        },
        {
            key: 6,
            text: 'Июль',
            value: 7
        },
        {
            key: 7,
            text: 'Август',
            value: 8
        },
        {
            key: 8,
            text: 'Сентябрь',
            value: 9
        },
        {
            key: 9,
            text: 'Октябрь',
            value: 10
        },
        {
            key: 10,
            text: 'Ноябрь',
            value: 11
        },
        {
            key: 11,
            text: 'Декабрь',
            value: 12
        }
    ]), [])

    const Component = component;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h1'>
                        За месяц
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
                <Grid.Column
                    tablet={8}
                    largeScreen={6}
                    widescreen={8}
                    mobile={16}
                >
                    <MonthSelect
                        value={selectedMonth}
                        options={monthSelectOptions}
                        handleChange={(e, { value }) => setSelectedMonth(value)}
                    />
                </Grid.Column>
            </Grid.Row>

            <Divider />

            <Grid.Row>
                <Grid.Column>
                    <Component
                        data={getData(selectedMonth)}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default MonthlyDataView;