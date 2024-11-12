import Container from "react-bootstrap/Container";
import { SubscriptionList } from "../../subscription";
import { NavigationButton } from "../../common/buttons";
import { Card } from "react-bootstrap";
import { userType } from "../../common/authentication";

export const SubscriptionListPage = () => {
  const role = userType();

  return (
    <Container
      style={{ marginTop: "1rem", minHeight: "100vh", paddingBottom: "70px" }}
    >
      <Card.Title
        style={{ fontSize: "30px", fontWeight: "bold", marginLeft: "1.5rem" }}
      >
        Subscriptions
      </Card.Title>
      <Card>
        <SubscriptionList />{" "}
        {role === "admin" && (
          <Card.Body className="bg-light text-center p-3">
            <NavigationButton
              to={`/subscription/create`}
              label="Add Subscription"
              variant="success"
            />
          </Card.Body>
        )}
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
