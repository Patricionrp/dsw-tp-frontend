import { useState } from "react";
import { usePost } from "../hooks/usePost";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface PurchaseButtonProps {
  courseId: number;
}

export function PurchaseButton({ courseId }: PurchaseButtonProps) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { create, loading, error } = usePost<{ course: number; user: number }>(
    "/purchase"
  );

  const handlePurchase = () => {
    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser).id : null;
    if (!userId) {
      alert("You must log in to make a purchase.");
      return;
    }
    const confirmPurchase = window.confirm(
      "Are you sure you want to purchase this course?"
    );
    if (confirmPurchase) {
      setIsConfirming(true);
      const purchaseData = {
        course: courseId,
        user: userId,
      };

      create(purchaseData)
        .then((response) => {
          if (response) {
            alert("Purchase successful!");
          } else {
            alert("There was an error processing the purchase.");
          }
        })
        .finally(() => {
          setIsConfirming(false);
        });
    }
  };

  return (
    <Container className="d-flex justify-content-center" style={{ marginBottom: "1rem", marginTop: "1rem" }}>
      <Button
        variant="success"
        onClick={handlePurchase}
        disabled={loading || isConfirming}
      >
        {loading || isConfirming ? "Processing..." : "Buy Course"}
      </Button>
    </Container>
  );
}
