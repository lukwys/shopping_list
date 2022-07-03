import type { TShoppingList } from './ShoppingListsWrapper'
import {
  Accordion,
  Button, Col,
  Container, Form, FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  ListGroupItem, Row
} from "react-bootstrap";
import { Dispatch, SetStateAction, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type ShoppingListProps = {
  shoppingLists: TShoppingList[],
  setShoppingLists: Dispatch<SetStateAction<TShoppingList[]>>
}

export const ShoppingList = ({ shoppingLists, setShoppingLists }: ShoppingListProps) => {
  const [productName, setProductName] = useState('');

  const addProduct = (listId: string) => {
    setShoppingLists(prevState => {
      const currentList = shoppingLists.find(list => list.id === listId) as TShoppingList;
      currentList?.products.push({ id: uuidv4(), productName, productQuantity: 1 })
      return [...prevState, currentList];
    })
  }

  return (
    <div>
      {shoppingLists.map(listItem => (
        <Accordion>
          <Accordion.Header>
            {listItem.name}
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {listItem.products.map(product => (
                <ListGroupItem>
                  <Container>
                    <Row>
                      <Col>{product.productName}</Col>
                      <Col>
                        <Form>
                          <FormCheck type="checkbox" />
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </ListGroupItem>
              ))}
            </ListGroup>
            <FormGroup>
              <FormLabel>New product</FormLabel>
              <FormControl type="text" value={productName} onChange={event => setProductName(event.target.value)} />
            </FormGroup>
            <Button onClick={() => addProduct(listItem.id)}>Add product</Button>
          </Accordion.Body>
        </Accordion>
      ))}
    </div>
  )
}
