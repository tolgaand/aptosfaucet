import {
  Box,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useLogs } from "hooks/useLogs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Transfer = {
  id: string;
  walletAddress: string;
  createdAt: string;
};

export const TransferHistory = () => {
  const { data: history, isLoading } = useLogs();

  return (
    <Box padding="20px" maxHeight="100vh" overflow="auto">
      <Heading size="lg" marginBottom="20px">
        Transfer History
      </Heading>
      <Text fontSize="20px">
        <Text as="span" fontWeight="bold">
          {history?.length || 0}
        </Text>
        &nbsp;txs
      </Text>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Wallet Address</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history?.map((transfer: Transfer) => (
              <Tr key={transfer.id}>
                <Td>{transfer.walletAddress}</Td>
                <Td>{dayjs(transfer.createdAt).fromNow()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
