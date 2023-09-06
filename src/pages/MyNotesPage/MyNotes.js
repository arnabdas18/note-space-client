import React, { useEffect } from "react";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Loading, MainScreen } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNoteList } from "../../features/notes/notesSlice";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteList, noteCreate, noteUpdate, noteDelete } = useSelector(
    (store) => store.notes
  );

  const { isLoading, notes, error } = noteList;
  const { success: successCreate } = noteCreate;
  const { success: successUpdate } = noteUpdate;
  const {
    isLoading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const { loginUser } = useSelector((store) => store.user);
  const { userInfo } = loginUser;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) dispatch(deleteNote(id));
  };

  useEffect(() => {
    dispatch(getNoteList());

    if (!userInfo) navigate("/");
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {isLoading && <Loading />}
      {loadingDelete && <Loading />}
      {[...notes]
        .reverse()
        .filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Button
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Button>
                  </span>
                  <div>
                    <Link to={`/note/${note._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge pill bg="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created At -{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
