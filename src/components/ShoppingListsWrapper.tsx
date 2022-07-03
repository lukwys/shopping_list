import { useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  FormLabel, FormControl, Alert
} from "react-bootstrap";
import { ShoppingList } from "./ShoppingList";
import { X } from 'react-bootstrap-icons';
import { v4 as uuidv4 } from 'uuid';

type TShoppingListItem = {
  id: string,
  productName: string,
  productQuantity: number,
}

export type TShoppingList = {
  id: string,
  name: string,
  products: TShoppingListItem[]
}

export const ShoppingListsWrapper = () => {
  const [shoppingLists, setShoppingLists] = useState<TShoppingList[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listName, setListName] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setListName('');
    setIsModalVisible(false);
  };

  const createList = () => {
    if (listName.length) {
      const newList: TShoppingList = { id: uuidv4(), name: listName, products: [] };
      setShoppingLists(prevState => [...prevState, newList]);
    } else {
      setIsAlertVisible(true);
    }
    closeModal();
  };
  
  return (
    <>
      {isAlertVisible && (
        <Alert variant="danger">
          <span>Name can't be empty</span>
          <X onClick={() => setIsAlertVisible(false)} />
        </Alert>
      )}
      <Container>
        <h2>Shopping lists</h2>
        <ShoppingList shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} />
        <Button variant="primary" onClick={openModal}>Add list</Button>
        <Modal show={isModalVisible}>
          <ModalHeader>
            <h3>New shopping list</h3>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <FormLabel>List Name</FormLabel>
                <FormControl type="text" value={listName} onChange={event => setListName(event.target.value)} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={closeModal}>Cancel</Button>
            <Button onClick={createList}>Save</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  )
}
