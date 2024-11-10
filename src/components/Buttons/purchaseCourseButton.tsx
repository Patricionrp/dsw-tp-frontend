import { useState } from "react";
import { usePost } from "../hooks/usePost"; // Asegúrate de que la ruta esté correcta
import { Button } from "react-bootstrap"; // O cualquier librería de UI que estés usando

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
      alert("Debes iniciar sesión para realizar una compra.");
      return;
    }
    const confirmPurchase = window.confirm(
      "¿Estás seguro que deseas comprar este curso?"
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
            alert("Compra realizada con éxito!");
          } else {
            alert("Hubo un error al procesar la compra.");
          }
        })
        .finally(() => {
          setIsConfirming(false);
        });
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handlePurchase}
      disabled={loading || isConfirming}
    >
      {loading || isConfirming ? "Procesando..." : "Comprar Curso"}
    </Button>
  );
}
