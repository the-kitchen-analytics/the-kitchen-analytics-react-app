import React from "react";
import { Header, List, Segment, Message } from "semantic-ui-react";
import contactOptions from '../../data/contactOptions.json';

const ContactUs = () => (
    <Segment>
        <Header
            icon="info circle"
            content="Связаться с нами"
        />

        <Message>
            <p>
                Вы можете сообщить о баге и (или) преложить свою идею любым удобным способом
            </p>
        </Message>

        <List size="large" relaxed>
            {
                contactOptions.map(({ key, icon, href, content }) => (
                    <List.Item key={key}>
                        <List.Icon name={icon} />
                        <List.Content>
                            <a href={href} target="_blank" rel="noreferrer">{content}</a>
                        </List.Content>
                    </List.Item>
                ))
            }
        </List>
    </Segment >
)

export default ContactUs;