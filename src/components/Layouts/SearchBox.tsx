import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    const queryString = `?title=${input.trim()}`;
    onSearch(queryString); // Llamamos a onSearch en cada cambio
  };

  return (
    <Form className="search-box">
      <FormControl
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        style={{ fontSize: "20px" }}
        value={searchInput}
        onChange={handleChange}
      />
    </Form>
  );
};
