import { useContext, useState, createContext, useEffect } from "react";
import { AddBook } from "./components/AddBookButton";
import { Booklist } from "./components/Booklist";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Goal } from "./components/Goal";
import { AddBookModal } from "./components/AddBookModal";
import { EditBookModal } from "./components/EditBookModal";
import { Box } from "theme-ui";

export const BookContext = createContext({
  books: [],
  setBooks: () => null,
  showEditModal: "",
  setShowEditModal: () => null,
  showAddBookModal: "",
  setShowAddBookModal: () => null,
  showEditBookModal: "",
  setShowEditBookModal: () => null,
  readingGoal: "",
  setReadingGoal: () => null,
});
export const useBookContext = () => useContext(BookContext);

const getBooksFromStorage = () => {
  const savedBooks = localStorage.getItem("books");
  return JSON.parse(savedBooks) ?? [];
};
const getGoalFromStorage = () => {
  const savedGoal = localStorage.getItem("goal");
  return JSON.parse(savedGoal) ?? [];
};

const App = () => {
  const [books, setBooks] = useState(getBooksFromStorage());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [readingGoal, setReadingGoal] = useState(getGoalFromStorage);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("goal", JSON.stringify(readingGoal));
  }, [books, readingGoal]);

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        showAddBookModal,
        setShowAddBookModal,
        showEditModal,
        setShowEditModal,
        readingGoal,
        setReadingGoal,
        showEditBookModal,
        setShowEditBookModal,
      }}
    >
      <Box
        sx={{
          paddingBottom: "70px",
          marginTop: "20px",
        }}
      >
        <Header />
        <AddBookModal />
        <EditBookModal />
        <Goal />
        <AddBook />
        <Booklist />
      </Box>
      <Footer />
    </BookContext.Provider>
  );
};

export default App;
