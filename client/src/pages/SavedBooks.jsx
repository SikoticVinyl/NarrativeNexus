import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from '../utils/queries';

const SavedBooks = () => {
  // Check if user is logged in, if not, redirect or display a message
  if (!Auth.loggedIn()) {
    return <Container><h2>Please log in to view your saved books.</h2></Container>;
  }

  const { loading, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
    onError: (error) => console.error(`Error fetching saved books: ${error}`),
  });

  const [removeBook] = useMutation(REMOVE_BOOK, {
    onCompleted: () => refetch(),
    onError: (error) => console.error(`Error removing book: ${error}`),
  });

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        context: {
          headers: {
            Authorization: `Bearer ${Auth.getToken()}`, // Ensure the token is included
          },
        },
      });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => (
            <Col key={book.bookId} md="4">
              <Card border='dark'>
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

