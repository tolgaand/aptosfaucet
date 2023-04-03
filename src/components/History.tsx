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

export type Log = {
  id: string;
  walletAddress: string;
  count: number;
  lastActionAt: Date;
};

export const TransferHistory = () => {
  const { data, isLoading } = useLogs();

  return (
    <Box padding="20px" maxHeight="100vh" overflow="auto">
      <Heading size="lg" marginBottom="20px">
        Transfer History
      </Heading>
      <Text fontSize="20px">
        <Text as="span" fontWeight="bold">
          {data?.logs?.length || 0}
        </Text>
        &nbsp;total, &nbsp;
        <Text as="span" fontWeight="bold">
          {data?.todaysLogCount || 0}
        </Text>
        &nbsp;today
      </Text>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Wallet Address</Th>
              <Th>Sum amount</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.logs?.map((transfer: Log) => (
              <Tr key={transfer.id}>
                <Td>{transfer.walletAddress}</Td>
                <Td>{transfer.count}</Td>
                <Td>{dayjs(transfer.lastActionAt).fromNow()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
