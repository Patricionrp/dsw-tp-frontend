import { useState } from "react";
import Container from "react-bootstrap/Container";
import { NavigationButton } from "../../common/buttons";
import { Card } from "react-bootstrap";
import { MyCourseList } from "../../course";
import { getUser } from "../../common/authentication";
import { useAdminRedirect } from "../../common/hooks";
import { SearchBox } from "../../common/utils";

export const MyCourseListPage = () => {
  useAdminRedirect("/course/list");
  const user = getUser();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        My Courses
      </Card.Title>
      <Card.Body>
        <SearchBox onSearch={handleSearch} />
      </Card.Body>
      <Card>
        <MyCourseList id={user.id} />
      </Card>
      <Card.Body className="bg-light text-center p-3">
        <NavigationButton
          to={`/`}
          label="Back to Mainpage"
          variant="secondary"
        />
      </Card.Body>
    </Container>
  );
};
