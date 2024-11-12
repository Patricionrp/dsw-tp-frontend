import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { DateRangePicker } from "../../Utils/dateRangePicker.tsx";
import { PurchasesList } from "../../purchaseRecord/purchasesList.tsx";

export const PurchasesRecordPage: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <Container>
      <h1>Purchases Page</h1>
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <PurchasesList
        startDate={startDate || undefined}
        endDate={endDate || undefined}
      />
    </Container>
  );
};
