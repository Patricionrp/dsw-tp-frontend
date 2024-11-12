import React, { useState } from "react";

import { Container } from "react-bootstrap";
import { DateRangePicker } from "../../common/utils";
import { MyPurchasesList } from "../../purchaseRecord";
import { useAdminRedirect } from "../../common/hooks/useAdminRedirect.ts";

export const MyPurchasesPage: React.FC = () => {
  useAdminRedirect("/coursePurchaseRecords");
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
      <MyPurchasesList
        startDate={startDate || undefined}
        endDate={endDate || undefined}
      />
    </Container>
  );
};
