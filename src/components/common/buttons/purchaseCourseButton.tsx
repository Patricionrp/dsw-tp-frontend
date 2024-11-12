import { useState } from "react";
import { usePost } from "../hooks/usePost";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getUser } from "../authentication/getUser.ts";

interface PurchaseButtonProps {
  courseId: number;
}

export function PurchaseButton({ courseId }: PurchaseButtonProps) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const { create, loading } = usePost<{ course: number; user: number }>(
    "/api/coursePurchaseRecords"
  );

  const handlePurchase = () => {
    const user = getUser();
    const userId = user ? user.id : null;
    if (!userId) {
      alert("You must log in to make a purchase.");
      return;
    }
    console.log("User ID:", userId, "Course ID:", courseId);
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
            window.location.reload();
          } else {
            alert("There was an error processing the purchase.");
          }
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setIsConfirming(false);
        });
    }
  };

  return (
    <Button
      variant="success"
      onClick={handlePurchase}
      disabled={loading || isConfirming}
    >
      {loading || isConfirming ? "Processing..." : "Buy Course"}
    </Button>
  );
}
